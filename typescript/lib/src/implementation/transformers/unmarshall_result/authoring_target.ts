import * as p_ from 'pareto-core/implementation/transformer'

import type * as interface_ from "../../../declarations/transformers/unmarshall_result/authoring_target.js"

//data types
import type * as s_out from "astn/interface/data/authoring_target"
import type * as s_function from "../../../interface/schemas/unmarshall_result_to_authoring_target.js"

//dependencies
import * as t_parse_tree_to_authoring_target from "astn/implementation/transformers/parse_tree/authoring_target"

//FIXME: we are losing comments in the transformation from the parse tree to the unmarshalled result, we need to add them to the unmarshalled result and then to the authoring target

const temp_value = ($: s_out.Value.data): s_out.Value => ({
    'data': $
})

export const Document: interface_.Document = ($, $p): s_out.Document => {
    return {
        'header': p_.from.optional($['header']).map(
            ($) => t_parse_tree_to_authoring_target.Value($)),
        'content': Any_Value($['content'], $p)
    }
}



export const Non_Entity: interface_.Non_Entity = ($, $p) => {
    const temp_dont_restyle_entities = ($: s_function.Parameters): s_function.Parameters => {
        const x = $
        return {
            'style': $['style'],
            'impact': p_.from.state($['impact']).decide(
                ($) => {
                    switch ($[0]) {
                        case 'shallow with entities': return p_.option($, ($) => ['shallow without entities', null])
                        case 'shallow without entities': return p_.option($, ($) => x['impact'])
                        case 'deep': return p_.option($, ($) => x['impact'])
                        default: return p_.exhaustive($[0])
                    }
                }),
        }
    }
    return Any_Value($, temp_dont_restyle_entities($p))
}

export const Entity: interface_.Entity = ($, $p) => {
    const value = $
    return p_.from.state($p.impact).decide(
        ($) => {
            switch ($[0]) {
                case 'shallow with entities': return p_.option($, ($) => Any_Value(
                    value,
                    {
                        'impact': ['shallow without entities', null],
                        'style': $p.style,
                    }
                ))
                case 'shallow without entities': return p_.option($, ($) => t_parse_tree_to_authoring_target.Value(value.instance))
                case 'deep': return p_.option($, ($) => Any_Value(value, $p))
                default: return p_.exhaustive($[0])
            }
        })
}

export const Any_Value: interface_.Any_Value = ($, $p) => {
    const instance = $['instance']
    return p_.from.state($['unmarshall result']).decide(
        ($) => {
            switch ($[0]) {
                case 'error': return p_.option($, ($) => p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'incorrect': return p_.option($, ($) => t_parse_tree_to_authoring_target.Value(instance))
                            case 'missing': return p_.option($, ($) => temp_value(['missing', {
                                '#': {
                                    'comments': p_.literal.list([])
                                }
                            }]))
                            default: return p_.exhaustive($[0])
                        }
                    }))
                case 'success': return p_.option($, ($) => p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'component': return p_.option($, ($) => Any_Value($.value, $p))
                            case 'dictionary': return p_.option($, ($) => temp_value(['concrete', {
                                'type': ['dictionary', {
                                    '{': Structural_Token($.intermediate.instance['{']),
                                    'entries': p_.from.list($.intermediate['entries as list']).map(
                                        ($): s_out.ID_Value_Pairs.L => ({
                                            'id': $.intermediate['id value pair'].id.token.value,
                                            'value': p_.from.state($.value).decide(
                                                ($) => {
                                                    switch ($[0]) {
                                                        case 'set': return p_.option($, ($) => p_.literal.set(Entity($, $p)))
                                                        case 'not set': return p_.option($, ($) => p_.literal.not_set())
                                                        default: return p_.exhaustive($[0])
                                                    }
                                                }),
                                        })),
                                    '}': Structural_Token($.intermediate.instance['}']),
                                }]
                            }]))
                            case 'group': return p_.option($, ($) => {
                                const $v_unmarsalled_group = $
                                return temp_value(['concrete', {
                                    'type': ['group', p_.from.state($p.style).decide(
                                        ($): s_out.Value.data.concrete.type_.group => {
                                            switch ($[0]) {
                                                case 'concise': return p_.option($, ($) => ['concise', {
                                                    '<': {
                                                        'comments': p_.literal.list([]) //FIXME: we are losing comments here, we need to add them to the unmarshalled result
                                                    },
                                                    'properties': p_.from.state($v_unmarsalled_group.derived.style).decide(
                                                        ($): s_out.Items => {
                                                            switch ($[0]) {
                                                                //convert concise to concise
                                                                case 'concise': return p_.option($, ($) => p_.from.list($.properties).map(
                                                                    ($) => {
                                                                        const item = $.item
                                                                        return p_.from.state($['definition found']).decide(
                                                                            ($) => {
                                                                                switch ($[0]) {
                                                                                    case 'no': return p_.option($, ($) => t_parse_tree_to_authoring_target.Value(item.value))
                                                                                    case 'yes': return p_.option($, ($) => Non_Entity($['value'], $p))
                                                                                    default: return p_.exhaustive($[0])
                                                                                }
                                                                            })
                                                                    }))
                                                                //convert verbose to concise
                                                                case 'verbose': return p_.option($, ($) => p_.from.list($.properties).map(
                                                                    ($): s_out.Items.L => {
                                                                        const item = $
                                                                        return p_.from.state($['definition found']).decide(
                                                                            ($) => {
                                                                                switch ($[0]) {
                                                                                    case 'yes': return p_.option($, ($): s_out.Items.L => p_.from.optional($['value']).decide(
                                                                                        ($) => Non_Entity($, $p),
                                                                                        () => temp_value(['concrete', {
                                                                                            'type': ['nothing', {
                                                                                                '~': {
                                                                                                    'comments': p_.literal.list([])
                                                                                                }
                                                                                            }]
                                                                                        }])
                                                                                    ))
                                                                                    case 'no': return p_.option($, ($): s_out.Items.L => p_.from.optional(item.intermediate['id value pair'].assignment).decide(
                                                                                        ($): s_out.Items.L => p_.from.optional($.value).decide(
                                                                                            ($) => t_parse_tree_to_authoring_target.Value($),
                                                                                            () => temp_value(['concrete', {
                                                                                                'type': ['nothing', {
                                                                                                    '~': {
                                                                                                        'comments': p_.literal.list([])
                                                                                                    }
                                                                                                }]
                                                                                            }])
                                                                                        ),
                                                                                        (): s_out.Items.L => temp_value(['concrete', {
                                                                                            'type': ['nothing', {
                                                                                                '~': {
                                                                                                    'comments': p_.literal.list([])
                                                                                                }
                                                                                            }]
                                                                                        }])
                                                                                    ))
                                                                                    default: return p_.exhaustive($[0])
                                                                                }
                                                                            })
                                                                    }))
                                                                default: return p_.exhaustive($[0])
                                                            }
                                                        }),
                                                    '>': {
                                                        'comments': p_.literal.list([]) //FIXME: we are losing comments here, we need to add them to the unmarshalled result
                                                    },
                                                }])
                                                case 'verbose': return p_.option($, ($) => ['verbose', {
                                                    '(': {
                                                        'comments': p_.literal.list([]) //FIXME: we are losing comments here, we need to add them to the unmarshalled result
                                                    },
                                                    'properties': p_.from.state($v_unmarsalled_group.derived.style).decide(
                                                        ($): s_out.ID_Value_Pairs => {
                                                            switch ($[0]) {
                                                                //convert concise to verbose
                                                                case 'concise': return p_.option($, ($): s_out.ID_Value_Pairs => p_.from.list($.properties).map_optionally(
                                                                    ($) => p_.from.state($['definition found']).decide(
                                                                        ($) => {
                                                                            switch ($[0]) {
                                                                                case 'no': return p_.option($, ($) => p_.literal.not_set())
                                                                                case 'yes': return p_.option($, ($) => p_.literal.set({
                                                                                    'id': $.id,
                                                                                    'value': p_.literal.set(Non_Entity($['value'], $p))
                                                                                }))
                                                                                default: return p_.exhaustive($[0])
                                                                            }
                                                                        }
                                                                    )))
                                                                //convert verbose to verbose
                                                                case 'verbose': return p_.option($, ($) => p_.from.list($.properties).map(
                                                                    ($): s_out.ID_Value_Pairs.L => {
                                                                        const item = $
                                                                        return {
                                                                            'id': $.intermediate['id value pair'].id.token.value,
                                                                            'value': p_.from.state($['definition found']).decide(
                                                                                ($): s_out.ID_Value_Pairs.L.value => {
                                                                                    switch ($[0]) {
                                                                                        case 'yes': return p_.option($, ($) => p_.from.optional($['value']).map(
                                                                                            ($) => Non_Entity($, $p)))
                                                                                        case 'no': return p_.option($, ($) => p_.from.optional(item.intermediate['id value pair'].assignment).decide(
                                                                                            ($): s_out.ID_Value_Pairs.L.value => p_.from.optional($.value).decide(
                                                                                                ($) => p_.literal.set(t_parse_tree_to_authoring_target.Value($)),
                                                                                                () => p_.literal.set(temp_value(['concrete', {
                                                                                                    'type': ['nothing', {
                                                                                                        '~': {
                                                                                                            'comments': p_.literal.list([])
                                                                                                        }
                                                                                                    }]
                                                                                                }]))
                                                                                            ),
                                                                                            (): s_out.ID_Value_Pairs.L.value => p_.literal.set(temp_value(['concrete', {
                                                                                                'type': ['nothing', {
                                                                                                    '~': {
                                                                                                        'comments': p_.literal.list([])
                                                                                                    }
                                                                                                }]
                                                                                            }]))
                                                                                        ))
                                                                                        default: return p_.exhaustive($[0])
                                                                                    }
                                                                                })
                                                                        }
                                                                    }))
                                                                default: return p_.exhaustive($[0])
                                                            }
                                                        }),
                                                    ')': {
                                                        'comments': p_.literal.list([]) //FIXME: we are losing comments here, we need to add them to the unmarshalled result
                                                    },
                                                }])
                                                default: return p_.exhaustive($[0])
                                            }
                                        })]
                                }])
                            })
                            case 'list': return p_.option($, ($) => temp_value(['concrete', {
                                'type': ['list', {
                                    '[': Structural_Token($.instance['[']),
                                    'items': p_.from.list($.derived.items).map(
                                        ($) => Entity($, $p)),
                                    ']': Structural_Token($.instance[']']),
                                }]
                            }]))
                            case 'nothing': return p_.option($, ($) => temp_value(['concrete', {
                                'type': ['nothing', {
                                    '~': {
                                        'comments': p_.literal.list([]) //FIXME: we are losing comments here, we need to add them to the unmarshalled result
                                    }
                                }]
                            }]))
                            case 'simple': return p_.option($, ($) => temp_value(['concrete', {
                                'type': ['text', {
                                    'value': $.instance.token.value,
                                    'delimiter': ['none', null],
                                    'trivia': {
                                        'comments': $.instance['trailing trivia'].comments
                                    }
                                }]
                            }]))
                            case 'optional': return p_.option($, ($) => temp_value(['concrete', {
                                'type': ['optional', p_.from.state($.instance).decide(
                                    ($): s_out.Value.data.concrete.type_.optional => {
                                        switch ($[0]) {
                                            case 'list': return p_.option($, ($) => ['set', {
                                                '*': {
                                                    'comments': p_.literal.list([])
                                                },
                                                'value': Non_Entity($['child value'], $p)
                                            }])
                                            case 'null literal': return p_.option($, ($) => ['not set', {
                                                '_': {
                                                    'comments': p_.literal.list([])
                                                }
                                            }])
                                            case 'optional': return p_.option($, ($) => p_.from.state($).decide(
                                                ($) => {
                                                    switch ($[0]) {
                                                        case 'set': return p_.option($, ($) => ['set', {
                                                            '*': {
                                                                'comments': p_.literal.list([])
                                                            },
                                                            'value': Non_Entity($['child value'], $p)
                                                        }])
                                                        case 'not set': return p_.option($, ($) => ['not set', {
                                                            '_': {
                                                                'comments': p_.literal.list([])
                                                            }
                                                        }])

                                                        default: return p_.exhaustive($[0])
                                                    }
                                                }))
                                            default: return p_.exhaustive($[0])
                                        }
                                    })]
                            }]))
                            case 'reference': return p_.option($, ($) => temp_value(['concrete', {
                                'type': p_.from.state($.type).decide(
                                    ($) => {
                                        switch ($[0]) {
                                            case 'derived': return p_.option($, ($) => ['nothing', {
                                                '~': {
                                                    'comments': p_.literal.list([])
                                                }
                                            }])
                                            case 'selected': return p_.option($, ($) => ['text', {
                                                'value': $.intermediate.instance.token.value,
                                                'delimiter': ['apostrophe', null],
                                                'trivia': {
                                                    'comments': p_.literal.list([])
                                                }
                                            }])
                                            default: return p_.exhaustive($[0])
                                        }
                                    })
                            }]))
                            case 'state': return p_.option($, ($) => p_.from.state($.derived['option status']).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'set': return p_.option($, ($) => temp_value(['concrete', {
                                            'type': ['state', {
                                                '|': {
                                                    'comments': p_.literal.list([])
                                                },
                                                'status': ['set', {
                                                    'option': $.intermediate['option token'].token.value,
                                                    'value': Non_Entity($.value, $p)
                                                }]
                                            }]
                                        }]))
                                        case 'missing data': return p_.option($, ($) => temp_value(['concrete', {
                                            'type': ['state', {
                                                '|': {
                                                    'comments': p_.literal.list([])
                                                },
                                                'status': ['missing', {
                                                    '#': {
                                                        'comments': p_.literal.list([])
                                                    },
                                                }]
                                            }]
                                        }]))
                                        default: return p_.exhaustive($[0])
                                    }
                                }))
                            case 'text': return p_.option($, ($) => temp_value(['concrete', {
                                'type': ['text', {
                                    'value': $.instance.token.value,
                                    'delimiter': ['quote', null],
                                    'trivia': {
                                        'comments': p_.literal.list([])
                                    }
                                }]
                            }]))
                            default: return p_.exhaustive($[0])
                        }
                    }))
                default: return p_.exhaustive($[0])
            }
        })
}
export const Structural_Token: interface_.Structural_Token = ($) => ({
    'comments': $['trailing trivia'].comments
})
