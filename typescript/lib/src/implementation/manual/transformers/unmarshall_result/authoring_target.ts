import * as pt from 'pareto-core/dist/assign'
import * as p_di from 'pareto-core/dist/data/interface'
import p_change_context from 'pareto-core/dist/specials/change_context'
import * as p_ti from 'pareto-core/dist/transformer/interface'

//data types
import * as d_in from "../../../../interface/to_be_generated/unmarshall_result"
import * as d_in_parse_tree from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"
import * as d_out from "astn/dist/interface/generated/liana/schemas/authoring_target/data"
import * as d_function from "../../../../interface/to_be_generated/unmarshall_result_to_authoring_target"

//dependencies
import * as t_parse_tree_to_authoring_target from "astn/dist/implementation/manual/transformers/parse_tree/authoring_target"

//FIXME: we are losing comments in the transformation from the parse tree to the unmarshalled result, we need to add them to the unmarshalled result and then to the authoring target


export type Document = p_ti.Transformer_With_Parameter<
    d_in.Document,
    d_out.Document,
    d_function.Parameters
>

export type Any_Value = p_ti.Transformer_With_Parameter<
    d_in.Value,
    d_out.Value,
    d_function.Parameters
>

export type Non_Entity = p_ti.Transformer_With_Parameter<
    d_in.Value,
    d_out.Value,
    d_function.Parameters
>

export type Entity = p_ti.Transformer_With_Parameter<
    d_in.Value,
    d_out.Value,
    d_function.Parameters
>

export type Structural_Token = p_ti.Transformer<
    d_in_parse_tree.Structural_Token,
    d_out.Token_Trivia
>

const temp_value = ($: d_out.Value.data): d_out.Value => ({
    'data': $
})

export const Document: Document = ($, $p): d_out.Document => {
    return {
        'header': pt.optional.from.optional($['header']).map(($) => t_parse_tree_to_authoring_target.Value($)),
        'content': Any_Value($['content'], $p)
    }
}



export const Non_Entity: Non_Entity = ($, $p): d_out.Value => {
    const temp_dont_restyle_entities = ($: d_function.Parameters): d_function.Parameters => {
        const x = $
        return {
            'style': $['style'],
            'impact': pt.decide.state($['impact'], ($) => {
                switch ($[0]) {
                    case 'shallow with entities': return pt.ss($, ($) => ['shallow without entities', null])
                    case 'shallow without entities': return pt.ss($, ($) => x['impact'])
                    case 'deep': return pt.ss($, ($) => x['impact'])
                    default: return pt.au($[0])
                }
            }),
        }
    }
    return Any_Value($, temp_dont_restyle_entities($p))
}

export const Entity: Entity = ($, $p): d_out.Value => {
    const value = $
    return pt.decide.state($p.impact, ($) => {
        switch ($[0]) {
            case 'shallow with entities': return pt.ss($, ($) => Any_Value(
                value,
                {
                    'impact': ['shallow without entities', null],
                    'style': $p.style,
                }
            ))
            case 'shallow without entities': return pt.ss($, ($) => t_parse_tree_to_authoring_target.Value(value.instance))
            case 'deep': return pt.ss($, ($) => Any_Value(value, $p))
            default: return pt.au($[0])
        }
    })
}

export const Any_Value: Any_Value = ($, $p): d_out.Value => {
    const instance = $['instance']
    return pt.decide.state($['unmarshall result'], ($) => {
        switch ($[0]) {
            case 'error': return pt.ss($, ($) => pt.decide.state($, ($) => {
                switch ($[0]) {
                    case 'incorrect': return pt.ss($, ($) => t_parse_tree_to_authoring_target.Value(instance))
                    case 'missing': return pt.ss($, ($): d_out.Value => temp_value(['missing', {
                        '#': {
                            'comments': pt.list.literal([])
                        }
                    }]))
                    default: return pt.au($[0])
                }
            }))
            case 'success': return pt.ss($, ($) => pt.decide.state($, ($): d_out.Value => {
                switch ($[0]) {
                    case 'component': return pt.ss($, ($): d_out.Value => Any_Value($.value, $p))
                    case 'dictionary': return pt.ss($, ($): d_out.Value => temp_value(['concrete', {
                        'type': ['dictionary', {
                            '{': Structural_Token($.intermediate.instance['{']),
                            'entries': $.intermediate['entries as list'].__l_map(($): d_out.ID_Value_Pairs.L => ({
                                'id': $.intermediate['id value pair'].id.token.value,
                                'value': pt.decide.state($.value, ($) => {
                                    switch ($[0]) {
                                        case 'set': return pt.ss($, ($) => pt.optional.literal.set(Entity($, $p)))
                                        case 'not set': return pt.ss($, ($) => pt.optional.literal.not_set())
                                        default: return pt.au($[0])
                                    }
                                }),
                            })),
                            '}': Structural_Token($.intermediate.instance['}']),
                        }]
                    }]))
                    case 'group': return pt.ss($, ($): d_out.Value => {
                        const unmarsalled_group = $
                        return temp_value(['concrete', {
                            'type': ['group', pt.decide.state($p.style, ($): d_out.Value.data.concrete.type_.group => {
                                switch ($[0]) {
                                    case 'concise': return pt.ss($, ($) => ['concise', {
                                        '<': {
                                            'comments': pt.list.literal([]) //FIXME: we are losing comments here, we need to add them to the unmarshalled result
                                        },
                                        'properties': pt.decide.state(unmarsalled_group.derived.style, ($): d_out.Items => {
                                            switch ($[0]) {
                                                //convert concise to concise
                                                case 'concise': return pt.ss($, ($) => $.properties.__l_map(($) => {
                                                    const item = $.item
                                                    return pt.decide.state($['definition found'], ($) => {
                                                        switch ($[0]) {
                                                            case 'no': return pt.ss($, ($) => t_parse_tree_to_authoring_target.Value(item.value))
                                                            case 'yes': return pt.ss($, ($) => Non_Entity($['value'], $p))
                                                            default: return pt.au($[0])
                                                        }
                                                    })
                                                }))
                                                //convert verbose to concise
                                                case 'verbose': return pt.ss($, ($) => $.properties.__l_map(($): d_out.Items.L => {
                                                    const item = $
                                                    return pt.decide.state($['definition found'], ($) => {
                                                        switch ($[0]) {
                                                            case 'yes': return pt.ss($, ($): d_out.Items.L => $['value'].__decide(
                                                                ($) => Non_Entity($, $p),
                                                                () => temp_value(['concrete', {
                                                                    'type': ['nothing', {
                                                                        '~': {
                                                                            'comments': pt.list.literal([])
                                                                        }
                                                                    }]
                                                                }])
                                                            ))
                                                            case 'no': return pt.ss($, ($): d_out.Items.L => item.intermediate['id value pair'].assignment.__decide(
                                                                ($): d_out.Items.L => $.value.__decide(
                                                                    ($) => t_parse_tree_to_authoring_target.Value($),
                                                                    () => temp_value(['concrete', {
                                                                        'type': ['nothing', {
                                                                            '~': {
                                                                                'comments': pt.list.literal([])
                                                                            }
                                                                        }]
                                                                    }])
                                                                ),
                                                                (): d_out.Items.L => temp_value(['concrete', {
                                                                    'type': ['nothing', {
                                                                        '~': {
                                                                            'comments': pt.list.literal([])
                                                                        }
                                                                    }]
                                                                }])
                                                            ))
                                                            default: return pt.au($[0])
                                                        }
                                                    })
                                                }))
                                                default: return pt.au($[0])
                                            }
                                        }),
                                        '>': {
                                            'comments': pt.list.literal([]) //FIXME: we are losing comments here, we need to add them to the unmarshalled result
                                        },
                                    }])
                                    case 'verbose': return pt.ss($, ($) => ['verbose', {
                                        '(': {
                                            'comments': pt.list.literal([]) //FIXME: we are losing comments here, we need to add them to the unmarshalled result
                                        },
                                        'properties': pt.decide.state(unmarsalled_group.derived.style, ($): d_out.ID_Value_Pairs => {
                                            switch ($[0]) {
                                                //convert concise to verbose
                                                case 'concise': return pt.ss($, ($): d_out.ID_Value_Pairs => pt.list.from.list($.properties).map_optionally(($): p_di.Optional_Value<d_out.ID_Value_Pairs.L> => (pt.decide.state($['definition found'], ($): p_di.Optional_Value<d_out.ID_Value_Pairs.L> => {
                                                    switch ($[0]) {
                                                        case 'no': return pt.ss($, ($) => pt.optional.literal.not_set())
                                                        case 'yes': return pt.ss($, ($): p_di.Optional_Value<d_out.ID_Value_Pairs.L> => pt.optional.literal.set({
                                                            'id': $.id,
                                                            'value': pt.optional.literal.set(Non_Entity($['value'], $p))
                                                        }))
                                                        default: return pt.au($[0])
                                                    }
                                                }))))
                                                //convert verbose to verbose
                                                case 'verbose': return pt.ss($, ($) => $.properties.__l_map(($): d_out.ID_Value_Pairs.L => {
                                                    const item = $
                                                    return {
                                                        'id': $.intermediate['id value pair'].id.token.value,
                                                        'value': pt.decide.state($['definition found'], ($): d_out.ID_Value_Pairs.L.value => {
                                                            switch ($[0]) {
                                                                case 'yes': return pt.ss($, ($) => pt.optional.from.optional($['value']).map(($) => Non_Entity($, $p)))
                                                                case 'no': return pt.ss($, ($) => item.intermediate['id value pair'].assignment.__decide(
                                                                    ($): d_out.ID_Value_Pairs.L.value => $.value.__decide(
                                                                        ($) => pt.optional.literal.set(t_parse_tree_to_authoring_target.Value($)),
                                                                        () => pt.optional.literal.set(temp_value(['concrete', {
                                                                            'type': ['nothing', {
                                                                                '~': {
                                                                                    'comments': pt.list.literal([])
                                                                                }
                                                                            }]
                                                                        }]))
                                                                    ),
                                                                    (): d_out.ID_Value_Pairs.L.value => pt.optional.literal.set(temp_value(['concrete', {
                                                                        'type': ['nothing', {
                                                                            '~': {
                                                                                'comments': pt.list.literal([])
                                                                            }
                                                                        }]
                                                                    }]))
                                                                ))
                                                                default: return pt.au($[0])
                                                            }
                                                        })
                                                    }
                                                }))
                                                default: return pt.au($[0])
                                            }
                                        }),
                                        ')': {
                                            'comments': pt.list.literal([]) //FIXME: we are losing comments here, we need to add them to the unmarshalled result
                                        },
                                    }])
                                    default: return pt.au($[0])
                                }
                            })]
                        }])
                    })
                    case 'list': return pt.ss($, ($): d_out.Value => temp_value(['concrete', {
                        'type': ['list', {
                            '[': Structural_Token($.instance['[']),
                            'items': $.derived.items.__l_map(($) => Entity($, $p)),
                            ']': Structural_Token($.instance[']']),
                        }]
                    }]))
                    case 'nothing': return pt.ss($, ($): d_out.Value => temp_value(['concrete', {
                        'type': ['nothing', {
                            '~': {
                                'comments': pt.list.literal([]) //FIXME: we are losing comments here, we need to add them to the unmarshalled result
                            }
                        }]
                    }]))
                    case 'simple': return pt.ss($, ($): d_out.Value => temp_value(['concrete', {
                        'type': ['text', {
                            'value': $.instance.token.value,
                            'delimiter': ['none', null],
                            'trivia': {
                                'comments': $.instance['trailing trivia'].comments
                            }
                        }]
                    }]))
                    case 'optional': return pt.ss($, ($): d_out.Value => temp_value(['concrete', {
                        'type': ['optional', pt.decide.state($.instance, ($): d_out.Value.data.concrete.type_.optional => {
                            switch ($[0]) {
                                case 'list': return pt.ss($, ($) => ['set', {
                                    '*': {
                                        'comments': pt.list.literal([])
                                    },
                                    'value': Non_Entity($['child value'], $p)
                                }])
                                case 'null literal': return pt.ss($, ($) => ['not set', {
                                    '_': {
                                        'comments': pt.list.literal([])
                                    }
                                }])
                                case 'optional': return pt.ss($, ($) => pt.decide.state($, ($) => {
                                    switch ($[0]) {
                                        case 'set': return pt.ss($, ($) => ['set', {
                                            '*': {
                                                'comments': pt.list.literal([])
                                            },
                                            'value': Non_Entity($['child value'], $p)
                                        }])
                                        case 'not set': return pt.ss($, ($) => ['not set', {
                                            '_': {
                                                'comments': pt.list.literal([])
                                            }
                                        }])

                                        default: return pt.au($[0])
                                    }
                                }))
                                default: return pt.au($[0])
                            }
                        })]
                    }]))
                    case 'reference': return pt.ss($, ($): d_out.Value => temp_value(['concrete', {
                        'type': pt.decide.state($.type, ($) => {
                            switch ($[0]) {
                                case 'derived': return pt.ss($, ($) => ['nothing', {
                                    '~': {
                                        'comments': pt.list.literal([])
                                    }
                                }])
                                case 'selected': return pt.ss($, ($) => ['text', {
                                    'value': $.intermediate.instance.token.value,
                                    'delimiter': ['apostrophe', null],
                                    'trivia': {
                                        'comments': pt.list.literal([])
                                    }
                                }])
                                default: return pt.au($[0])
                            }
                        })
                    }]))
                    case 'state': return pt.ss($, ($) => pt.decide.state($.derived['option status'], ($): d_out.Value => {
                        switch ($[0]) {
                            case 'set': return pt.ss($, ($): d_out.Value => temp_value(['concrete', {
                                'type': ['state', {
                                    '|': {
                                        'comments': pt.list.literal([])
                                    },
                                    'status': ['set', {
                                        'option': $.intermediate['option token'].token.value,
                                        'value': Non_Entity($.value, $p)
                                    }]
                                }]
                            }]))
                            case 'missing data': return pt.ss($, ($) => temp_value(['concrete', {
                                'type': ['state', {
                                    '|': {
                                        'comments': pt.list.literal([])
                                    },
                                    'status': ['missing', {
                                        '#': {
                                            'comments': pt.list.literal([])
                                        },
                                    }]
                                }]
                            }]))
                            default: return pt.au($[0])
                        }
                    }))
                    case 'text': return pt.ss($, ($): d_out.Value => temp_value(['concrete', {
                        'type': ['text', {
                            'value': $.instance.token.value,
                            'delimiter': ['quote', null],
                            'trivia': {
                                'comments': pt.list.literal([])
                            }
                        }]
                    }]))
                    default: return pt.au($[0])
                }
            }))
            default: return pt.au($[0])
        }
    })
}
export const Structural_Token: Structural_Token = ($) => ({
    'comments': $['trailing trivia'].comments
})
