import * as pi from 'pareto-core/dist/interface'
import * as pt from 'pareto-core/dist/assign'
import p_text_from_list from 'pareto-core/dist/_p_text_from_list'

//data types
import * as d_in from "../../../../interface/to_be_generated/unmarshall_result"
import * as d_out from "../../../../interface/to_be_generated/document_links"
import * as d_schema from "pareto-liana/dist/interface/generated/liana/schemas/schema/data/resolved"
import * as d_location from "../../../../interface/generated/liana/schemas/location/data"

//dependencies
import * as t_parse_tree_to_location from "astn-core/dist/implementation/manual/transformers/parse_tree/full_value_range"

export type Document = pi.Transformer<
    d_in.Document,
    d_out.Links
>

export type Value = pi.Transformer<
    d_in.Value,
    d_out.Links
>

export const Document: Document = ($) => Value($.content)

export const Value: Value = ($) => pt.decide.state($['unmarshall result'], ($): d_out.Links => {
    switch ($[0]) {
        case 'error': return pt.ss($, ($) => pt.list.literal([]))
        case 'success': return pt.ss($, ($) => pt.decide.state($, ($): d_out.Links => {
            switch ($[0]) {
                case 'component': return pt.ss($, ($) => Value($.value))
                case 'dictionary': return pt.ss($, ($): d_out.Links => pt.list.from.dictionary($.derived.entries).flatten(
                    ($, id) => pt.decide.state($.result, ($) => {
                        switch ($[0]) {
                            case 'success': return pt.ss($, ($) => pt.decide.state($.value, ($) => {
                                switch ($[0]) {
                                    case 'set': return pt.ss($, ($) => Value($))
                                    case 'not set': return pt.ss($, ($) => pt.list.literal([]))
                                    default: return pt.au($[0])
                                }
                            }))
                            case 'error': return pt.ss($, ($) => pt.list.literal([]))
                            default: return pt.au($[0])
                        }
                    })
                ))
                case 'group': return pt.ss($, ($) => pt.decide.state($.derived.style, ($): d_out.Links => {
                    switch ($[0]) {
                        case 'verbose': return pt.ss($, ($) => pt.list.from.list($.properties).flatten(($): d_out.Links => pt.decide.state($['definition found'], ($): d_out.Links => {
                            switch ($[0]) {
                                case 'yes': return pt.ss($, ($) => $['value'].__decide(
                                    ($): d_out.Links => Value($),
                                    (): d_out.Links => pt.list.literal([])
                                ))
                                case 'no': return pt.ss($, ($) => pt.list.literal([]))
                                default: return pt.au($[0])
                            }
                        })))
                        case 'concise': return pt.ss($, ($) => pt.list.from.list($.properties).flatten(($): d_out.Links => pt.decide.state($['definition found'], ($): d_out.Links => {
                            switch ($[0]) {
                                case 'no': return pt.ss($, ($): d_out.Links => pt.list.literal([]))
                                case 'yes': return pt.ss($, ($): d_out.Links => Value($['value']))
                                default: return pt.au($[0])
                            }
                        })))
                        default: return pt.au($[0])
                    }
                }))
                case 'list': return pt.ss($, ($): d_out.Links => pt.list.from.list($.derived.items).flatten(
                    ($) => Value($)
                ))
                case 'nothing': return pt.ss($, ($) => pt.list.literal([]))
                case 'optional': return pt.ss($, ($) => pt.decide.state($.derived.status, ($) => {
                    switch ($[0]) {
                        case 'set': return pt.ss($, ($) => Value($['child value']))
                        case 'not set': return pt.ss($, ($) => pt.list.literal([]))
                        default: return pt.au($[0])
                    }
                }))
                case 'reference': return pt.ss($, ($) => pt.list.literal([]))
                case 'simple': return pt.ss($, ($) => pt.decide.state($.definition, ($) => {
                    switch ($[0]) {
                        case 'global': return pt.ss($, ($) => pt.decide.state($['l entry'].type, ($): d_out.Links => {
                            switch ($[0]) {
                                case 'number': return pt.ss($, ($) => pt.list.literal([]))
                                case 'boolean': return pt.ss($, ($) => pt.list.literal([]))
                                case 'date': return pt.ss($, ($) => pt.list.literal([]))
                                default: return pt.au($[0])
                            }
                        }))
                        default: return pt.au($[0])
                    }
                }))
                case 'state': return pt.ss($, ($) => pt.decide.state($.derived['option status'], ($): d_out.Links => {
                    switch ($[0]) {
                        case 'set': return pt.ss($, ($) => Value($.value))
                        case 'missing data': return pt.ss($, ($) => pt.list.literal([]))
                        default: return pt.au($[0])
                    }
                }))
                case 'text': return pt.ss($, ($) => {
                    const instance = $.instance
                    const type: d_schema.Text_Type = pt.decide.state($.definition, ($) => {
                        switch ($[0]) {
                            case 'global': return pt.ss($, ($) => $['l entry'])
                            case 'local': return pt.ss($, ($) => $)
                            default: return pt.au($[0])
                        }
                    })
                    return pt.decide.state(type.link, ($) => {
                        switch ($[0]) {
                            case 'no': return pt.ss($, ($) => pt.list.literal([]))
                            case 'yes':return pt.ss($, ($) => pt.list.literal([
                                {
                                    'range': instance.range,
                                    'target': $['path prefix'] + instance.token.value + $['path suffix'],
                                    'tooltip': pt.optional.literal.not_set()
                                }
                            ]))
                            default: return pt.au($[0])
                        }
                    })
                })
                default: return pt.au($[0])
            }
        }))
        default: return pt.au($[0])
    }
})