import * as p_ from 'pareto-core/dist/implementation/transformer'

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
): d_out.Value.data => p_.decide.state($, ($): d_out.Value.data => {
    switch ($[0]) {
        case 'simple': return p_.ss($, ($) => ['concrete', {
            'type': ['text', {
                'delimiter': ['none', null],
                'value': p_.decide.state($, ($) => {
                    switch ($[0]) {
                        case 'global': return p_.ss($, ($) => p_.decide.state($['l entry'].type, ($) => {
                            switch ($[0]) {
                                case 'number': return p_.ss($, ($) => "0")
                                case 'boolean': return p_.ss($, ($) => "false")
                                case 'date': return p_.ss($, ($) => "yyyy-mm-dd")
                                default: return p_.au($[0])
                            }
                        }))
                        default: return p_.au($[0])
                    }
                }),
                'trivia': {
                    'comments': p_.literal.list([])
                }
            }]
        }])
        case 'nothing': return p_.ss($, ($) => ['concrete', {
            'type': ['nothing', {
                '~': {
                    'comments': p_.literal.list([])
                }
            }]
        }])
        case 'text': return p_.ss($, ($) => ['concrete', {
            'type': ['text', {
                'delimiter': ['quote', null],
                'value': "",
                'trivia': {
                    'comments': p_.literal.list([])
                }
            }]
        }])
        case 'list': return p_.ss($, ($) => ['concrete', {
            'type': ['list', {
                '[': {
                    'comments': p_.literal.list([])
                },
                'items': p_.literal.list([]),
                ']': {
                    'comments': p_.literal.list([])
                },
            }]
        }])
        case 'reference': return p_.ss($, ($) => ['missing', {
            '#': {
                'comments': p_.literal.list([])
            }
        }])
        case 'component': return p_.ss($, ($) => p_.decide.state($.type, ($) => {
            switch ($[0]) {
                case 'external': return p_.ss($, ($) => Value_data($.module['l entry']['root value'], $p))
                case 'internal': return p_.ss($, ($) => Value_data($['l entry'].get_circular_dependent()['root value'], $p))
                case 'internal acyclic': return p_.ss($, ($) => Value_data($['l entry']['root value'], $p))
                default: return p_.au($[0])
            }
        })
        )
        case 'dictionary': return p_.ss($, ($) => ['concrete', {
            'type': ['dictionary', {
                '{': {
                    'comments': p_.literal.list([])
                },
                'entries': p_.literal.list([]),
                '}': {
                    'comments': p_.literal.list([])
                },
            }]
        }])
        case 'group': return p_.ss($, ($): d_out.Value.data => {
            const xx = $
            return ['concrete', {
                'type': ['group', p_.decide.state($p.style, ($): d_out.Value.data.concrete.type_.group => {
                    switch ($[0]) {
                        case 'concise': return p_.ss($, ($) => ['concise', {
                            '<': {
                                'comments': p_.literal.list([])
                            },
                            'properties': p_.list.from.dictionary(
                                xx
                            ).convert(
                                ($, id): d_out.Items.L => Value(
                                    $.value,
                                    $p
                                )
                            ),
                            '>': {
                                'comments': p_.literal.list([])
                            },
                        }])
                        case 'verbose': return p_.ss($, ($) => ['verbose', {
                            '(': {
                                'comments': p_.literal.list([])
                            },
                            'properties': p_.list.from.dictionary(
                                xx
                            ).convert(
                                ($, id): d_out.ID_Value_Pairs.L => ({
                                    'id': id,
                                    'value': p_.literal.set(Value(
                                        $.value,
                                        $p
                                    ))
                                })
                            ),
                            ')': {
                                'comments': p_.literal.list([])
                            },
                        }])
                        default: return p_.au($[0])
                    }
                })]
            }]
        })
        case 'optional': return p_.ss($, ($) => ['concrete', {
            'type': ['optional', ['not set', {
                '_': {
                    'comments': p_.literal.list([])
                }
            }]]
        }])
        case 'state': return p_.ss($, ($) => ['concrete', {
            'type': ['state', {
                '|': {
                    'comments': p_.literal.list([])
                },
                'status': ['missing', {
                    '#': {
                        'comments': p_.literal.list([])
                    }
                }]
            }]
        }])
        default: return p_.au($[0])
    }
})

// export const Resolver_Value = (
//     $: d_in.Resolver_Value,
// ): d_out.Value => ({
//     'data': ['concrete', {
//         'type': p_.decide.state($, ($): d_out.Value.data.concrete.type_ => {
//             switch ($[0]) {
//                 case 'simple': return p_.ss($, ($) => ['text', {
//                     'delimiter': ['none', null],
//                     'value': "0",
//                     'trivia': {
//                         'comments': p_.literal.list([])
//                     }
//                 }])
//                 case 'nothing': return p_.ss($, ($) => ['nothing', {
//                     '~': {
//                         'comments': p_.literal.list([])
//                     }
//                 }])
//                 case 'text': return p_.ss($, ($) => ['text', {
//                     'delimiter': ['quote', null],
//                     'value': "",
//                     'trivia': {
//                         'comments': p_.literal.list([])
//                     }
//                 }])
//                 case 'list': return p_.ss($, ($) => ['list', {
//                     '[': {
//                         'comments': p_.literal.list([])
//                     },
//                     'items': p_.literal.list([]),
//                     ']': {
//                         'comments': p_.literal.list([])
//                     },
//                 }])
//                 case 'reference': return p_.ss($, ($) => ['text', {
//                     'delimiter': ['apostrophe', null],
//                     'value': "...",
//                     'trivia': {
//                         'comments': p_.literal.list([])
//                     }
//                 }])
//                 case 'component': return p_.ss($, ($) => p_.decide.state($.location, ($) => {
//                     switch ($[0]) {
//                         case 'external': return p_.ss($, ($) => p_implement_me("xx"))
//                         case 'internal': return p_.ss($, ($) => p_implement_me("xx"))
//                         default: return p_.au($[0])
//                     }
//                 }))
//                 case 'dictionary': return p_.ss($, ($) => ['dictionary', {
//                     '{': {
//                         'comments': p_.literal.list([])
//                     },
//                     'entries': p_.literal.list([]),
//                     '}': {
//                         'comments': p_.literal.list([])
//                     },
//                 }])
//                 case 'group': return p_.ss($, ($): d_out.Value.data.concrete.type_ => ['group', ['verbose', {
//                     '(': {
//                         'comments': p_.literal.list([])
//                     },
//                     'properties': p_.list.from.dictionary(
//                         $
//                     ).convert(
//                         ($, id): d_out.ID_Value_Pairs.L => ({
//                             'id': id,
//                             'value': p_.literal.set(Resolver_Value($.resolver))
//                         })
//                     ),
//                     ')': {
//                         'comments': p_.literal.list([])
//                     },
//                 }]])
//                 case 'optional': return p_.ss($, ($) => ['optional', ['not set', {
//                     '_': {
//                         'comments': p_.literal.list([])
//                     }
//                 }]])
//                 case 'state': return p_.ss($, ($) => ['state', {
//                     '|': {
//                         'comments': p_.literal.list([])
//                     },
//                     'status': ['missing', {
//                         '#': {
//                             'comments': p_.literal.list([])
//                         }
//                     }]
//                 }])
//                 default: return p_.au($[0])
//             }
//         })
//     }]

// })
