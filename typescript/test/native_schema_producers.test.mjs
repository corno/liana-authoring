import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import { parseSealed } from '../../../../newstyle_projects/tools/liana/generation.mjs'
import { sealedSchemaText } from './native_schema_text.mjs'

const root = new URL('../../../../newstyle_projects/', import.meta.url)
const seal = fileURLToPath(new URL('tools/old_style/liana_authoring/dist/bin/seal.js', root))
for (const [project, extension] of [
    ['yabnf', 'yabnf'],
    ['upcycling/xml', 'xup'],
    ['project_management/project_structure', 'ps'],
]) {
    test(`${project} emits canonical native ASTN schemas with an unresolved-only target API`, () => {
        const directory = new URL(`projects/${project}/sketch/transformers/liana_sketch/`, root)
        const configuration = readFileSync(new URL('configuration/package.lna', directory), 'utf8')
        assert.doesNotMatch(configuration, /liana_legacy/)
        assert.match(configuration, /liana\/sketch/)
        assert.equal(existsSync(new URL('typescript/src/modules/target.liana.generated/schemas/resolved/', directory)), false)
        const fixtures = new URL('tests/fixtures/', directory)
        const names = readdirSync(fixtures).filter(name => name.endsWith(`.${extension}.lna`)).sort()
        assert.ok(names.length > 0)
        for (const name of names) {
            const source = execFileSync(process.execPath, [seal, fileURLToPath(new URL(name, fixtures))],
                { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 })
            const output = execFileSync(process.execPath, [fileURLToPath(new URL('typescript/dist/index.generated.js', directory))],
                { input: source, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 })
            const expected = readFileSync(new URL('tests/results/expected/' +
                name.replace(`.${extension}.lna`, '.liana.lna'), directory), 'utf8')
            const actualSchema = parseSealed(output)
            const expectedSchema = parseSealed(expected)
            assert.equal(actualSchema[0], 'astn', name)
            assert.equal(actualSchema[1].root, expectedSchema[1].root, name)
            assert.deepEqual(actualSchema[1].types.__get_raw().map(([id]) => id),
                expectedSchema[1].types.__get_raw().map(([id]) => id), name)
            assert.equal(sealedSchemaText(output), sealedSchemaText(expected), name)
        }
    })
}
