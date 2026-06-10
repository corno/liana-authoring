import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'
import _p_text_from_list from 'pareto-core/dist/_p_text_from_list'

//data types
import * as d_in from "../../../../interface/to_be_generated/unmarshall_result"
import * as d_out from "../../../../interface/to_be_generated/document_symbols"
import * as d_location from "../../../../interface/generated/liana/schemas/location/data"

//dependencies
import * as t_parse_tree_to_location from "astn-core/dist/implementation/manual/transformers/parse_tree/full_value_range"

export type Document = _pi.Transformer<
    d_in.Document,
    d_out.Value
>

export type Value = _pi.Transformer<
    d_in.Value,
    d_out.Value
>

export const Document: Document = ($) => Value($.content)

export const Value: Value = ($) => _p.decide.state($['unmarshall result'], ($): d_out.Value => {
    switch ($[0]) {
        case 'error': return _p.ss($, ($) => ({
            'type': ['primitive', {
                'kind': ['null', null],
            }],
            'deprecated': false,
        }))
        case 'success': return _p.ss($, ($) => _p.decide.state($, ($): d_out.Value => {
            switch ($[0]) {
                case 'component': return _p.ss($, ($) => Value($.value))
                case 'dictionary': return _p.ss($, ($): d_out.Value => ({
                    'type': ['composite', {
                        'kind': ['object', null],
                        'children': $.intermediate['entries as list'].__l_map(($): d_out.Symbol => ({
                            'name': $.intermediate['id value pair'].id.token.value,
                            'detail': "entry",
                            'value': _p.decide.state($.value, ($) => {
                                switch ($[0]) {
                                    case 'set': return _p.ss($, ($) => Value($))
                                    case 'not set': return _p.ss($, ($) => ({
                                        'type': ['primitive', {
                                            'kind': ['null', null],
                                        }],
                                    }))
                                    default: return _p.au($[0])
                                }
                            }),
                            'range': t_parse_tree_to_location.ID_Value_Pair($.intermediate['id value pair']),
                            'selection range': $.intermediate['id value pair'].id.range,
                        })),
                    }],
                }))
                case 'group': return _p.ss($, ($) => ({
                    'type': ['composite', {
                        'kind': ['struct', null],
                        'children': _p.decide.state($.derived.style, ($) => {
                            switch ($[0]) {
                                case 'verbose': return _p.ss($, ($) => $.properties.__l_map(($): d_out.Symbol => ({
                                    'name': $.id,
                                    'detail': "property",
                                    'value': _p.decide.state($['definition found'], ($) => {
                                        switch ($[0]) {
                                            case 'yes': return _p.ss($, ($) => $['value'].__decide(
                                                ($): d_out.Value => Value($),
                                                (): d_out.Value => ({
                                                    'type': ['primitive', {
                                                        'kind': ['null', null],
                                                    }],
                                                })
                                            ))
                                            case 'no': return _p.ss($, ($) => ({
                                                'type': ['primitive', {
                                                    'kind': ['null', null],
                                                }],
                                                'deprecated': false,
                                            }))
                                            default: return _p.au($[0])
                                        }
                                    }),
                                    'range': t_parse_tree_to_location.ID_Value_Pair($.intermediate['id value pair']),
                                    'selection range': $.intermediate['id value pair'].id.range,
                                })))
                                case 'concise': return _p.ss($, ($) => $.properties.__l_map(($): d_out.Symbol => _p.decide.state($['definition found'], ($) => {
                                    switch ($[0]) {
                                        case 'no': return _p.ss($, ($): d_out.Symbol => ({
                                            'value': {

                                                'type': ['primitive', {
                                                    'kind': ['null', null],
                                                }],
                                            },
                                            'detail': "property",
                                            'name': "-unknown-",
                                            'range': t_parse_tree_to_location.Value($.item.value),
                                            'selection range': t_parse_tree_to_location.Value($.item.value),
                                        }))
                                        case 'yes': return _p.ss($, ($): d_out.Symbol => ({
                                            'value': Value($['value']),
                                            'detail': "property",
                                            'name': $.id,
                                            'range': t_parse_tree_to_location.Value($['value'].instance),
                                            'selection range': t_parse_tree_to_location.Value($['value'].instance),
                                        }))
                                        default: return _p.au($[0])
                                    }
                                })))
                                default: return _p.au($[0])
                            }
                        }),
                    }],
                    'deprecated': false,
                }))
                case 'list': return _p.ss($, ($) => ({
                    'type': ['composite', {
                        'kind': ['array', null],
                        'children': _p.list.from.list($.derived.items).map_with_state(
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
                    }],
                    'deprecated': false,
                }))
                case 'nothing': return _p.ss($, ($) => ({
                    'type': ['primitive', {
                        'kind': ['null', null],
                    }],
                    'deprecated': false,
                }))
                case 'optional': return _p.ss($, ($) => _p.decide.state($.derived.status, ($) => {
                    switch ($[0]) {
                        case 'set': return _p.ss($, ($) => Value($['child value']))
                        case 'not set': return _p.ss($, ($) => ({
                            'type': ['primitive', {
                                'kind': ['null', null],
                            }],
                            'deprecated': false,
                        }))
                        default: return _p.au($[0])
                    }
                }))
                case 'reference': return _p.ss($, ($) => ({
                    'type': ['primitive', {
                        'kind': ['string', null],
                    }],
                    'deprecated': false,
                }))
                case 'simple': return _p.ss($, ($) => _p.decide.state($.definition, ($) => {
                    switch ($[0]) {
                        case 'global': return _p.ss($, ($) => _p.decide.state($['l entry'].type, ($) => {
                            switch ($[0]) {
                                case 'number': return _p.ss($, ($) => ({
                                    'type': ['primitive', {
                                        'kind': ['number', null],
                                    }],
                                    'deprecated': false,
                                }))
                                case 'boolean': return _p.ss($, ($) => ({
                                    'type': ['primitive', {
                                        'kind': ['boolean', null],
                                    }],
                                    'deprecated': false,
                                }))
                                case 'date': return _p.ss($, ($) => ({
                                    'type': ['primitive', {
                                        'kind': ['string', null],
                                    }],
                                    'deprecated': false,
                                }))
                                default: return _p.au($[0])
                            }
                        }))
                        default: return _p.au($[0])
                    }
                }))
                case 'state': return _p.ss($, ($) => _p.decide.state($.derived['option status'], ($): d_out.Value => {
                    switch ($[0]) {
                        case 'set': return _p.ss($, ($) => ({
                            'type': ['composite', {
                                'kind': ['enum member', null],
                                'children': _p.list.literal([
                                    {
                                        'name': "set",
                                        'detail': "set",
                                        'value': Value($.value),
                                        'range': t_parse_tree_to_location.Value($.value.instance),
                                        'selection range': $.intermediate['option token'].range,
                                    }
                                ]),
                            }],
                            'deprecated': false,
                        }))
                        case 'missing data': return _p.ss($, ($) => ({
                            'type': ['primitive', {
                                'kind': ['null', null],
                            }],
                            'deprecated': true,
                        }))
                        default: return _p.au($[0])
                    }
                }))
                case 'text': return _p.ss($, ($) => ({
                    'type': ['primitive', {
                        'kind': ['string', null],
                    }],
                    'deprecated': false,
                }))
                default: return _p.au($[0])
            }
        }))
        default: return _p.au($[0])
    }
})