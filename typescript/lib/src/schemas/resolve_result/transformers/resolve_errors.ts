
import * as p_ from 'pareto-core/transformer'
import type * as p_di from 'pareto-core/schema'
import { Reference_Status } from '../../unmarshall_result/transformers/resolve_result.js'
import * as full_range from 'astn-runtime/modules/deserialization/schemas/parse_tree/transformers/full_value_range'

//schemas
import type * as s_in from "../../../schemas/resolve_result/schema.js"
import type * as s_out from "../../../schemas/resolve_errors/schema.js"

const Severity = (type: s_out.Error['type']): s_out.Error['severity'] => {
    switch (type[0]) {
        case 'to be implemented': return ['hint', null]
        case 'lookup unavailable': return [type[1].cause === 'missing implementation' ? 'hint' : 'warning', null]
        case 'entry unavailable':
        case 'selection unavailable': return ['warning', null]
        default: return ['error', null]
    }
}

const Selection_Errors = (status: s_in.Value_Selection_Status, range: s_out.Error['range']): s_out.Errors => {
    const error = (type: s_out.Error['type']): s_out.Errors =>
        p_.literal.list([{ range, type, severity: Severity(type) }])
    switch (status[0]) {
        case 'resolved': return p_.literal.list([])
        case 'not set': return error(['optional value not set', null])
        case 'not found because of root': return error(['no context lookup', null])
        case 'selection unavailable': return error(['selection unavailable', null])
        case 'unexpected state':
        case 'cycle detected': return error(status)
        case 'to be implemented': return error(status)
        case 'reference error':
            switch (status[1][0]) {
                case 'resolved':
                case 'resolved stack': return p_.literal.list([])
                case 'entry unavailable':
                case 'lookup unavailable':
                case 'to be implemented': return error(status[1])
                default: return error(status[1])
            }
        default: return p_.exhaustive(status[0])
    }
}


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

const Structural_Value: declarations_.Value = ($) => p_.from.state($['unmarshall result']).decide(
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
                                        return Selection_Errors($['resolve status'], range)
                                    })
                                    case 'selected': return p_.option($, ($) => {
                                        const range = $.unmarshalled.intermediate.instance.range
                                        return p_.from.state(Reference_Status($['resolve status'])).decide(
                                            ($): s_out.Errors => {
                                                switch ($[0]) {
                                                    case 'resolved': return p_.literal.list([])
                                                    case 'resolved stack': return p_.literal.list([])
                                                    case 'no such entry':
                                                    case 'unexpected state':
                                                    case 'no context lookup':
                                                    case 'cycle detected': return p_.literal.list([{
                                                        severity: ['error', null], range, type: $,
                                                    }])
                                                    case 'entry unavailable':
                                                    case 'lookup unavailable': return p_.literal.list([{
                                                        severity: Severity($), range, type: $,
                                                    }])
                                                    case 'premature cyclic access': return p_.literal.list([{
                                                        severity: ['error', null], range, type: $,
                                                    }])
                                                    case 'to be implemented': return p_.literal.list([{
                                                        severity: Severity($), range,
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

export const Value: declarations_.Value = (value) => {
    const status = value['unmarshall result']
    if (status[0] === 'error') return p_.literal.list([])
    if (status[1][0] === 'reference' && status[1][1][0] === 'selected') {
        const reference = Reference_Status(status[1][1][1]['resolve status'])
        if (reference[0] !== 'resolved' && reference[0] !== 'resolved stack') return Structural_Value(value)
    }
    const range = full_range.Value(value.unmarshalled.instance)
    const constraints = value.constraints === undefined ? p_.literal.dictionary<s_in.Value_Selection_Status>({})
        : value.constraints.get_circular_dependent()
    const optionConstraints = status[1][0] === 'state' || status[1][0] === 'optional'
        ? status[1][1].constraints : undefined
    const errors = (values: p_di.Dictionary<s_in.Value_Selection_Status>): s_out.Errors =>
        p_.from.dictionary(values).flatten_to_list(status => Selection_Errors(status, range))
    return p_.from.list(p_.literal.list([
        Structural_Value(value), errors(constraints),
        optionConstraints === undefined ? p_.literal.list<s_out.Error>([]) : errors(optionConstraints),
    ])).flatten(errors => errors)
}
