import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const sql = new URL('../../../../newstyle_projects/projects/sql_query/sketch/', import.meta.url)
const transformer = new URL('transformers/sql_sketch/', sql)
for (const name of ['orders', 'addresses', 'branching', 'quoted', 'empty']) {
    test('head/tail lowering preserves the expected SQL AST for ' + name, () => {
        const source = new URL(name === 'orders' ? 'examples/orders.sq.lna' : 'transformers/sql_sketch/tests/fixtures/' + name + '.sq.lna', sql)
        const result = spawnSync(process.execPath, [fileURLToPath(new URL('typescript/dist/index.generated.js', transformer))], {
            input: readFileSync(source, 'utf8'), encoding: 'utf8',
        })
        assert.equal(result.status, 0, result.stderr)
        assert.equal(result.stderr, '')
        assert.equal(result.stdout, readFileSync(new URL('tests/results/expected/' + name + '.sql.lna', transformer), 'utf8'))
    })
}
