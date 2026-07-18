import * as p_ from 'pareto-core/implementation/transformer'

import type * as interface_ from "../../../declarations/transformers/liana_schema/authoring_target.js"

//schemas
import type * as s_out from "astn/interface/data/authoring_target"

namespace s_function {
    export type Parameters = {
        'style':
        | ['concise', null]
        | ['verbose', null]
    }
}

export const Value: interface_.Value = ($, $p) => ({

    'data': Value_data($, $p)
})

export const Value_data: interface_.Value_data = ($, $p) => p_.from.state($).decide(
    ($): s_out.Value.data => {
        switch ($[0]) {
            case 'simple': return p_.option($, ($) => ['concrete', {
                'type': ['text', {
                    'delimiter': ['none', null],
                    'value': p_.from.state($).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'global': return p_.option($, ($) => p_.from.state($['l entry'].type).decide(
                                    ($) => {
                                        switch ($[0]) {
                                            case 'number': return p_.option($, ($) => "0")
                                            case 'boolean': return p_.option($, ($) => "false")
                                            case 'date': return p_.option($, ($) => "yyyy-mm-dd")
                                            default: return p_.exhaustive($[0])
                                        }
                                    }))
                                default: return p_.exhaustive($[0])
                            }
                        }),
                    'trivia': {
                        'comments': p_.literal.list([])
                    }
                }]
            }])
            case 'nothing': return p_.option($, ($) => ['concrete', {
                'type': ['nothing', {
                    '~': {
                        'comments': p_.literal.list([])
                    }
                }]
            }])
            case 'text': return p_.option($, ($) => ['concrete', {
                'type': ['text', {
                    'delimiter': ['quote', null],
                    'value': "",
                    'trivia': {
                        'comments': p_.literal.list([])
                    }
                }]
            }])
            case 'list': return p_.option($, ($) => ['concrete', {
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
            case 'reference': return p_.option($, ($) => ['missing', {
                '#': {
                    'comments': p_.literal.list([])
                }
            }])
            case 'component': return p_.option($, ($) => p_.from.state($.type).decide(
                ($) => {
                    switch ($[0]) {
                        case 'external': return p_.option($, ($) => Value_data($.module['l entry']['root value'], $p))
                        case 'internal': return p_.option($, ($) => Value_data($['l entry'].get_circular_dependent()['root value'], $p))
                        case 'internal acyclic': return p_.option($, ($) => Value_data($['l entry']['root value'], $p))
                        default: return p_.exhaustive($[0])
                    }
                })
            )
            case 'dictionary': return p_.option($, ($) => ['concrete', {
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
            case 'group': return p_.option($, ($): s_out.Value.data => {
                const $v_xx = $
                return ['concrete', {
                    'type': ['group', p_.from.state($p.style).decide(
                        ($): s_out.Value.data.concrete.type_.group => {
                            switch ($[0]) {
                                case 'concise': return p_.option($, ($) => ['concise', {
                                    '<': {
                                        'comments': p_.literal.list([])
                                    },
                                    'properties': p_.from.dictionary($v_xx).convert_to_list(
                                        ($, id): s_out.Items.L => Value(
                                            $.value,
                                            $p
                                        )
                                    ),
                                    '>': {
                                        'comments': p_.literal.list([])
                                    },
                                }])
                                case 'verbose': return p_.option($, ($) => ['verbose', {
                                    '(': {
                                        'comments': p_.literal.list([])
                                    },
                                    'properties': p_.from.dictionary($v_xx).convert_to_list(
                                        ($, id): s_out.ID_Value_Pairs.L => ({
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
                                default: return p_.exhaustive($[0])
                            }
                        })]
                }]
            })
            case 'optional': return p_.option($, ($) => ['concrete', {
                'type': ['optional', ['not set', {
                    '_': {
                        'comments': p_.literal.list([])
                    }
                }]]
            }])
            case 'state': return p_.option($, ($) => ['concrete', {
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
            default: return p_.exhaustive($[0])
        }
    })

// export const Resolver_Value = (
//     $: s_in.Resolver_Value,
// ): s_out.Value => ({
//     'data': ['concrete', {
//         'type': p_.from.state($).decide(
//($): s_out.Value.data.concrete.type_ => {
//             switch ($[0]) {
//                 case 'simple': return p_.option($, ($) => ['text', {
//                     'delimiter': ['none', null],
//                     'value': "0",
//                     'trivia': {
//                         'comments': p_.literal.list([])
//                     }
//                 }])
//                 case 'nothing': return p_.option($, ($) => ['nothing', {
//                     '~': {
//                         'comments': p_.literal.list([])
//                     }
//                 }])
//                 case 'text': return p_.option($, ($) => ['text', {
//                     'delimiter': ['quote', null],
//                     'value': "",
//                     'trivia': {
//                         'comments': p_.literal.list([])
//                     }
//                 }])
//                 case 'list': return p_.option($, ($) => ['list', {
//                     '[': {
//                         'comments': p_.literal.list([])
//                     },
//                     'items': p_.literal.list([]),
//                     ']': {
//                         'comments': p_.literal.list([])
//                     },
//                 }])
//                 case 'reference': return p_.option($, ($) => ['text', {
//                     'delimiter': ['apostrophe', null],
//                     'value': "...",
//                     'trivia': {
//                         'comments': p_.literal.list([])
//                     }
//                 }])
//                 case 'component': return p_.option($, ($) => p_.from.state($.location).decide(
//($) => {
//                     switch ($[0]) {
//                         case 'external': return p_.option($, ($) => p_implement_me("xx"))
//                         case 'internal': return p_.option($, ($) => p_implement_me("xx"))
//                         default: return p_.exhaustive($[0])
//                     }
//                 }))
//                 case 'dictionary': return p_.option($, ($) => ['dictionary', {
//                     '{': {
//                         'comments': p_.literal.list([])
//                     },
//                     'entries': p_.literal.list([]),
//                     '}': {
//                         'comments': p_.literal.list([])
//                     },
//                 }])
//                 case 'group': return p_.option($, ($): s_out.Value.data.concrete.type_ => ['group', ['verbose', {
//                     '(': {
//                         'comments': p_.literal.list([])
//                     },
//                     'properties': p_.from.dictionary(//                         $
//                     ).convert(
//                         ($, id): s_out.ID_Value_Pairs.L => ({
//                             'id': id,
//                             'value': p_.literal.set(Resolver_Value($.resolver))
//                         })
//                     ),
//                     ')': {
//                         'comments': p_.literal.list([])
//                     },
//                 }]])
//                 case 'optional': return p_.option($, ($) => ['optional', ['not set', {
//                     '_': {
//                         'comments': p_.literal.list([])
//                     }
//                 }]])
//                 case 'state': return p_.option($, ($) => ['state', {
//                     '|': {
//                         'comments': p_.literal.list([])
//                     },
//                     'status': ['missing', {
//                         '#': {
//                             'comments': p_.literal.list([])
//                         }
//                     }]
//                 }])
//                 default: return p_.exhaustive($[0])
//             }
//         })
//     }]

// })
