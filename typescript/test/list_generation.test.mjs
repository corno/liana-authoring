import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const generator = new URL('../../../../newstyle_projects/projects/liana_legacy/sketch/transformers/pareto_next_sketch/typescript/', import.meta.url)
const parse = await import(new URL('dist/modules/source.liana.generated/schemas/unresolved/refiners/astn_parse_tree.js', generator))
const bodies = await import(new URL('dist/resolver_bodies.js', generator))
const require = createRequire(new URL('package.json', generator))
const p = await import(require.resolve('pareto-core/refiner'))
const runtimeRequire = createRequire(require.resolve('liana-runtime/modules/value_unmarshalling/schemas/unmarshalled_value/refiners/astn_parse_tree'))
const tree = await import(runtimeRequire.resolve('astn-runtime/modules/deserialization/schemas/parse_tree/refiners/list_of_characters'))
const abort = error => { throw new Error(typeof error === 'string' ? error : JSON.stringify(error)) }

function expressions(value, tag) {
    if (value === null || typeof value !== 'object') return []
    if (typeof value.__get_raw === 'function') return expressions(value.__get_raw(), tag)
    const found = Array.isArray(value) && value[0] === tag ? [value[1]] : []
    for (const child of Object.values(value)) found.push(...expressions(child, tag))
    return found
}

test('SQL tail code generation asserts both the previous tail field and the initial head before advancing', () => {
    const source = readFileSync(new URL('../../../../newstyle_projects/projects/sql_query/sketch/transformers/sql_sketch/typescript/schemas/input.slna', import.meta.url), 'utf8')
    const document = tree.Document(p.literal.list(Array.from(source, c => c.codePointAt(0))), abort, { 'tab size': 4 })
    const specification = parse.Module_Specification(document.content, abort)
    assert.equal(specification.schema[0], 'schema')
    const implementations = bodies.Implementations(specification.schema[1], name => abort('Unexpected import: ' + name), abort)
    const path = implementations.__get_raw().find(([id]) => id === 'Path')[1].expression
    const previous = expressions(path, 'convert').filter(value => value.select[0] === 'previous item')
    assert.equal(previous.length, 1)
    assert.equal(previous[0].type[0], 'optional')
    assert.equal(previous[0].type[1][0], 'decide')
    const branches = previous[0].type[1][1]
    const assertions = expressions(branches['on set'], 'assert state')
    assert.equal(assertions.length, 1)
    assert.equal(assertions[0].option, 'reference')
    const initialAssertions = expressions(branches['on not set'], 'assert state')
    assert.equal(initialAssertions.length, 1)
    assert.equal(initialAssertions[0].option, 'reference')
    assert.equal(expressions(path, 'assert state').length, 2)
    assert.deepEqual(expressions(path, 'implement me'), [])
})
