import * as pt from 'pareto-core/dist/implementation/transformer'
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
    return pt.decide.state($['unmarshall result'], ($) => {
        switch ($[0]) {
            case 'error': return pt.ss($, ($) => pt.literal.list([
            ]))
            case 'success': return pt.ss($, ($) => pt.decide.state($, ($): d_out.Warnings => {
                switch ($[0]) {
                    case 'dictionary': return pt.ss($, ($) => pt.list.from.list(
                        $.intermediate['entries as list'],
                    ).flatten(
                        ($) => $.intermediate['id value pair'].id.token.type[0] !== 'apostrophed'
                            ? pt.literal.list([
                                {
                                    'range': $.intermediate['id value pair'].id.range,
                                    'type': ['expected apostrophed text', null]
                                }
                            ])
                            : pt.decide.state($.value, ($) => {
                                switch ($[0]) {
                                    case 'set': return pt.ss($, ($) => Value($))
                                    case 'not set': return pt.ss($, ($) => pt.literal.list<d_out.Warnings.L>([]))
                                    default: return pt.au($[0])
                                }
                            })
                    ))
                    case 'group': return pt.ss($, ($) => $.intermediate.instance[0] !== 'group'
                        ? pt.literal.list([
                            {
                                'range': start_token_range,
                                'type': ['expected a group', null]
                            }
                        ])
                        : pt.decide.state($.derived.style, ($) => {
                            switch ($[0]) {
                                case 'concise': return pt.ss($, ($) => pt.list.from.list(
                                    $.properties
                                ).flatten(
                                    ($) => {
                                        return pt.decide.state($['definition found'], ($) => {
                                            switch ($[0]) {
                                                case 'no': return pt.ss($, ($) => pt.literal.list([]))
                                                case 'yes': return pt.ss($, ($) => Value($['value']))
                                                default: return pt.au($[0])
                                            }
                                        })
                                    }
                                ))
                                case 'verbose': return pt.ss($, ($) => pt.list.from.list(
                                    $.properties,
                                ).flatten<d_out.Warnings.L>(
                                    ($) => $.intermediate['id value pair'].id.token.type[0] !== 'backticked'
                                        ? pt.literal.list([
                                            {
                                                'range': $.intermediate['id value pair'].id.range,
                                                'type': ['expected backticked text', null]
                                            }
                                        ])
                                        : pt.decide.state($['definition found'], ($) => {
                                            switch ($[0]) {
                                                case 'yes': return pt.ss($, ($) => $['value'].__decide(
                                                    ($) => Value($),
                                                    (): d_out.Warnings => pt.literal.list([])
                                                ))
                                                case 'no': return pt.ss($, ($) => pt.literal.list([
                                                ]))
                                                default: return pt.au($[0])
                                            }
                                        })
                                ))
                                default: return pt.au($[0])
                            }
                        }))
                    case 'simple': return pt.ss($, ($) => pt.decide.state($.instance.token.type, ($): boolean => {
                        switch ($[0]) {
                            case 'quoted': return false
                            case 'apostrophed': return true
                            case 'undelimited': return false
                            case 'backticked': return true
                            default: return pt.au($[0])
                        }
                    })
                        ? pt.literal.list<d_out.Warnings.L>([{
                            'range': $.instance.range,
                            'type': ['expected undelimited text', null]
                        }])
                        : pt.literal.list([])
                    )
                    case 'list': return pt.ss($, ($) => pt.list.from.list(
                        $.derived.items
                    ).flatten(
                        ($) => Value($)
                    ))
                    case 'nothing': return pt.ss($, ($) => pt.literal.list([]))
                    case 'reference': return pt.ss($, ($) => pt.decide.state($.type, ($): d_out.Warnings => {
                        switch ($[0]) {
                            case 'derived': return pt.ss($, ($) => pt.literal.list([
                            ]))
                            case 'selected': return pt.ss($, ($) => $.intermediate.instance.token.type[0] !== 'apostrophed'
                                ? pt.literal.list([{
                                    'range': $.intermediate.instance.range,
                                    'type': ['expected apostrophed text', null]
                                }])
                                : pt.literal.list([]))
                            default: return pt.au($[0])
                        }
                    }))
                    case 'component': return pt.ss($, ($) => Value($.value))
                    case 'optional': return pt.ss($, ($) => pt.decide.state($.derived.status, ($) => {
                        switch ($[0]) {
                            case 'set': return pt.ss($, ($) => Value($['child value']))
                            case 'not set': return pt.ss($, ($) => pt.literal.list([]))
                            default: return pt.au($[0])
                        }
                    }))
                    case 'state': return pt.ss($, ($): d_out.Warnings => {
                        return pt.decide.state($.derived['option status'], ($): d_out.Warnings => {
                            switch ($[0]) {
                                case 'missing data': return pt.ss($, ($) => pt.literal.list([]))
                                case 'set': return pt.ss($, ($) => $.intermediate['option token'].token.type[0] !== 'backticked'
                                    ? pt.literal.list([
                                        {
                                            'range': $.intermediate['option token'].range,
                                            'type': ['expected apostrophed text', null]
                                        }
                                    ])
                                    : Value($.value))
                                default: return pt.au($[0])
                            }
                        })
                    })
                    case 'text': return pt.ss($, ($) => $.instance.token.type[0] !== 'quoted'
                        ? pt.literal.list([
                            {
                                'range': $.instance.range,
                                'type': ['expected quoted text', null]
                            }

                        ])
                        : pt.literal.list([]))
                    default: return pt.au($[0])
                }
            }))
            default: return pt.au($[0])
        }
    })
}