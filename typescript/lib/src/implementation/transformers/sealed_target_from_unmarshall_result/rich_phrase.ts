import * as p_ from 'pareto-core/implementation/transformer'


//schemas
import type * as s_in from "../../../schemas/sealed_target_from_unmarshall_result.js"
import type * as s_out from "pareto-fountain-pen/modules/rich_phrase/schemas/rich_phrase/schema"


export type Found = p_.Transformer<
    s_in.Found,
    s_out.Phrase
>
export type Error = p_.Transformer<
    s_in.Error,
    s_out.Phrase
>


//dependencies

//shorthands
import * as sh from "pareto-fountain-pen/modules/rich_phrase/schemas/rich_phrase/shorthands/deprecated"


export const Found: Found = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'dictionary': return p_.option($, ($) => sh.ph.text("dictionary"))
            case 'group': return p_.option($, ($) => sh.ph.text("group"))
            case 'list': return p_.option($, ($) => sh.ph.text("list"))
            case 'nothing': return p_.option($, ($) => sh.ph.text("nothing"))
            case 'optional': return p_.option($, ($) => sh.ph.text("optional"))
            case 'state': return p_.option($, ($) => sh.ph.text("state"))
            case 'text': return p_.option($, ($) => sh.ph.composed([
                sh.ph.text("text ("),
                sh.ph.text($.value),
                sh.ph.text(")")
            ]))
            case 'include': return p_.option($, ($) => sh.ph.text("include"))
            case 'missing data': return p_.option($, ($) => sh.ph.text("missing data"))
            default: return p_.exhaustive($[0])
        }
    })

export const Error: Error = ($) => {
        return sh.ph.composed([
            p_.from.state($.type).decide(
                ($) => {
                    switch ($[0]) {
                        case 'boolean': return p_.option($, ($) => p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'wrong type': return p_.option($, ($) => sh.ph.text("wrong type, expected boolean"))
                                    default: return p_.exhaustive($[0])
                                }
                            }))
                        case 'dictionary': return p_.option($, ($) => p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'wrong type': return p_.option($, ($) => sh.ph.composed([
                                        sh.ph.text("wrong type, expected 'dictionary', found '"),
                                        Found($),
                                        sh.ph.text("'")
                                    ]))
                                    case 'foo': return p_.option($, ($) => sh.ph.text("foo"))
                                    default: return p_.exhaustive($[0])
                                }
                            }))
                        case 'group': return p_.option($, ($) => p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'missing property': return p_.option($, ($) => sh.ph.composed([
                                        sh.ph.text("missing property: '"),
                                        sh.ph.text($.name),
                                        sh.ph.text("'")
                                    ]))
                                    case 'missing property value': return p_.option($, ($) => sh.ph.composed([
                                        sh.ph.text("missing property value: '"),
                                        sh.ph.text($.name),
                                        sh.ph.text("'")
                                    ]))
                                    case 'unknown property': return p_.option($, ($) => sh.ph.composed([
                                        sh.ph.text("unknown property: '"),
                                        sh.ph.text($.name),
                                        sh.ph.text("'")
                                    ]))
                                    case 'multiple instances for property': return p_.option($, ($) => sh.ph.composed([
                                        sh.ph.text("multiple instances for property: '"),
                                        sh.ph.text($.name),
                                        sh.ph.text("'")
                                    ]))
                                    case 'wrong type': return p_.option($, ($) => sh.ph.text("wrong type, expected group"))
                                    default: return p_.exhaustive($[0])
                                }
                            }))
                        case 'list': return p_.option($, ($) => p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'wrong type': return p_.option($, ($) => sh.ph.text("wrong type, expected list"))
                                    default: return p_.exhaustive($[0])
                                }
                            }))
                        case 'number': return p_.option($, ($) => p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'wrong type': return p_.option($, ($) => sh.ph.text("wrong type, expected number"))
                                    default: return p_.exhaustive($[0])
                                }
                            }))
                        case 'optional': return p_.option($, ($) => p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'wrong type': return p_.option($, ($) => sh.ph.text("wrong type, expected optional"))
                                    case 'foo': return p_.option($, ($) => sh.ph.text("foo"))
                                    default: return p_.exhaustive($[0])
                                }
                            }))
                        case 'reference': return p_.option($, ($) => p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'wrong type': return p_.option($, ($) => sh.ph.text("wrong type, expected reference"))
                                    default: return p_.exhaustive($[0])
                                }
                            }))
                        case 'state': return p_.option($, ($) => p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'wrong type': return p_.option($, ($) => sh.ph.composed([
                                        sh.ph.text("wrong type, expected 'state', found '"),
                                        Found($),
                                        sh.ph.text("'")
                                    ]))
                                    case 'missing data': return p_.option($, ($) => sh.ph.text("missing data"))
                                    case 'unknown option': return p_.option($, ($) => sh.ph.text("unknown option"))
                                    case 'too many items': return p_.option($, ($) => sh.ph.text("too many items"))
                                    case 'missing option item': return p_.option($, ($) => sh.ph.text("missing option item"))
                                    case 'option item is not a text': return p_.option($, ($) => sh.ph.text("option item is not a text"))
                                    case 'missing value item': return p_.option($, ($) => sh.ph.text("missing value item"))
                                    default: return p_.exhaustive($[0])
                                }
                            }))
                        case 'text': return p_.option($, ($) => p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'wrong type': return p_.option($, ($) => sh.ph.text("wrong type, expected text"))
                                    default: return p_.exhaustive($[0])
                                }
                            }))
                        default: return p_.exhaustive($[0])
                    }
                })
        ])
    }

