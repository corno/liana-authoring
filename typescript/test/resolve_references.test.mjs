import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import * as unmarshal from '../lib/dist/schemas/unmarshall_result/refiners/list_of_characters.js'
import * as interpret from '../lib/dist/schemas/unmarshall_result/transformers/resolve_result.js'
import * as errors from '../lib/dist/schemas/resolve_result/transformers/resolve_errors.js'
import * as diagnostics from '../lib/dist/schemas/resolve_result/transformers/diagnostics.js'

const require = createRequire(new URL('../lib/package.json', import.meta.url))
const p = await import(require.resolve('pareto-core/transformer'))
const lookup = await import(require.resolve('pareto-core/transformer/specials/lookup'))
const generic = await import(require.resolve('pareto-core/temp/Generic_Dictionary'))
const schemaParser = await import(require.resolve('pareto-liana/schemas/temp_module_specifier/refiners/list_of_characters'))
const dict = p.literal.dictionary
const none = p.literal.not_set
const raw = value => Object.fromEntries(value.__get_raw())
const abort = error => { throw error }
const text = ['text', ['global', { 'l id': 'text', 'l entry': { type: ['single line', null] } }]]
const dictionaryDefinition = { value: null }
const selectedDefinition = {
    dictionary: dictionaryDefinition, dependency: ['acyclic', null], results: none(),
}
const referenceDefinition = ['reference', { referent: null, type: ['selected', selectedDefinition] }]
const optionalReference = ['optional', referenceDefinition]
const nodeDefinition = ['group', dict({
    label: { value: text, description: none() },
    next: { value: optionalReference, description: none() },
})]
dictionaryDefinition.value = nodeDefinition
const emptyGeneric = () => generic.map_value_dictionary_to_generic_dictionary(dict({}), value => value)
const rootLookups = () => ({
    parameters: { acyclic: emptyGeneric(), cyclic: emptyGeneric(), stack: emptyGeneric() },
    siblings: { acyclic: lookup.acyclic.not_set(), cyclic: lookup.cyclic.not_set() },
})
const referenceResolver = selection => ['reference', {
    definition: referenceDefinition[1],
    type: ['selected', { definition: selectedDefinition, lookup: selection, constraints: dict({}) }],
}]
const siblingSelection = {
    type: ['acyclic', ['siblings', dictionaryDefinition]], 'resulting dictionary': dictionaryDefinition,
}
const nodeResolver = ['group', dict({
    label: { definition: nodeDefinition[1], resolver: ['text', null] },
    next: { definition: nodeDefinition[1], resolver: ['optional', {
        constraints: dict({}), resolver: referenceResolver(siblingSelection),
    }] },
})]
const dictionaryResolver = ['dictionary', {
    definition: dictionaryDefinition, resolver: nodeResolver, benchmark: none(),
}]
function run(source, definition = ['dictionary', dictionaryDefinition], resolver = dictionaryResolver, lookups = rootLookups()) {
    const input = unmarshal.Document(p.literal.list(Array.from(source, c => c.codePointAt(0))), abort, {
        module: { 'root value': definition }, 'tab size': 4,
    })
    return interpret.Document(input, lookups, {
        definition: { 'root value resolver': resolver }, resolvers: { modules: dict({}) },
        'module parameters': dict({}),
    })
}
const entries = result => {
    assert.equal(result.content['unmarshall result'][0], 'success')
    return raw(result.content['unmarshall result'][1][1].entries)
}
const child = entry => entry['unmarshall result'][1].value[1]
const next = entry => child(entry)['unmarshall result'][1][1].properties.__get_raw()
    .find(([id]) => id === 'next')[1]['unmarshall result'][1].resolved['unmarshall result'][1][1]
    .status[1]['child value']['unmarshall result'][1][1][1]

test('parsed acyclic sibling references select actual resolved entries in dependency order', () => {
    const result = run("{ a: ( label: 'A' next: * 'b' ) b: ( label: 'B' next: _ ) }")
    const values = entries(result)
    assert.deepEqual(Object.keys(values), ['b', 'a'])
    assert.equal(next(values.a)['resolve status'][0], 'resolved')
    assert.equal(next(values.a)['resolve status'][1], values.b)
    assert.deepEqual(errors.Document(result).__get_raw(), [])
    assert.deepEqual(diagnostics.Document(result).__get_raw(), [])
})

test('missing targets produce semantic diagnostics at the actual reference range', () => {
    const result = run("{ a: ( label: 'A' next: * 'absent' ) }")
    const reference = next(entries(result).a)
    assert.deepEqual(reference['resolve status'], ['no such entry', 'absent'])
    const reported = errors.Document(result).__get_raw()
    assert.equal(reported.length, 1)
    assert.equal(reported[0].range, reference.unmarshalled.intermediate.instance.range)
    assert.deepEqual(reported[0].severity, ['error', null])
    const diagnostic = diagnostics.Document(result).__get_raw()[0]
    assert.match(diagnostic.message, /No such dictionary entry.*absent/)
    assert.equal(diagnostic.range.__get_raw()[0][1], reported[0].range)
    assert.deepEqual(diagnostic.type, ['semantic', null])
})

test('self and mutual acyclic cycles return statuses rather than throwing or fabricating links', () => {
    for (const source of [
        "{ a: ( label: 'A' next: * 'a' ) }",
        "{ a: ( label: 'A' next: * 'b' ) b: ( label: 'B' next: * 'a' ) }",
    ]) {
        const result = run(source)
        const reported = errors.Document(result).__get_raw()
        assert.equal(reported.length, 1)
        assert.equal(reported[0].type[0], 'cycle detected')
        assert.ok(reported[0].type[1].__get_raw().length >= 2)
        assert.match(diagnostics.Document(result).__get_raw()[0].message, /Acyclic reference cycle/)
    }
})

test('acyclic lookup parameters select entries and distinguish missing root context', () => {
    const target = entries(run("{ target: ( label: 'TARGET' next: _ ) }")).target
    const selection = {
        type: ['parameter', { 'l id': 'table', 'l entry': { type: ['acyclic', null] } }],
        'resulting dictionary': dictionaryDefinition,
    }
    const resolver = referenceResolver(selection)
    const lookups = rootLookups()
    lookups.parameters.acyclic = generic.map_value_dictionary_to_generic_dictionary(
        dict({ table: null }), () => ['resolved', lookup.acyclic.from_resolved_dictionary(dict({ target }))],
    )
    const result = run("'target'", referenceDefinition, resolver, lookups)
    assert.equal(result.content['unmarshall result'][1][1][1]['resolve status'][1], target)
    assert.deepEqual(errors.Document(result).__get_raw(), [])
    const absent = run("'absent'", referenceDefinition, resolver, lookups)
    assert.deepEqual(errors.Document(absent).__get_raw()[0].type, ['no such entry', 'absent'])
    for (const parameters of [
        emptyGeneric(),
        generic.map_value_dictionary_to_generic_dictionary(dict({ table: null }), () => ['not found because of root', null]),
    ]) {
        const missing = run("'target'", referenceDefinition, resolver, {
            ...rootLookups(), parameters: { ...rootLookups().parameters, acyclic: parameters },
        })
        assert.deepEqual(errors.Document(missing).__get_raw()[0].type, ['no context lookup', null])
    }
    const outside = run("'target'", referenceDefinition, referenceResolver(siblingSelection))
    assert.deepEqual(errors.Document(outside).__get_raw()[0].type, ['no context lookup', null])
})

test('unavailable targets are reported without hiding unmarshalling failures', () => {
    for (const source of [
        "{ a: ( label: 'A' next: * 'b' ) b }",
        "{ a: ( label: 'A' next: * 'b' ) b: 'not a node' }",
    ]) {
        const result = run(source)
        assert.deepEqual(next(entries(result).a)['resolve status'], ['entry unavailable', 'b'])
        assert.match(diagnostics.Document(result).__get_raw()[0].message, /no usable value/)
    }
    const wrongType = run('( )', referenceDefinition, referenceResolver(siblingSelection))
    assert.equal(wrongType.content['unmarshall result'][0], 'error')
    assert.deepEqual(errors.Document(wrongType).__get_raw(), [])
})

test('cyclic references report missing lookup context', () => {
    const cyclic = { ...siblingSelection, type: ['cyclic', ['siblings', dictionaryDefinition]] }
    const result = run("'target'", referenceDefinition, referenceResolver(cyclic))
    const reported = errors.Document(result).__get_raw()
    assert.deepEqual(reported[0].type, ['no context lookup', null])
    assert.deepEqual(reported[0].severity, ['error', null])
})

test('cyclic sibling links allow self and mutual cycles, and report missing or unavailable targets', () => {
    const cyclic = { ...siblingSelection, type: ['cyclic', ['siblings', dictionaryDefinition]] }
    const resolver = ['dictionary', { ...dictionaryResolver[1], resolver: ['group', dict({
        ...raw(nodeResolver[1]),
        next: { definition: nodeDefinition[1], resolver: ['optional', {
            constraints: dict({}), resolver: referenceResolver(cyclic),
        }] },
    })] }]
    for (const source of [
        "{ a: ( label: 'A' next: * 'a' ) }",
        "{ a: ( label: 'A' next: * 'b' ) b: ( label: 'B' next: * 'a' ) }",
    ]) {
        const result = run(source, ['dictionary', dictionaryDefinition], resolver)
        const values = entries(result)
        assert.deepEqual(errors.Document(result).__get_raw(), [])
        const target = values.b ?? values.a
        assert.equal(next(values.a)['resolve status'][0], 'cyclic')
        assert.equal(interpret.Reference_Status(next(values.a)['resolve status'])[1], target)
        if (values.b) assert.equal(interpret.Reference_Status(next(values.b)['resolve status'])[1], values.a)
        assert.deepEqual(Object.keys(values), values.b ? ['a', 'b'] : ['a'])
    }
    for (const [source, expected] of [
        ["{ a: ( label: 'A' next: * 'absent' ) }", ['no such entry', 'absent']],
        ["{ a: ( label: 'A' next: * 'b' ) b }", ['entry unavailable', 'b']],
    ]) {
        const result = run(source, ['dictionary', dictionaryDefinition], resolver)
        assert.deepEqual(errors.Document(result).__get_raw()[0].type, expected)
    }
})

test('stack lookup parameters retain depth, select the closest frame, and diagnose absent context', () => {
    const target = entries(run("{ target: ( label: 'TARGET' next: _ ) }")).target
    const parent = entries(run("{ parent: ( label: 'PARENT' next: _ ) }")).parent
    const frames = lookup.stack.push(
        lookup.stack.push(lookup.stack.empty(), lookup.acyclic.from_resolved_dictionary(dict({ target: parent, parent }))),
        lookup.acyclic.from_resolved_dictionary(dict({ target })),
    )
    const selection = {
        type: ['parameter', { 'l id': 'frames', 'l entry': { type: ['stack', null] } }],
        'resulting dictionary': dictionaryDefinition,
    }
    const context = rootLookups()
    context.parameters.stack = generic.map_value_dictionary_to_generic_dictionary(dict({ frames: null }), () => ['resolved', frames])
    for (const [id, entry, depth] of [['target', target, 0], ['parent', parent, 1]]) {
        const result = run("'" + id + "'", referenceDefinition, referenceResolver(selection), context)
        assert.deepEqual(result.content['unmarshall result'][1][1][1]['resolve status'], ['resolved stack', { entry, depth }])
        assert.deepEqual(errors.Document(result).__get_raw(), [])
    }
    const absent = run("'absent'", referenceDefinition, referenceResolver(selection), context)
    assert.deepEqual(errors.Document(absent).__get_raw()[0].type, ['no context lookup', null])
})

test('reference constraints remain explicitly unsupported', () => {
    const constrained = referenceResolver(siblingSelection)
    constrained[1].type[1].constraints = dict({ check: null })
    for (const resolver of [constrained]) {
        const result = run("'target'", referenceDefinition, resolver)
        assert.deepEqual(result.content['unmarshall result'][1][1][1]['resolve status'], ['to be implemented', null])
        assert.deepEqual(errors.Document(result).__get_raw()[0].severity, ['hint', null])
    }
})

test('the actual YABNF document diagnoses terminal and cyclic nonterminal typos through nested calls', () => {
    const base = new URL('../../../../newstyle_projects/projects/yabnf/sketch/examples/', import.meta.url)
    const schema = schemaParser.Module_Specifier(p.literal.list(Array.from(
        readFileSync(new URL('.liana/schema.slna', base), 'utf8'), c => c.codePointAt(0),
    )), abort, { 'tab size': 4 })
    assert.equal(schema[0], 'constrained')
    const example = readFileSync(new URL('astn.yabnf.lna', base), 'utf8')
    assert.match(example, /'id': \| `terminal` '(Text|Texdt)'/)
    const source = example.replace(/('id': \| `terminal` )'(Text|Texdt)'/, "$1'Texdt'")
        .replace(/('value': \| `nonterminal` )'(Value|Valuke)'/, "$1'Valuke'")
    const definition = schema[1]['module resolver'].entry
    const input = unmarshal.Document(p.literal.list(Array.from(source, c => c.codePointAt(0))), abort, {
        module: definition.signature.module, 'tab size': 1,
    })
    const interpretDocument = document => interpret.Document(document, rootLookups(), {
        definition, resolvers: schema[1].resolver, 'module parameters': dict({}),
    })
    const result = interpretDocument(input)
    const reported = errors.Document(result).__get_raw()
    const missing = reported.find(error => error.type[0] === 'no such entry' && error.type[1] === 'Texdt')
    assert.ok(missing, JSON.stringify(reported))
    const offset = source.indexOf("'Texdt'")
    const before = source.slice(0, offset).split('\n')
    assert.deepEqual(missing.range.start.relative, { line: before.length - 1, column: before.at(-1).length })
    assert.deepEqual(missing.range.end.relative, { line: before.length - 1, column: before.at(-1).length + 7 })
    assert.ok(reported.some(e => e.type[0] === 'no such entry' && e.type[1] === 'Valuke'))
    assert.match(diagnostics.Document(result).__get_raw().find(d => d.message.includes('Texdt')).message, /No such dictionary entry/)
    const correctedInput = unmarshal.Document(p.literal.list(Array.from(source.replace("'Texdt'", "'Text'").replace("'Valuke'", "'Value'"), c => c.codePointAt(0))), abort, {
        module: definition.signature.module, 'tab size': 1,
    })
    assert.deepEqual(errors.Document(interpretDocument(correctedInput)).__get_raw(), [])
})

test('primitive documents retain their original unmarshalled values', () => {
    const result = run("'plain text'", text, ['text', null])
    assert.equal(result.content.unmarshalled, result.unmarshalled.content)
    assert.equal(result.content['unmarshall result'][1][1], result.unmarshalled.content['unmarshall result'][1][1])
    assert.deepEqual(diagnostics.Document(result).__get_raw(), [])
})
