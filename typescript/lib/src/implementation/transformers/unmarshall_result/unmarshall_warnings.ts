import * as p_ from 'pareto-core/implementation/transformer'

import type * as interface_ from "../../../declarations/transformers/unmarshall_result/unmarshall_warnings.js"

//schemas
import type * as s_out from "../../../schemas/unmarshall_errors.js"

//dependencies
import * as t_astn_parse_tree_to_start_token_location from "astn-core/modules/deserialization/implementation/transformers/parse_tree/start_token_range"


export const Document: interface_.Document = ($) => Value(
    $.content,
)

export const Value: interface_.Value = ($) => {
    const start_token_range = t_astn_parse_tree_to_start_token_location.Value($.instance)
    return p_.from.state($['unmarshall result']).decide(
        ($) => {
            switch ($[0]) {
                case 'error': return p_.option($, ($) => p_.literal.list([
                ]))
                case 'success': return p_.option($, ($) => p_.from.state($).decide(
                    ($): s_out.Warnings => {
                        switch ($[0]) {
                            case 'dictionary': return p_.option($, ($) => p_.from.list($.intermediate['entries as list']).flatten(
                                ($) => $.intermediate['id value pair'].id.token.type[0] !== 'apostrophed'
                                    ? p_.literal.list([
                                        {
                                            'range': $.intermediate['id value pair'].id.range,
                                            'type': ['expected apostrophed text', null]
                                        }
                                    ])
                                    : p_.from.state($.value).decide(
                                        ($) => {
                                            switch ($[0]) {
                                                case 'set': return p_.option($, ($) => Value($))
                                                case 'not set': return p_.option($, ($) => p_.literal.list<s_out.Warnings.L>([]))
                                                default: return p_.exhaustive($[0])
                                            }
                                        })
                            ))
                            case 'group': return p_.option($, ($) => $.intermediate.instance[0] !== 'group'
                                ? p_.literal.list([
                                    {
                                        'range': start_token_range,
                                        'type': ['expected a group', null]
                                    }
                                ])
                                : p_.from.state($.derived.style).decide(
                                    ($) => {
                                        switch ($[0]) {
                                            case 'concise': return p_.option($, ($) => p_.from.list($.properties).flatten(
                                                ($) => {
                                                    return p_.from.state($['definition found']).decide(
                                                        ($) => {
                                                            switch ($[0]) {
                                                                case 'no': return p_.option($, ($) => p_.literal.list([]))
                                                                case 'yes': return p_.option($, ($) => Value($['value']))
                                                                default: return p_.exhaustive($[0])
                                                            }
                                                        })
                                                }
                                            ))
                                            case 'verbose': return p_.option($, ($) => p_.from.list($.properties).flatten<s_out.Warnings.L>(
                                                ($) => $.intermediate['id value pair'].id.token.type[0] !== 'backticked'
                                                    ? p_.literal.list([
                                                        {
                                                            'range': $.intermediate['id value pair'].id.range,
                                                            'type': ['expected backticked text', null]
                                                        }
                                                    ])
                                                    : p_.from.state($['definition found']).decide(
                                                        ($) => {
                                                            switch ($[0]) {
                                                                case 'yes': return p_.option($, ($) => p_.from.optional($['value']).decide(
                                                                    ($) => Value($),
                                                                    (): s_out.Warnings => p_.literal.list([])
                                                                ))
                                                                case 'no': return p_.option($, ($) => p_.literal.list([
                                                                ]))
                                                                default: return p_.exhaustive($[0])
                                                            }
                                                        })
                                            ))
                                            default: return p_.exhaustive($[0])
                                        }
                                    }))
                            case 'simple': return p_.option($, ($) => p_.from.state($.instance.token.type).decide(
                                ($): boolean => {
                                    switch ($[0]) {
                                        case 'quoted': return false
                                        case 'apostrophed': return true
                                        case 'undelimited': return false
                                        case 'backticked': return true
                                        default: return p_.exhaustive($[0])
                                    }
                                })
                                ? p_.literal.list<s_out.Warnings.L>([{
                                    'range': $.instance.range,
                                    'type': ['expected undelimited text', null]
                                }])
                                : p_.literal.list([])
                            )
                            case 'list': return p_.option($, ($) => p_.from.list($.derived.items).flatten(
                                ($) => Value($)
                            ))
                            case 'nothing': return p_.option($, ($) => p_.literal.list([]))
                            case 'reference': return p_.option($, ($) => p_.from.state($.type).decide(
                                ($): s_out.Warnings => {
                                    switch ($[0]) {
                                        case 'derived': return p_.option($, ($) => p_.literal.list([
                                        ]))
                                        case 'selected': return p_.option($, ($) => $.intermediate.instance.token.type[0] !== 'apostrophed'
                                            ? p_.literal.list([{
                                                'range': $.intermediate.instance.range,
                                                'type': ['expected apostrophed text', null]
                                            }])
                                            : p_.literal.list([]))
                                        default: return p_.exhaustive($[0])
                                    }
                                }))
                            case 'component': return p_.option($, ($) => Value($.value))
                            case 'optional': return p_.option($, ($) => p_.from.state($.derived.status).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'set': return p_.option($, ($) => Value($['child value']))
                                        case 'not set': return p_.option($, ($) => p_.literal.list([]))
                                        default: return p_.exhaustive($[0])
                                    }
                                }))
                            case 'state': return p_.option($, ($): s_out.Warnings => {
                                return p_.from.state($.derived['option status']).decide(
                                    ($): s_out.Warnings => {
                                        switch ($[0]) {
                                            case 'missing data': return p_.option($, ($) => p_.literal.list([]))
                                            case 'set': return p_.option($, ($) => $.intermediate['option token'].token.type[0] !== 'backticked'
                                                ? p_.literal.list([
                                                    {
                                                        'range': $.intermediate['option token'].range,
                                                        'type': ['expected apostrophed text', null]
                                                    }
                                                ])
                                                : Value($.value))
                                            default: return p_.exhaustive($[0])
                                        }
                                    })
                            })
                            case 'text': return p_.option($, ($) => $.instance.token.type[0] !== 'quoted'
                                ? p_.literal.list([
                                    {
                                        'range': $.instance.range,
                                        'type': ['expected quoted text', null]
                                    }

                                ])
                                : p_.literal.list([]))
                            default: return p_.exhaustive($[0])
                        }
                    }))
                default: return p_.exhaustive($[0])
            }
        })
}