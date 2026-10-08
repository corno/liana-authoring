import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import test from 'node:test'
import { input, pipeline, placeholders, write, typecheck } from '../../../../newstyle_projects/tools/liana/generation.mjs'

const base = new URL('../../../../newstyle_projects/', import.meta.url)
const examples = new URL('projects/liana/sketch/examples/', base)
const require = createRequire(new URL('projects/liana/sketch/transformers/pareto_next_sketch/typescript/package.json', base))
const p = await import(require.resolve('pareto-core/transformer'))
const abort = error => { throw error }
const chars = text => p.literal.list(Array.from(text, character => character.codePointAt(0)))
const entry = (dictionary, id) => p.from.dictionary(dictionary).get_possible_entry(id, value => value, () => assert.fail(id))

async function generated(name, run, source = input(fileURLToPath(new URL(name + '.liana.lna', examples)))) {
    const directory = mkdtempSync(join(tmpdir(), 'liana-result-metadata-'))
    try {
        const output = pipeline(source)
        assert.deepEqual(placeholders(output.pareto), [])
        assert.equal(write(output.typescript, directory).typescriptPlaceholders, 0)
        assert.deepEqual(typecheck(directory), { status: 'passed' })
        const configuration = join(directory, 'tsconfig.json')
        const config = JSON.parse(readFileSync(configuration, 'utf8'))
        config.compilerOptions.noEmit = false
        config.compilerOptions.outDir = 'dist'
        writeFileSync(configuration, JSON.stringify(config))
        execFileSync(process.execPath, [fileURLToPath(new URL('tools/typescript.cjs', base)), '-p', directory], { stdio: 'pipe' })
        const load = path => import(pathToFileURL(join(directory, 'dist/schemas/' + path + '.js')))
        await run({
            parser: await load('unresolved/refiners/list_of_characters'),
            resolver: await load('resolved/refiners/unresolved'),
            serializer: await load('resolved/transformers/serialized_paragraph'),
        })
    } finally {
        rmSync(directory, { recursive: true })
    }
}

test('namespace Definition Path computes its final result and preserves empty and multi-step target identity', async () => {
    await generated('json_schema_light', async ({ parser, resolver, serializer }) => {
        const definitions = resolver.Root_Definitions(parser.Root_Definitions(chars(
            "( values: {} namespaces: { 'root': ( values: {} namespaces: { 'child': ( values: {} namespaces: { 'leaf': ( values: {} namespaces: {} ) } ) } ) } )",
        ), abort, { 'tab size': 4 }), abort, null, null)
        const root = entry(definitions.namespaces, 'root')
        const child = entry(root.namespaces, 'child')
        const leaf = entry(child.namespaces, 'leaf')
        const resolve = steps => resolver.Definition_Path(parser.Definition_Path(chars('( tail: [' + steps + '] )'),
            abort, { 'tab size': 4 }), abort, null, { entry: root })
        const empty = resolve('')
        assert.equal(empty.meta.result, root)
        assert.equal(empty.value.tail.__get_raw().length, 0)
        assert.equal(resolve("'child'").meta.result, child)
        const result = resolve("'child' 'leaf'")
        assert.equal(result.meta.result, leaf)
        const items = result.value.tail.__get_raw()
        assert.equal(items[0]['l entry'], child)
        assert.equal(items[1]['l entry'], leaf)
        assert.throws(() => resolve("'missing'"), error => error.type === 'no such entry' && error.id === 'missing')
        assert.throws(() => resolve("'child' 'missing'"), error => error.type === 'no such entry')
        const rendered = serializer.Definition_Path(result, { indentation: '    ' }).__get_raw().join('\n')
        assert.doesNotMatch(rendered, /meta|result|entry/)
        assert.equal(resolver.Definition_Path(parser.Definition_Path(chars(rendered), abort, { 'tab size': 4 }),
            abort, null, { entry: root }).meta.result, leaf)
    })
})

test('Schema Value Path explicitly computes results for every step kind and propagates failed constraints', async () => {
    await generated('programming_languages--pareto_next', async ({ parser, resolver, serializer }) => {
        const schema = resolver.Schema(parser.Schema(chars(`(
            imports: {}
            types: {
                'Root': ( root: | dictionary | list | optional | group (
                    properties: { 'choice': | state ( options: { 'leaf': | text ~ } ) }
                ) )
            }
        )`), abort, { 'tab size': 4 }), abort, null, null)
        const root = entry(schema.types, 'Root').root
        const list = root[1]
        const optional = list[1]
        const group = optional[1]
        const state = entry(group[1].properties, 'choice')
        const leaf = entry(state[1].options, 'leaf')
        const steps = ['| dictionary ~', '| list ~', '| optional ~', "| group 'choice'", "| state 'leaf'"]
        const targets = [list, optional, group, state, leaf]
        const resolve = source => resolver.Schema_Value_Path(parser.Schema_Value_Path(chars('( tail: [' + source + '] )'),
            abort, { 'tab size': 4 }), abort, null, { entry: root })
        assert.equal(resolve('').meta.result, root)
        for (let length = 1; length <= steps.length; length++) {
            const output = resolve(steps.slice(0, length).join(' '))
            assert.equal(output.meta.result, targets[length - 1])
            output.value.tail.__get_raw().forEach((item, index) => assert.equal(item[1].value.meta.value, targets[index]))
        }
        assert.throws(() => resolve('| list ~'), error => error.type === 'unexpected state option')
        assert.throws(() => resolve('| dictionary ~ | dictionary ~'), error => error.type === 'unexpected state option')
        assert.throws(() => resolve(steps.slice(0, 3).join(' ') + " | group 'missing'"), error => error.type === 'no such entry')
        assert.throws(() => resolve(steps.join(' ') + ' | dictionary ~'), error => error.type === 'unexpected state option')
        const output = resolve(steps.join(' '))
        const rendered = serializer.Schema_Value_Path(output, { indentation: '    ' }).__get_raw().join('\n')
        assert.doesNotMatch(rendered, /meta|result/)
        assert.equal(resolver.Schema_Value_Path(parser.Schema_Value_Path(chars(rendered), abort, { 'tab size': 4 }),
            abort, null, { entry: root }).meta.result, leaf)
    })

})

test('with results handles nested and empty metadata boundaries without changing payload syntax', async () => {
    const source = input(fileURLToPath(new URL('resolver.liana.lna', examples)))
    const root = entry(source[1].resolver.types, 'Root')
    const wrap = (resolver, results) => ['with results', { resolver, results: p.literal.dictionary(results) }]
    const saved = { start: ['resolved value', null], tail: { path: p.literal.list([]) } }
    source[1].resolver.types = p.literal.dictionary({
        Root: {
            ...root,
            'root value resolver': wrap(wrap(wrap(root['root value resolver'], {}), { inner: saved }), { outer: saved }),
        },
    })
    await generated('resolver', async ({ parser, resolver, serializer }) => {
        const output = resolver.Root(parser.Root(chars('"hello"'), abort, { 'tab size': 4 }), abort, null, null)
        assert.deepEqual(output, {
            value: { value: { value: 'hello', meta: {} }, meta: { inner: 'hello' } },
            meta: { outer: 'hello' },
        })
        assert.equal(serializer.Root(output, { indentation: '    ' }).__get_raw().join('\n'), '"hello"')
    }, source)
})

test('declared state results require an explicit computation of the declared type in every option', () => {
    const source = input(fileURLToPath(new URL('programming_languages--pareto_next.liana.lna', examples)))
    const path = entry(source[1].resolver.types, 'Schema Value Path')['root value resolver'][1]
    const option = entry(path.resolver, 'tail').resolver[1].resolver[1].options.__get_raw()[0][1]
    const results = option.resolver[1].results
    option.resolver[1].results = p.literal.dictionary({})
    assert.throws(() => pipeline(source), error => String(error).includes('no "value"'))
    option.resolver[1].results = p.literal.dictionary({
        value: { start: ['resolved value', null], tail: { path: p.literal.list([]) } },
    })
    assert.throws(() => pipeline(source), error => String(error).includes('result type mismatch'))
    option.resolver[1].results = results
    assert.deepEqual(placeholders(pipeline(source).pareto), [])
})

test('SQL foreign keys retain inferred unique-key constraint metadata without authored result declarations', async () => {
    await generated('sql_query', async ({ parser, resolver }) => {
        const target = unique => `( tables: {
            'Target': ( fields: { 'id': ( nullable: false unique: | ${unique} ~ type: | value | integer ~ ) } )
            'Source': ( fields: { 'target': ( nullable: false unique: | no ~ type: | reference ( table: 'Target' field: 'id' ) ) } )
        } statements: [] )`
        const resolve = source => resolver.Root(parser.Root(chars(source), abort, { 'tab size': 4 }), abort, null, null)
        const output = resolve(target('yes'))
        const foreignKey = entry(entry(output.tables, 'Source').fields, 'target').type[1]
        const field = entry(entry(output.tables, 'Target').fields, 'id')
        assert.equal(foreignKey.field.value['l entry'], field)
        assert.equal(foreignKey.field.meta.unique, field.unique[1])
        assert.throws(() => resolve(target('no')), error => error.type === 'unexpected state option' && error.id === 'unique')
        assert.throws(() => resolve(target('yes').replace("field: 'id'", "field: 'missing'")),
            error => error.type === 'no such entry' && error.id === 'missing')
    })
})

test('with results composes with reference constraints and unwraps both boundaries when serializing', async () => {
    const source = input(fileURLToPath(new URL('sql_query.liana.lna', examples)))
    const targetType = entry(source[1].resolver.types, 'Field')
    targetType['root value resolver'] = ['with constraints', {
        constraints: p.literal.dictionary({
            'unique state': {
                start: ['sibling', 'unique'], tail: { path: p.literal.list([['component', null]]) },
            },
        }),
        resolver: targetType['root value resolver'][1],
    }]
    const field = entry(entry(source[1].resolver.types, 'Foreign Key')['root value resolver'][1], 'field')
    field.resolver = ['with results', {
        results: p.literal.dictionary({
            target: {
                start: ['resolved value', null],
                tail: { path: p.literal.list([['reference', {}], ['component', null]]) },
            },
        }),
        resolver: field.resolver,
    }]
    await generated('sql_query', async ({ parser, resolver, serializer }) => {
        const parsed = parser.Foreign_Key(chars("(table: 'Target' field: 'id')"), abort, { 'tab size': 4 })
        const root = resolver.Root(parser.Root(chars(`( tables: {
            'Target': ( fields: { 'id': ( nullable: false unique: | yes ~ type: | value | integer ~ ) } )
            'Source': ( fields: { 'target': ( nullable: false unique: | no ~ type: | reference ( table: 'Target' field: 'id' ) ) } )
        } statements: [] )`), abort, { 'tab size': 4 }), abort, null, null)
        const tables = root.tables
        const output = entry(entry(tables, 'Source').fields, 'target').value.type[1]
        const target = entry(entry(tables, 'Target').fields, 'id')
        assert.equal(output.field.meta.target, target)
        assert.equal(output.field.value.value['l entry'], target)
        assert.equal(output.field.value.meta.unique, target.value.unique[1])
        const rendered = serializer.Foreign_Key(output, { indentation: '    ' }).__get_raw().join('\n')
        assert.deepEqual(parser.Foreign_Key(chars(rendered), abort, { 'tab size': 4 }), parsed)
    }, source)
})
