import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { input } from '../../../../newstyle_projects/tools/liana/generation.mjs'
import { parseHistoricalAccounting } from '../../../../newstyle_projects/tools/liana/accounting_compatibility.mjs'

const schema = input(new URL('../../../../newstyle_projects/projects/liana/sketch/examples/boekhouding.liana.lna', import.meta.url).pathname)[1]
const empty = `(Fiscaal: ("Balans Hoofdcategorieen": {} "Resultaat Hoofdcategorieen": {})
    Categorieen: ("Correctietypes vennootschapsbelasting": {} Balans: {} Resultaat: {})
    Beheer: ("BTW-categorieen": {} Grootboekrekeningen: (Balans: {} Resultaat: {})
        Rekeningen: (Bank: {} Informeel: {}) Gebruikers: {} Klanten: {} Leveranciers: {} Medewerkers: {})
    Jaren: {})`

test('historical accounting projection preserves dictionary IDs and removes checked Stam units', () => {
    const text = empty.replace('Jaren: {}', `Jaren: {
        '2024': (Afgesloten: | Ja ~ "Startdatum boekjaar": "2024-01-01"
            Grootboekrekeningen: (Balans: {bank: (Stam: ~)} Resultaat: {})
            "Eerste boekjaar": | Ja ~
            Jaarbeheer: (Resultaat: ("Grootboekrekening voor BTW afrondingen": 'kosten'
                Salarisrondes: {} "BTW periodes": {})
                Balans: ("Grootboekrekening voor nog aan te geven BTW": 'bank'
                    "Grootboekrekening voor resultaat dit jaar": 'bank'
                    "Grootboekrekening voor winstreserve": 'bank'
                    "Grootboekrekening voor Inkoop saldo": 'bank'
                    "Grootboekrekening voor Verkoop saldo": 'bank'
                    "Beginsaldo nog aan te geven BTW": 0.00 "Beginsaldo winstreserve": 0.00
                    Bankrekeningen: {} "Informele rekeningen": {} "Overige balans items": {} Verrekenposten: {}))
            Handelstransacties: (Inkopen: {} Verkopen: {})
            Mutaties: (Verrekenposten: {} Bankrekeningen: {} "Overige Balans Items": {}))
    }`)
    const value = parseHistoricalAccounting(text, schema)
    const year = value.Jaren.__get_raw()[0][1]
    assert.deepEqual(year.Grootboekrekeningen.Balans.__get_raw(), [['bank', {}]])
    assert.equal(year.Jaarbeheer.Balans['Grootboekrekening voor winstreserve'], 'bank')
    assert.equal(year['Eerste boekjaar'][0], 'Ja')
})

test('historical accounting accepts concise normalization only for the verbose-group mismatch', () => {
    const concise = readFileSync(new URL('../../../../liana-vscode/test/fixtures/boekhouding.lna', import.meta.url), 'utf8')
    let calls = 0
    assert.equal(parseHistoricalAccounting(concise, schema, () => { calls++; return empty }).Jaren.__get_raw().length, 0)
    assert.equal(calls, 1)
    assert.throws(() => parseHistoricalAccounting(empty.replace('Jaren: {}', 'Jaren: 42'), schema,
        () => { assert.fail('Invalid input must not trigger normalization') }))
})
