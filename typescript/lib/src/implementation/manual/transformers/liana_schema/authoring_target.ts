import * as _p from 'pareto-core/dist/assign'

import * as d_out from "astn/dist/interface/generated/liana/schemas/authoring_target/data"
import * as d_in from "pareto-liana/dist/interface/generated/liana/schemas/schema/data/resolved"

export const Value = (
    $: d_in.Value,
    $p: {
        'style':
        | ['concise', null]
        | ['verbose', null]
    }
): d_out.Value => ({
    'data': Value_data($, $p)
})

export const Value_data = (
    $: d_in.Value,
    $p: {
        'style':
        | ['concise', null]
        | ['verbose', null]
    }
): d_out.Value.data => _p.decide.state($, ($): d_out.Value.data => {
    switch ($[0]) {
        case 'simple': return _p.ss($, ($) => ['concrete', {
            'type': ['text', {
                'delimiter': ['none', null],
                'value': _p.decide.state($, ($) => {
                    switch ($[0]) {
                        case 'global': return _p.ss($, ($) => _p.decide.state($['l entry'].type, ($) => {
                            switch ($[0]) {
                                case 'number': return _p.ss($, ($) => "0")
                                case 'boolean': return _p.ss($, ($) => "false")
                                case 'date': return _p.ss($, ($) => "yyyy-mm-dd")
                                default: return _p.au($[0])
                            }
                        }))
                        default: return _p.au($[0])
                    }
                }),
                'trivia': {
                    'comments': _p.list.literal([])
                }
            }]
        }])
        case 'nothing': return _p.ss($, ($) => ['concrete', {
            'type': ['nothing', {
                '~': {
                    'comments': _p.list.literal([])
                }
            }]
        }])
        case 'text': return _p.ss($, ($) => ['concrete', {
            'type': ['text', {
                'delimiter': ['quote', null],
                'value': "",
                'trivia': {
                    'comments': _p.list.literal([])
                }
            }]
        }])
        case 'list': return _p.ss($, ($) => ['concrete', {
            'type': ['list', {
                '[': {
                    'comments': _p.list.literal([])
                },
                'items': _p.list.literal([]),
                ']': {
                    'comments': _p.list.literal([])
                },
            }]
        }])
        case 'reference': return _p.ss($, ($) => ['missing', {
            '#': {
                'comments': _p.list.literal([])
            }
        }])
        case 'component': return _p.ss($, ($) => _p.decide.state($.type, ($) => {
            switch ($[0]) {
                case 'external': return _p.ss($, ($) => Value_data($.module['l entry']['root value'], $p))
                case 'internal': return _p.ss($, ($) => Value_data($['l entry'].get_circular_dependent()['root value'], $p))
                case 'internal acyclic': return _p.ss($, ($) => Value_data($['l entry']['root value'], $p))
                default: return _p.au($[0])
            }
        })
        )
        case 'dictionary': return _p.ss($, ($) => ['concrete', {
            'type': ['dictionary', {
                '{': {
                    'comments': _p.list.literal([])
                },
                'entries': _p.list.literal([]),
                '}': {
                    'comments': _p.list.literal([])
                },
            }]
        }])
        case 'group': return _p.ss($, ($): d_out.Value.data => {
            const xx = $
            return ['concrete', {
                'type': ['group', _p.decide.state($p.style, ($): d_out.Value.data.concrete.type_.group => {
                    switch ($[0]) {
                        case 'concise': return _p.ss($, ($) => ['concise', {
                            '<': {
                                'comments': _p.list.literal([])
                            },
                            'properties': _p.list.from.dictionary(
                                xx
                            ).convert(
                                ($, id): d_out.Items.L => Value(
                                    $.value,
                                    $p
                                )
                            ),
                            '>': {
                                'comments': _p.list.literal([])
                            },
                        }])
                        case 'verbose': return _p.ss($, ($) => ['verbose', {
                            '(': {
                                'comments': _p.list.literal([])
                            },
                            'properties': _p.list.from.dictionary(
                                xx
                            ).convert(
                                ($, id): d_out.ID_Value_Pairs.L => ({
                                    'id': id,
                                    'value': _p.optional.literal.set(Value(
                                        $.value,
                                        $p
                                    ))
                                })
                            ),
                            ')': {
                                'comments': _p.list.literal([])
                            },
                        }])
                        default: return _p.au($[0])
                    }
                })]
            }]
        })
        case 'optional': return _p.ss($, ($) => ['concrete', {
            'type': ['optional', ['not set', {
                '_': {
                    'comments': _p.list.literal([])
                }
            }]]
        }])
        case 'state': return _p.ss($, ($) => ['concrete', {
            'type': ['state', {
                '|': {
                    'comments': _p.list.literal([])
                },
                'status': ['missing', {
                    '#': {
                        'comments': _p.list.literal([])
                    }
                }]
            }]
        }])
        default: return _p.au($[0])
    }
})

// export const Resolver_Value = (
//     $: d_in.Resolver_Value,
// ): d_out.Value => ({
//     'data': ['concrete', {
//         'type': _p.decide.state($, ($): d_out.Value.data.concrete.type_ => {
//             switch ($[0]) {
//                 case 'simple': return _p.ss($, ($) => ['text', {
//                     'delimiter': ['none', null],
//                     'value': "0",
//                     'trivia': {
//                         'comments': _p.list.literal([])
//                     }
//                 }])
//                 case 'nothing': return _p.ss($, ($) => ['nothing', {
//                     '~': {
//                         'comments': _p.list.literal([])
//                     }
//                 }])
//                 case 'text': return _p.ss($, ($) => ['text', {
//                     'delimiter': ['quote', null],
//                     'value': "",
//                     'trivia': {
//                         'comments': _p.list.literal([])
//                     }
//                 }])
//                 case 'list': return _p.ss($, ($) => ['list', {
//                     '[': {
//                         'comments': _p.list.literal([])
//                     },
//                     'items': _p.list.literal([]),
//                     ']': {
//                         'comments': _p.list.literal([])
//                     },
//                 }])
//                 case 'reference': return _p.ss($, ($) => ['text', {
//                     'delimiter': ['apostrophe', null],
//                     'value': "...",
//                     'trivia': {
//                         'comments': _p.list.literal([])
//                     }
//                 }])
//                 case 'component': return _p.ss($, ($) => _p.decide.state($.location, ($) => {
//                     switch ($[0]) {
//                         case 'external': return _p.ss($, ($) => _p_implement_me("xx"))
//                         case 'internal': return _p.ss($, ($) => _p_implement_me("xx"))
//                         default: return _p.au($[0])
//                     }
//                 }))
//                 case 'dictionary': return _p.ss($, ($) => ['dictionary', {
//                     '{': {
//                         'comments': _p.list.literal([])
//                     },
//                     'entries': _p.list.literal([]),
//                     '}': {
//                         'comments': _p.list.literal([])
//                     },
//                 }])
//                 case 'group': return _p.ss($, ($): d_out.Value.data.concrete.type_ => ['group', ['verbose', {
//                     '(': {
//                         'comments': _p.list.literal([])
//                     },
//                     'properties': _p.list.from.dictionary(
//                         $
//                     ).convert(
//                         ($, id): d_out.ID_Value_Pairs.L => ({
//                             'id': id,
//                             'value': _p.optional.literal.set(Resolver_Value($.resolver))
//                         })
//                     ),
//                     ')': {
//                         'comments': _p.list.literal([])
//                     },
//                 }]])
//                 case 'optional': return _p.ss($, ($) => ['optional', ['not set', {
//                     '_': {
//                         'comments': _p.list.literal([])
//                     }
//                 }]])
//                 case 'state': return _p.ss($, ($) => ['state', {
//                     '|': {
//                         'comments': _p.list.literal([])
//                     },
//                     'status': ['missing', {
//                         '#': {
//                             'comments': _p.list.literal([])
//                         }
//                     }]
//                 }])
//                 default: return _p.au($[0])
//             }
//         })
//     }]

// })
