import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'

const require = createRequire(new URL('../lib/package.json', import.meta.url))
const p = await import(require.resolve('pareto-core/transformer'))
const parser = await import(require.resolve('pareto-liana/schemas/temp_module_specifier/refiners/list_of_characters'))
const seal = await import(require.resolve('liana-authoring/schemas/astn_sealed_target/refiners/list_of_characters'))
const serialize = await import(require.resolve('astn-runtime/modules/serialization/schemas/sealed_target/transformers/serialized_paragraph'))
const chars = source => p.literal.list(Array.from(source, character => character.codePointAt(0)))
const abort = error => { throw error }
const schema = parser.Module_Specifier(chars(readFileSync(new URL(
    '../../../../newstyle_projects/projects/liana/sketch/examples/.liana/schema.to_be_removed.slna', import.meta.url,
), 'utf8')), abort, { 'tab size': 4 })
assert.equal(schema[0], 'unconstrained')

export const sealedSchemaText = source => serialize.Document(
    seal.Document(chars(source), abort, { unmarshall: { module: schema[1].module.entry, 'tab size': 4 } }),
    { indentation: '    ' },
).__get_raw().join('\n') + '\n'

export const readSchemaText = path => sealedSchemaText(readFileSync(path, 'utf8'))
