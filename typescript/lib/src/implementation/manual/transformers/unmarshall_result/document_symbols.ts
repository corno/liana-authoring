import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/unmarshall_result"
import * as d_out from "../../../../interface/data/document_symbols"
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

    return p_.decide.state($['unmarshall result'], ($): d_out.Value => {
        switch ($[0]) {
            case 'error': return p_.ss($, ($) => ({
                'kind': ['null', null],
                'children': p_.literal.list([]),
                'deprecated': false,
            }))
            case 'success': return p_.ss($, ($) => p_.decide.state($, ($): d_out.Value => {
                switch ($[0]) {
                    case 'component': return p_.ss($, ($) => Value($.value))
                    case 'dictionary': return p_.ss($, ($): d_out.Value => ({
                        'kind': ['object', null],
                        'children': $.intermediate['entries as list'].__l_map(($): d_out.Symbol => ({
                            'name': $.intermediate['id value pair'].id.token.value,
                            'detail': "entry",
                            'value': p_.decide.state($.value, ($) => {
                                switch ($[0]) {
                                    case 'set': return p_.ss($, ($) => Value($))
                                    case 'not set': return p_.ss($, ($) => ({
                                        'kind': ['null', null],
                                        'children': p_.literal.list([]),
                                    }))
                                    default: return p_.au($[0])
                                }
                            }),
                            'range': t_parse_tree_to_location.ID_Value_Pair($.intermediate['id value pair']),
                            'selection range': $.intermediate['id value pair'].id.range,
                        })),
                    }))
                    case 'group': return p_.ss($, ($) => ({
                        'kind': ['struct', null],
                        'children': p_.decide.state($.derived.style, ($) => {
                            switch ($[0]) {
                                case 'verbose': return p_.ss($, ($) => $.properties.__l_map(($): d_out.Symbol => ({
                                    'name': $.id,
                                    'detail': "property",
                                    'value': p_.decide.state($['definition found'], ($) => {
                                        switch ($[0]) {
                                            case 'yes': return p_.ss($, ($) => $['value'].__decide(
                                                ($): d_out.Value => Value($),
                                                (): d_out.Value => ({
                                                    'kind': ['null', null],
                                                    'children': p_.literal.list([]),
                                                })
                                            ))
                                            case 'no': return p_.ss($, ($) => ({
                                                'kind': ['null', null],
                                                'children': p_.literal.list([]),
                                            }))
                                            default: return p_.au($[0])
                                        }
                                    }),
                                    'range': t_parse_tree_to_location.ID_Value_Pair($.intermediate['id value pair']),
                                    'selection range': $.intermediate['id value pair'].id.range,
                                })))
                                case 'concise': return p_.ss($, ($) => $.properties.__l_map(($): d_out.Symbol => p_.decide.state($['definition found'], ($) => {
                                    switch ($[0]) {
                                        case 'no': return p_.ss($, ($): d_out.Symbol => ({
                                            'value': {

                                                'kind': ['null', null],
                                                'children': p_.literal.list([]),
                                            },
                                            'detail': "property",
                                            'name': "-unknown-",
                                            'range': t_parse_tree_to_location.Value($.item.value),
                                            'selection range': t_parse_tree_to_location.Value($.item.value),
                                        }))
                                        case 'yes': return p_.ss($, ($): d_out.Symbol => ({
                                            'value': Value($['value']),
                                            'detail': "property",
                                            'name': $.id,
                                            'range': t_parse_tree_to_location.Value($['value'].instance),
                                            'selection range': t_parse_tree_to_location.Value($['value'].instance),
                                        }))
                                        default: return p_.au($[0])
                                    }
                                })))
                                default: return p_.au($[0])
                            }
                        }),
                    }))
                    case 'list': return p_.ss($, ($) => ({
                        'kind': ['array', null],
                        'children': p_.list.from.list($.derived.items).map_with_state(
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
                    case 'nothing': return p_.ss($, ($) => ({
                        'kind': ['null', null],
                        'children': p_.literal.list([]),
                    }))
                    case 'optional': return p_.ss($, ($) => p_.decide.state($.derived.status, ($) => {
                        switch ($[0]) {
                            case 'set': return p_.ss($, ($) => Value($['child value']))
                            case 'not set': return p_.ss($, ($) => ({
                                'kind': ['null', null],
                                'children': p_.literal.list([]),
                            }))
                            default: return p_.au($[0])
                        }
                    }))
                    case 'reference': return p_.ss($, ($) => ({
                        'kind': ['string', null],
                        'children': p_.literal.list([]),
                    }))
                    case 'simple': return p_.ss($, ($) => p_.decide.state($.definition, ($) => {
                        switch ($[0]) {
                            case 'global': return p_.ss($, ($) => p_.decide.state($['l entry'].type, ($) => {
                                switch ($[0]) {
                                    case 'number': return p_.ss($, ($) => ({
                                        'kind': ['number', null],
                                        'children': p_.literal.list([]),
                                    }))
                                    case 'boolean': return p_.ss($, ($) => ({
                                        'kind': ['boolean', null],
                                        'children': p_.literal.list([]),
                                    }))
                                    case 'date': return p_.ss($, ($) => ({
                                        'kind': ['string', null],
                                        'children': p_.literal.list([]),
                                    }))
                                    default: return p_.au($[0])
                                }
                            }))
                            default: return p_.au($[0])
                        }
                    }))
                    case 'state': return p_.ss($, ($) => p_.decide.state($.derived['option status'], ($): d_out.Value => {
                        switch ($[0]) {
                            case 'set': return p_.ss($, ($) => ({
                                'kind': ['enum member', null],
                                'children': p_.literal.list([
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
                            case 'missing data': return p_.ss($, ($) => ({
                                'kind': ['null', null],
                                'children': p_.literal.list([]),
                                'deprecated': true,
                            }))
                            default: return p_.au($[0])
                        }
                    }))
                    case 'text': return p_.ss($, ($) => ({
                        'kind': ['string', null],
                        'children': p_.literal.list([]),
                        'deprecated': false,
                    }))
                    default: return p_.au($[0])
                }
            }))
            default: return p_.au($[0])
        }
    })
}