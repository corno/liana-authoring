import * as pt from 'pareto-core/dist/transformer/implementation'
import * as p_di from 'pareto-core/dist/data/interface'
import * as p_ti from 'pareto-core/dist/transformer/interface'

//data types
import * as d_in from "../../../../interface/to_be_generated/sealed_target_from_unmarshall_result"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//dependencies

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"


export const Found = (
    $: d_in.Found,
): d_out.Phrase => pt.decide.state($, ($) => {
    switch ($[0]) {
        case 'dictionary': return pt.ss($, ($) => sh.ph.literal("dictionary"))
        case 'group': return pt.ss($, ($) => sh.ph.literal("group"))
        case 'list': return pt.ss($, ($) => sh.ph.literal("list"))
        case 'nothing': return pt.ss($, ($) => sh.ph.literal("nothing"))
        case 'optional': return pt.ss($, ($) => sh.ph.literal("optional"))
        case 'state': return pt.ss($, ($) => sh.ph.literal("state"))
        case 'text': return pt.ss($, ($) => sh.ph.composed([
            sh.ph.literal("text ("),
            sh.ph.literal($.value),
            sh.ph.literal(")")
        ]))
        case 'include': return pt.ss($, ($) => sh.ph.literal("include"))
        case 'missing data': return pt.ss($, ($) => sh.ph.literal("missing data"))
        default: return pt.au($[0])
    }
})

export const Error: p_ti.Transformer<d_in.Error, d_out.Phrase> = (
    $,
) => {
    return sh.ph.composed([
        pt.decide.state($.type, ($) => {
            switch ($[0]) {
                case 'boolean': return pt.ss($, ($) => pt.decide.state($, ($) => {
                    switch ($[0]) {
                        case 'wrong type': return pt.ss($, ($) => sh.ph.literal("wrong type, expected boolean"))
                        default: return pt.au($[0])
                    }
                }))
                case 'dictionary': return pt.ss($, ($) => pt.decide.state($, ($) => {
                    switch ($[0]) {
                        case 'wrong type': return pt.ss($, ($) => sh.ph.composed([
                            sh.ph.literal("wrong type, expected 'dictionary', found '"),
                            Found($),
                            sh.ph.literal("'")
                        ]))
                        case 'foo': return pt.ss($, ($) => sh.ph.literal("foo"))
                        default: return pt.au($[0])
                    }
                }))
                case 'group': return pt.ss($, ($) => pt.decide.state($, ($) => {
                    switch ($[0]) {
                        case 'missing property': return pt.ss($, ($) => sh.ph.composed([
                            sh.ph.literal("missing property: '"),
                            sh.ph.literal($.name),
                            sh.ph.literal("'")
                        ]))
                        case 'missing property value': return pt.ss($, ($) => sh.ph.composed([
                            sh.ph.literal("missing property value: '"),
                            sh.ph.literal($.name),
                            sh.ph.literal("'")
                        ]))
                        case 'unknown property': return pt.ss($, ($) => sh.ph.composed([
                            sh.ph.literal("unknown property: '"),
                            sh.ph.literal($.name),
                            sh.ph.literal("'")
                        ]))
                        case 'multiple instances for property': return pt.ss($, ($) => sh.ph.composed([
                            sh.ph.literal("multiple instances for property: '"),
                            sh.ph.literal($.name),
                            sh.ph.literal("'")
                        ]))
                        case 'wrong type': return pt.ss($, ($) => sh.ph.literal("wrong type, expected group"))
                        default: return pt.au($[0])
                    }
                }))
                case 'list': return pt.ss($, ($) => pt.decide.state($, ($) => {
                    switch ($[0]) {
                        case 'wrong type': return pt.ss($, ($) => sh.ph.literal("wrong type, expected list"))
                        default: return pt.au($[0])
                    }
                }))
                case 'number': return pt.ss($, ($) => pt.decide.state($, ($) => {
                    switch ($[0]) {
                        case 'wrong type': return pt.ss($, ($) => sh.ph.literal("wrong type, expected number"))
                        default: return pt.au($[0])
                    }
                }))
                case 'optional': return pt.ss($, ($) => pt.decide.state($, ($) => {
                    switch ($[0]) {
                        case 'wrong type': return pt.ss($, ($) => sh.ph.literal("wrong type, expected optional"))
                        case 'foo': return pt.ss($, ($) => sh.ph.literal("foo"))
                        default: return pt.au($[0])
                    }
                }))
                case 'reference': return pt.ss($, ($) => pt.decide.state($, ($) => {
                    switch ($[0]) {
                        case 'wrong type': return pt.ss($, ($) => sh.ph.literal("wrong type, expected reference"))
                        default: return pt.au($[0])
                    }
                }))
                case 'state': return pt.ss($, ($) => pt.decide.state($, ($) => {
                    switch ($[0]) {
                        case 'wrong type': return pt.ss($, ($) => sh.ph.composed([
                            sh.ph.literal("wrong type, expected 'state', found '"),
                            Found($),
                            sh.ph.literal("'")
                        ]))
                        case 'missing data': return pt.ss($, ($) => sh.ph.literal("missing data"))
                        case 'unknown option': return pt.ss($, ($) => sh.ph.literal("unknown option"))
                        case 'too many items': return pt.ss($, ($) => sh.ph.literal("too many items"))
                        case 'missing option item': return pt.ss($, ($) => sh.ph.literal("missing option item"))
                        case 'option item is not a text': return pt.ss($, ($) => sh.ph.literal("option item is not a text"))
                        case 'missing value item': return pt.ss($, ($) => sh.ph.literal("missing value item"))
                        default: return pt.au($[0])
                    }
                }))
                case 'text': return pt.ss($, ($) => pt.decide.state($, ($) => {
                    switch ($[0]) {
                        case 'wrong type': return pt.ss($, ($) => sh.ph.literal("wrong type, expected text"))
                        default: return pt.au($[0])
                    }
                }))
                default: return pt.au($[0])
            }
        })
    ])
}

