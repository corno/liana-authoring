import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'

//data types
import * as d_in from "../../../../interface/generated/liana/schemas/unmarshall_errors/data"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//dependencies

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

export const Error_Type_Error = (
    $: d_in.Errors.L.type_.error,
): d_out.Phrase => _p.decide.state($, ($) => {
    switch ($[0]) {
        case 'duplicate entry': return _p.ss($, ($) => sh.ph.composed([
            sh.ph.literal("duplicate entry \""),
            sh.ph.literal($.name),
            sh.ph.literal("\"")
        ]))
        case 'duplicate property': return _p.ss($, ($) => sh.ph.composed([
            sh.ph.literal("duplicate property \""),
            sh.ph.literal($.name),
            sh.ph.literal("\"")
        ]))
        case 'invalid value type': return _p.ss($, ($) => sh.ph.composed([
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
        case 'state': return _p.ss($, ($) => _p.decide.state($, ($) => {
            switch ($[0]) {
                case 'missing option name': return _p.ss($, ($) => sh.ph.literal("missing option name"))
                case 'missing option': return _p.ss($, ($) => sh.ph.literal("missing option"))
                case 'missing value': return _p.ss($, ($) => sh.ph.literal("missing value"))
                case 'more than 2 items': return _p.ss($, ($) => sh.ph.literal("more than 2 items"))
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
        case 'missing value':  return _p.ss($, ($) => sh.ph.composed([
            sh.ph.literal("missing value")
        ]))
        default: return _p.au($[0])
    }
})

export const Error_Type_Warning = (
    $: d_in.Errors.L.type_.warning,
): d_out.Phrase => _p.decide.state($, ($) => {
    switch ($[0]) {
        case 'expected apostrophed text': return _p.ss($, ($) => sh.ph.literal("Expected a text with apostrophes (')"))
        case 'expected backticked text': return _p.ss($, ($) => sh.ph.literal("Expected a text with backticks (`)"))
        case 'expected quoted text': return _p.ss($, ($) => sh.ph.literal("Expected a text with quotes (\")"))
        case 'expected undelimited text': return _p.ss($, ($) => sh.ph.literal("Expected a text without delimiters"))
        case 'expected a group': return _p.ss($, ($) => sh.ph.literal("Expected a group"))
        default: return _p.au($[0])
    }
})