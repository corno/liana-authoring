import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/unmarshall_result"
import * as d_out from "../../../../interface/generated/liana/schemas/unmarshall_errors/data"

//dependencies
import * as t_astn_parse_tree_to_location from "astn-core/dist/implementation/manual/transformers/parse_tree/start_token_range"

export type Document = p_i.Transformer<
    d_in.Document,
    d_out.Warnings
>

export type Value = p_i.Transformer<
    d_in.Value,
    d_out.Warnings
>


export const Document: Document = ($) => {
    return Value(
        $.content,
    )
}

export const Value: Value = ($) => {
    const start_token_range = t_astn_parse_tree_to_location.Value($.instance)
    return p_.from.state($['unmarshall result']).decide(
        ($) => {
            switch ($[0]) {
                case 'error': return p_.ss($, ($) => p_.literal.list([
                ]))
                case 'success': return p_.ss($, ($) => p_.from.state($).decide(
                    ($): d_out.Warnings => {
                        switch ($[0]) {
                            case 'dictionary': return p_.ss($, ($) => p_.from.list($.intermediate['entries as list']).flatten(
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
                                                case 'set': return p_.ss($, ($) => Value($))
                                                case 'not set': return p_.ss($, ($) => p_.literal.list<d_out.Warnings.L>([]))
                                                default: return p_.au($[0])
                                            }
                                        })
                            ))
                            case 'group': return p_.ss($, ($) => $.intermediate.instance[0] !== 'group'
                                ? p_.literal.list([
                                    {
                                        'range': start_token_range,
                                        'type': ['expected a group', null]
                                    }
                                ])
                                : p_.from.state($.derived.style).decide(
                                    ($) => {
                                        switch ($[0]) {
                                            case 'concise': return p_.ss($, ($) => p_.from.list($.properties).flatten(
                                                ($) => {
                                                    return p_.from.state($['definition found']).decide(
                                                        ($) => {
                                                            switch ($[0]) {
                                                                case 'no': return p_.ss($, ($) => p_.literal.list([]))
                                                                case 'yes': return p_.ss($, ($) => Value($['value']))
                                                                default: return p_.au($[0])
                                                            }
                                                        })
                                                }
                                            ))
                                            case 'verbose': return p_.ss($, ($) => p_.from.list($.properties).flatten<d_out.Warnings.L>(
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
                                                                case 'yes': return p_.ss($, ($) => p_.from.optional($['value']).decide(
                                                                    ($) => Value($),
                                                                    (): d_out.Warnings => p_.literal.list([])
                                                                ))
                                                                case 'no': return p_.ss($, ($) => p_.literal.list([
                                                                ]))
                                                                default: return p_.au($[0])
                                                            }
                                                        })
                                            ))
                                            default: return p_.au($[0])
                                        }
                                    }))
                            case 'simple': return p_.ss($, ($) => p_.from.state($.instance.token.type).decide(
                                ($): boolean => {
                                    switch ($[0]) {
                                        case 'quoted': return false
                                        case 'apostrophed': return true
                                        case 'undelimited': return false
                                        case 'backticked': return true
                                        default: return p_.au($[0])
                                    }
                                })
                                ? p_.literal.list<d_out.Warnings.L>([{
                                    'range': $.instance.range,
                                    'type': ['expected undelimited text', null]
                                }])
                                : p_.literal.list([])
                            )
                            case 'list': return p_.ss($, ($) => p_.from.list($.derived.items    ).flatten(
                                ($) => Value($)
                            ))
                            case 'nothing': return p_.ss($, ($) => p_.literal.list([]))
                            case 'reference': return p_.ss($, ($) => p_.from.state($.type).decide(
                                ($): d_out.Warnings => {
                                    switch ($[0]) {
                                        case 'derived': return p_.ss($, ($) => p_.literal.list([
                                        ]))
                                        case 'selected': return p_.ss($, ($) => $.intermediate.instance.token.type[0] !== 'apostrophed'
                                            ? p_.literal.list([{
                                                'range': $.intermediate.instance.range,
                                                'type': ['expected apostrophed text', null]
                                            }])
                                            : p_.literal.list([]))
                                        default: return p_.au($[0])
                                    }
                                }))
                            case 'component': return p_.ss($, ($) => Value($.value))
                            case 'optional': return p_.ss($, ($) => p_.from.state($.derived.status).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'set': return p_.ss($, ($) => Value($['child value']))
                                        case 'not set': return p_.ss($, ($) => p_.literal.list([]))
                                        default: return p_.au($[0])
                                    }
                                }))
                            case 'state': return p_.ss($, ($): d_out.Warnings => {
                                return p_.from.state($.derived['option status']).decide(
                                    ($): d_out.Warnings => {
                                        switch ($[0]) {
                                            case 'missing data': return p_.ss($, ($) => p_.literal.list([]))
                                            case 'set': return p_.ss($, ($) => $.intermediate['option token'].token.type[0] !== 'backticked'
                                                ? p_.literal.list([
                                                    {
                                                        'range': $.intermediate['option token'].range,
                                                        'type': ['expected apostrophed text', null]
                                                    }
                                                ])
                                                : Value($.value))
                                            default: return p_.au($[0])
                                        }
                                    })
                            })
                            case 'text': return p_.ss($, ($) => $.instance.token.type[0] !== 'quoted'
                                ? p_.literal.list([
                                    {
                                        'range': $.instance.range,
                                        'type': ['expected quoted text', null]
                                    }

                                ])
                                : p_.literal.list([]))
                            default: return p_.au($[0])
                        }
                    }))
                default: return p_.au($[0])
            }
        })
}