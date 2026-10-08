import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import * as unmarshal from '../lib/dist/schemas/unmarshall_result/refiners/list_of_characters.js'
import * as interpret from '../lib/dist/schemas/unmarshall_result/transformers/resolve_result.js'
import * as errors from '../lib/dist/schemas/resolve_result/transformers/resolve_errors.js'
import * as diagnostics from '../lib/dist/schemas/resolve_result/transformers/diagnostics.js'
import * as completions from '../lib/dist/schemas/resolve_result/transformers/completion_suggestions.js'

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
function run(source, definition = ['dictionary', dictionaryDefinition], resolver = dictionaryResolver, lookups = rootLookups(), parameters = dict({}), modules = dict({})) {
    const input = unmarshal.Document(p.literal.list(Array.from(source, c => c.codePointAt(0))), abort, {
        module: { 'root value': definition }, 'tab size': 4,
    })
    return interpret.Document(input, lookups, {
        definition: { 'root value resolver': resolver }, resolvers: { modules },
        'module parameters': parameters,
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

const completeAt = (result, source, token) => {
    const offset = source.indexOf(token)
    assert.ok(offset >= 0)
    const before = source.slice(0, offset + 1).split('\n')
    return completions.Document(result, {
        position: { line: before.length - 1, character: before.at(-1).length },
        indent: '    ', style: ['verbose', null],
    }).__get_raw()[0]
}

test('instance completion suggests dictionary identifiers and replaces the complete reference token', () => {
    for (const token of ["'absent'", "''", '#']) {
        const source = "{ a: ( label: 'A' next: * " + token + " ) 'ID Value Pairs': ( label: 'B' next: _ ) }"
        const result = run(source)
        const suggestions = completeAt(result, source, token)
        assert.deepEqual(suggestions.type, ['reference', null])
        assert.deepEqual(suggestions.suggestions.__get_raw().map(s => s.label).sort(), ['ID Value Pairs', 'a'])
        const replacement = suggestions.suggestions.__get_raw().find(s => s.label === 'ID Value Pairs')
        assert.equal(replacement['insert lines'].__get_raw().join('\n'), "'ID Value Pairs'")
        assert.equal(suggestions['replace range'].start.character, source.indexOf(token))
        assert.equal(suggestions['replace range'].end.character, source.indexOf(token) + token.length)
        const range = suggestions['replace range']
        const corrected = source.slice(0, range.start.character) + replacement['insert lines'].__get_raw().join('\n') + source.slice(range.end.character)
        assert.deepEqual(errors.Document(run(corrected)).__get_raw(), [])
    }
})

test('reference completion serializes special identifiers as literal ASTN values', () => {
    const source = `{ a: ( label: 'A' next: * 'absent' )
        "O'Brien": ( label: 'B' next: _ )
        '$0': ( label: 'C' next: _ )
        '__proto__': ( label: 'D' next: _ )
        'constructor': ( label: 'E' next: _ ) }`
    const result = run(source)
    const completion = completeAt(result, source, "'absent'")
    for (const id of ["O'Brien", '$0', '__proto__', 'constructor']) {
        const item = completion.suggestions.__get_raw().find(item => item.label === id)
        assert.ok(item, id)
        const corrected = source.replace("'absent'", item['insert lines'].__get_raw().join('\n'))
        const resolved = run(corrected)
        const values = entries(resolved)
        assert.equal(next(values.a)['resolve status'][1], values[id])
        assert.deepEqual(errors.Document(resolved).__get_raw(), [])
    }
})

test('instance completion preserves structural completions and handles absent reference contexts', () => {
    const missingText = run('#', text, ['text', null])
    assert.deepEqual(completeAt(missingText, '#', '#').type, ['missing value', null])
    const selection = { type: ['parameter', { 'l id': 'missing', 'l entry': { type: ['acyclic', null] } }] }
    const reference = run("'absent'", referenceDefinition, referenceResolver(selection))
    const suggestions = completeAt(reference, "'absent'", "'absent'")
    assert.deepEqual(suggestions.type, ['reference', null])
    assert.deepEqual(suggestions.suggestions.__get_raw(), [])
    assert.deepEqual(errors.Document(reference).__get_raw()[0].type, ['no context lookup', null])
})

test('stack reference completion deduplicates names while preserving closest-frame priority', () => {
    const target = entries(run("{ target: ( label: 'TARGET' next: _ ) }")).target
    const parent = {
        ...lookup.acyclic.from_resolved_dictionary(dict({ target })),
        identifiers: () => p.literal.list(['target', '__proto__']),
    }
    const frame = {
        ...lookup.acyclic.from_resolved_dictionary(dict({ target })),
        identifiers: () => p.literal.list(['target', '__proto__']),
    }
    const context = rootLookups()
    context.parameters.stack = generic.map_value_dictionary_to_generic_dictionary(dict({ frames: null }), () => ['resolved', {
        ...lookup.stack.push(lookup.stack.push(lookup.stack.empty(), parent), frame),
        identifiers: () => p.literal.list(['target', '__proto__', 'target', '__proto__']),
    }])
    const result = run("'target'", referenceDefinition, referenceResolver({
        type: ['parameter', { 'l id': 'frames', 'l entry': { type: ['stack', null] } }],
    }), context)
    assert.deepEqual(completeAt(result, "'target'", "'target'").suggestions.__get_raw().map(item => item.label), ['target', '__proto__'])
})

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
        const diagnostic = diagnostics.Document(result).__get_raw()[0]
        assert.deepEqual(diagnostic.severity, ['warning', null])
        assert.match(diagnostic.message, /target could not be unmarshalled or has no value/)
    }
    const wrongType = run('( )', referenceDefinition, referenceResolver(siblingSelection))
    assert.equal(wrongType.content['unmarshall result'][0], 'error')
    assert.deepEqual(errors.Document(wrongType).__get_raw(), [])
})

test('unavailable lookup warnings distinguish selection failures from missing implementations', () => {
    const selection = {
        type: ['parameter', { 'l id': 'names', 'l entry': { type: ['acyclic', null] } }],
    }
    for (const [failure, cause, message] of [
        [['selection unavailable', null], 'selection unavailable', /lookup context could not be selected/],
        [['to be implemented', null], 'missing implementation', /interpreter has not implemented/],
    ]) {
        const context = rootLookups()
        context.parameters.acyclic = generic.map_value_dictionary_to_generic_dictionary(dict({ names: null }), () => failure)
        const result = run("'target'", referenceDefinition, referenceResolver(selection), context)
        const diagnostic = errors.Document(result).__get_raw()[0]
        assert.deepEqual(diagnostic.type, ['lookup unavailable', { id: 'target', cause }])
        assert.deepEqual(diagnostic.severity, [cause === 'missing implementation' ? 'hint' : 'warning', null])
        assert.match(diagnostics.Document(result).__get_raw()[0].message, message)
    }
    const missingSelection = {
        type: ['acyclic', ['resolved dictionary', {
            selection: { start: ['list cursor', null], tail: { path: { 'l value': p.literal.list([]) } } },
        }]],
    }
    const result = run("'target'", referenceDefinition, referenceResolver(missingSelection))
    assert.deepEqual(errors.Document(result).__get_raw()[0].type,
        ['lookup unavailable', { id: 'target', cause: 'missing implementation' }])
    assert.deepEqual(errors.Document(result).__get_raw()[0].severity, ['hint', null])
    assert.match(diagnostics.Document(result).__get_raw()[0].message, /interpreter has not implemented/)
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

test('dereferencing a cyclic sibling before dictionary resolution reports premature access explicitly', () => {
    const entry = entries(run("{ target: ( label: 'TARGET' next: _ ) }")).target
    let premature
    p.from.dictionary(dict({ target: null })).resolve((value, id, acyclic, cyclic) => {
        const result = run("'" + id + "'", referenceDefinition,
            referenceResolver({ type: ['cyclic', ['siblings', dictionaryDefinition]] }),
            { ...rootLookups(), siblings: { acyclic, cyclic } })
        premature = interpret.Reference_Status(result.content['unmarshall result'][1][1][1]['resolve status'])
        return entry
    })
    assert.deepEqual(premature, ['premature cyclic access', null])
})

test('reference constraints assert optional values and dependent states, preserving target identity', () => {
    const stateDefinition = ['state', { options: dict({
        yes: { value: text, description: none(), constraints: none() },
        no: { value: text, description: none(), constraints: none() },
    }), results: none() }]
    const stateResolver = ['state', { definition: stateDefinition[1], options: dict({
        yes: { constraints: dict({}), resolver: ['text', null] },
        no: { constraints: dict({}), resolver: ['text', null] },
    }) }]
    const targetDefinition = ['optional', stateDefinition]
    const targetResolver = ['optional', { constraints: dict({}), resolver: stateResolver }]
    const relative = { path: { 'l value': p.literal.list([]) } }
    const constraints = dict({
        state: { start: ['sibling', { 'l id': 'present' }], constraint: {
            selection: relative, type: ['state', { option: { 'l id': 'yes' } }],
        } },
        present: { start: ['value', null], constraint: { selection: relative, type: ['optional value', {}] } },
    })
    for (const [source, expected] of [["* | yes 'ok'", null], ["* | no 'bad'", 'unexpected state'], ['_', 'not set']]) {
        const target = run(source, targetDefinition, targetResolver).content
        const entry = { 'unmarshall result': ['success', { value: ['set', target] }] }
        const context = rootLookups()
        context.parameters.acyclic = generic.map_value_dictionary_to_generic_dictionary(dict({ names: null }),
            () => ['resolved', lookup.acyclic.from_resolved_dictionary(dict({ target: entry }))])
        const resolver = referenceResolver({ type: ['parameter', { 'l id': 'names', 'l entry': { type: ['acyclic', null] } }] })
        resolver[1].type[1].constraints = constraints
        const result = run("'target'", referenceDefinition, resolver, context)
        assert.equal(result.content['unmarshall result'][1][1][1]['resolve status'][1], entry)
        const values = raw(result.content.constraints.get_circular_dependent())
        assert.equal(values.state[0], expected ?? 'resolved')
        if (expected === null) assert.deepEqual(errors.Document(result).__get_raw(), [])
        else {
            assert.ok(errors.Document(result).__get_raw().every(error => error.severity[0] === 'error'))
            assert.deepEqual(errors.Document(result).__get_raw()[0].range.start.relative, { line: 0, column: 0 })
        }
        if (expected === 'unexpected state') assert.match(diagnostics.Document(result).__get_raw()[0].message, /Expected state "yes".*found "no"/)
        assert.deepEqual(Object.keys(values), ['present', 'state'])
        const missing = run("'absent'", referenceDefinition, resolver, context)
        assert.deepEqual(errors.Document(missing).__get_raw().map(error => error.type), [['no such entry', 'absent']])
    }
    const cycle = interpret.Resolver_Value_Constraints(dict({
        a: { start: ['sibling', { 'l id': 'b' }], constraint: { selection: relative, type: ['optional value', {}] } },
        b: { start: ['sibling', { 'l id': 'a' }], constraint: { selection: relative, type: ['optional value', {}] } },
    }), ['selection unavailable', null])
    assert.equal(raw(cycle).a[0], 'cycle detected')
})

test('derived references and reference-selection tails retain actual values and report failures', () => {
    const definition = ['reference', { ...referenceDefinition[1], type: ['derived', null] }]
    const target = run("'target'", ['text', null], ['text', null]).content
    const selection = { start: ['parameter', { 'l id': 'value' }], tail: { path: { 'l value': p.literal.list([]) } } }
    const resolver = ['reference', { definition: definition[1], type: ['derived', { value: selection }] }]
    const result = run('~', definition, resolver, rootLookups(), dict({ value: ['resolved', target] }))
    assert.equal(result.content['unmarshall result'][1][1][1]['resolve status'][1], target)
    assert.deepEqual(errors.Document(result).__get_raw(), [])
    const tail = { ...selection, tail: { path: { 'l value': p.literal.list([{ 'l item': ['reference', { definition: definition[1] }] }]) } } }
    assert.equal(interpret.Resolver_Guaranteed_Value_Selection(tail, rootLookups(), dict({ value: ['resolved', result.content] }))[1], target)
    for (const [parameters, expected] of [
        [dict({}), 'no context lookup'],
        [dict({ value: ['not set', null] }), 'optional value not set'],
        [dict({ value: ['selection unavailable', null] }), 'selection unavailable'],
        [dict({ value: ['to be implemented', null] }), 'to be implemented'],
    ]) {
        const failed = run('~', definition, resolver, rootLookups(), parameters)
        const diagnostic = errors.Document(failed).__get_raw()[0]
        assert.equal(diagnostic.type[0], expected)
        assert.deepEqual(diagnostic.range.start.relative, { line: 0, column: 0 })
        assert.deepEqual(diagnostic.severity, [
            expected === 'to be implemented' ? 'hint' : expected === 'selection unavailable' ? 'warning' : 'error', null,
        ])
    }
    const entry = entries(run("{ target: ( label: 'TARGET' next: _ ) }")).target
    const lookupContext = rootLookups()
    lookupContext.parameters.acyclic = generic.map_value_dictionary_to_generic_dictionary(dict({ names: null }),
        () => ['resolved', lookup.acyclic.from_resolved_dictionary(dict({ target: entry }))])
    const reference = run("'target'", referenceDefinition, referenceResolver({
        type: ['parameter', { 'l id': 'names', 'l entry': { type: ['acyclic', null] } }],
    }), lookupContext)
    const traversed = interpret.Resolver_Guaranteed_Value_Selection(tail, rootLookups(), dict({ value: ['resolved', reference.content] }))
    assert.equal(traversed[1], entry['unmarshall result'][1].value[1])
})

test('state option constraints supply selected payloads to the child and diagnose state mismatches', () => {
    const derived = ['reference', { referent: null, type: ['derived', null] }]
    const sourceState = ['state', { options: dict({
        yes: { value: text, description: none(), constraints: none() },
        no: { value: text, description: none(), constraints: none() },
    }), results: none() }]
    const sourceResolver = ['state', { definition: sourceState[1], options: dict({
        yes: { constraints: dict({}), resolver: ['text', null] },
        no: { constraints: dict({}), resolver: ['text', null] },
    }) }]
    const definition = ['state', { options: dict({ go: { value: derived, description: none(), constraints: none() } }), results: none() }]
    const emptyTail = { path: { 'l value': p.literal.list([]) } }
    const resolver = ['state', { definition: definition[1], options: dict({
        go: {
            constraints: dict({ match: ['state', {
                selection: { start: ['parameter', { 'l id': 'source' }], tail: emptyTail },
                option: { 'l id': 'yes' },
            }] }),
            resolver: ['reference', { definition: derived[1], type: ['derived', {
                value: { start: ['option constraint', { 'l id': 'match' }], tail: emptyTail },
            }] }],
        },
    }) }]
    for (const [input, expected] of [["| yes 'target'", 'resolved'], ["| no 'target'", 'unexpected state']]) {
        const target = run(input, sourceState, sourceResolver).content
        const result = run('| go ~', definition, resolver, rootLookups(), dict({ source: ['resolved', target] }))
        const resolvedState = result.content['unmarshall result'][1][1]
        const status = raw(resolvedState.constraints).match
        assert.equal(status[0], expected)
        const child = resolvedState.option.__get_raw()[0]
        assert.equal(child['unmarshall result'][1][1][1]['resolve status'], status)
        if (expected === 'resolved') assert.deepEqual(errors.Document(result).__get_raw(), [])
        else assert.ok(errors.Document(result).__get_raw().some(error => error.type[0] === expected))
    }
})

test('component constraint selections expose the asserted payload to sibling properties', () => {
    const optional = ['optional', text]
    const component = ['component', { type: ['internal', {
        'l id': 'Target', 'l entry': { get_circular_dependent: () => ({ 'root value': optional }) },
    }] }]
    const derived = ['reference', { referent: null, type: ['derived', null] }]
    const definition = ['group', dict({
        target: { value: component, description: none() },
        payload: { value: derived, description: none() },
    })]
    const relative = { path: { 'l value': p.literal.list([]) } }
    const resolver = ['group', dict({
        target: { definition: definition[1], resolver: ['component', {
            location: ['internal', { 'l id': 'Target' }], arguments: none(),
            constraints: dict({ present: {
                start: ['value', null], constraint: { selection: relative, type: ['optional value', {}] },
            } }),
        }] },
        payload: { definition: definition[1], resolver: ['reference', {
            definition: derived[1], type: ['derived', {
                value: { start: ['constraint', ['component', {
                    property: { 'l id': 'target' }, constraint: { 'l id': 'present' },
                }]], tail: relative },
            }],
        }] },
    })]
    const result = run("( target: * 'actual' payload: ~ )", definition, resolver, rootLookups(), dict({}), dict({
        Target: { 'root value resolver': ['optional', { constraints: dict({}), resolver: ['text', null] }] },
    }))
    assert.deepEqual(errors.Document(result).__get_raw(), [])
    const props = raw(result.content['unmarshall result'][1][1].properties)
    const target = props.target['unmarshall result'][1].resolved
    const payload = props.payload['unmarshall result'][1].resolved
    assert.equal(payload['unmarshall result'][1][1][1]['resolve status'][1], raw(target.constraints.get_circular_dependent()).present[1])
})

test('optional option constraints assert a parameter only when the child is set', () => {
    const definition = ['optional', text]
    const resolver = ['optional', {
        constraints: dict({ source: ['assert is set', ['parameter', { 'l id': 'source' }]] }),
        resolver: ['text', null],
    }]
    const unset = run('_', definition, resolver)
    assert.deepEqual(errors.Document(unset).__get_raw(), [])
    const missing = run("* 'child'", definition, resolver, rootLookups(), dict({ source: ['not set', null] }))
    assert.deepEqual(errors.Document(missing).__get_raw().map(error => error.type[0]), ['optional value not set'])
    const target = run("'target'", text, ['text', null]).content
    const result = run("* 'child'", definition, resolver, rootLookups(), dict({ source: ['resolved', target] }))
    assert.deepEqual(errors.Document(result).__get_raw(), [])
    assert.equal(raw(result.content['unmarshall result'][1][1].constraints).source[1], target)
})

test('option constraints resolve dependent names in dependency order and diagnose cycles', () => {
    const inner = ['state', { options: dict({ yes: { value: text, description: none(), constraints: none() } }), results: none() }]
    const innerResolver = ['state', { definition: inner[1], options: dict({ yes: { constraints: dict({}), resolver: ['text', null] } }) }]
    const outer = ['state', { options: dict({ yes: { value: inner, description: none(), constraints: none() } }), results: none() }]
    const outerResolver = ['state', { definition: outer[1], options: dict({ yes: { constraints: dict({}), resolver: innerResolver } }) }]
    const target = run("| yes | yes 'payload'", outer, outerResolver).content
    const tail = { path: { 'l value': p.literal.list([]) } }
    const assertState = start => ['state', { selection: { start, tail }, option: { 'l id': 'yes' } }]
    const definition = ['optional', text]
    const resolver = ['optional', {
        constraints: dict({
            second: assertState(['option constraint', { 'l id': 'first' }]),
            first: assertState(['parameter', { 'l id': 'source' }]),
        }),
        resolver: ['text', null],
    }]
    const result = run("* 'child'", definition, resolver, rootLookups(), dict({ source: ['resolved', target] }))
    assert.deepEqual(errors.Document(result).__get_raw(), [])
    const statuses = raw(result.content['unmarshall result'][1][1].constraints)
    assert.deepEqual(Object.keys(statuses), ['first', 'second'])
    assert.equal(statuses.second[1]['unmarshall result'][1][1].value, 'payload')
    resolver[1].constraints = dict({
        first: assertState(['option constraint', { 'l id': 'second' }]),
        second: assertState(['option constraint', { 'l id': 'first' }]),
    })
    const cycle = run("* 'child'", definition, resolver)
    assert.ok(errors.Document(cycle).__get_raw().every(error => error.type[0] === 'cycle detected'))
    assert.equal(errors.Document(cycle).__get_raw().length, 2)
})

test('optional value initialization distinguishes absence, explicit selection, and forwarded absence', () => {
    const target = run("'target'", ['text', null], ['text', null]).content
    const context = rootLookups()
    const parameters = dict({ value: ['resolved', target], absent: ['not set', null] })
    assert.deepEqual(interpret.Resolver_Optional_Value_Initialization(['not set', null], context, parameters), ['not set', null])
    const selection = { start: ['parameter', { 'l id': 'value' }], tail: { path: { 'l value': p.literal.list([]) } } }
    assert.equal(interpret.Resolver_Optional_Value_Initialization(['set', selection], context, parameters)[1], target)
    assert.deepEqual(interpret.Resolver_Optional_Value_Initialization(['selection', ['parameter', { 'l id': 'absent' }]], context, parameters), ['not set', null])
    assert.deepEqual(interpret.Resolver_Optional_Value_Initialization(['selection', ['parameter', { 'l id': 'missing' }]], context, parameters), ['not found because of root', null])
})

test('component calls push stack frames and forward lookup arguments across nested calls', () => {
    const context = rootLookups()
    const parameters = dict({ source: ['resolved', run("{ target: ( label: 'TARGET' next: _ ) }").content] })
    const parameter = (id, kind) => ({ type: ['parameter', { 'l id': id, 'l entry': { type: [kind, null] } }] })
    const component = (id, definition, arguments_) => ({
        definition: ['component', { type: ['internal', { 'l id': id, 'l entry': { get_circular_dependent: () => ({ 'root value': definition }) } }] }],
        resolver: ['component', {
            location: ['internal', { 'l id': id }], arguments: p.literal.set(arguments_), constraints: dict({}),
        }],
    })
    const inner = component('inner', referenceDefinition, {
        modules: none(), lookups: p.literal.set(dict({ frames: ['selection', parameter('frames', 'stack')] })),
    })
    const outer = component('outer', inner.definition, {
        modules: none(), lookups: p.literal.set(dict({
            frames: ['stack', ['push', {
                stack: parameter('initial', 'stack'),
                item: { type: ['acyclic', ['resolved dictionary', {
                    selection: { start: ['parameter', { 'l id': 'source' }], tail: { path: { 'l value': p.literal.list([]) } } },
                }]] },
            }]],
        })),
    })
    context.parameters.stack = generic.map_value_dictionary_to_generic_dictionary(dict({ initial: null }),
        () => ['resolved', lookup.stack.empty()])
    const modules = dict({
        outer: { 'root value resolver': inner.resolver },
        inner: { 'root value resolver': referenceResolver(parameter('frames', 'stack')) },
    })
    const result = run("'target'", outer.definition, outer.resolver, context, parameters, modules)
    assert.deepEqual(errors.Document(result).__get_raw(), [])
    const value = result.content['unmarshall result'][1][1].value['unmarshall result'][1][1].value
    const status = value['unmarshall result'][1][1][1]['resolve status']
    assert.equal(status[0], 'resolved stack')
    assert.equal(status[1].depth, 0)
    assert.equal(status[1].entry, entries({ content: parameters.__get_raw()[0][1][1] }).target)
    assert.deepEqual(completeAt(result, "'target'", "'target'").suggestions.__get_raw().map(s => s.label), ['target'])
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
    assert.ok(completeAt(result, source, "'Texdt'").suggestions.__get_raw().some(s => s.label === 'Text'))
    assert.ok(completeAt(result, source, "'Valuke'").suggestions.__get_raw().some(s => s.label === 'Value'))
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

const relative = (...steps) => ({ path: { 'l value': p.literal.list(steps.map(step => ({ 'l item': step }))) } })
const parameterSelection = id => ({ start: ['parameter', { 'l id': id }], tail: relative() })
const previousSelection = (initial, ...steps) => ({ start: ['previous item', { initial }], tail: relative(...steps) })
const derivedDefinition = ['reference', { referent: null, type: ['derived', null] }]
const derivedResolver = value => ['reference', { definition: derivedDefinition[1], type: ['derived', { value }] }]
const resolvedItems = result => result.content['unmarshall result'][1][1].items.__get_raw()
const derivedStatus = value => value['unmarshall result'][1][1][1]['resolve status']

test('previous item selects resolved output and handles zero, one and multiple items', () => {
    const target = run("'initial'", text, ['text', null]).content
    const definition = ['list', { value: derivedDefinition, result: none() }]
    const resolver = ['list', { definition: definition[1], resolver: derivedResolver(previousSelection(parameterSelection('initial'))) }]
    for (const source of ['[]', '[ ~ ]', '[ ~ ~ ~ ]']) {
        const result = run(source, definition, resolver, rootLookups(), dict({ initial: ['resolved', target] }))
        assert.deepEqual(errors.Document(result).__get_raw(), [])
        const items = resolvedItems(result)
        let previous = target
        for (const item of items) {
            assert.equal(derivedStatus(item)[1], previous)
            assert.notEqual(derivedStatus(item)[1], previous.unmarshalled)
            previous = item
        }
    }
})

test('previous item bypasses the outer tail for its initial selection and propagates failure', () => {
    const target = run("'initial'", text, ['text', null]).content
    const definition = ['list', { value: derivedDefinition, result: none() }]
    const resolver = ['list', { definition: definition[1], resolver: derivedResolver(
        previousSelection(parameterSelection('initial'), ['reference', {}]),
    ) }]
    const parameters = dict({ initial: ['resolved', target] })
    const result = run('[ ~ ~ ~ ]', definition, resolver, rootLookups(), parameters)
    assert.deepEqual(errors.Document(result).__get_raw(), [])
    assert.ok(resolvedItems(result).every(item => derivedStatus(item)[1] === target))
    const failed = run('[ ~ ~ ]', definition, resolver, rootLookups(), dict({ initial: ['not set', null] }))
    assert.deepEqual(resolvedItems(failed).map(derivedStatus), [['not set', null], ['not set', null]])
    assert.equal(errors.Document(failed).__get_raw().length, 2)
    const unavailable = interpret.Resolver_Guaranteed_Value_Selection(
        previousSelection(parameterSelection('initial'), ['component', null]),
        { ...rootLookups(), 'previous item': target }, parameters,
    )
    assert.deepEqual(unavailable, ['selection unavailable', null])
    assert.deepEqual(interpret.Resolver_Guaranteed_Value_Selection(
        previousSelection(parameterSelection('initial')), rootLookups(), parameters,
    ), ['selection unavailable', null])
})

test('nested lists keep independent previous-item scopes', () => {
    const target = run("'initial'", text, ['text', null]).content
    const inner = ['list', { value: derivedDefinition, result: none() }]
    const innerResolver = ['list', { definition: inner[1], resolver: derivedResolver(previousSelection(parameterSelection('initial'))) }]
    const outer = ['list', { value: inner, result: none() }]
    const result = run('[ [ ~ ~ ] [] [ ~ ~ ] ]', outer,
        ['list', { definition: outer[1], resolver: innerResolver }], rootLookups(), dict({ initial: ['resolved', target] }))
    assert.deepEqual(errors.Document(result).__get_raw(), [])
    const lists = resolvedItems(result)
    assert.equal(lists[1]['unmarshall result'][1][1].items.__get_raw().length, 0)
    for (const list of [lists[0], lists[2]]) {
        const items = list['unmarshall result'][1][1].items.__get_raw()
        assert.equal(derivedStatus(items[0])[1], target)
        assert.equal(derivedStatus(items[1])[1], items[0])
    }
})

test('last item selects resolved output and uses an untraversed sibling initial only for empty lists', () => {
    const listDefinition = ['list', { value: text, result: none() }]
    const definition = ['group', dict({
        initial: { value: text, description: none() },
        items: { value: listDefinition, description: none() },
        last: { value: derivedDefinition, description: none() },
    })]
    const resolver = ['group', dict({
        last: { definition: definition[1], resolver: derivedResolver({
            start: ['last item', { property: { 'l id': 'items' },
                initial: { start: ['sibling', { 'l id': 'initial' }], tail: relative() } }],
            tail: relative(),
        }) },
        items: { definition: definition[1], resolver: ['list', { definition: listDefinition[1], resolver: ['text', null] }] },
        initial: { definition: definition[1], resolver: ['text', null] },
    })]
    for (const source of ["( initial: 'fallback' items: [] last: ~ )", "( initial: 'fallback' items: [ 'one' 'two' ] last: ~ )"]) {
        const result = run(source, definition, resolver)
        assert.deepEqual(errors.Document(result).__get_raw(), [])
        const properties = raw(result.content['unmarshall result'][1][1].properties)
        const initial = properties.initial['unmarshall result'][1].resolved
        const items = properties.items['unmarshall result'][1].resolved['unmarshall result'][1][1].items.__get_raw()
        const last = properties.last['unmarshall result'][1].resolved
        assert.equal(derivedStatus(last)[1], items.at(-1) ?? initial)
        const context = { ...rootLookups(), group: { properties: lookup.acyclic.from_resolved_dictionary(dict(properties)), parent: null } }
        const selection = { start: ['last item', { property: { 'l id': 'items' }, initial: parameterSelection('initial') }],
            tail: relative(['component', null]) }
        const status = interpret.Resolver_Guaranteed_Value_Selection(selection, context, dict({ initial: ['resolved', initial] }))
        assert.deepEqual(status, items.length === 0 ? ['resolved', initial] : ['selection unavailable', null])
    }
})

test('SQL list paths resolve and complete against the previous resolved foreign-key field', () => {
    const base = new URL('../../../../newstyle_projects/projects/sql_query/sketch/transformers/sql_sketch/tests/fixtures/', import.meta.url)
    const schema = schemaParser.Module_Specifier(p.literal.list(Array.from(
        readFileSync(new URL('.liana/schema.slna', base), 'utf8'), c => c.codePointAt(0),
    )), abort, { 'tab size': 4 })
    const definition = schema[1]['module resolver'].entry
    const resolve = source => {
        const input = unmarshal.Document(p.literal.list(Array.from(source, c => c.codePointAt(0))), abort, {
            module: definition.signature.module, 'tab size': 4,
        })
        return interpret.Document(input, rootLookups(), { definition, resolvers: schema[1].resolver, 'module parameters': dict({}) })
    }
    const source = readFileSync(new URL('../../../../examples/orders.sq.lna', base), 'utf8')
    assert.deepEqual(errors.Document(resolve(source)).__get_raw(), [])
    for (const [path, expected] of [
        ["( `head`: 'absent' `tail`: [  ] )", ['customer_id', 'id', 'total']],
        ["( `head`: 'customer_id' `tail`: [ 'absent' ] )", ['country_id', 'id', 'name']],
        ["( `head`: 'customer_id' `tail`: [ 'country_id' 'absent' ] )", ['id', 'name']],
    ]) {
        const modified = source.replace("( `head`: 'customer_id' `tail`: [ 'country_id' 'name' ] )", path)
        assert.notEqual(modified, source)
        const result = resolve(modified)
        assert.deepEqual(completeAt(result, modified, "'absent'").suggestions.__get_raw().map(item => item.label).sort(), expected)
    }
    const invalid = source.replace("( `head`: 'customer_id' `tail`: [ 'country_id' 'name' ] )", "( `head`: 'customer_id' `tail`: [ 'name' 'id' ] )")
    const reported = errors.Document(resolve(invalid)).__get_raw()
    assert.deepEqual(reported.map(error => error.type), [['unexpected state', { expected: 'reference', actual: 'value' }]])
    assert.match(diagnostics.Document(resolve(invalid)).__get_raw()[0].message, /Expected state "reference".*found "value"/)
    const offset = invalid.indexOf("'id'", invalid.indexOf("( `head`: 'customer_id' `tail`: [ 'name' 'id' ] )"))
    assert.equal(reported[0].range.start.absolute, offset)
    const foreignKeyFinal = source.replace("( `head`: 'customer_id' `tail`: [ 'country_id' 'name' ] )", "( `head`: 'customer_id' `tail`: [ 'country_id' ] )")
    assert.deepEqual(errors.Document(resolve(foreignKeyFinal)).__get_raw(), [])
    const scalarHead = source.replace("( `head`: 'customer_id' `tail`: [ 'country_id' 'name' ] )", "( `head`: 'total' `tail`: [ 'id' ] )")
    assert.deepEqual(errors.Document(resolve(scalarHead)).__get_raw().map(error => error.type),
        [['unexpected state', { expected: 'reference', actual: 'value' }]])
    const direct = source.replace("( `head`: 'customer_id' `tail`: [ 'country_id' 'name' ] )", "( `head`: 'total' `tail`: [] )")
    assert.deepEqual(errors.Document(resolve(direct)).__get_raw(), [])
})

test('schema resolution rejects a previous-item initial selection with an incompatible type', () => {
    const path = new URL('../../../../newstyle_projects/projects/sql_query/sketch/transformers/sql_sketch/typescript/schemas/input.slna', import.meta.url)
    const source = readFileSync(path, 'utf8')
    const initial = /(`start`:\s*\|\s*`previous item`\s*\(\s*`initial`:\s*\(\s*`start`:\s*\|\s*)`sibling`\s*'head'(\s*`tail`:\s*\(\s*`path`:\s*)\[[^\]]*\]/
    assert.match(source, initial)
    const invalid = source.replace(initial, "$1`parameter` 'table'$2[ ]")
    assert.throws(() => schemaParser.Module_Specifier(
        p.literal.list(Array.from(invalid, c => c.codePointAt(0))), abort, { 'tab size': 4 },
    ), error => JSON.stringify(error).includes('initial selection data type'))
})
