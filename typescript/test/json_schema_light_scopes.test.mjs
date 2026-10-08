import assert from 'node:assert/strict'
import { execFileSync, spawnSync } from 'node:child_process'
import { readFileSync, readdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import * as parser from '../../../../newstyle_projects/projects/json_schema_light/sketch/transformers/json_sketch/typescript/dist/modules/source.liana.generated/schemas/unresolved/refiners/list_of_characters.js'
import * as resolver from '../../../../newstyle_projects/projects/json_schema_light/sketch/transformers/json_sketch/typescript/dist/modules/source.liana.generated/schemas/resolved/refiners/unresolved.js'
import * as serializer from '../../../../newstyle_projects/projects/json_schema_light/sketch/transformers/json_sketch/typescript/dist/modules/source.liana.generated/schemas/unresolved/transformers/serialized_paragraph.js'
import * as resolvedSerializer from '../../../../newstyle_projects/projects/json_schema_light/sketch/transformers/json_sketch/typescript/dist/modules/source.liana.generated/schemas/resolved/transformers/serialized_paragraph.js'
import * as transform from '../../../../newstyle_projects/projects/json_schema_light/sketch/transformers/json_sketch/typescript/dist/transform.js'

const root = new URL('../../../../newstyle_projects/', import.meta.url)
const require = createRequire(new URL('projects/json_schema_light/sketch/transformers/json_sketch/typescript/package.json', root))
const p = await import(require.resolve('pareto-core/transformer'))
const abort = error => { throw error }
const chars = text => p.literal.list(Array.from(text, c => c.codePointAt(0)))
const entry = (dictionary, name) => p.from.dictionary(dictionary).get_possible_entry(name, value => value, () => assert.fail(name))
const present = optional => p.from.optional(optional).decide(value => value, () => assert.fail('Absent value'))
const definitions = (values = {}, namespaces = {}) => ({
    values: p.literal.dictionary(values), namespaces: p.literal.dictionary(namespaces),
})
const value = reference => ({
    description: p.literal.not_set(), comment: p.literal.not_set(), deprecated: p.literal.not_set(),
    readOnly: p.literal.not_set(), writeOnly: p.literal.not_set(), default: p.literal.not_set(),
    examples: p.literal.not_set(), constraint: reference === undefined
        ? p.literal.not_set() : p.literal.set(['ref', reference]),
})
const local = name => ['local', name]
const external = (head, name, tail = []) => ['external', {
    namespace: { head, path: { tail: p.literal.list(tail) } }, value: name,
}]
const document = (defs, reference) => ({
    schema: p.literal.not_set(), id: p.literal.not_set(), defs,
    'root value': reference === undefined ? p.literal.not_set() : p.literal.set(value(reference)),
})
const resolve = source => resolver.Root(source, abort, null, null)
const reference = resolved => present(resolved.constraint)[1]
const property = (object, name) => object[1].__get_raw().find(property => property.key === name)?.value ?? assert.fail(name)
const pointer = object => property(object, '$ref')[1]

test('local self and mutual references retain exact value identity without inspecting unfinished values', () => {
    const source = document(definitions({
        self: value(local('self')), first: value(local('second')), second: value(local('first')),
    }), local('self'))
    const resolved = resolve(source)
    const self = entry(resolved.defs.values, 'self')
    const first = entry(resolved.defs.values, 'first')
    const second = entry(resolved.defs.values, 'second')
    assert.equal(reference(self)[1]['l entry'].get_circular_dependent(), self)
    assert.equal(reference(first)[1]['l entry'].get_circular_dependent(), second)
    assert.equal(reference(second)[1]['l entry'].get_circular_dependent(), first)
    assert.equal(reference(present(resolved['root value']))[1]['l entry'].get_circular_dependent(), self)
    const json = transform.Root(resolved)
    assert.equal(pointer(property(property(json, '$defs'), 'self')), '#/$defs/self')
    const rendered = resolvedSerializer.Root(resolved, { indentation: '    ' }).__get_raw().join('\n')
    assert.doesNotMatch(rendered, /l entry|meta|result/)
    assert.equal(reference(entry(resolve(parser.Root(chars(rendered), abort, { 'tab size': 4 })).defs.values, 'self'))[0], 'local')
})

test('nested local references and external ancestor/sibling namespaces preserve absolute JSON pointers', () => {
    const source = document(definitions({}, {
        base: definitions({ leaf: value() }),
        nested: definitions({}, {
            user: definitions({
                self: value(local('self')),
                imported: value(external('base', 'leaf')),
                sibling: value(external('other', 'leaf')),
            }),
            other: definitions({ leaf: value() }),
        }),
    }), external('nested', 'self', ['user']))
    const resolved = resolve(source)
    const nested = entry(resolved.defs.namespaces, 'nested')
    const user = entry(nested.namespaces, 'user')
    const imported = reference(entry(user.values, 'imported'))[1]
    assert.equal(imported.value['l entry'], entry(entry(resolved.defs.namespaces, 'base').values, 'leaf'))
    assert.equal(imported.namespace.head['l up steps'], 2)
    assert.equal(reference(entry(user.values, 'sibling'))[1].namespace.head['l up steps'], 1)
    const json = transform.Root(resolved)
    const userJSON = property(property(property(property(property(json, '$defs'), 'nested'), '$defs'), 'user'), '$defs')
    assert.equal(pointer(property(userJSON, 'self')), '#/$defs/nested/$defs/user/$defs/self')
    assert.equal(pointer(property(userJSON, 'imported')), '#/$defs/base/$defs/leaf')
    assert.equal(pointer(property(userJSON, 'sibling')), '#/$defs/nested/$defs/other/$defs/leaf')
    assert.equal(pointer(json), '#/$defs/nested/$defs/user/$defs/self')
})

test('namespace paths compute empty and multiple-step results with exact namespace identity', () => {
    const resolved = resolve(document(definitions({}, {
        root: definitions({}, { child: definitions({}, { leaf: definitions() }) }),
    })))
    const rootNamespace = entry(resolved.defs.namespaces, 'root')
    const child = entry(rootNamespace.namespaces, 'child')
    const leaf = entry(child.namespaces, 'leaf')
    const path = tail => resolver.Definition_Path({ tail: p.literal.list(tail) }, abort, null, { entry: rootNamespace })
    assert.equal(path([]).meta.result, rootNamespace)
    assert.equal(path(['child']).meta.result, child)
    const result = path(['child', 'leaf'])
    assert.equal(result.meta.result, leaf)
    assert.equal(result.value.tail.__get_raw()[0]['l entry'], child)
    assert.throws(() => path(['missing']), error => error.type === 'no such entry')
    assert.throws(() => path(['child', 'missing']), error => error.type === 'no such entry')
})

test('namespace lookup shadowing chooses the nearest scope and retains its JSON path', () => {
    const source = document(definitions({}, {
        shared: definitions({ leaf: value() }),
        nested: definitions({}, {
            shared: definitions({ leaf: value() }),
            user: definitions({ imported: value(external('shared', 'leaf')) }),
        }),
    }))
    const resolved = resolve(source)
    const nested = entry(resolved.defs.namespaces, 'nested')
    const imported = reference(entry(entry(nested.namespaces, 'user').values, 'imported'))[1]
    assert.equal(imported.value['l entry'], entry(entry(nested.namespaces, 'shared').values, 'leaf'))
    assert.equal(imported.namespace.head['l up steps'], 1)
    const json = transform.Root(resolved)
    const nestedJSON = property(property(property(json, '$defs'), 'nested'), '$defs')
    const userJSON = property(property(nestedJSON, 'user'), '$defs')
    assert.equal(pointer(property(userJSON, 'imported')), '#/$defs/nested/$defs/shared/$defs/leaf')
})

test('missing and wrong-kind targets fail, and cross-namespace dependency cycles are rejected', () => {
    for (const [source, expected] of [
        [document(definitions({ bad: value(local('missing')) })), 'no such entry'],
        [document(definitions({}, { ns: definitions() }), local('ns')), 'no such entry'],
        [document(definitions({ leaf: value() }), external('leaf', 'leaf')), 'no context lookup'],
        [document(definitions({}, { ns: definitions() }), external('ns', 'missing')), 'no such entry'],
        [document(definitions({}, { ns: definitions({ leaf: value() }) }), external('ns', 'leaf', ['leaf'])), 'no such entry'],
    ]) assert.throws(() => resolve(source), error => error.type === expected)
    for (const namespaces of [
        { ns: definitions({ bad: value(external('ns', 'bad')) }) },
        { first: definitions({ bad: value(external('second', 'bad')) }), second: definitions({ bad: value(external('first', 'bad')) }) },
    ]) assert.throws(() => resolve(document(definitions({}, namespaces))), error => error.type === 'cycle detected')
})

test('production CLI reports semantic failures explicitly and emits no successful output', () => {
    const source = serializer.Root(document(definitions({ bad: value(local('missing')) })), { indentation: '    ' }).__get_raw().join('\n')
    const result = spawnSync(process.execPath, [fileURLToPath(new URL(
        'projects/json_schema_light/sketch/transformers/json_sketch/typescript/dist/index.generated.js', root,
    ))], { input: source, encoding: 'utf8' })
    assert.notEqual(result.status, 0)
    assert.equal(result.stdout, '')
    assert.match(result.stderr, /Resolution error: no such entry 'missing' at \/Reference\/local/)
})

test('all legacy Liana producer fixtures execute through the actual native semantic JSL consumer', () => {
    const directory = new URL('projects/liana_legacy/sketch/transformers/json_schema_light_sketch/tests/results/expected/', root)
    for (const name of readdirSync(directory).filter(name => name.endsWith('.jsl.lna'))) {
        const text = readFileSync(new URL(name, directory), 'utf8')
        const resolved = resolve(parser.Root(chars(text), abort, { 'tab size': 4 }))
        const json = transform.Root(resolved)
        assert.equal(json[0], 'object', name)
        const output = execFileSync(process.execPath, [fileURLToPath(new URL(
            'projects/json_schema_light/sketch/transformers/json_sketch/typescript/dist/index.generated.js', root,
        ))], { input: text, encoding: 'utf8' })
        assert.match(output, /^\|\s*`object`/, name)
    }
})
