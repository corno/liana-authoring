import assert from 'node:assert/strict'
import { spawnSync, execFileSync } from 'node:child_process'
import { mkdtempSync, readdirSync, readFileSync, writeFileSync, rmSync, existsSync, mkdirSync, symlinkSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import { typecheck } from '../../../../newstyle_projects/projects/liana/sketch/temp/pipeline.mjs'
import { readSchemaText, sealedSchemaText } from './native_schema_text.mjs'

const root = new URL('../../../../newstyle_projects/', import.meta.url)
const cli = fileURLToPath(new URL('tools/liana/generate_typescript.mjs', root))
const example = name => fileURLToPath(new URL('projects/liana/sketch/examples/' + name + '.liana.lna', root))
const run = arguments_ => spawnSync(process.execPath, [cli, ...arguments_], { encoding: 'utf8' })

test('the supported generator defaults to native Liana without a legacy resolved API for ASTN', () => {
    const directory = mkdtempSync(join(tmpdir(), 'native-generator-'))
    try {
        const output = join(directory, 'astn')
        const result = run([example('identifiers'), output])
        assert.equal(result.status, 0, result.stderr)
        assert.match(result.stdout, /using native Liana/)
        assert.ok(existsSync(join(output, 'schemas/unresolved/schema.ts')))
        assert.equal(existsSync(join(output, 'schemas/resolved')), false)
        assert.deepEqual(typecheck(output), { status: 'passed' })
        const semantic = join(directory, 'liana')
        const next = run([example('lioncore'), semantic])
        assert.equal(next.status, 0, next.stderr)
        assert.ok(existsSync(join(semantic, 'schemas/resolved/refiners/unresolved.ts')))
        assert.deepEqual(typecheck(semantic), { status: 'passed' })
    } finally {
        rmSync(directory, { recursive: true })
    }
})

test('canonical Liana owns the native self-definition and executable while legacy stays explicit', () => {
    const read = path => readFileSync(new URL(path, root), 'utf8')
    assert.equal(read('projects/liana/sketch/schema').trim(), 'liana')
    assert.equal(read('projects/liana_legacy/sketch/schema').trim(), '')
    assert.equal(sealedSchemaText(read('projects/liana/sketch/definition/schema.liana.lna')),
        sealedSchemaText(read('projects/liana/sketch/examples/liana.liana.lna')))
    assert.equal(existsSync(new URL('projects/liana_next', root)), false)
    for (const [name, input] of [
        ['liana', 'Root'],
        ['liana_legacy', 'Module Specification'],
    ]) {
        const executable = `${name}.sketch.transformers.pareto_next_sketch`
        const help = spawnSync(process.execPath, [
            fileURLToPath(new URL(`tools/pareto_tools/bin/${executable}.js`, root)), '--help',
        ], { encoding: 'utf8' })
        assert.equal(help.status, 0, help.stderr)
        assert.ok(help.stdout.startsWith(executable + ' - transformer'))
        assert.ok(help.stdout.includes(`instances of "${input}"`))
    }
    const directory = mkdtempSync(join(tmpdir(), 'canonical-generator-'))
    try {
        const output = join(directory, 'api')
        const result = run([
            fileURLToPath(new URL('projects/liana/sketch/definition/schema.liana.lna', root)), output,
        ])
        assert.equal(result.status, 0, result.stderr)
        assert.ok(existsSync(join(output, 'schemas/unresolved/schema.ts')))
        assert.equal(existsSync(join(output, 'schemas/resolved')), false)
        assert.deepEqual(typecheck(output), { status: 'passed' })
    } finally {
        rmSync(directory, { recursive: true })
    }
})

test('sealed native input uses the same pipeline and malformed input never falls back to legacy', () => {
    const directory = mkdtempSync(join(tmpdir(), 'sealed-generator-'))
    try {
        const seal = fileURLToPath(new URL('tools/old_style/liana_authoring/dist/bin/seal.js', root))
        const sealed = join(directory, 'input.slna')
        writeFileSync(sealed, execFileSync(process.execPath, [seal, example('identifiers')]))
        const output = join(directory, 'native')
        const result = run(['--sealed', sealed, output])
        assert.equal(result.status, 0, result.stderr)
        const legacyInput = fileURLToPath(new URL('projects/data_formats/json/sketch/examples/.liana/schema.slna', root))
        const incorrect = run(['--sealed', legacyInput, join(directory, 'incorrect')])
        assert.notEqual(incorrect.status, 0)
        assert.equal(existsSync(join(directory, 'incorrect')), false)
    } finally {
        rmSync(directory, { recursive: true })
    }
})

test('legacy generation is explicit and preserves the existing schema API', () => {
    const directory = mkdtempSync(join(tmpdir(), 'legacy-generator-'))
    try {
        const input = fileURLToPath(new URL('projects/data_formats/csv/sketch/examples/.liana/schema.slna', root))
        const legacy = join(directory, 'legacy')
        const result = run(['--legacy', input, legacy])
        assert.equal(result.status, 0, result.stderr)
        const original = join(directory, 'original')
        execFileSync(process.execPath, [
            fileURLToPath(new URL('tools/old_style/liana_to_typescript/dist/bin/generate_typescript_new.js', root)),
            input, original,
        ], { stdio: 'pipe' })
        const files = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry =>
            entry.isDirectory() ? files(join(directory, entry.name)).map(name => entry.name + '/' + name) : [entry.name]).sort()
        assert.deepEqual(files(legacy), files(original))
        for (const file of files(legacy))
            assert.equal(readFileSync(join(legacy, file), 'utf8'), readFileSync(join(original, file), 'utf8'), file)
        assert.ok(existsSync(join(legacy, 'schemas/resolved/schema.ts')))
    } finally {
        rmSync(directory, { recursive: true })
    }
})

test('the formerly blocked path and SQL schemas generate through the supported native command', () => {
    const directory = mkdtempSync(join(tmpdir(), 'migrated-generator-'))
    try {
        for (const name of ['json_schema_light', 'programming_languages--pareto_next', 'sql_query']) {
            const output = join(directory, name)
            const result = run([example(name), output])
            assert.equal(result.status, 0, result.stderr)
            assert.ok(existsSync(join(output, 'schemas/resolved/refiners/unresolved.ts')))
            assert.doesNotMatch(readFileSync(join(output, 'schemas/resolved/refiners/unresolved.ts'), 'utf8'), /\bp_implement_me\s*\(/)
        }
    } finally {
        rmSync(directory, { recursive: true })
    }
})

test('unsupported resolver operations and nonempty destinations fail without overwriting output', () => {
    const directory = mkdtempSync(join(tmpdir(), 'blocked-generator-'))
    try {
        const output = join(directory, 'incomplete')
        const unsupported = join(directory, 'unsupported.lna')
        mkdirSync(join(directory, '.liana'))
        symlinkSync(fileURLToPath(new URL('projects/liana/sketch/examples/.liana/schema.slna', root)),
            join(directory, '.liana/schema.slna'))
        const source = readSchemaText(example('sql_query'))
        const modified = source.replace(/(`type`: \| `internal acyclic` 'Unique Key'\s+`results`: )_/, `$1* {
            'unfinished': ( type: ( location: | internal 'Unique Key' ) path: ( tail: [] ) )
        }`)
        assert.notEqual(modified, source)
        writeFileSync(unsupported, modified)
        const result = run([unsupported, output])
        assert.notEqual(result.status, 0)
        assert.match(result.stderr, /unsupported resolver operations/)
        assert.match(result.stderr, /value results/)
        assert.equal(existsSync(output), false)
        const marker = join(directory, 'keep.txt')
        writeFileSync(marker, 'keep')
        const occupied = run([example('identifiers'), directory])
        assert.notEqual(occupied.status, 0)
        assert.match(occupied.stderr, /empty output directory/)
        assert.equal(readFileSync(marker, 'utf8'), 'keep')
        assert.notEqual(run(['--legacy', '--sealed', example('identifiers'), output]).status, 0)
    } finally {
        rmSync(directory, { recursive: true })
    }
})
