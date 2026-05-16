import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'

//data types
import * as d_in from "../../../../interface/generated/liana/schemas/unmarshall_errors/data"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//dependencies

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

export const Error = (
    $: d_in.Errors.L,
): d_out.Phrase => _p.decide.state($.type, ($) => {
    switch ($[0]) {
        case 'dictionary': return _p.ss($, ($) => _p.decide.state($, ($) => {
            switch ($[0]) {
                case 'duplicate entry': return _p.ss($, ($) => sh.ph.composed([
                    sh.ph.literal("duplicate entry \""),
                    sh.ph.literal($.name),
                    sh.ph.literal("\"")
                ]))

                default: return _p.au($[0])
            }
        }))
        case 'value': return _p.ss($, ($) => _p.decide.state($, ($) => {
            switch ($[0]) {
                case 'invalid type': return _p.ss($, ($) => sh.ph.composed([
                    sh.ph.literal("invalid value type, expected "),
                    sh.ph.rich(
                        $.expected.__l_map(($) => sh.ph.composed([
                            sh.ph.literal("'"),
                            sh.ph.literal($[0]),
                            sh.ph.literal("'")
                        ])),
                        sh.ph.literal(" something"),
                        sh.ph.nothing(),
                        sh.ph.literal(" or "),
                        sh.ph.nothing(),

                    )
                ]))
                case 'missing': return _p.ss($, ($) => sh.ph.composed([
                    sh.ph.literal("missing value")
                ]))

                default: return _p.au($[0])
            }
        }))
        case 'group': return _p.ss($, ($) => _p.decide.state($, ($) => {
            switch ($[0]) {
                case 'duplicate property': return _p.ss($, ($) => sh.ph.composed([
                    sh.ph.literal("duplicate property \""),
                    sh.ph.literal($.name),
                    sh.ph.literal("\"")
                ]))
                case 'missing property': return _p.ss($, ($) => sh.ph.composed([
                    sh.ph.literal("missing property '"),
                    sh.ph.literal($.name),
                    sh.ph.literal("'")
                ]))
                case 'missing property value': return _p.ss($, ($) => sh.ph.composed([
                    sh.ph.literal("missing property value'"),
                    sh.ph.literal($.name),
                    sh.ph.literal("'")
                ]))
                case 'superfluous property': return _p.ss($, ($) => sh.ph.composed([
                    sh.ph.literal("superfluous property"),
                    $.name.__decide(
                        ($) => sh.ph.composed([
                            sh.ph.literal(" '"),
                            sh.ph.literal($),
                            sh.ph.literal("'")
                        ]),
                        () => sh.ph.nothing()
                    )
                ]))

                default: return _p.au($[0])
            }
        }))
        case 'state': return _p.ss($, ($) => _p.decide.state($, ($) => {
            switch ($[0]) {
                case 'missing option name': return _p.ss($, ($) => sh.ph.literal("missing option name"))
                case 'missing option': return _p.ss($, ($) => sh.ph.literal("missing option"))
                case 'missing value': return _p.ss($, ($) => sh.ph.literal("missing value"))
                case 'more than 2 items in list': return _p.ss($, ($) => sh.ph.literal("more than 2 items in list"))
                case 'option name is not a text': return _p.ss($, ($) => sh.ph.literal("option name is not a text"))
                case 'unknown option': return _p.ss($, ($) => sh.ph.composed([
                    sh.ph.literal("unknown option: '"),
                    sh.ph.literal($.found),
                    sh.ph.literal("', expected one of "),
                    sh.ph.composed(
                        _p.list.from.dictionary(
                            $.expected,
                        ).convert(
                            ($, id) => sh.ph.composed([
                                sh.ph.literal("'"),
                                sh.ph.literal(id),
                                sh.ph.literal("'")
                            ])
                        )
                    )
                ]))
                default: return _p.au($[0])
            }
        }))
        default: return _p.au($[0])
    }
})