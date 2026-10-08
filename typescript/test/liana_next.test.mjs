import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import test from 'node:test'
import * as unmarshal from '../lib/dist/schemas/unmarshall_result/refiners/list_of_characters.js'
import * as errors from '../lib/dist/schemas/unmarshall_result/transformers/unmarshall_errors.js'

const require = createRequire(new URL('../lib/package.json', import.meta.url))
const p = await import(require.resolve('pareto-core/transformer'))
const parser = await import(require.resolve('pareto-liana/schemas/temp_module_specifier/refiners/list_of_characters'))
const base = new URL('../../../../newstyle_projects/projects/liana_next/sketch/', import.meta.url)
const chars = source => p.literal.list(Array.from(source, c => c.codePointAt(0)))
const abort = error => { throw error }
const schema = parser.Module_Specifier(chars(readFileSync(new URL('examples/.liana/schema.slna', base), 'utf8')), abort, { 'tab size': 4 })
assert.equal(schema[0], 'unconstrained')
const parse = source => unmarshal.Document(chars(source), abort, { module: schema[1].module.entry, 'tab size': 4 })
const entry = (dictionary, name) => p.from.dictionary(dictionary).get_possible_entry(name, value => value, () => assert.fail(name))
const rootType = schema[1].module.entry
const expand = value => value[0] === 'component' ? value[1].type[1]['l entry'].get_circular_dependent()['root value'] : value
const branchValue = definition => {
    const types = expand(entry(definition['root value'][1], 'types').value)
    const type = expand(types[1].value)
    return expand(entry(type[1], 'root value').value)
}
const unmarshalled = value => {
    assert.equal(value['unmarshall result'][0], 'success')
    const result = value['unmarshall result'][1]
    return result[0] === 'component' ? unmarshalled(result[1].value) : result
}
const property = (value, name) => {
    const group = unmarshalled(value)
    assert.equal(group[0], 'group')
    const result = entry(group[1].derived.properties, name).result
    assert.equal(result[0], 'success')
    return result[1]
}
const dictionary = value => {
    const result = unmarshalled(value)
    assert.equal(result[0], 'dictionary')
    return result[1].derived.entries.__get_raw().map(([id, entry]) => {
        assert.equal(entry.result[0], 'success')
        assert.equal(entry.result[1].value[0], 'set')
        return [id, entry.result[1].value[1]]
    })
}
const selectedState = value => {
    const result = unmarshalled(value)
    assert.equal(result[0], 'state')
    assert.equal(result[1].derived['option status'][0], 'set')
    return result[1].derived['option status'][1]
}
const referenceId = value => {
    const result = unmarshalled(value)
    assert.equal(result[0], 'reference')
    assert.equal(result[1].type[0], 'selected')
    return result[1].type[1].intermediate.instance.token.value
}
const snapshot = (value, legacy = false) => {
    const [kind, data] = unmarshalled(value)
    switch (kind) {
        case 'group': return ['group', data.derived.properties.__get_raw().flatMap(([id, item]) => {
            assert.equal(item.result[0], 'success')
            const result = unmarshalled(item.result[1])
            if (legacy && result[0] === 'reference' && result[1].type[0] === 'derived') return []
            const key = legacy ? ({ module: 'type', modules: 'types', 'resulting module': 'resulting type' }[id] ?? id) : id
            return [[key, snapshot(item.result[1], legacy)]]
        })]
        case 'dictionary': return ['dictionary', dictionary(value).map(([id, item]) => [id, snapshot(item, legacy)])]
        case 'list': return ['list', data.derived.items.__get_raw().map(item => snapshot(item, legacy))]
        case 'state': {
            const option = selectedState(value)
            return ['state', legacy && option.option === 'text' ? 'simple' : option.option, snapshot(option.value, legacy)]
        }
        case 'optional': return data.derived.status[0] === 'set'
            ? ['optional', snapshot(data.derived.status[1]['child value'], legacy)] : ['optional']
        case 'reference': return data.type[0] === 'derived' ? ['nothing'] : ['reference', referenceId(value)]
        case 'nothing': return ['nothing']
        case 'text':
        case 'simple': return [kind, data.instance.token.value]
        default: assert.fail(kind)
    }
}

const normalizeResolver = node => {
    if (!Array.isArray(node)) return node
    if (node[0] === 'state' && node[1] === 'with constraints') {
        const fields = node[2][1]
        const constraints = fields.find(([id]) => id === 'constraints')[1][1]
        const properties = fields.find(([id]) => id === 'resolver')[1][1]
        return normalizeResolver(['state', 'group', ['dictionary', [
            ...properties,
            ...constraints.map(([id, selection]) => [id, ['group', [
                ['resolver', ['state', 'reference', ['group', [
                    ['type', ['state', 'derived', ['group', [['value', selection]]]]],
                ]]]],
            ]]]),
        ]]])
    }
    if (node[0] === 'group' && node[1].some(([id, value]) =>
        id === 'start' && value[0] === 'state' && value[1] === 'metadata')) {
        return normalizeResolver(['group', node[1].map(([id, value]) => {
            if (id === 'start') return [id, ['state', 'sibling', ['reference', value[2][1]]]]
            if (id === 'tail') return [id, ['group', value[1].map(([key, list]) =>
                key === 'path' ? [key, ['list', [['state', 'reference', ['group', []]], ...list[1]]]] : [key, list])]]
            return [id, value]
        })])
    }
    if (node[0] === 'list') return ['list', node[1].flatMap(item =>
        item[0] === 'state' && item[1] === 'meta'
            ? [['state', 'group', ['reference', item[2][1]]], ['state', 'reference', ['group', []]]]
            : [normalizeResolver(item)])]
    if (node[0] === 'group' || node[0] === 'dictionary') return [node[0],
        node[1].map(([id, value]) => [id, normalizeResolver(value)]).sort(([a], [b]) => a.localeCompare(b))]
    return node.map(normalizeResolver)
}

const normalizedValue = (value, globals, semantic, legacy) => {
    const option = selectedState(value)
    const payload = option.value
    const recurse = item => normalizedValue(item, globals, semantic, legacy)
    const named = (dictionaryName, id) => {
        const item = dictionary(property(globals, dictionaryName)).find(([name]) => name === id)
        assert.ok(item, 'Unknown primitive: ' + id)
        return item[1]
    }
    switch (option.option) {
        case 'simple': {
            const id = referenceId(legacy ? selectedState(payload).value : payload)
            const flavor = selectedState(property(named('simple types', id), 'type'))
            return ['simple', flavor.option, snapshot(flavor.value)]
        }
        case 'text': {
            const text = selectedState(payload)
            return ['simple', 'text', snapshot(text.option === 'global' ? named('text types', referenceId(text.value)) : text.value)]
        }
        case 'reference': return semantic ? ['reference', snapshot(payload, legacy)]
            : selectedState(property(payload, 'type')).option === 'derived' ? ['nothing'] : ['simple', 'reference', ['nothing']]
        case 'nothing': return ['nothing']
        case 'component': {
            const location = selectedState(legacy || semantic ? property(payload, 'type') : payload)
            const kind = !semantic && location.option === 'internal acyclic' ? 'internal' : location.option
            const target = kind === 'external'
                ? [referenceId(property(location.value, 'import')), referenceId(property(location.value, legacy ? 'module' : 'type'))]
                : referenceId(location.value)
            return ['component', kind, target, semantic ? snapshot(property(payload, 'results'), legacy) : null]
        }
        case 'optional': return ['optional', recurse(payload)]
        case 'dictionary': return ['dictionary', recurse(property(payload, 'value'))]
        case 'list': return ['list', recurse(legacy || semantic ? property(payload, 'value') : payload),
            semantic ? snapshot(property(payload, 'results'), legacy) : null]
        case 'group': return ['group', dictionary(payload).filter(([, item]) => {
            const value = selectedState(property(item, 'value'))
            return !(legacy && semantic && value.option === 'reference'
                && selectedState(property(value.value, 'type')).option === 'derived')
        }).map(([id, item]) =>
            [id, snapshot(property(item, 'description')), recurse(property(item, 'value'))])]
        case 'state': return ['state', dictionary(legacy || semantic ? property(payload, 'options') : payload).map(([id, item]) =>
            [id, snapshot(property(item, 'description')), recurse(property(item, 'value')),
                semantic ? snapshot(property(item, 'constraints'), legacy) : null]),
            semantic ? snapshot(property(payload, 'results'), legacy) : null]
        default: assert.fail(option.option)
    }
}

test('Liana Next root distinguishes syntax from resolution and has no schema-set alternative', () => {
    assert.equal(rootType['root value'][0], 'state')
    assert.deepEqual(rootType['root value'][1].options.__get_raw().map(([id]) => id).sort(), ['astn', 'liana'])
    for (const name of ['identifiers', 'imports', 'resolver']) {
        const source = readFileSync(new URL('examples/' + name + '.liana.lna', base), 'utf8')
        assert.deepEqual(errors.Document(parse(source)).__get_raw(), [], name)
    }
    assert.ok(errors.Document(parse('| set {}')).__get_raw().length > 0)
})

test('ASTN reference and id are unit simple flavors, not value alternatives', () => {
    const astn = entry(rootType['root value'][1].options, 'astn').value[1].type[1]['l entry'].get_circular_dependent()
    const options = branchValue(astn)[1].options
    const globals = entry(astn['root value'][1], 'globals').value[1].type[1]['l entry'].get_circular_dependent()
    const simpleTypes = expand(entry(globals['root value'][1], 'simple types').value[1].value)
    const flavors = entry(simpleTypes[1], 'type').value[1].options
    assert.deepEqual(flavors.__get_raw().map(([id]) => id).sort(), ['boolean', 'date', 'id', 'number', 'reference', 'text'])
    for (const name of ['reference', 'id', 'text']) {
        assert.ok(!options.__get_raw().some(([id]) => id === name))
    }
    for (const name of ['reference', 'id']) assert.deepEqual(entry(flavors, name).value, ['nothing', null])
    const source = readFileSync(new URL('examples/identifiers.liana.lna', base), 'utf8')
    assert.ok(errors.Document(parse(source.replace('| `reference` ~', '| `reference` ( referent: \'Root\' )'))).__get_raw().length > 0)
    for (const value of ['| `reference` ~', '| `id` ~', '| `text` | `local` < | `single line` ~ | `no` ~ >',
        '| `simple` | `local` < | `single line` ~ | `no` ~ >']) {
        assert.ok(errors.Document(parse(source.replace("| `simple` 'Identifier'", value))).__get_raw().length > 0, value)
    }
    assert.ok(errors.Document(parse(source.replace('`imports`: {}', '`resolver`: ()\n    `imports`: {}'))).__get_raw().length > 0)
})

test('schema-document authoring has no derived-reference fields or required metadata placeholders', () => {
    const seen = new Set()
    let references = 0
    const visit = value => {
        if (seen.has(value)) return
        seen.add(value)
        switch (value[0]) {
            case 'component': visit(expand(value)); break
            case 'dictionary': case 'list': visit(value[1].value); break
            case 'optional': visit(value[1]); break
            case 'group':
                for (const [, property] of value[1].__get_raw()) visit(property.value)
                break
            case 'state':
                for (const [, option] of value[1].options.__get_raw()) visit(option.value)
                break
            case 'reference':
                references++
                assert.equal(value[1].type[0], 'selected')
                break
            case 'nothing': case 'simple': case 'text': break
            default: assert.fail(value[0])
        }
    }
    visit(rootType['root value'])
    assert.ok(references > 20)
    const minimal = readFileSync(new URL('examples/resolver.liana.lna', base), 'utf8')
    assert.doesNotMatch(minimal, /`signature`|`resolved parameters`|`definition`|`resulting node`/)
    assert.deepEqual(errors.Document(parse(minimal)).__get_raw(), [])
    const old = minimal.replace('`root value resolver`:', '`signature`: ~\n                `root value resolver`:')
    const diagnostics = errors.Document(parse(old)).__get_raw()
    assert.ok(diagnostics.some(error => error.type[0] === 'group' && error.type[1][0] === 'superfluous property'))
})

test('both branches use types without colliding with primitive dictionaries', () => {
    for (const branch of ['astn', 'liana']) {
        const definition = entry(rootType['root value'][1].options, branch).value[1].type[1]['l entry'].get_circular_dependent()
        const properties = definition['root value'][1]
        assert.ok(properties.__get_raw().some(([id]) => id === 'types'))
        assert.ok(!properties.__get_raw().some(([id]) => id === 'modules'))
        const globals = entry(properties, 'globals').value[1].type[1]['l entry'].get_circular_dependent()
        assert.deepEqual(globals['root value'][1].__get_raw().map(([id]) => id), ['simple types'])
        const value = branchValue(definition)
        assert.equal(entry(value[1].options, 'simple').value[0], 'reference')
        assert.ok(!value[1].options.__get_raw().some(([id]) => id === 'text'))
    }
    for (const name of ['identifiers', 'resolver']) {
        const source = readFileSync(new URL('examples/' + name + '.liana.lna', base), 'utf8')
        assert.ok(!/\bmodules?\b/.test(source))
        assert.ok(errors.Document(parse(source.replace('`types`:', '`modules`:'))).__get_raw().length > 0)
    }
})

test('named simple types accept text configuration and preserve existing primitive flavors', () => {
    const source = readFileSync(new URL('examples/identifiers.liana.lna', base), 'utf8')
    const original = '| `text` < | `single line` ~ | `no` ~ >'
    for (const flavor of [
        '| `text` < | `multi line` ~ | `yes` ( `path prefix`: "https://" `path suffix`: "" ) >',
        '| `boolean` ~',
        '| `date` ~',
        '| `number` ( `precision`: | `approximation` ( `significant digits`: 6 ) )',
        '| `number` ( `precision`: | `exact` ( `number of fractional digits`: _ `type`: | `natural` ~ ) )',
    ]) {
        assert.deepEqual(errors.Document(parse(source.replace(original, flavor))).__get_raw(), [], flavor)
    }
    assert.ok(errors.Document(parse(source.replace('`simple types`:', '`text types`: {} `simple types`:'))).__get_raw().length > 0)
    const semantic = readFileSync(new URL('examples/resolver.liana.lna', base), 'utf8')
    assert.ok(errors.Document(parse(semantic.replace("| `simple` 'Text'", '| `text` | `local` < | `single line` ~ | `no` ~ >'))).__get_raw().length > 0)
    assert.ok(errors.Document(parse(semantic.replace('| `simple` ~', '| `text` ~'))).__get_raw().length > 0)
    const liana = entry(rootType['root value'][1].options, 'liana').value[1].type[1]['l entry'].get_circular_dependent()
    assert.equal(entry(branchValue(liana)[1].options, 'reference').value[0], 'group')
})

test('imports contain unwrapped schema documents from their own realm', () => {
    const source = readFileSync(new URL('examples/imports.liana.lna', base), 'utf8')
    assert.deepEqual(errors.Document(parse(source)).__get_raw(), [])
    for (const tag of ['astn', 'liana', 'set']) {
        assert.ok(errors.Document(parse(source.replace("'names': (", "'names': | `" + tag + "` ("))).__get_raw().length > 0)
    }
    const semantic = readFileSync(new URL('examples/resolver.liana.lna', base), 'utf8')
    const payload = semantic.replace(/^\| `liana` /, '')
    assert.notEqual(payload, semantic)
    const imported = semantic.replace('`imports`: {}', "`imports`: { 'semantic': " + payload + ' }')
    assert.deepEqual(errors.Document(parse(imported)).__get_raw(), [])
    assert.ok(errors.Document(parse(imported.replace(/^\| `liana`/, '| `astn`'))).__get_raw().length > 0)
    const astn = entry(rootType['root value'][1].options, 'astn').value[1].type[1]['l entry'].get_circular_dependent()
    const liana = entry(rootType['root value'][1].options, 'liana').value[1].type[1]['l entry'].get_circular_dependent()
    const importedSchema = definition => expand(entry(definition['root value'][1], 'imports').value)[1].value[1].type[1]['l entry'].get_circular_dependent()
    assert.equal(importedSchema(astn), astn)
    assert.equal(importedSchema(liana), liana)
})

test('the Liana branch requires an explicit resolver while ASTN does not', () => {
    const source = readFileSync(new URL('examples/resolver.liana.lna', base), 'utf8')
    const withoutResolver = source.replace(/\s*`resolver`:\s*\([\s\S]*\)\n    `root`:/, '\n    `root`:')
    assert.notEqual(withoutResolver, source)
    assert.ok(errors.Document(parse(withoutResolver)).__get_raw().length > 0)
    const astn = readFileSync(new URL('examples/identifiers.liana.lna', base), 'utf8')
    assert.deepEqual(errors.Document(parse(astn)).__get_raw(), [])
})

test('retained project definitions preserve structure and resolver except the redesigned Lioncore example', () => {
    const projects = fileURLToPath(new URL('../../../../newstyle_projects/projects/', import.meta.url))
    const definitions = directory => readdirSync(directory, { withFileTypes: true }).flatMap(item => {
        if (!item.isDirectory() || ['test_harness', 'node_modules', 'temp', '.git'].includes(item.name)) return []
        const path = join(directory, item.name)
        if (item.name === 'definition') return readdirSync(path).includes('schema.liana.lna') ? [join(path, 'schema.liana.lna')] : []
        return definitions(path)
    })
    const old = parser.Module_Specifier(chars(readFileSync(new URL('definition/.liana/schema.slna', base), 'utf8')), abort, { 'tab size': 4 })
    const oldModule = old[0] === 'constrained' ? old[1]['module resolver'].entry.signature.module : old[1].module.entry
    const sources = definitions(projects).filter(path => relative(projects, path) !== 'liana/sketch/definition/schema.liana.lna').sort()
    assert.equal(sources.length, 49)
    assert.ok(!readdirSync(new URL('examples/', base)).includes('liana.liana.lna'))
    let semanticCount = 0
    for (const sourcePath of sources) {
        const name = relative(projects, sourcePath).replace(/\/sketch\/definition\/schema\.liana\.lna$/, '').replaceAll('/', '--') + '.liana.lna'
        const original = unmarshal.Document(chars(readFileSync(sourcePath, 'utf8')), abort, { module: oldModule, 'tab size': 4 })
        assert.deepEqual(errors.Document(original).__get_raw(), [], sourcePath)
        const tree = selectedState(property(original.content, 'schema'))
        assert.equal(tree.option, 'schema', 'Handle schema-set children explicitly if project definitions start using them')
        const oldDefinition = tree.value
        const semantic = selectedState(property(oldDefinition, 'complexity')).option === 'constrained'
        const converted = parse(readFileSync(new URL('examples/' + name, base), 'utf8'))
        assert.deepEqual(errors.Document(converted).__get_raw(), [], name)
        const branch = selectedState(converted.content)
        if (name === 'lioncore.liana.lna') {
            assert.equal(branch.option, 'liana')
            continue
        }
        assert.equal(branch.option, semantic ? 'liana' : 'astn', name)
        if (semantic) semanticCount++
        const originalTypes = dictionary(property(oldDefinition, 'modules'))
        const convertedTypes = dictionary(property(branch.value, 'types'))
        assert.deepEqual(convertedTypes.map(([id]) => id), originalTypes.map(([id]) => id), name)
        for (let index = 0; index < originalTypes.length; index++) {
            assert.deepEqual(normalizedValue(property(convertedTypes[index][1], 'root value'), property(branch.value, 'globals'), semantic, false),
                normalizedValue(property(originalTypes[index][1], 'root value'), property(oldDefinition, 'globals'), semantic, true),
                'Structural preservation: ' + name + ' / ' + originalTypes[index][0])
        }
        const oldRoot = selectedState(property(original.content, 'complexity'))
        assert.equal(referenceId(property(branch.value, 'root')),
            referenceId(property(oldRoot.value, oldRoot.option === 'constrained' ? 'module resolver' : 'module')), name)
        if (semantic) {
            const resolver = property(branch.value, 'resolver')
            const originalResolver = selectedState(property(oldDefinition, 'complexity')).value
            assert.deepEqual(dictionary(property(resolver, 'types')).map(([id]) => id),
                dictionary(property(originalResolver, 'modules')).map(([id]) => id), name)
            assert.deepEqual(dictionary(property(property(resolver, 'signatures'), 'signatures')).map(([id]) => id),
                dictionary(property(property(originalResolver, 'signatures'), 'signatures')).map(([id]) => id), name)
            assert.deepEqual(normalizeResolver(snapshot(resolver)), normalizeResolver(snapshot(originalResolver, true)),
                'Resolver computation preservation: ' + name)
        }
    }
    assert.equal(semanticCount, 7)
})
