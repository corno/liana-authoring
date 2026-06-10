import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'
import _p_text_from_list from 'pareto-core/dist/_p_text_from_list'

//data types
import * as d_in from "../../../../interface/to_be_generated/unmarshall_result"
import * as d_out from "../../../../interface/to_be_generated/document_links"
import * as d_schema from "pareto-liana/dist/interface/generated/liana/schemas/schema/data/resolved"
import * as d_location from "../../../../interface/generated/liana/schemas/location/data"

//dependencies
import * as t_parse_tree_to_location from "astn-core/dist/implementation/manual/transformers/parse_tree/full_value_range"

export type Document = _pi.Transformer<
    d_in.Document,
    d_out.Links
>

export type Value = _pi.Transformer<
    d_in.Value,
    d_out.Links
>

export const Document: Document = ($) => Value($.content)

export const Value: Value = ($) => _p.decide.state($['unmarshall result'], ($): d_out.Links => {
    switch ($[0]) {
        case 'error': return _p.ss($, ($) => _p.list.literal([]))
        case 'success': return _p.ss($, ($) => _p.decide.state($, ($): d_out.Links => {
            switch ($[0]) {
                case 'component': return _p.ss($, ($) => Value($.value))
                case 'dictionary': return _p.ss($, ($): d_out.Links => _p.list.from.dictionary($.derived.entries).flatten(
                    ($, id) => _p.decide.state($.result, ($) => {
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
                case 'group': return _p.ss($, ($) => _p.decide.state($.derived.style, ($): d_out.Links => {
                    switch ($[0]) {
                        case 'verbose': return _p.ss($, ($) => _p.list.from.list($.properties).flatten(($): d_out.Links => _p.decide.state($['definition found'], ($): d_out.Links => {
                            switch ($[0]) {
                                case 'yes': return _p.ss($, ($) => $['value'].__decide(
                                    ($): d_out.Links => Value($),
                                    (): d_out.Links => _p.list.literal([])
                                ))
                                case 'no': return _p.ss($, ($) => _p.list.literal([]))
                                default: return _p.au($[0])
                            }
                        })))
                        case 'concise': return _p.ss($, ($) => _p.list.from.list($.properties).flatten(($): d_out.Links => _p.decide.state($['definition found'], ($): d_out.Links => {
                            switch ($[0]) {
                                case 'no': return _p.ss($, ($): d_out.Links => _p.list.literal([]))
                                case 'yes': return _p.ss($, ($): d_out.Links => Value($['value']))
                                default: return _p.au($[0])
                            }
                        })))
                        default: return _p.au($[0])
                    }
                }))
                case 'list': return _p.ss($, ($): d_out.Links => _p.list.from.list($.derived.items).flatten(
                    ($) => Value($)
                ))
                case 'nothing': return _p.ss($, ($) => _p.list.literal([]))
                case 'optional': return _p.ss($, ($) => _p.decide.state($.derived.status, ($) => {
                    switch ($[0]) {
                        case 'set': return _p.ss($, ($) => Value($['child value']))
                        case 'not set': return _p.ss($, ($) => _p.list.literal([]))
                        default: return _p.au($[0])
                    }
                }))
                case 'reference': return _p.ss($, ($) => _p.list.literal([]))
                case 'simple': return _p.ss($, ($) => _p.decide.state($.definition, ($) => {
                    switch ($[0]) {
                        case 'global': return _p.ss($, ($) => _p.decide.state($['l entry'].type, ($): d_out.Links => {
                            switch ($[0]) {
                                case 'number': return _p.ss($, ($) => _p.list.literal([]))
                                case 'boolean': return _p.ss($, ($) => _p.list.literal([]))
                                case 'date': return _p.ss($, ($) => _p.list.literal([]))
                                default: return _p.au($[0])
                            }
                        }))
                        default: return _p.au($[0])
                    }
                }))
                case 'state': return _p.ss($, ($) => _p.decide.state($.derived['option status'], ($): d_out.Links => {
                    switch ($[0]) {
                        case 'set': return _p.ss($, ($) => Value($.value))
                        case 'missing data': return _p.ss($, ($) => _p.list.literal([]))
                        default: return _p.au($[0])
                    }
                }))
                case 'text': return _p.ss($, ($) => {
                    const instance = $.instance
                    const type: d_schema.Text_Type = _p.decide.state($.definition, ($) => {
                        switch ($[0]) {
                            case 'global': return _p.ss($, ($) => $['l entry'])
                            case 'local': return _p.ss($, ($) => $)
                            default: return _p.au($[0])
                        }
                    })
                    return _p.decide.state(type.link, ($) => {
                        switch ($[0]) {
                            case 'no': return _p.ss($, ($) => _p.list.literal([]))
                            case 'yes':return _p.ss($, ($) => _p.list.literal([
                                {
                                    'range': instance.range,
                                    'target': $['path prefix'] + instance.token.value + $['path suffix'],
                                    'tooltip': _p.optional.literal.not_set()
                                }
                            ]))
                            default: return _p.au($[0])
                        }
                    })
                })
                default: return _p.au($[0])
            }
        }))
        default: return _p.au($[0])
    }
})