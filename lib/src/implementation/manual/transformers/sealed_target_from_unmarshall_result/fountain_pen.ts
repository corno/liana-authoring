import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'

//data types
import * as d_in from "../../../../interface/to_be_generated/sealed_target_from_unmarshall_result"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//dependencies

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"


export const Found = (
    $: d_in.Found,
): d_out.Phrase => _p.decide.state($, ($) => {
    switch ($[0]) {
        case 'dictionary': return _p.ss($, ($) => sh.ph.literal("dictionary"))
        case 'group': return _p.ss($, ($) => sh.ph.literal("group"))
        case 'list': return _p.ss($, ($) => sh.ph.literal("list"))
        case 'nothing': return _p.ss($, ($) => sh.ph.literal("nothing"))
        case 'optional': return _p.ss($, ($) => sh.ph.literal("optional"))
        case 'state': return _p.ss($, ($) => sh.ph.literal("state"))
        case 'text': return _p.ss($, ($) => sh.ph.composed([
            sh.ph.literal("text ("),
            sh.ph.literal($.value),
            sh.ph.literal(")")
        ]))
        case 'include': return _p.ss($, ($) => sh.ph.literal("include"))
        case 'missing data': return _p.ss($, ($) => sh.ph.literal("missing data"))
        default: return _p.au($[0])
    }
})

export const Error: _pi.Transformer<d_in.Error, d_out.Phrase> = (
    $,
) => {
    return sh.ph.composed([
        sh.ph.literal(`(`),
        sh.ph.literal($['definition path']),
        sh.ph.literal(") > "),
        _p.decide.state($.type, ($) => {
            switch ($[0]) {
                case 'boolean': return _p.ss($, ($) => _p.decide.state($, ($) => {
                    switch ($[0]) {
                        case 'wrong type': return _p.ss($, ($) => sh.ph.literal("wrong type, expected boolean"))
                        default: return _p.au($[0])
                    }
                }))
                case 'dictionary': return _p.ss($, ($) => _p.decide.state($, ($) => {
                    switch ($[0]) {
                        case 'wrong type': return _p.ss($, ($) => sh.ph.composed([
                            sh.ph.literal("wrong type, expected 'dictionary', found '"),
                            Found($),
                            sh.ph.literal("'")
                        ]))
                        case 'foo': return _p.ss($, ($) => sh.ph.literal("foo"))
                        default: return _p.au($[0])
                    }
                }))
                case 'group': return _p.ss($, ($) => _p.decide.state($, ($) => {
                    switch ($[0]) {
                        case 'missing property': return _p.ss($, ($) => sh.ph.composed([
                            sh.ph.literal("missing property: '"),
                            sh.ph.literal($.name),
                            sh.ph.literal("'")
                        ]))
                        case 'missing property value': return _p.ss($, ($) => sh.ph.composed([
                            sh.ph.literal("missing property value: '"),
                            sh.ph.literal($.name),
                            sh.ph.literal("'")
                        ]))
                        case 'unknown property': return _p.ss($, ($) => sh.ph.composed([
                            sh.ph.literal("unknown property: '"),
                            sh.ph.literal($.name),
                            sh.ph.literal("'")
                        ]))
                        case 'multiple instances for property': return _p.ss($, ($) => sh.ph.composed([
                            sh.ph.literal("multiple instances for property: '"),
                            sh.ph.literal($.name),
                            sh.ph.literal("'")
                        ]))
                        case 'wrong type': return _p.ss($, ($) => sh.ph.literal("wrong type, expected group"))
                        default: return _p.au($[0])
                    }
                }))
                case 'list': return _p.ss($, ($) => _p.decide.state($, ($) => {
                    switch ($[0]) {
                        case 'wrong type': return _p.ss($, ($) => sh.ph.literal("wrong type, expected list"))
                        default: return _p.au($[0])
                    }
                }))
                case 'number': return _p.ss($, ($) => _p.decide.state($, ($) => {
                    switch ($[0]) {
                        case 'wrong type': return _p.ss($, ($) => sh.ph.literal("wrong type, expected number"))
                        default: return _p.au($[0])
                    }
                }))
                case 'optional': return _p.ss($, ($) => _p.decide.state($, ($) => {
                    switch ($[0]) {
                        case 'wrong type': return _p.ss($, ($) => sh.ph.literal("wrong type, expected optional"))
                        case 'foo': return _p.ss($, ($) => sh.ph.literal("foo"))
                        default: return _p.au($[0])
                    }
                }))
                case 'reference': return _p.ss($, ($) => _p.decide.state($, ($) => {
                    switch ($[0]) {
                        case 'wrong type': return _p.ss($, ($) => sh.ph.literal("wrong type, expected reference"))
                        default: return _p.au($[0])
                    }
                }))
                case 'state': return _p.ss($, ($) => _p.decide.state($, ($) => {
                    switch ($[0]) {
                        case 'wrong type': return _p.ss($, ($) => sh.ph.composed([
                            sh.ph.literal("wrong type, expected 'state', found '"),
                            Found($),
                            sh.ph.literal("'")
                        ]))
                        case 'missing data': return _p.ss($, ($) => sh.ph.literal("missing data"))
                        case 'unknown option': return _p.ss($, ($) => sh.ph.literal("unknown option"))
                        case 'too many items': return _p.ss($, ($) => sh.ph.literal("too many items"))
                        case 'missing option item': return _p.ss($, ($) => sh.ph.literal("missing option item"))
                        case 'option item is not a text': return _p.ss($, ($) => sh.ph.literal("option item is not a text"))
                        case 'missing value item': return _p.ss($, ($) => sh.ph.literal("missing value item"))
                        default: return _p.au($[0])
                    }
                }))
                case 'text': return _p.ss($, ($) => _p.decide.state($, ($) => {
                    switch ($[0]) {
                        case 'wrong type': return _p.ss($, ($) => sh.ph.literal("wrong type, expected text"))
                        default: return _p.au($[0])
                    }
                }))
                default: return _p.au($[0])
            }
        })
    ])
}

