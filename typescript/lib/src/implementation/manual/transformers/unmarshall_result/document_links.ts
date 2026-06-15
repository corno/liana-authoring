import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/unmarshall_result"
import * as d_out from "../../../../interface/data/document_links"
import * as d_schema from "pareto-liana/dist/interface/generated/liana/schemas/schema/data/resolved"
import * as d_location from "../../../../interface/generated/liana/schemas/location/data"

//dependencies
import * as t_parse_tree_to_location from "astn-core/dist/implementation/manual/transformers/parse_tree/full_value_range"

export type Document = p_i.Transformer<
    d_in.Document,
    d_out.Links
>

export type Value = p_i.Transformer<
    d_in.Value,
    d_out.Links
>

export const Document: Document = ($) => Value($.content)

export const Value: Value = ($) => p_.decide.state($['unmarshall result'], ($): d_out.Links => {
    switch ($[0]) {
        case 'error': return p_.ss($, ($) => p_.literal.list([]))
        case 'success': return p_.ss($, ($) => p_.decide.state($, ($): d_out.Links => {
            switch ($[0]) {
                case 'component': return p_.ss($, ($) => Value($.value))
                case 'dictionary': return p_.ss($, ($): d_out.Links => p_.list.from.dictionary($.derived.entries).flatten(
                    ($, id) => p_.decide.state($.result, ($) => {
                        switch ($[0]) {
                            case 'success': return p_.ss($, ($) => p_.decide.state($.value, ($) => {
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
                case 'group': return p_.ss($, ($) => p_.decide.state($.derived.style, ($): d_out.Links => {
                    switch ($[0]) {
                        case 'verbose': return p_.ss($, ($) => p_.list.from.list($.properties).flatten(($): d_out.Links => p_.decide.state($['definition found'], ($): d_out.Links => {
                            switch ($[0]) {
                                case 'yes': return p_.ss($, ($) => $['value'].__decide(
                                    ($): d_out.Links => Value($),
                                    (): d_out.Links => p_.literal.list([])
                                ))
                                case 'no': return p_.ss($, ($) => p_.literal.list([]))
                                default: return p_.au($[0])
                            }
                        })))
                        case 'concise': return p_.ss($, ($) => p_.list.from.list($.properties).flatten(($): d_out.Links => p_.decide.state($['definition found'], ($): d_out.Links => {
                            switch ($[0]) {
                                case 'no': return p_.ss($, ($): d_out.Links => p_.literal.list([]))
                                case 'yes': return p_.ss($, ($): d_out.Links => Value($['value']))
                                default: return p_.au($[0])
                            }
                        })))
                        default: return p_.au($[0])
                    }
                }))
                case 'list': return p_.ss($, ($): d_out.Links => p_.list.from.list($.derived.items).flatten(
                    ($) => Value($)
                ))
                case 'nothing': return p_.ss($, ($) => p_.literal.list([]))
                case 'optional': return p_.ss($, ($) => p_.decide.state($.derived.status, ($) => {
                    switch ($[0]) {
                        case 'set': return p_.ss($, ($) => Value($['child value']))
                        case 'not set': return p_.ss($, ($) => p_.literal.list([]))
                        default: return p_.au($[0])
                    }
                }))
                case 'reference': return p_.ss($, ($) => p_.literal.list([]))
                case 'simple': return p_.ss($, ($) => p_.decide.state($.definition, ($) => {
                    switch ($[0]) {
                        case 'global': return p_.ss($, ($) => p_.decide.state($['l entry'].type, ($): d_out.Links => {
                            switch ($[0]) {
                                case 'number': return p_.ss($, ($) => p_.literal.list([]))
                                case 'boolean': return p_.ss($, ($) => p_.literal.list([]))
                                case 'date': return p_.ss($, ($) => p_.literal.list([]))
                                default: return p_.au($[0])
                            }
                        }))
                        default: return p_.au($[0])
                    }
                }))
                case 'state': return p_.ss($, ($) => p_.decide.state($.derived['option status'], ($): d_out.Links => {
                    switch ($[0]) {
                        case 'set': return p_.ss($, ($) => Value($.value))
                        case 'missing data': return p_.ss($, ($) => p_.literal.list([]))
                        default: return p_.au($[0])
                    }
                }))
                case 'text': return p_.ss($, ($) => {
                    const instance = $.instance
                    const type: d_schema.Text_Type = p_.decide.state($.definition, ($) => {
                        switch ($[0]) {
                            case 'global': return p_.ss($, ($) => $['l entry'])
                            case 'local': return p_.ss($, ($) => $)
                            default: return p_.au($[0])
                        }
                    })
                    return p_.decide.state(type.link, ($) => {
                        switch ($[0]) {
                            case 'no': return p_.ss($, ($) => p_.literal.list([]))
                            case 'yes':return p_.ss($, ($) => p_.literal.list([
                                {
                                    'range': instance.range,
                                    'target': $['path prefix'] + instance.token.value + $['path suffix'],
                                    'tooltip': p_.literal.not_set()
                                }
                            ]))
                            default: return p_.au($[0])
                        }
                    })
                })
                default: return p_.au($[0])
            }
        }))
        default: return p_.au($[0])
    }
})