import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'
import _p_text_from_list from 'pareto-core/dist/_p_text_from_list'

//data types
import * as d_in from "../../../../interface/to_be_generated/unmashall_result"
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
        case 'incorrect': return _p.ss($, ($) => ({
            'type': ['primitive', {
                'kind': ['null', null],
            }],
            'deprecated': false,
        }))
        case 'missing': return _p.ss($, ($) => ({
            'type': ['primitive', {
                'kind': ['null', null],
            }],
            'deprecated': true,
        }))
        case 'correct': return _p.ss($, ($) => _p.decide.state($, ($): d_out.Value => {
            switch ($[0]) {
                case 'nothing': return _p.ss($, ($) => ({
                    'type': ['primitive', {
                        'kind': ['null', null],
                    }],
                    'deprecated': false,
                }))
                case 'optional': return _p.ss($, ($) => _p.decide.state($.status, ($) => {
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
                case 'text': return _p.ss($, ($) => ({
                    'type': ['primitive', {
                        'kind': ['string', null],
                    }],
                    'deprecated': false,
                }))
                case 'state': return _p.ss($, ($) => _p.decide.state($['option status'], ($): d_out.Value => {
                    switch ($[0]) {
                        case 'set': return _p.ss($, ($) => _p.decide.state($['selected option status'], ($) => {
                            switch ($[0]) {
                                case 'known': return _p.ss($, ($) => Value($.value))
                                case 'unknown': return _p.ss($, ($) => ({
                                    'type': ['primitive', {
                                        'kind': ['null', null],
                                    }],
                                    'deprecated': true,
                                }))
                                default: return _p.au($[0])
                            }
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
                case 'component': return _p.ss($, ($) => Value($.value))
                case 'dictionary': return _p.ss($, ($): d_out.Value => ({
                    'type': ['composite', {
                        'kind': ['object', null],
                        'children': $.entries.__l_map(($): d_out.Symbol => ({
                            'name': $['id value pair'].id.token.value,
                            'detail': "dictionary entry",
                            'value': $.value.__decide(
                                ($): d_out.Value => Value($),
                                (): d_out.Value => ({
                                    'type': ['primitive', {
                                        'kind': ['null', null],
                                    }],
                                })
                            ),
                            'range': t_parse_tree_to_location.ID_Value_Pair($['id value pair']),
                            'selection range': $['id value pair'].id.range,
                        })),
                    }],
                }))
                case 'group': return _p.ss($, ($) => ({
                    'type': ['composite', {
                        'kind': ['struct', null],
                        'children': _p.decide.state($.type, ($) => {
                            switch ($[0]) {
                                case 'verbose': return _p.ss($, ($) => $.properties.__l_map(($): d_out.Symbol => ({
                                    'name': $['id value pair'].id.token.value,
                                    'detail': "property",
                                    'value': _p.decide.state($['definition found'], ($) => {
                                        switch ($[0]) {
                                            case 'yes': return _p.ss($, ($) => $.value.__decide(
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
                                    'range': t_parse_tree_to_location.ID_Value_Pair($['id value pair']),
                                    'selection range': $['id value pair'].id.range,
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
                                            'value': {

                                                'type': ['primitive', {
                                                    'kind': ['null', null],
                                                }],
                                            },
                                            'detail': "property",
                                            'name': $.id,
                                            'range': t_parse_tree_to_location.Value($.value.instance),
                                            'selection range': t_parse_tree_to_location.Value($.value.instance),
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
                        'children': _p.list.from.list($.items).map_with_state(
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
                case 'reference': return _p.ss($, ($) => ({
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


// export const Value: Value = ($) => _p.decide.state($['unmarshall result'], ($) => {
//     switch ($[0]) {
//         case 'incorrect': return _p.ss($, ($) => _p.list.literal([]))
//         case 'missing': return _p.ss($, ($) => _p.list.literal([]))
//         case 'correct': return _p.ss($, ($) => _p.decide.state($, ($) => {
//             switch ($[0]) {
//                 case 'component': return _p.ss($, ($) => Value($.value))
//                 case 'dictionary': return _p.ss($, ($) => $.entries.__l_map(($): d_out.Symbol => ({
//                     'name': $['id value pair'].id.token.value,
//                     'detail': "dictionary entry",
//                     'value': $.value.__decide(
//                         ($) => Value($),
//                         () => ({
//                             'kind': ['null', null],
//                             'deprecated': false,
//                         })
//                     ),
//                     'range': t_parse_tree_to_location.ID_Value_Pair($['id value pair']),
//                     'selection range': $['id value pair'].id.range,
//                     'children': $.value.__decide(
//                         ($) => Value($),
//                         () => _p.list.literal([])
//                     ),
//                 })))
//                 case 'group': return _p.ss($, ($) => _p.decide.state($.type, ($) => {
//                     switch ($[0]) {
//                         case 'verbose': return _p.ss($, ($) => $.properties.__l_map(($): d_out.Symbol => ({
//                             'name': $['id value pair'].id.token.value,
//                             'detail': "property",
//                             'value': _p.decide.state($['definition found'], ($) => {
//                                 switch ($[0]) {
//                                     case 'yes': return _p.ss($, ($) => $.value.__decide(
//                                         ($) => Value($),
//                                         () => ({
//                                             'kind': ['null', null],
//                                             'deprecated': false,
//                                         })
//                                     ))
//                                     case 'no': return _p.ss($, ($) => ({
//                                         'kind': ['null', null],
//                                         'deprecated': false,
//                                     }))
//                                     default: return _p.au($[0])
//                                 }
//                             }),
//                             'range': t_parse_tree_to_location.ID_Value_Pair($['id value pair']),
//                             'selection range': $['id value pair'].id.range,
//                             'children': _p.decide.state($['definition found'], ($) => {
//                                 switch ($[0]) {
//                                     case 'yes': return _p.ss($, ($) => $.value.__decide(
//                                         ($) => Value($),
//                                         () => _p.list.literal([])
//                                     ))
//                                     case 'no': return _p.ss($, ($) => _p.list.literal([]))
//                                     default: return _p.au($[0])
//                                 }
//                             }),
//                         })))
//                         case 'concise': return _p.ss($, ($) => $.properties.__l_map(($): d_out.Symbol => {
//                             const item = $.item
//                             return _p.decide.state($['definition found'], ($) => {
//                                 switch ($[0]) {
//                                     case 'no': return _p.ss($, ($) => ({
//                                         'name': "-unknown-",
//                                         'detail': "property",
//                                         'value': {
//                                             'kind': ['null', null],
//                                             'deprecated': false,
//                                         },
//                                         'range': t_parse_tree_to_location.Value($),
//                                         'selection range': $['id value pair'].id.range,
//                                         'children': _p.decide.state($['definition found'], ($) => {
//                                             switch ($[0]) {
//                                                 case 'yes': return _p.ss($, ($) => $.value.__decide(
//                                                     ($) => Value($),
//                                                     () => _p.list.literal([])
//                                                 ))
//                                                 case 'no': return _p.ss($, ($) => _p.list.literal([]))
//                                                 default: return _p.au($[0])
//                                             }
//                                         }),

//                                     }))
//                                     case 'yes': return _p.ss($, ($) => ({
//                                         'name': $['id value pair'].id.token.value,
//                                         'detail': "property",
//                                         'value': _p.decide.state($['definition found'], ($) => {
//                                             switch ($[0]) {
//                                                 case 'yes': return _p.ss($, ($) => $.value.__decide(
//                                                     ($) => Value($),
//                                                     () => ({
//                                                         'kind': ['null', null],
//                                                         'deprecated': false,
//                                                     })
//                                                 ))
//                                                 case 'no': return _p.ss($, ($) => ({
//                                                     'kind': ['null', null],
//                                                     'deprecated': false,
//                                                 }))
//                                                 default: return _p.au($[0])
//                                             }
//                                         }),
//                                         'range': t_parse_tree_to_location.ID_Value_Pair($['id value pair']),
//                                         'selection range': $['id value pair'].id.range,
//                                         'children': _p.decide.state($['definition found'], ($) => {
//                                             switch ($[0]) {
//                                                 case 'yes': return _p.ss($, ($) => $.value.__decide(
//                                                     ($) => Value($),
//                                                     () => _p.list.literal([])
//                                                 ))
//                                                 case 'no': return _p.ss($, ($) => _p.list.literal([]))
//                                                 default: return _p.au($[0])
//                                             }
//                                         }),

//                                     }))
//                                     default: return _p.au($[0])
//                                 }
//                             })
//                         }))
//                         default: return _p.au($[0])
//                     }
//                 }))
//                 case 'list': return _p.ss($, ($) => $.items.__l_map(($): d_out.Symbol => xxxx))
//                 case 'nothing': return _p.ss($, ($) => _p.list.literal([]))
//                 case 'simple': return _p.ss($, ($) => _p.list.literal([]))
//                 case 'optional': return _p.ss($, ($) => _p.decide.state($.status, ($) => {
//                     switch ($[0]) {
//                         case 'set': return _p.ss($, ($) => Value($['child value']))
//                         case 'not set': return _p.ss($, ($) => _p.list.literal([]))
//                         default: return _p.au($[0])
//                     }
//                 }))
//                 case 'reference': return _p.ss($, ($) => _p.list.literal([]))
//                 case 'state': return _p.ss($, ($) => _p.decide.state($['option status'], ($) => {
//                     switch ($[0]) {
//                         case 'set': return _p.ss($, ($) => _p.decide.state($['selected option status'], ($) => {
//                             switch ($[0]) {
//                                 case 'known': return _p.ss($, ($) => Value($.value))
//                                 case 'unknown': return _p.ss($, ($) => _p.list.literal([]))
//                                 default: return _p.au($[0])
//                             }
//                         }))
//                         case 'missing data': return _p.ss($, ($) => _p.list.literal([]))
//                         default: return _p.au($[0])
//                     }
//                 }))
//                 case 'text': return _p.ss($, ($) => _p.list.literal([]))
//                 default: return _p.au($[0])
//             }
//         }))
//         default: return _p.au($[0])
//     }
// })