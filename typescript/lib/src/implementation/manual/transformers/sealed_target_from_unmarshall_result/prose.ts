import * as p_ from 'pareto-core/implementation/transformer'

import type * as interface_ from "../../../../declarations/transformers/sealed_target_from_unmarshall_result/prose.js"

//dependencies

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"


export const Found: interface_.Found = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'dictionary': return p_.option($, ($) => sh.ph.literal("dictionary"))
            case 'group': return p_.option($, ($) => sh.ph.literal("group"))
            case 'list': return p_.option($, ($) => sh.ph.literal("list"))
            case 'nothing': return p_.option($, ($) => sh.ph.literal("nothing"))
            case 'optional': return p_.option($, ($) => sh.ph.literal("optional"))
            case 'state': return p_.option($, ($) => sh.ph.literal("state"))
            case 'text': return p_.option($, ($) => sh.ph.composed([
                sh.ph.literal("text ("),
                sh.ph.literal($.value),
                sh.ph.literal(")")
            ]))
            case 'include': return p_.option($, ($) => sh.ph.literal("include"))
            case 'missing data': return p_.option($, ($) => sh.ph.literal("missing data"))
            default: return p_.exhaustive($[0])
        }
    })

export const Error: interface_.Error = ($) => {
        return sh.ph.composed([
            p_.from.state($.type).decide(
                ($) => {
                    switch ($[0]) {
                        case 'boolean': return p_.option($, ($) => p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'wrong type': return p_.option($, ($) => sh.ph.literal("wrong type, expected boolean"))
                                    default: return p_.exhaustive($[0])
                                }
                            }))
                        case 'dictionary': return p_.option($, ($) => p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'wrong type': return p_.option($, ($) => sh.ph.composed([
                                        sh.ph.literal("wrong type, expected 'dictionary', found '"),
                                        Found($),
                                        sh.ph.literal("'")
                                    ]))
                                    case 'foo': return p_.option($, ($) => sh.ph.literal("foo"))
                                    default: return p_.exhaustive($[0])
                                }
                            }))
                        case 'group': return p_.option($, ($) => p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'missing property': return p_.option($, ($) => sh.ph.composed([
                                        sh.ph.literal("missing property: '"),
                                        sh.ph.literal($.name),
                                        sh.ph.literal("'")
                                    ]))
                                    case 'missing property value': return p_.option($, ($) => sh.ph.composed([
                                        sh.ph.literal("missing property value: '"),
                                        sh.ph.literal($.name),
                                        sh.ph.literal("'")
                                    ]))
                                    case 'unknown property': return p_.option($, ($) => sh.ph.composed([
                                        sh.ph.literal("unknown property: '"),
                                        sh.ph.literal($.name),
                                        sh.ph.literal("'")
                                    ]))
                                    case 'multiple instances for property': return p_.option($, ($) => sh.ph.composed([
                                        sh.ph.literal("multiple instances for property: '"),
                                        sh.ph.literal($.name),
                                        sh.ph.literal("'")
                                    ]))
                                    case 'wrong type': return p_.option($, ($) => sh.ph.literal("wrong type, expected group"))
                                    default: return p_.exhaustive($[0])
                                }
                            }))
                        case 'list': return p_.option($, ($) => p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'wrong type': return p_.option($, ($) => sh.ph.literal("wrong type, expected list"))
                                    default: return p_.exhaustive($[0])
                                }
                            }))
                        case 'number': return p_.option($, ($) => p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'wrong type': return p_.option($, ($) => sh.ph.literal("wrong type, expected number"))
                                    default: return p_.exhaustive($[0])
                                }
                            }))
                        case 'optional': return p_.option($, ($) => p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'wrong type': return p_.option($, ($) => sh.ph.literal("wrong type, expected optional"))
                                    case 'foo': return p_.option($, ($) => sh.ph.literal("foo"))
                                    default: return p_.exhaustive($[0])
                                }
                            }))
                        case 'reference': return p_.option($, ($) => p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'wrong type': return p_.option($, ($) => sh.ph.literal("wrong type, expected reference"))
                                    default: return p_.exhaustive($[0])
                                }
                            }))
                        case 'state': return p_.option($, ($) => p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'wrong type': return p_.option($, ($) => sh.ph.composed([
                                        sh.ph.literal("wrong type, expected 'state', found '"),
                                        Found($),
                                        sh.ph.literal("'")
                                    ]))
                                    case 'missing data': return p_.option($, ($) => sh.ph.literal("missing data"))
                                    case 'unknown option': return p_.option($, ($) => sh.ph.literal("unknown option"))
                                    case 'too many items': return p_.option($, ($) => sh.ph.literal("too many items"))
                                    case 'missing option item': return p_.option($, ($) => sh.ph.literal("missing option item"))
                                    case 'option item is not a text': return p_.option($, ($) => sh.ph.literal("option item is not a text"))
                                    case 'missing value item': return p_.option($, ($) => sh.ph.literal("missing value item"))
                                    default: return p_.exhaustive($[0])
                                }
                            }))
                        case 'text': return p_.option($, ($) => p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'wrong type': return p_.option($, ($) => sh.ph.literal("wrong type, expected text"))
                                    default: return p_.exhaustive($[0])
                                }
                            }))
                        default: return p_.exhaustive($[0])
                    }
                })
        ])
    }

