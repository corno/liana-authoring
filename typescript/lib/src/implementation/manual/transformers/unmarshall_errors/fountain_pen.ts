import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/generated/liana/schemas/unmarshall_errors/data"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//dependencies

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

export const Error: p_i.Transformer<
    d_in.Errors.L,
    d_out.Phrase
> = ($) => p_.from.state($.type).decide(
    ($) => {
        switch ($[0]) {
            case 'dictionary': return p_.ss($, ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'duplicate entry': return p_.ss($, ($) => sh.ph.composed([
                            sh.ph.literal("duplicate entry \""),
                            sh.ph.literal($.name),
                            sh.ph.literal("\"")
                        ]))

                        default: return p_.au($[0])
                    }
                }))
            case 'value': return p_.ss($, ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'invalid type': return p_.ss($, ($) => sh.ph.composed([
                            sh.ph.literal("invalid value type, expected "),
                            sh.ph.rich(
                                p_.from.list($.expected).map(
                                    ($) => sh.ph.composed([
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
                        case 'missing': return p_.ss($, ($) => sh.ph.composed([
                            sh.ph.literal("missing value")
                        ]))

                        default: return p_.au($[0])
                    }
                }))
            case 'group': return p_.ss($, ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'duplicate property': return p_.ss($, ($) => sh.ph.composed([
                            sh.ph.literal("duplicate property \""),
                            sh.ph.literal($.name),
                            sh.ph.literal("\"")
                        ]))
                        case 'missing property': return p_.ss($, ($) => sh.ph.composed([
                            sh.ph.literal("missing property '"),
                            sh.ph.literal($.name),
                            sh.ph.literal("'")
                        ]))
                        case 'missing property value': return p_.ss($, ($) => sh.ph.composed([
                            sh.ph.literal("missing property value'"),
                            sh.ph.literal($.name),
                            sh.ph.literal("'")
                        ]))
                        case 'superfluous property': return p_.ss($, ($) => sh.ph.composed([
                            sh.ph.literal("superfluous property"),
                            p_.from.optional($.name).decide(
                                ($) => sh.ph.composed([
                                    sh.ph.literal(" '"),
                                    sh.ph.literal($),
                                    sh.ph.literal("'")
                                ]),
                                () => sh.ph.nothing()
                            )
                        ]))

                        default: return p_.au($[0])
                    }
                }))
            case 'state': return p_.ss($, ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'missing option name': return p_.ss($, ($) => sh.ph.literal("missing option name"))
                        case 'missing option': return p_.ss($, ($) => sh.ph.literal("missing option"))
                        case 'missing value': return p_.ss($, ($) => sh.ph.literal("missing value"))
                        case 'more than 2 items in list': return p_.ss($, ($) => sh.ph.literal("more than 2 items in list"))
                        case 'option name is not a text': return p_.ss($, ($) => sh.ph.literal("option name is not a text"))
                        case 'unknown option': return p_.ss($, ($) => sh.ph.composed([
                            sh.ph.literal("unknown option: '"),
                            sh.ph.literal($.found),
                            sh.ph.literal("', expected one of "),
                            sh.ph.composed(
                                p_.from.dictionary($.expected,
                                ).convert_to_list(
                                    ($, id) => sh.ph.composed([
                                        sh.ph.literal("'"),
                                        sh.ph.literal(id),
                                        sh.ph.literal("'")
                                    ])
                                )
                            )
                        ]))
                        default: return p_.au($[0])
                    }
                }))
            default: return p_.au($[0])
        }
    })