
import * as p_ from 'pareto-core/transformer'
import { Reference_Status } from '../../unmarshall_result/transformers/resolve_result.js'

//schemas
import type * as s_in from "../../../schemas/resolve_result/schema.js"
import type * as s_out from "../../../schemas/resolve_errors/schema.js"



namespace declarations_ {

    export type Document = p_.Transformer<
        s_in.Document,
        s_out.Errors
    >

    export type Value = p_.Transformer<
        s_in.Value,
        s_out.Errors
    >
}

export const Document: declarations_.Document = ($) => {
    return Value(
        $.content
    )
}

export const Value: declarations_.Value = ($) => p_.from.state($['unmarshall result']).decide(
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
                                    case 'derived': return p_.option($, ($): s_out.Errors => {
                                        const instance = $.unmarshalled.intermediate.instance
                                        const range = instance[0] === 'nothing' ? instance[1]['~'].range : instance[1].range
                                        const status = $['resolve status']
                                        const error = (type: s_out.Error['type'], hint = false): s_out.Errors =>
                                            p_.literal.list([{ range, type, severity: hint ? ['hint', null] : ['error', null] }])
                                        switch (status[0]) {
                                            case 'resolved': return p_.literal.list([])
                                            case 'not set': return error(['optional value not set', null])
                                            case 'not found because of root': return error(['no context lookup', null])
                                            case 'selection unavailable': return error(['selection unavailable', null])
                                            case 'cycle detected': return error(status)
                                            case 'to be implemented': return error(status, true)
                                            case 'reference error':
                                                switch (status[1][0]) {
                                                    case 'resolved':
                                                    case 'resolved stack': return p_.literal.list([])
                                                    case 'to be implemented': return error(status[1], true)
                                                    default: return error(status[1])
                                                }
                                            default: return p_.exhaustive(status[0])
                                        }
                                    })
                                    case 'selected': return p_.option($, ($) => {
                                        const range = $.unmarshalled.intermediate.instance.range
                                        return p_.from.state(Reference_Status($['resolve status'])).decide(
                                            ($): s_out.Errors => {
                                                switch ($[0]) {
                                                    case 'resolved': return p_.literal.list([])
                                                    case 'resolved stack': return p_.literal.list([])
                                                    case 'no such entry':
                                                    case 'no context lookup':
                                                    case 'cycle detected':
                                                    case 'entry unavailable': return p_.literal.list([{
                                                        severity: ['error', null], range, type: $,
                                                    }])
                                                    case 'premature cyclic access': return p_.literal.list([{
                                                        severity: ['error', null], range, type: $,
                                                    }])
                                                    case 'to be implemented': return p_.literal.list([{
                                                        severity: ['hint', null], range,
                                                        type: ['to be implemented', null],
                                                    }])
                                                    default: return p_.exhaustive($[0])
                                                }
                                            }
                                        )
                                    })
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
