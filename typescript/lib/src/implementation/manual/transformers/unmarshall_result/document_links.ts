import * as p_ from 'pareto-core/implementation/transformer'
import type * as p_i from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../../interface/data/unmarshall_result.js"
import type * as d_out from "../../../../interface/data/document_links.js"
import type * as d_schema from "pareto-liana/interface/generated/liana/schemas/schema/data/resolved"

export namespace interface_ {
    export type Document = p_i.Transformer<
        d_in.Document,
        d_out.Links
    >

    export type Value = p_i.Transformer<
        d_in.Value,
        d_out.Links
    >
}
import * as temp_interface_ from "../../../../interface/declarations/transformers/unmarshall_result/document_links.js"

export const Document: interface_.Document = ($) => Value($.content)

export const Value: interface_.Value = ($) => p_.from.state($['unmarshall result']).decide(
    ($) => {
        switch ($[0]) {
            case 'error': return p_.option($, ($) => p_.literal.list([]))
            case 'success': return p_.option($, ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'component': return p_.option($, ($) => Value($.value))
                        case 'dictionary': return p_.option($, ($) => p_.from.dictionary($.derived.entries).flatten_to_list(
                            ($, id) => p_.from.state($.result).decide(
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
                        case 'group': return p_.option($, ($) => p_.from.state($.derived.style).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'verbose': return p_.option($, ($) => p_.from.list($.properties).flatten(
                                        ($) => p_.from.state($['definition found']).decide(
                                            ($) => {
                                                switch ($[0]) {
                                                    case 'yes': return p_.option($, ($) => p_.from.optional($['value']).decide(
                                                        ($) => Value($),
                                                        () => p_.literal.list([])
                                                    ))
                                                    case 'no': return p_.option($, ($) => p_.literal.list([]))
                                                    default: return p_.exhaustive($[0])
                                                }
                                            }
                                        )
                                    ))
                                    case 'concise': return p_.option($, ($) => p_.from.list($.properties).flatten(
                                        ($) => p_.from.state($['definition found']).decide(
                                            ($) => {
                                                switch ($[0]) {
                                                    case 'no': return p_.option($, ($) => p_.literal.list([]))
                                                    case 'yes': return p_.option($, ($) => Value($['value']))
                                                    default: return p_.exhaustive($[0])
                                                }
                                            }
                                        )
                                    ))
                                    default: return p_.exhaustive($[0])
                                }
                            }))
                        case 'list': return p_.option($, ($) => p_.from.list($.derived.items).flatten(
                            ($) => Value($)
                        ))
                        case 'nothing': return p_.option($, ($) => p_.literal.list([]))
                        case 'optional': return p_.option($, ($) => p_.from.state($.derived.status).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'set': return p_.option($, ($) => Value($['child value']))
                                    case 'not set': return p_.option($, ($) => p_.literal.list([]))
                                    default: return p_.exhaustive($[0])
                                }
                            }
                        ))
                        case 'reference': return p_.option($, ($) => p_.literal.list([]))
                        case 'simple': return p_.option($, ($) => p_.from.state($.definition).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'global': return p_.option($, ($) => p_.from.state($['l entry'].type).decide(
                                        ($) => {
                                            switch ($[0]) {
                                                case 'number': return p_.option($, ($) => p_.literal.list([]))
                                                case 'boolean': return p_.option($, ($) => p_.literal.list([]))
                                                case 'date': return p_.option($, ($) => p_.literal.list([]))
                                                default: return p_.exhaustive($[0])
                                            }
                                        }
                                    ))
                                    default: return p_.exhaustive($[0])
                                }
                            }
                        ))
                        case 'state': return p_.option($, ($) => p_.from.state($.derived['option status']).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'set': return p_.option($, ($) => Value($.value))
                                    case 'missing data': return p_.option($, ($) => p_.literal.list([]))
                                    default: return p_.exhaustive($[0])
                                }
                            }
                        ))
                        case 'text': return p_.option($, ($) => {
                            const $v_instance = $.instance
                            const $p_type: d_schema.Text_Type = p_.from.state($.definition).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'global': return p_.option($, ($) => $['l entry'])
                                        case 'local': return p_.option($, ($) => $)
                                        default: return p_.exhaustive($[0])
                                    }
                                })
                            return p_.from.state($p_type.link).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'no': return p_.option($, ($) => p_.literal.list([]))
                                        case 'yes': return p_.option($, ($) => p_.literal.list([
                                            {
                                                'range': $v_instance.range,
                                                'target': $['path prefix'] + $v_instance.token.value + $['path suffix'],
                                                'tooltip': p_.literal.not_set()
                                            }
                                        ]))
                                        default: return p_.exhaustive($[0])
                                    }
                                }
                            )
                        })
                        default: return p_.exhaustive($[0])
                    }
                }
            ))
            default: return p_.exhaustive($[0])
        }
    })