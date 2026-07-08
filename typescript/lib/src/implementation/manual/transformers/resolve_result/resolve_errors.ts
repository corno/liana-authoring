import * as p_ from 'pareto-core/implementation/transformer'
import * as p_i from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../../interface/data/resolve_result.js"
import type * as d_out from "../../../../interface/data/resolve_errors.js"

export namespace interface_ {

    export type Document = p_i.Transformer<
        d_in.Document,
        d_out.Errors
    >

    export type Value = p_i.Transformer<
        d_in.Value,
        d_out.Errors
    >

}

export const Document: interface_.Document = ($) => {
    return Value(
        $.content
    )
}

export const Value: interface_.Value = ($) => p_.from.state($['unmarshall result']).decide(
    ($) => {
        switch ($[0]) {
            case 'error': return p_.option($, ($) => p_.literal.list([])) //reported by the unmarshaller, it is not the responsibility of this transformer to report them
            case 'success': return p_.option($, ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'dictionary': return p_.option($, ($) => p_.from.dictionary($.entries).flatten_to_list(
                            ($) => p_.from.state($['unmarshall result']).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'success': return p_.option($, ($) => p_.from.state($.value).decide(
                                            ($) => {
                                                switch ($[0]) {
                                                    case 'set': return p_.option($, ($) => Value($))
                                                    case 'not set': return p_.option($, ($) => p_.literal.list([]))
                                                    default: return p_.exhaustive($[0])
                                                }
                                            }))
                                        case 'error': return p_.option($, ($) => p_.literal.list([]))
                                        default: return p_.exhaustive($[0])
                                    }
                                }
                            )
                        ))
                        case 'group': return p_.option($, ($) => p_.from.dictionary($.properties).flatten_to_list(
                            ($) => p_.from.state($['unmarshall result']).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'success': return p_.option($, ($) => Value($.resolved))
                                        case 'error': return p_.option($, ($) => p_.literal.list([]))
                                        default: return p_.exhaustive($[0])
                                    }
                                }
                            )
                        ))
                        case 'simple': return p_.option($, ($) => p_.literal.list([]))
                        case 'list': return p_.option($, ($) => p_.from.list($.items).flatten(
                            ($) => Value($)
                        ))
                        case 'nothing': return p_.option($, ($) => p_.literal.list([]))
                        case 'reference': return p_.option($, ($) => p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'derived': return p_.option($, ($) => p_.literal.list([]))
                                    case 'selected': return p_.option($, ($) => p_.from.state($['resolve status']).decide(
                                        ($) => {
                                            switch ($[0]) {
                                                case 'to be implemented': return p_.option($, ($) => p_.literal.list<d_out.Error>([
                                                    // {
                                                    //     'severity': ['hint', null],
                                                    //     'range': range,
                                                    //     'type': ['to be implemented', null]
                                                    // }
                                                ]))
                                                default: return p_.exhaustive($[0])
                                            }
                                        }
                                    ))
                                    default: return p_.exhaustive($[0])
                                }
                            }
                        ))
                        case 'component': return p_.option($, ($) => Value($.value))
                        case 'optional': return p_.option($, ($) => p_.from.state($.status).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'set': return p_.option($, ($) => Value($['child value']))
                                    case 'not set': return p_.option($, ($) => p_.literal.list([]))
                                    default: return p_.exhaustive($[0])
                                }
                            }
                        ))
                        case 'state': return p_.option($, ($) => {
                            return p_.from.optional($.option).decide(
                                ($) => Value($),
                                () => p_.literal.list([])
                            )
                        })
                        case 'text': return p_.option($, ($) => p_.literal.list([
                        ]))
                        default: return p_.exhaustive($[0])
                    }
                }
            ))
            default: return p_.exhaustive($[0])
        }
    }
)