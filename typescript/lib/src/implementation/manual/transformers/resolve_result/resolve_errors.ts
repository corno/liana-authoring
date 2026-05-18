import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'

//data types
import * as d_in from "../../../../interface/to_be_generated/resolve_result"
import * as d_out from "../../../../interface/to_be_generated/resolve_errors"

//dependencies
import * as t_astn_parse_tree_to_location from "astn-core/dist/implementation/manual/transformers/parse_tree/start_token_range"

export type Document = _pi.Transformer<
    d_in.Document,
    d_out.Errors
>

export type Value = _pi.Transformer<
    d_in.Value,
    d_out.Errors
>


export const Document: Document = ($) => {
    return Value(
        $.content
    )
}

export const Value: Value = ($) => {
    const range = t_astn_parse_tree_to_location.Value($.unmarshalled.instance)
    return _p.decide.state($['unmarshall result'], ($) => {
        switch ($[0]) {
            case 'error': return _p.ss($, ($) => _p.list.literal([])) //reported by the unmarshaller, it is not the responsibility of this transformer to report them
            case 'success': return _p.ss($, ($) => _p.decide.state($, ($): d_out.Errors => {
                switch ($[0]) {
                    case 'dictionary': return _p.ss($, ($) => _p.list.from.dictionary(
                        $.entries
                    ).flatten(
                        ($) => _p.decide.state($['unmarshall result'], ($) => {
                            switch ($[0]) {
                                case 'success': return _p.ss($, ($) => _p.decide.state($.value, ($) => {
                                    switch ($[0]) {
                                        case 'set': return _p.ss($, ($) => Value($))
                                        case 'not set': return _p.ss($, ($) => _p.list.literal([]))
                                        default: return _p.au($[0])
                                    }
                                }))
                                case 'error': return _p.ss($, ($) => _p.list.literal([]))
                                default: return _p.au($[0])
                            }
                        })
                    ))
                    case 'group': return _p.ss($, ($) => _p.list.from.dictionary(
                        $.properties
                    ).flatten(
                        ($) => _p.decide.state($['unmarshall result'], ($) => {
                            switch ($[0]) {
                                case 'success': return _p.ss($, ($) => Value($.resolved))
                                case 'error': return _p.ss($, ($) => _p.list.literal([]))
                                default: return _p.au($[0])
                            }
                        })
                    ))
                    case 'simple': return _p.ss($, ($) => _p.list.literal([]))
                    case 'list': return _p.ss($, ($) => _p.list.from.list(
                        $.items
                    ).flatten(
                        ($) => Value($)
                    ))
                    case 'nothing': return _p.ss($, ($) => _p.list.literal([]))
                    case 'reference': return _p.ss($, ($) => {
                        return _p.decide.state($, ($): d_out.Errors => {
                            switch ($[0]) {
                                case 'derived': return _p.ss($, ($) => _p.list.literal([]))
                                case 'selected': return _p.ss($, ($) => _p.decide.state($['resolve status'], ($): d_out.Errors => {
                                    switch ($[0]) {
                                        case 'to be implemented': return _p.ss($, ($) => _p.list.literal<d_out.Error>([
                                            {
                                                'severity': ['hint', null],
                                                'range': range,
                                                'type': ['to be implemented', null]
                                            }
                                        ]))
                                        default: return _p.au($[0])
                                    }
                                }))
                                default: return _p.au($[0])
                            }
                        })
                    })
                    case 'component': return _p.ss($, ($) => {
                        return Value($.value)
                    })
                    case 'optional': return _p.ss($, ($) => _p.decide.state($.status, ($) => {
                        switch ($[0]) {
                            case 'set': return _p.ss($, ($) => Value($['child value']))
                            case 'not set': return _p.ss($, ($) => _p.list.literal([]))
                            default: return _p.au($[0])
                        }
                    }))
                    case 'state': return _p.ss($, ($): d_out.Errors => {
                        return $.option.__decide(
                            ($) => Value($),
                            (): d_out.Errors => _p.list.literal([])
                        )
                    })
                    case 'text': return _p.ss($, ($) => _p.list.literal([
                    ]))
                    default: return _p.au($[0])
                }
            }))
            default: return _p.au($[0])
        }
    })
}