import * as p_ from 'pareto-core/implementation/transformer'

import type * as interface_ from "../../../declarations/transformers/unmarshall_result/document_symbols.js"

//data types
import type * as d_out from "../../../interface/data/document_symbols.js"

//dependencies
import * as t_parse_tree_to_location from "astn-core/implementation/transformers/parse_tree/full_value_range"

export const Document: interface_.Document = ($) => Value($.content)

export const Value: interface_.Value = ($) => {

    const instance = $.instance

    return p_.from.state($['unmarshall result']).decide(
        ($): d_out.Value => {
            switch ($[0]) {
                case 'error': return p_.option($, ($) => ({
                    'kind': ['null', null],
                    'children': p_.literal.list([]),
                }))
                case 'success': return p_.option($, ($) => p_.from.state($).decide(
                    ($): d_out.Value => {
                        switch ($[0]) {
                            case 'component': return p_.option($, ($) => Value($.value))
                            case 'dictionary': return p_.option($, ($): d_out.Value => ({
                                'kind': ['object', null],
                                'children': p_.from.list($.intermediate['entries as list']).map(
                                    ($): d_out.Symbol => ({
                                        'name': $.intermediate['id value pair'].id.token.value,
                                        'detail': "entry",
                                        'value': p_.from.state($.value).decide(
                                            ($) => {
                                                switch ($[0]) {
                                                    case 'set': return p_.option($, ($) => Value($))
                                                    case 'not set': return p_.option($, ($) => ({
                                                        'kind': ['null', null],
                                                        'children': p_.literal.list([]),
                                                    }))
                                                    default: return p_.exhaustive($[0])
                                                }
                                            }),
                                        'range': t_parse_tree_to_location.ID_Value_Pair($.intermediate['id value pair']),
                                        'selection range': $.intermediate['id value pair'].id.range,
                                    })),
                            }))
                            case 'group': return p_.option($, ($) => ({
                                'kind': ['struct', null],
                                'children': p_.from.state($.derived.style).decide(
                                    ($) => {
                                        switch ($[0]) {
                                            case 'verbose': return p_.option($, ($) => p_.from.list($.properties).map(
                                                ($): d_out.Symbol => ({
                                                    'name': $.id,
                                                    'detail': "property",
                                                    'value': p_.from.state($['definition found']).decide(
                                                        ($) => {
                                                            switch ($[0]) {
                                                                case 'yes': return p_.option($, ($) => p_.from.optional($['value']).decide(
                                                                    ($): d_out.Value => Value($),
                                                                    (): d_out.Value => ({
                                                                        'kind': ['null', null],
                                                                        'children': p_.literal.list([]),
                                                                    })
                                                                ))
                                                                case 'no': return p_.option($, ($) => ({
                                                                    'kind': ['null', null],
                                                                    'children': p_.literal.list([]),
                                                                }))
                                                                default: return p_.exhaustive($[0])
                                                            }
                                                        }),
                                                    'range': t_parse_tree_to_location.ID_Value_Pair($.intermediate['id value pair']),
                                                    'selection range': $.intermediate['id value pair'].id.range,
                                                })))
                                            case 'concise': return p_.option($, ($) => p_.from.list($.properties).map(
                                                ($): d_out.Symbol => p_.from.state($['definition found']).decide(
                                                    ($) => {
                                                        switch ($[0]) {
                                                            case 'no': return p_.option($, ($): d_out.Symbol => ({
                                                                'value': {

                                                                    'kind': ['null', null],
                                                                    'children': p_.literal.list([]),
                                                                },
                                                                'detail': "property",
                                                                'name': "-unknown-",
                                                                'range': t_parse_tree_to_location.Value($.item.value),
                                                                'selection range': t_parse_tree_to_location.Value($.item.value),
                                                            }))
                                                            case 'yes': return p_.option($, ($): d_out.Symbol => ({
                                                                'value': Value($['value']),
                                                                'detail': "property",
                                                                'name': $.id,
                                                                'range': t_parse_tree_to_location.Value($['value'].instance),
                                                                'selection range': t_parse_tree_to_location.Value($['value'].instance),
                                                            }))
                                                            default: return p_.exhaustive($[0])
                                                        }
                                                    })))
                                            default: return p_.exhaustive($[0])
                                        }
                                    }),
                            }))
                            case 'list': return p_.option($, ($) => ({
                                'kind': ['array', null],
                                'children': p_.from.list($.derived.items).map_with_index(
                                    ($, index): d_out.Symbol => ({
                                        'name': `[${index}]`,
                                        'detail': "item",
                                        'value': Value($),
                                        'range': t_parse_tree_to_location.Value($.instance),
                                        'selection range': t_parse_tree_to_location.Value($.instance),
                                    }),
                                ),
                            }))
                            case 'nothing': return p_.option($, ($) => ({
                                'kind': ['null', null],
                                'children': p_.literal.list([]),
                            }))
                            case 'optional': return p_.option($, ($) => p_.from.state($.derived.status).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'set': return p_.option($, ($) => Value($['child value']))
                                        case 'not set': return p_.option($, ($) => ({
                                            'kind': ['null', null],
                                            'children': p_.literal.list([]),
                                        }))
                                        default: return p_.exhaustive($[0])
                                    }
                                }))
                            case 'reference': return p_.option($, ($) => ({
                                'kind': ['string', null],
                                'children': p_.literal.list([]),
                            }))
                            case 'simple': return p_.option($, ($) => p_.from.state($.definition).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'global': return p_.option($, ($) => p_.from.state($['l entry'].type).decide(
                                            ($) => {
                                                switch ($[0]) {
                                                    case 'number': return p_.option($, ($) => ({
                                                        'kind': ['number', null],
                                                        'children': p_.literal.list([]),
                                                    }))
                                                    case 'boolean': return p_.option($, ($) => ({
                                                        'kind': ['boolean', null],
                                                        'children': p_.literal.list([]),
                                                    }))
                                                    case 'date': return p_.option($, ($) => ({
                                                        'kind': ['string', null],
                                                        'children': p_.literal.list([]),
                                                    }))
                                                    default: return p_.exhaustive($[0])
                                                }
                                            }))
                                        default: return p_.exhaustive($[0])
                                    }
                                }))
                            case 'state': return p_.option($, ($) => p_.from.state($.derived['option status']).decide(
                                ($): d_out.Value => {
                                    switch ($[0]) {
                                        case 'set': return p_.option($, ($) => ({
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
                                        }))
                                        case 'missing data': return p_.option($, ($) => ({
                                            'kind': ['null', null],
                                            'children': p_.literal.list([]),
                                        }))
                                        default: return p_.exhaustive($[0])
                                    }
                                }))
                            case 'text': return p_.option($, ($) => ({
                                'kind': ['string', null],
                                'children': p_.literal.list([]),
                            }))
                            default: return p_.exhaustive($[0])
                        }
                    }))
                default: return p_.exhaustive($[0])
            }
        })
}