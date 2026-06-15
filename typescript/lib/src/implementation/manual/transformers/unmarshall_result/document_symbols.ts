import * as pt from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/to_be_generated/unmarshall_result"
import * as d_out from "../../../../interface/to_be_generated/document_symbols"
import * as d_location from "../../../../interface/generated/liana/schemas/location/data"

//dependencies
import * as t_parse_tree_to_location from "astn-core/dist/implementation/manual/transformers/parse_tree/full_value_range"

export type Document = p_i.Transformer<
    d_in.Document,
    d_out.Value
>

export type Value = p_i.Transformer<
    d_in.Value,
    d_out.Value
>

export const Document: Document = ($) => Value($.content)

export const Value: Value = ($) => {

    const instance = $.instance

    return pt.decide.state($['unmarshall result'], ($): d_out.Value => {
        switch ($[0]) {
            case 'error': return pt.ss($, ($) => ({
                'kind': ['null', null],
                'children': pt.literal.list([]),
                'deprecated': false,
            }))
            case 'success': return pt.ss($, ($) => pt.decide.state($, ($): d_out.Value => {
                switch ($[0]) {
                    case 'component': return pt.ss($, ($) => Value($.value))
                    case 'dictionary': return pt.ss($, ($): d_out.Value => ({
                        'kind': ['object', null],
                        'children': $.intermediate['entries as list'].__l_map(($): d_out.Symbol => ({
                            'name': $.intermediate['id value pair'].id.token.value,
                            'detail': "entry",
                            'value': pt.decide.state($.value, ($) => {
                                switch ($[0]) {
                                    case 'set': return pt.ss($, ($) => Value($))
                                    case 'not set': return pt.ss($, ($) => ({
                                        'kind': ['null', null],
                                        'children': pt.literal.list([]),
                                    }))
                                    default: return pt.au($[0])
                                }
                            }),
                            'range': t_parse_tree_to_location.ID_Value_Pair($.intermediate['id value pair']),
                            'selection range': $.intermediate['id value pair'].id.range,
                        })),
                    }))
                    case 'group': return pt.ss($, ($) => ({
                        'kind': ['struct', null],
                        'children': pt.decide.state($.derived.style, ($) => {
                            switch ($[0]) {
                                case 'verbose': return pt.ss($, ($) => $.properties.__l_map(($): d_out.Symbol => ({
                                    'name': $.id,
                                    'detail': "property",
                                    'value': pt.decide.state($['definition found'], ($) => {
                                        switch ($[0]) {
                                            case 'yes': return pt.ss($, ($) => $['value'].__decide(
                                                ($): d_out.Value => Value($),
                                                (): d_out.Value => ({
                                                    'kind': ['null', null],
                                                    'children': pt.literal.list([]),
                                                })
                                            ))
                                            case 'no': return pt.ss($, ($) => ({
                                                'kind': ['null', null],
                                                'children': pt.literal.list([]),
                                            }))
                                            default: return pt.au($[0])
                                        }
                                    }),
                                    'range': t_parse_tree_to_location.ID_Value_Pair($.intermediate['id value pair']),
                                    'selection range': $.intermediate['id value pair'].id.range,
                                })))
                                case 'concise': return pt.ss($, ($) => $.properties.__l_map(($): d_out.Symbol => pt.decide.state($['definition found'], ($) => {
                                    switch ($[0]) {
                                        case 'no': return pt.ss($, ($): d_out.Symbol => ({
                                            'value': {

                                                'kind': ['null', null],
                                                'children': pt.literal.list([]),
                                            },
                                            'detail': "property",
                                            'name': "-unknown-",
                                            'range': t_parse_tree_to_location.Value($.item.value),
                                            'selection range': t_parse_tree_to_location.Value($.item.value),
                                        }))
                                        case 'yes': return pt.ss($, ($): d_out.Symbol => ({
                                            'value': Value($['value']),
                                            'detail': "property",
                                            'name': $.id,
                                            'range': t_parse_tree_to_location.Value($['value'].instance),
                                            'selection range': t_parse_tree_to_location.Value($['value'].instance),
                                        }))
                                        default: return pt.au($[0])
                                    }
                                })))
                                default: return pt.au($[0])
                            }
                        }),
                    }))
                    case 'list': return pt.ss($, ($) => ({
                        'kind': ['array', null],
                        'children': pt.list.from.list($.derived.items).map_with_state(
                            0,
                            ($, state): d_out.Symbol => ({
                                'name': `[${state}]`,
                                'detail': "item",
                                'value': Value($),
                                'range': t_parse_tree_to_location.Value($.instance),
                                'selection range': t_parse_tree_to_location.Value($.instance),
                            }),
                            ($, state) => state + 1,
                            ($, state) => $
                        ),
                    }))
                    case 'nothing': return pt.ss($, ($) => ({
                        'kind': ['null', null],
                        'children': pt.literal.list([]),
                    }))
                    case 'optional': return pt.ss($, ($) => pt.decide.state($.derived.status, ($) => {
                        switch ($[0]) {
                            case 'set': return pt.ss($, ($) => Value($['child value']))
                            case 'not set': return pt.ss($, ($) => ({
                                'kind': ['null', null],
                                'children': pt.literal.list([]),
                            }))
                            default: return pt.au($[0])
                        }
                    }))
                    case 'reference': return pt.ss($, ($) => ({
                        'kind': ['string', null],
                        'children': pt.literal.list([]),
                    }))
                    case 'simple': return pt.ss($, ($) => pt.decide.state($.definition, ($) => {
                        switch ($[0]) {
                            case 'global': return pt.ss($, ($) => pt.decide.state($['l entry'].type, ($) => {
                                switch ($[0]) {
                                    case 'number': return pt.ss($, ($) => ({
                                        'kind': ['number', null],
                                        'children': pt.literal.list([]),
                                    }))
                                    case 'boolean': return pt.ss($, ($) => ({
                                        'kind': ['boolean', null],
                                        'children': pt.literal.list([]),
                                    }))
                                    case 'date': return pt.ss($, ($) => ({
                                        'kind': ['string', null],
                                        'children': pt.literal.list([]),
                                    }))
                                    default: return pt.au($[0])
                                }
                            }))
                            default: return pt.au($[0])
                        }
                    }))
                    case 'state': return pt.ss($, ($) => pt.decide.state($.derived['option status'], ($): d_out.Value => {
                        switch ($[0]) {
                            case 'set': return pt.ss($, ($) => ({
                                'kind': ['enum member', null],
                                'children': pt.literal.list([
                                    {
                                        'name': "set",
                                        'detail': "set",
                                        'value': Value($.value),
                                        'range': t_parse_tree_to_location.Value(instance),
                                        'selection range': $.intermediate['option token'].range,
                                    }
                                ]),
                                'deprecated': false,
                            }))
                            case 'missing data': return pt.ss($, ($) => ({
                                'kind': ['null', null],
                                'children': pt.literal.list([]),
                                'deprecated': true,
                            }))
                            default: return pt.au($[0])
                        }
                    }))
                    case 'text': return pt.ss($, ($) => ({
                        'kind': ['string', null],
                        'children': pt.literal.list([]),
                        'deprecated': false,
                    }))
                    default: return pt.au($[0])
                }
            }))
            default: return pt.au($[0])
        }
    })
}