import * as p_ from 'pareto-core/implementation/transformer'

import type * as s_in from "../../../interface/schemas/unmarshall_errors.js"
namespace declarations {
    export type Error = p_.Transformer<
        s_in.Errors.L,
        s_out.Phrase.composed
    >
}

//dependencies

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose_simple/deprecated"

export const Error: declarations.Error = ($) => p_.from.state($.type).decide(
    ($) => {
        switch ($[0]) {
            case 'dictionary': return p_.option($, ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'duplicate entry': return p_.option($, ($) => p_.literal.list([
                            sh.ph.text("duplicate entry \""),
                            sh.ph.text($.name),
                            sh.ph.text("\"")
                        ]))

                        default: return p_.exhaustive($[0])
                    }
                }))
            case 'value': return p_.option($, ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'invalid type': return p_.option($, ($) => p_.literal.list([
                            sh.ph.text("invalid value type, expected "),
                            sh.ph.rich_phrase(
                                p_.from.list($.expected).flatten(
                                    ($) => p_.literal.list([
                                        sh.ph.text("'"),
                                        sh.ph.text($[0]),
                                        sh.ph.text("'")
                                    ])),
                                sh.ph.text(" something"),
                                sh.ph.nothing(),
                                sh.ph.text(" or "),
                                sh.ph.nothing(),

                            )
                        ]))
                        case 'missing': return p_.option($, ($) => p_.literal.list([
                            sh.ph.text("missing value")
                        ]))

                        default: return p_.exhaustive($[0])
                    }
                }))
            case 'group': return p_.option($, ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'duplicate property': return p_.option($, ($) => p_.literal.list([
                            sh.ph.text("duplicate property \""),
                            sh.ph.text($.name),
                            sh.ph.text("\"")
                        ]))
                        case 'missing property': return p_.option($, ($) => p_.literal.list([
                            sh.ph.text("missing property '"),
                            sh.ph.text($.name),
                            sh.ph.text("'")
                        ]))
                        case 'missing property value': return p_.option($, ($) => p_.literal.list([
                            sh.ph.text("missing property value'"),
                            sh.ph.text($.name),
                            sh.ph.text("'")
                        ]))
                        case 'superfluous property': return p_.option($, ($) => p_.literal.segmented_list([
                            p_.literal.list([
                                sh.ph.text("superfluous property"),
                            ]),
                            p_.from.optional($.name).decide(
                                ($) => p_.literal.list([
                                    sh.ph.text(" '"),
                                    sh.ph.text($),
                                    sh.ph.text("'")
                                ]),
                                () => p_.literal.list([])
                            )
                        ]))

                        default: return p_.exhaustive($[0])
                    }
                }))
            case 'state': return p_.option($, ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'missing option name': return p_.option($, ($) => p_.literal.list([
                            sh.ph.text("missing option name")
                        ]))
                        case 'missing option': return p_.option($, ($) => p_.literal.list([
                            sh.ph.text("missing option")
                        ]))
                        case 'missing value': return p_.option($, ($) => p_.literal.list([
                            sh.ph.text("missing value")
                        ]))
                        case 'more than 2 items in list': return p_.option($, ($) => p_.literal.list([
                            sh.ph.text("more than 2 items in list")
                        ]))
                        case 'option name is not a text': return p_.option($, ($) => p_.literal.list([
                            sh.ph.text("option name is not a text")
                        ]))
                        case 'unknown option': return p_.option($, ($) => p_.literal.segmented_list([
                            p_.literal.list([
                                sh.ph.text("unknown option: '"),
                                sh.ph.text($.found),
                                sh.ph.text("', expected one of "),
                            ]),
                            p_.from.dictionary($.expected,).convert_to_list(
                                ($, id) => sh.ph.composed([
                                    sh.ph.text("'"),
                                    sh.ph.text(id),
                                    sh.ph.text("'")
                                ])
                            )
                        ]))
                        default: return p_.exhaustive($[0])
                    }
                }))
            default: return p_.exhaustive($[0])
        }
    })