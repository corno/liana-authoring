import * as pt from 'pareto-core/dist/transformer/implementation'

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
): d_out.Value.data => pt.decide.state($, ($): d_out.Value.data => {
    switch ($[0]) {
        case 'simple': return pt.ss($, ($) => ['concrete', {
            'type': ['text', {
                'delimiter': ['none', null],
                'value': pt.decide.state($, ($) => {
                    switch ($[0]) {
                        case 'global': return pt.ss($, ($) => pt.decide.state($['l entry'].type, ($) => {
                            switch ($[0]) {
                                case 'number': return pt.ss($, ($) => "0")
                                case 'boolean': return pt.ss($, ($) => "false")
                                case 'date': return pt.ss($, ($) => "yyyy-mm-dd")
                                default: return pt.au($[0])
                            }
                        }))
                        default: return pt.au($[0])
                    }
                }),
                'trivia': {
                    'comments': pt.literal.list([])
                }
            }]
        }])
        case 'nothing': return pt.ss($, ($) => ['concrete', {
            'type': ['nothing', {
                '~': {
                    'comments': pt.literal.list([])
                }
            }]
        }])
        case 'text': return pt.ss($, ($) => ['concrete', {
            'type': ['text', {
                'delimiter': ['quote', null],
                'value': "",
                'trivia': {
                    'comments': pt.literal.list([])
                }
            }]
        }])
        case 'list': return pt.ss($, ($) => ['concrete', {
            'type': ['list', {
                '[': {
                    'comments': pt.literal.list([])
                },
                'items': pt.literal.list([]),
                ']': {
                    'comments': pt.literal.list([])
                },
            }]
        }])
        case 'reference': return pt.ss($, ($) => ['missing', {
            '#': {
                'comments': pt.literal.list([])
            }
        }])
        case 'component': return pt.ss($, ($) => pt.decide.state($.type, ($) => {
            switch ($[0]) {
                case 'external': return pt.ss($, ($) => Value_data($.module['l entry']['root value'], $p))
                case 'internal': return pt.ss($, ($) => Value_data($['l entry'].get_circular_dependent()['root value'], $p))
                case 'internal acyclic': return pt.ss($, ($) => Value_data($['l entry']['root value'], $p))
                default: return pt.au($[0])
            }
        })
        )
        case 'dictionary': return pt.ss($, ($) => ['concrete', {
            'type': ['dictionary', {
                '{': {
                    'comments': pt.literal.list([])
                },
                'entries': pt.literal.list([]),
                '}': {
                    'comments': pt.literal.list([])
                },
            }]
        }])
        case 'group': return pt.ss($, ($): d_out.Value.data => {
            const xx = $
            return ['concrete', {
                'type': ['group', pt.decide.state($p.style, ($): d_out.Value.data.concrete.type_.group => {
                    switch ($[0]) {
                        case 'concise': return pt.ss($, ($) => ['concise', {
                            '<': {
                                'comments': pt.literal.list([])
                            },
                            'properties': pt.list.from.dictionary(
                                xx
                            ).convert(
                                ($, id): d_out.Items.L => Value(
                                    $.value,
                                    $p
                                )
                            ),
                            '>': {
                                'comments': pt.literal.list([])
                            },
                        }])
                        case 'verbose': return pt.ss($, ($) => ['verbose', {
                            '(': {
                                'comments': pt.literal.list([])
                            },
                            'properties': pt.list.from.dictionary(
                                xx
                            ).convert(
                                ($, id): d_out.ID_Value_Pairs.L => ({
                                    'id': id,
                                    'value': pt.literal.set(Value(
                                        $.value,
                                        $p
                                    ))
                                })
                            ),
                            ')': {
                                'comments': pt.literal.list([])
                            },
                        }])
                        default: return pt.au($[0])
                    }
                })]
            }]
        })
        case 'optional': return pt.ss($, ($) => ['concrete', {
            'type': ['optional', ['not set', {
                '_': {
                    'comments': pt.literal.list([])
                }
            }]]
        }])
        case 'state': return pt.ss($, ($) => ['concrete', {
            'type': ['state', {
                '|': {
                    'comments': pt.literal.list([])
                },
                'status': ['missing', {
                    '#': {
                        'comments': pt.literal.list([])
                    }
                }]
            }]
        }])
        default: return pt.au($[0])
    }
})

// export const Resolver_Value = (
//     $: d_in.Resolver_Value,
// ): d_out.Value => ({
//     'data': ['concrete', {
//         'type': pt.decide.state($, ($): d_out.Value.data.concrete.type_ => {
//             switch ($[0]) {
//                 case 'simple': return pt.ss($, ($) => ['text', {
//                     'delimiter': ['none', null],
//                     'value': "0",
//                     'trivia': {
//                         'comments': pt.literal.list([])
//                     }
//                 }])
//                 case 'nothing': return pt.ss($, ($) => ['nothing', {
//                     '~': {
//                         'comments': pt.literal.list([])
//                     }
//                 }])
//                 case 'text': return pt.ss($, ($) => ['text', {
//                     'delimiter': ['quote', null],
//                     'value': "",
//                     'trivia': {
//                         'comments': pt.literal.list([])
//                     }
//                 }])
//                 case 'list': return pt.ss($, ($) => ['list', {
//                     '[': {
//                         'comments': pt.literal.list([])
//                     },
//                     'items': pt.literal.list([]),
//                     ']': {
//                         'comments': pt.literal.list([])
//                     },
//                 }])
//                 case 'reference': return pt.ss($, ($) => ['text', {
//                     'delimiter': ['apostrophe', null],
//                     'value': "...",
//                     'trivia': {
//                         'comments': pt.literal.list([])
//                     }
//                 }])
//                 case 'component': return pt.ss($, ($) => pt.decide.state($.location, ($) => {
//                     switch ($[0]) {
//                         case 'external': return pt.ss($, ($) => p_implement_me("xx"))
//                         case 'internal': return pt.ss($, ($) => p_implement_me("xx"))
//                         default: return pt.au($[0])
//                     }
//                 }))
//                 case 'dictionary': return pt.ss($, ($) => ['dictionary', {
//                     '{': {
//                         'comments': pt.literal.list([])
//                     },
//                     'entries': pt.literal.list([]),
//                     '}': {
//                         'comments': pt.literal.list([])
//                     },
//                 }])
//                 case 'group': return pt.ss($, ($): d_out.Value.data.concrete.type_ => ['group', ['verbose', {
//                     '(': {
//                         'comments': pt.literal.list([])
//                     },
//                     'properties': pt.list.from.dictionary(
//                         $
//                     ).convert(
//                         ($, id): d_out.ID_Value_Pairs.L => ({
//                             'id': id,
//                             'value': pt.literal.set(Resolver_Value($.resolver))
//                         })
//                     ),
//                     ')': {
//                         'comments': pt.literal.list([])
//                     },
//                 }]])
//                 case 'optional': return pt.ss($, ($) => ['optional', ['not set', {
//                     '_': {
//                         'comments': pt.literal.list([])
//                     }
//                 }]])
//                 case 'state': return pt.ss($, ($) => ['state', {
//                     '|': {
//                         'comments': pt.literal.list([])
//                     },
//                     'status': ['missing', {
//                         '#': {
//                             'comments': pt.literal.list([])
//                         }
//                     }]
//                 }])
//                 default: return pt.au($[0])
//             }
//         })
//     }]

// })
