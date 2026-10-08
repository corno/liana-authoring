import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import test from 'node:test'
import { build } from '../../../../newstyle_projects/projects/lioncore/sketch/serialization/run.mjs'
import { readSchemaText } from './native_schema_text.mjs'

const projects = new URL('../../../../newstyle_projects/projects/', import.meta.url)
const require = createRequire(new URL('liana/sketch/transformers/pareto_next_sketch/typescript/package.json', projects))
const p = await import(require.resolve('pareto-core/transformer'))
const abort = error => { throw error }
const plain = value => JSON.parse(JSON.stringify(value))
const named = node => node.properties.find(property => property.property.key === 'LionCore-builtins-INamed-name').value

test('SysML fixture has the native LionCore editor contract', () => {
    const environment = new URL('liana/sketch/temp/lioncore/.liana/', projects)
    const native = readFileSync(new URL('schema.native.slna', environment), 'utf8')
    assert.equal(native, readSchemaText(new URL('liana/sketch/examples/lioncore.liana.lna', projects)))
    assert.ok(readFileSync(new URL('schema.slna', environment), 'utf8').length > 0)
})

test('native LionCore serialization preserves SysML through tree, chunk and JSON', async t => {
    const api = await build()
    try {
        const original = JSON.parse(readFileSync(new URL('../../packages/pareto-lionweb/data/SysML_lionweb_lionweb.json', projects), 'utf8'))
        const source = readFileSync(new URL('liana/sketch/temp/lioncore/sysml.lna', projects), 'utf8')
        const { tree, chunk, json } = api.convert(source)
        const output = JSON.parse(json)
        const nodes = new Map(output.nodes.map(node => [node.id, node]))
        const sourceNodes = new Map(original.nodes.map(node => [node.id, node]))
        const path = (node, index) => node.parent === null ? [named(node)] : [...path(index.get(node.parent), index), named(node)]
        const byPath = new Map(output.nodes.map(node => [JSON.stringify(path(node, nodes)), node]))
        const mapped = new Map(original.nodes.map(node => [node.id, byPath.get(JSON.stringify(path(node, sourceNodes)))]))

        await t.test('concise and verbose instances agree and malformed input remains rejected', () => {
            const concise = "< { 'main': < \"1\" {} { 'Text': | `data type` | `primitive type` ~ } > } 'main' >"
            const verbose = `( languages: {
                'main': ( version: "1" \`depends on\`: {} entities: {
                    'Text': | \`data type\` | \`primitive type\` ~
                } )
            } \`primary language\`: 'main' )`
            assert.deepEqual(plain(api.parse(concise)), plain(api.parse(verbose)))
            assert.equal(api.convert(concise).json, api.convert(verbose).json)
            assert.throws(() => api.parse(verbose.replace('languages:', 'unexpected:')))
            assert.throws(() => api.parse(concise.replace('`primitive type`', '`missing type`')))
        })

        await t.test('all source data except generated IDs/keys and ordering is preserved', () => {
            assert.equal(original.nodes.length, 663)
            assert.equal(output.nodes.length, 668)
            assert.equal(nodes.size, output.nodes.length)
            assert.equal(output.serializationFormatVersion, original.serializationFormatVersion)
            assert.deepEqual(output.languages, original.languages)
            const roots = output.nodes.filter(node => node.parent === null)
            assert.deepEqual(roots.map(named), ['sysml', 'types'])
            assert.equal(roots[1].properties.find(property => property.property.key === 'Language-version').value, '1')
            const typeNodes = output.nodes.filter(node => node.parent === roots[1].id)
            assert.deepEqual(typeNodes.map(named), ['Boolean', 'String', 'Integer', 'Real'])
            assert.ok(typeNodes.every(node => node.classifier.key === 'PrimitiveType'))
            for (const node of original.nodes) {
                const generated = mapped.get(node.id)
                assert.ok(generated, node.id)
                assert.deepEqual(generated.classifier, node.classifier)
                assert.equal(generated.parent, node.parent === null ? null : mapped.get(node.parent).id)
                const properties = values => values.filter(property => property.property.key !== 'IKeyed-key')
                    .sort((left, right) => left.property.key.localeCompare(right.property.key))
                assert.deepEqual(properties(generated.properties), properties(node.properties), node.id)
                assert.equal(generated.properties.find(property => property.property.key === 'IKeyed-key').value, generated.id)
                assert.equal(generated.containments.length, node.containments.length)
                for (const containment of node.containments) {
                    const actual = generated.containments.find(value => value.containment.key === containment.containment.key)
                    assert.deepEqual(actual.containment, containment.containment)
                    assert.deepEqual(actual.children.map(id => named(nodes.get(id))).sort(),
                        containment.children.map(id => named(sourceNodes.get(id))).sort())
                }
                assert.equal(generated.references.length, node.references.length)
                for (const reference of node.references) {
                    const actual = generated.references.find(value => value.reference.key === reference.reference.key)
                    assert.deepEqual(actual.reference, reference.reference)
                    assert.deepEqual(actual.targets.map(target => target.resolveInfo),
                        reference.targets.map(target => target.resolveInfo), node.id)
                    for (let index = 0; index < reference.targets.length; index++) {
                        const expected = reference.targets[index].reference
                        const actualID = actual.targets[index].reference
                        if (mapped.has(expected)) assert.equal(actualID, mapped.get(expected).id)
                        else if (expected === 'types') assert.equal(actualID, roots[1].id)
                        else {
                            assert.match(expected, /^types-(Boolean|String|Integer|Real)$/)
                            assert.equal(actualID, typeNodes.find(node => named(node) === expected.slice(6)).id)
                        }
                    }
                }
                assert.deepEqual(generated.annotations, node.annotations)
            }
        })

        await t.test('the chunk has legal unique IDs, reciprocal containment, and no dangling targets', () => {
            for (const node of output.nodes) {
                assert.match(node.id, /^[A-Za-z0-9_-]+$/)
                assert.equal(node.id, path(node, nodes).join('__'))
                for (const property of node.properties)
                    if (property.property.key === 'IKeyed-key') assert.match(property.value, /^[A-Za-z0-9_-]+$/)
                let owners = 0
                for (const parent of output.nodes)
                    for (const containment of parent.containments)
                        owners += containment.children.filter(id => id === node.id).length
                assert.equal(owners, node.parent === null ? 0 : 1)
                for (const containment of node.containments)
                    for (const child of containment.children) assert.equal(nodes.get(child).parent, node.id)
                for (const reference of node.references)
                    for (const target of reference.targets) assert.ok(nodes.has(target.reference), target.reference)
                assert.ok(!Object.hasOwn(node, 'range'))
            }
        })

        await t.test('both intermediate stages round-trip against generated native schemas', () => {
            for (const [value, parser, serializer] of [
                [tree, api.treeParser, api.treeSerializer],
                [chunk, api.chunkParser, api.chunkSerializer],
            ]) {
                const text = serializer.Root(value, { indentation: '    ' }).__get_raw().join('\n')
                assert.deepEqual(plain(parser.Root(api.characters(text), abort, { 'tab size': 4 })), plain(value))
            }
            assert.equal(api.convert(source).json, json)
        })

        await t.test('2024.1 covers annotations, structured fields, escaped names, and reference aliases', () => {
            const text = `( languages: {
                'main/slash': ( version: "1" \`depends on\`: { 'alias': 'base_underscore' } entities: {
                    'Concept': | classifier ( features: {} kind: | concept (
                        abstract: false partition: false extends: _ implements: []
                    ) )
                    'Annotation': | classifier ( features: {} kind: | annotation (
                        annotates: * | local ( entity: 'Concept' ) extends: _ implements: []
                    ) )
                    'Enum': | \`data type\` | enumeration ( literals: { 'quote"back\\\\slash': ~ } )
                    'Record': | \`data type\` | \`structured data type\` ( fields: {
                        'space and unicode \\u03bb': ( type: | external ( language: 'alias' entity: 'Text' ) )
                    } )
                } )
                'base_underscore': ( version: "1" \`depends on\`: {} entities: {
                    'Text': | \`data type\` | \`primitive type\` ~
                } )
            } \`primary language\`: 'main/slash' )`
            const converted = JSON.parse(api.convert(text, '2024.1').json)
            assert.equal(converted.serializationFormatVersion, '2024.1')
            assert.ok(converted.nodes.every(node => /^[A-Za-z0-9_-]+$/.test(node.id)))
            const field = converted.nodes.find(node => node.classifier.key === 'Field')
            assert.equal(named(field), 'space and unicode \u03bb')
            assert.equal(field.references[0].reference.key, 'Field-type')
            const language = converted.nodes.find(node => node.classifier.key === 'Language' && named(node) === 'main/slash')
            assert.equal(language.references[0].targets[0].resolveInfo, 'base_underscore')
            assert.equal(converted.nodes.find(node => node.classifier.key === 'Annotation').references[0].reference.key,
                'Annotation-annotates')
            assert.throws(() => api.convert(text, '2023.1'), /structured data types require LionWeb 2024.1/)
            assert.throws(() => api.convert(text, 'invalid'), /Unsupported LionWeb version/)
        })

        await t.test('generic flattening rejects duplicate IDs and JSON preserves null targets and multiline text', () => {
            const root = tree.roots.__get_raw()[0]
            const duplicate = {
                ...tree, roots: p.literal.dictionary({ [root[0]]: {
                    ...root[1], containments: p.literal.list([{
                        containment: root[1].classifier,
                        children: p.literal.dictionary({ [root[0]]: root[1] }),
                    }]),
                } }),
            }
            assert.throws(() => api.toChunk(duplicate), /duplicate node ID/)
            const modified = {
                ...chunk, nodes: p.literal.list([{
                    ...chunk.nodes.__get_raw()[0],
                    properties: p.literal.list([{ property: chunk.nodes.__get_raw()[0].classifier, value: 'quote"\nback\\slash' }]),
                    references: p.literal.list([{
                        reference: chunk.nodes.__get_raw()[0].classifier,
                        targets: p.literal.list([{ resolveInfo: 'unloaded', reference: p.literal.not_set() }]),
                    }]),
                }]),
            }
            const wire = JSON.parse(api.serialize(api.toJSON(modified))).nodes[0]
            assert.equal(wire.parent, null)
            assert.equal(wire.properties[0].value, 'quote"\nback\\slash')
            assert.equal(wire.references[0].targets[0].reference, null)
        })
    } finally {
        api.dispose()
    }
})
