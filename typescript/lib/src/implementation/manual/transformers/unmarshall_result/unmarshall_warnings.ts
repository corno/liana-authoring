import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'

//data types
import * as d_in from "../../../../interface/to_be_generated/unmarshall_result"
import * as d_out from "../../../../interface/generated/liana/schemas/unmarshall_errors/data"

//dependencies
import * as t_astn_parse_tree_to_location from "astn-core/dist/implementation/manual/transformers/parse_tree/start_token_range"

export type Document = _pi.Transformer<
    d_in.Document,
    d_out.Warnings
>

export type Value = _pi.Transformer<
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
    return _p.decide.state($['unmarshall result'], ($) => {
        switch ($[0]) {
            case 'error': return _p.ss($, ($) => _p.list.literal([
            ]))
            case 'success': return _p.ss($, ($) => _p.decide.state($, ($): d_out.Warnings => {
                switch ($[0]) {
                    case 'dictionary': return _p.ss($, ($) => _p.list.from.list(
                        $.intermediate['entries as list'],
                    ).flatten(
                        ($) => $.intermediate['id value pair'].id.token.type[0] !== 'apostrophed'
                            ? _p.list.literal([
                                {
                                    'range': $.intermediate['id value pair'].id.range,
                                    'type': ['expected apostrophed text', null]
                                }
                            ])
                            : _p.decide.state($.value, ($) => {
                                switch ($[0]) {
                                    case 'set': return _p.ss($, ($) => Value($))
                                    case 'not set': return _p.ss($, ($) => _p.list.literal<d_out.Warnings.L>([]))
                                    default: return _p.au($[0])
                                }
                            })
                    ))
                    case 'group': return _p.ss($, ($) => $.intermediate.instance[0] !== 'group'
                        ? _p.list.literal([
                            {
                                'range': start_token_range,
                                'type': ['expected a group', null]
                            }
                        ])
                        : _p.decide.state($.derived.style, ($) => {
                            switch ($[0]) {
                                case 'concise': return _p.ss($, ($) => _p.list.from.list(
                                    $.properties
                                ).flatten(
                                    ($) => {
                                        return _p.decide.state($['definition found'], ($) => {
                                            switch ($[0]) {
                                                case 'no': return _p.ss($, ($) => _p.list.literal([]))
                                                case 'yes': return _p.ss($, ($) => Value($['property value']))
                                                default: return _p.au($[0])
                                            }
                                        })
                                    }
                                ))
                                case 'verbose': return _p.ss($, ($) => _p.list.from.list(
                                    $.properties,
                                ).flatten<d_out.Warnings.L>(
                                    ($) => $.intermediate['id value pair'].id.token.type[0] !== 'backticked'
                                        ? _p.list.literal([
                                            {
                                                'range': $.intermediate['id value pair'].id.range,
                                                'type': ['expected backticked text', null]
                                            }
                                        ])
                                        : _p.decide.state($['definition found'], ($) => {
                                            switch ($[0]) {
                                                case 'yes': return _p.ss($, ($) => $['property value'].__decide(
                                                    ($) => Value($),
                                                    (): d_out.Warnings => _p.list.literal([])
                                                ))
                                                case 'no': return _p.ss($, ($) => _p.list.literal([
                                                ]))
                                                default: return _p.au($[0])
                                            }
                                        })
                                ))
                                default: return _p.au($[0])
                            }
                        }))
                    case 'simple': return _p.ss($, ($) => _p.decide.state($.instance.token.type, ($) => {
                        switch ($[0]) {
                            case 'quoted': return false
                            case 'apostrophed': return true
                            case 'undelimited': return false
                            case 'backticked': return true
                            default: return _p.au($[0])
                        }
                    })
                        ? _p.list.literal<d_out.Warnings.L>([{
                            'range': $.instance.range,
                            'type': ['expected undelimited text', null]
                        }])
                        : _p.list.literal([])
                    )
                    case 'list': return _p.ss($, ($) => _p.list.from.list(
                        $.derived.items
                    ).flatten(
                        ($) => Value($)
                    ))
                    case 'nothing': return _p.ss($, ($) => _p.list.literal([]))
                    case 'reference': return _p.ss($, ($) => _p.decide.state($.type, ($): d_out.Warnings => {
                        switch ($[0]) {
                            case 'derived': return _p.ss($, ($) => _p.list.literal([
                            ]))
                            case 'selected': return _p.ss($, ($) => $.intermediate.instance.token.type[0] !== 'apostrophed'
                                ? _p.list.literal([{
                                    'range': $.intermediate.instance.range,
                                    'type': ['expected apostrophed text', null]
                                }])
                                : _p.list.literal([]))
                            default: return _p.au($[0])
                        }
                    }))
                    case 'component': return _p.ss($, ($) => Value($.value))
                    case 'optional': return _p.ss($, ($) => _p.decide.state($.derived.status, ($) => {
                        switch ($[0]) {
                            case 'set': return _p.ss($, ($) => Value($['child value']))
                            case 'not set': return _p.ss($, ($) => _p.list.literal([]))
                            default: return _p.au($[0])
                        }
                    }))
                    case 'state': return _p.ss($, ($): d_out.Warnings => {
                        return _p.decide.state($.derived['option status'], ($): d_out.Warnings => {
                            switch ($[0]) {
                                case 'missing data': return _p.ss($, ($) => _p.list.literal([]))
                                case 'set': return _p.ss($, ($) => $.intermediate['option token'].token.type[0] !== 'backticked'
                                    ? _p.list.literal([
                                        {
                                            'range': $.intermediate['option token'].range,
                                            'type': ['expected apostrophed text', null]
                                        }
                                    ])
                                    : Value($.value))
                                default: return _p.au($[0])
                            }
                        })
                    })
                    case 'text': return _p.ss($, ($) => $.instance.token.type[0] !== 'quoted'
                        ? _p.list.literal([
                            {
                                'range': $.instance.range,
                                'type': ['expected quoted text', null]
                            }

                        ])
                        : _p.list.literal([]))
                    default: return _p.au($[0])
                }
            }))
            default: return _p.au($[0])
        }
    })
}