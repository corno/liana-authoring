import * as pt from 'pareto-core/dist/transformer/implementation'
import * as p_i from 'pareto-core/dist/transformer/interface'

//data types
import * as d_in from "../../../../interface/to_be_generated/resolve_result"
import * as d_out from "../../../../interface/to_be_generated/resolve_errors"

//dependencies
import * as t_astn_parse_tree_to_location from "astn-core/dist/implementation/manual/transformers/parse_tree/start_token_range"

export type Document = p_i.Transformer<
    d_in.Document,
    d_out.Errors
>

export type Value = p_i.Transformer<
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
    return pt.decide.state($['unmarshall result'], ($) => {
        switch ($[0]) {
            case 'error': return pt.ss($, ($) => pt.literal.list([])) //reported by the unmarshaller, it is not the responsibility of this transformer to report them
            case 'success': return pt.ss($, ($) => pt.decide.state($, ($): d_out.Errors => {
                switch ($[0]) {
                    case 'dictionary': return pt.ss($, ($) => pt.list.from.dictionary(
                        $.entries
                    ).flatten(
                        ($) => pt.decide.state($['unmarshall result'], ($) => {
                            switch ($[0]) {
                                case 'success': return pt.ss($, ($) => pt.decide.state($.value, ($) => {
                                    switch ($[0]) {
                                        case 'set': return pt.ss($, ($) => Value($))
                                        case 'not set': return pt.ss($, ($) => pt.literal.list([]))
                                        default: return pt.au($[0])
                                    }
                                }))
                                case 'error': return pt.ss($, ($) => pt.literal.list([]))
                                default: return pt.au($[0])
                            }
                        })
                    ))
                    case 'group': return pt.ss($, ($) => pt.list.from.dictionary(
                        $.properties
                    ).flatten(
                        ($) => pt.decide.state($['unmarshall result'], ($) => {
                            switch ($[0]) {
                                case 'success': return pt.ss($, ($) => Value($.resolved))
                                case 'error': return pt.ss($, ($) => pt.literal.list([]))
                                default: return pt.au($[0])
                            }
                        })
                    ))
                    case 'simple': return pt.ss($, ($) => pt.literal.list([]))
                    case 'list': return pt.ss($, ($) => pt.list.from.list(
                        $.items
                    ).flatten(
                        ($) => Value($)
                    ))
                    case 'nothing': return pt.ss($, ($) => pt.literal.list([]))
                    case 'reference': return pt.ss($, ($) => {
                        return pt.decide.state($, ($): d_out.Errors => {
                            switch ($[0]) {
                                case 'derived': return pt.ss($, ($) => pt.literal.list([]))
                                case 'selected': return pt.ss($, ($) => pt.decide.state($['resolve status'], ($): d_out.Errors => {
                                    switch ($[0]) {
                                        case 'to be implemented': return pt.ss($, ($) => pt.literal.list<d_out.Error>([
                                            // {
                                            //     'severity': ['hint', null],
                                            //     'range': range,
                                            //     'type': ['to be implemented', null]
                                            // }
                                        ]))
                                        default: return pt.au($[0])
                                    }
                                }))
                                default: return pt.au($[0])
                            }
                        })
                    })
                    case 'component': return pt.ss($, ($) => {
                        return Value($.value)
                    })
                    case 'optional': return pt.ss($, ($) => pt.decide.state($.status, ($) => {
                        switch ($[0]) {
                            case 'set': return pt.ss($, ($) => Value($['child value']))
                            case 'not set': return pt.ss($, ($) => pt.literal.list([]))
                            default: return pt.au($[0])
                        }
                    }))
                    case 'state': return pt.ss($, ($): d_out.Errors => {
                        return $.option.__decide(
                            ($) => Value($),
                            (): d_out.Errors => pt.literal.list([])
                        )
                    })
                    case 'text': return pt.ss($, ($) => pt.literal.list([
                    ]))
                    default: return pt.au($[0])
                }
            }))
            default: return pt.au($[0])
        }
    })
}