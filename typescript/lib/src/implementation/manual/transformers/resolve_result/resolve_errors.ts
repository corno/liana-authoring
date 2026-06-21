import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/resolve_result"
import * as d_out from "../../../../interface/data/resolve_errors"

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
    return p_.from.state($['unmarshall result']).decide(($) => {
        switch ($[0]) {
            case 'error': return p_.ss($, ($) => p_.literal.list([])) //reported by the unmarshaller, it is not the responsibility of this transformer to report them
            case 'success': return p_.ss($, ($) => p_.from.state($).decide(($): d_out.Errors => {
                switch ($[0]) {
                    case 'dictionary': return p_.ss($, ($) => p_.from.dictionary(
                        $.entries
                    ).flatten_to_list(
                        ($) => p_.from.state($['unmarshall result']).decide(($) => {
                            switch ($[0]) {
                                case 'success': return p_.ss($, ($) => p_.from.state($.value).decide(($) => {
                                    switch ($[0]) {
                                        case 'set': return p_.ss($, ($) => Value($))
                                        case 'not set': return p_.ss($, ($) => p_.literal.list([]))
                                        default: return p_.au($[0])
                                    }
                                }))
                                case 'error': return p_.ss($, ($) => p_.literal.list([]))
                                default: return p_.au($[0])
                            }
                        })
                    ))
                    case 'group': return p_.ss($, ($) => p_.from.dictionary(
                        $.properties
                    ).flatten_to_list(
                        ($) => p_.from.state($['unmarshall result']).decide(($) => {
                            switch ($[0]) {
                                case 'success': return p_.ss($, ($) => Value($.resolved))
                                case 'error': return p_.ss($, ($) => p_.literal.list([]))
                                default: return p_.au($[0])
                            }
                        })
                    ))
                    case 'simple': return p_.ss($, ($) => p_.literal.list([]))
                    case 'list': return p_.ss($, ($) => p_.from.list(
                        $.items
                    ).flatten(
                        ($) => Value($)
                    ))
                    case 'nothing': return p_.ss($, ($) => p_.literal.list([]))
                    case 'reference': return p_.ss($, ($) => {
                        return p_.from.state($).decide(($): d_out.Errors => {
                            switch ($[0]) {
                                case 'derived': return p_.ss($, ($) => p_.literal.list([]))
                                case 'selected': return p_.ss($, ($) => p_.from.state($['resolve status']).decide(($): d_out.Errors => {
                                    switch ($[0]) {
                                        case 'to be implemented': return p_.ss($, ($) => p_.literal.list<d_out.Error>([
                                            // {
                                            //     'severity': ['hint', null],
                                            //     'range': range,
                                            //     'type': ['to be implemented', null]
                                            // }
                                        ]))
                                        default: return p_.au($[0])
                                    }
                                }))
                                default: return p_.au($[0])
                            }
                        })
                    })
                    case 'component': return p_.ss($, ($) => {
                        return Value($.value)
                    })
                    case 'optional': return p_.ss($, ($) => p_.from.state($.status).decide(($) => {
                        switch ($[0]) {
                            case 'set': return p_.ss($, ($) => Value($['child value']))
                            case 'not set': return p_.ss($, ($) => p_.literal.list([]))
                            default: return p_.au($[0])
                        }
                    }))
                    case 'state': return p_.ss($, ($): d_out.Errors => {
                        return p_.from.optional($.option).decide(
                            ($) => Value($),
                            (): d_out.Errors => p_.literal.list([])
                        )
                    })
                    case 'text': return p_.ss($, ($) => p_.literal.list([
                    ]))
                    default: return p_.au($[0])
                }
            }))
            default: return p_.au($[0])
        }
    })
}