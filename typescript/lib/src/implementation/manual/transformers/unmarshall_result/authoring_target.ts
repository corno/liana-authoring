import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/unmarshall_result"
import * as d_in_parse_tree from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"
import * as d_out from "astn/dist/interface/generated/liana/schemas/authoring_target/data"
import * as d_function from "../../../../interface/data/unmarshall_result_to_authoring_target"

//dependencies
import * as t_parse_tree_to_authoring_target from "astn/dist/implementation/manual/transformers/parse_tree/authoring_target"

//FIXME: we are losing comments in the transformation from the parse tree to the unmarshalled result, we need to add them to the unmarshalled result and then to the authoring target


export type Document = p_i.Transformer_With_Parameter<
    d_in.Document,
    d_out.Document,
    d_function.Parameters
>

export type Any_Value = p_i.Transformer_With_Parameter<
    d_in.Value,
    d_out.Value,
    d_function.Parameters
>

export type Non_Entity = p_i.Transformer_With_Parameter<
    d_in.Value,
    d_out.Value,
    d_function.Parameters
>

export type Entity = p_i.Transformer_With_Parameter<
    d_in.Value,
    d_out.Value,
    d_function.Parameters
>

export type Structural_Token = p_i.Transformer<
    d_in_parse_tree.Structural_Token,
    d_out.Token_Trivia
>

const temp_value = ($: d_out.Value.data): d_out.Value => ({
    'data': $
})

export const Document: Document = ($, $p): d_out.Document => {
    return {
        'header': p_.optional.from.optional($['header']).map(($) => t_parse_tree_to_authoring_target.Value($)),
        'content': Any_Value($['content'], $p)
    }
}



export const Non_Entity: Non_Entity = ($, $p): d_out.Value => {
    const temp_dont_restyle_entities = ($: d_function.Parameters): d_function.Parameters => {
        const x = $
        return {
            'style': $['style'],
            'impact': p_.decide.state($['impact'], ($) => {
                switch ($[0]) {
                    case 'shallow with entities': return p_.ss($, ($) => ['shallow without entities', null])
                    case 'shallow without entities': return p_.ss($, ($) => x['impact'])
                    case 'deep': return p_.ss($, ($) => x['impact'])
                    default: return p_.au($[0])
                }
            }),
        }
    }
    return Any_Value($, temp_dont_restyle_entities($p))
}

export const Entity: Entity = ($, $p): d_out.Value => {
    const value = $
    return p_.decide.state($p.impact, ($) => {
        switch ($[0]) {
            case 'shallow with entities': return p_.ss($, ($) => Any_Value(
                value,
                {
                    'impact': ['shallow without entities', null],
                    'style': $p.style,
                }
            ))
            case 'shallow without entities': return p_.ss($, ($) => t_parse_tree_to_authoring_target.Value(value.instance))
            case 'deep': return p_.ss($, ($) => Any_Value(value, $p))
            default: return p_.au($[0])
        }
    })
}

export const Any_Value: Any_Value = ($, $p): d_out.Value => {
    const instance = $['instance']
    return p_.decide.state($['unmarshall result'], ($) => {
        switch ($[0]) {
            case 'error': return p_.ss($, ($) => p_.decide.state($, ($) => {
                switch ($[0]) {
                    case 'incorrect': return p_.ss($, ($) => t_parse_tree_to_authoring_target.Value(instance))
                    case 'missing': return p_.ss($, ($): d_out.Value => temp_value(['missing', {
                        '#': {
                            'comments': p_.literal.list([])
                        }
                    }]))
                    default: return p_.au($[0])
                }
            }))
            case 'success': return p_.ss($, ($) => p_.decide.state($, ($): d_out.Value => {
                switch ($[0]) {
                    case 'component': return p_.ss($, ($): d_out.Value => Any_Value($.value, $p))
                    case 'dictionary': return p_.ss($, ($): d_out.Value => temp_value(['concrete', {
                        'type': ['dictionary', {
                            '{': Structural_Token($.intermediate.instance['{']),
                            'entries': $.intermediate['entries as list'].__l_map(($): d_out.ID_Value_Pairs.L => ({
                                'id': $.intermediate['id value pair'].id.token.value,
                                'value': p_.decide.state($.value, ($) => {
                                    switch ($[0]) {
                                        case 'set': return p_.ss($, ($) => p_.literal.set(Entity($, $p)))
                                        case 'not set': return p_.ss($, ($) => p_.literal.not_set())
                                        default: return p_.au($[0])
                                    }
                                }),
                            })),
                            '}': Structural_Token($.intermediate.instance['}']),
                        }]
                    }]))
                    case 'group': return p_.ss($, ($): d_out.Value => {
                        const unmarsalled_group = $
                        return temp_value(['concrete', {
                            'type': ['group', p_.decide.state($p.style, ($): d_out.Value.data.concrete.type_.group => {
                                switch ($[0]) {
                                    case 'concise': return p_.ss($, ($) => ['concise', {
                                        '<': {
                                            'comments': p_.literal.list([]) //FIXME: we are losing comments here, we need to add them to the unmarshalled result
                                        },
                                        'properties': p_.decide.state(unmarsalled_group.derived.style, ($): d_out.Items => {
                                            switch ($[0]) {
                                                //convert concise to concise
                                                case 'concise': return p_.ss($, ($) => $.properties.__l_map(($) => {
                                                    const item = $.item
                                                    return p_.decide.state($['definition found'], ($) => {
                                                        switch ($[0]) {
                                                            case 'no': return p_.ss($, ($) => t_parse_tree_to_authoring_target.Value(item.value))
                                                            case 'yes': return p_.ss($, ($) => Non_Entity($['value'], $p))
                                                            default: return p_.au($[0])
                                                        }
                                                    })
                                                }))
                                                //convert verbose to concise
                                                case 'verbose': return p_.ss($, ($) => $.properties.__l_map(($): d_out.Items.L => {
                                                    const item = $
                                                    return p_.decide.state($['definition found'], ($) => {
                                                        switch ($[0]) {
                                                            case 'yes': return p_.ss($, ($): d_out.Items.L => $['value'].__decide(
                                                                ($) => Non_Entity($, $p),
                                                                () => temp_value(['concrete', {
                                                                    'type': ['nothing', {
                                                                        '~': {
                                                                            'comments': p_.literal.list([])
                                                                        }
                                                                    }]
                                                                }])
                                                            ))
                                                            case 'no': return p_.ss($, ($): d_out.Items.L => item.intermediate['id value pair'].assignment.__decide(
                                                                ($): d_out.Items.L => $.value.__decide(
                                                                    ($) => t_parse_tree_to_authoring_target.Value($),
                                                                    () => temp_value(['concrete', {
                                                                        'type': ['nothing', {
                                                                            '~': {
                                                                                'comments': p_.literal.list([])
                                                                            }
                                                                        }]
                                                                    }])
                                                                ),
                                                                (): d_out.Items.L => temp_value(['concrete', {
                                                                    'type': ['nothing', {
                                                                        '~': {
                                                                            'comments': p_.literal.list([])
                                                                        }
                                                                    }]
                                                                }])
                                                            ))
                                                            default: return p_.au($[0])
                                                        }
                                                    })
                                                }))
                                                default: return p_.au($[0])
                                            }
                                        }),
                                        '>': {
                                            'comments': p_.literal.list([]) //FIXME: we are losing comments here, we need to add them to the unmarshalled result
                                        },
                                    }])
                                    case 'verbose': return p_.ss($, ($) => ['verbose', {
                                        '(': {
                                            'comments': p_.literal.list([]) //FIXME: we are losing comments here, we need to add them to the unmarshalled result
                                        },
                                        'properties': p_.decide.state(unmarsalled_group.derived.style, ($): d_out.ID_Value_Pairs => {
                                            switch ($[0]) {
                                                //convert concise to verbose
                                                case 'concise': return p_.ss($, ($): d_out.ID_Value_Pairs => p_.list.from.list($.properties).map_optionally(($) => (p_.decide.state($['definition found'], ($) => {
                                                    switch ($[0]) {
                                                        case 'no': return p_.ss($, ($) => p_.literal.not_set())
                                                        case 'yes': return p_.ss($, ($) => p_.literal.set({
                                                            'id': $.id,
                                                            'value': p_.literal.set(Non_Entity($['value'], $p))
                                                        }))
                                                        default: return p_.au($[0])
                                                    }
                                                }))))
                                                //convert verbose to verbose
                                                case 'verbose': return p_.ss($, ($) => $.properties.__l_map(($): d_out.ID_Value_Pairs.L => {
                                                    const item = $
                                                    return {
                                                        'id': $.intermediate['id value pair'].id.token.value,
                                                        'value': p_.decide.state($['definition found'], ($): d_out.ID_Value_Pairs.L.value => {
                                                            switch ($[0]) {
                                                                case 'yes': return p_.ss($, ($) => p_.optional.from.optional($['value']).map(($) => Non_Entity($, $p)))
                                                                case 'no': return p_.ss($, ($) => item.intermediate['id value pair'].assignment.__decide(
                                                                    ($): d_out.ID_Value_Pairs.L.value => $.value.__decide(
                                                                        ($) => p_.literal.set(t_parse_tree_to_authoring_target.Value($)),
                                                                        () => p_.literal.set(temp_value(['concrete', {
                                                                            'type': ['nothing', {
                                                                                '~': {
                                                                                    'comments': p_.literal.list([])
                                                                                }
                                                                            }]
                                                                        }]))
                                                                    ),
                                                                    (): d_out.ID_Value_Pairs.L.value => p_.literal.set(temp_value(['concrete', {
                                                                        'type': ['nothing', {
                                                                            '~': {
                                                                                'comments': p_.literal.list([])
                                                                            }
                                                                        }]
                                                                    }]))
                                                                ))
                                                                default: return p_.au($[0])
                                                            }
                                                        })
                                                    }
                                                }))
                                                default: return p_.au($[0])
                                            }
                                        }),
                                        ')': {
                                            'comments': p_.literal.list([]) //FIXME: we are losing comments here, we need to add them to the unmarshalled result
                                        },
                                    }])
                                    default: return p_.au($[0])
                                }
                            })]
                        }])
                    })
                    case 'list': return p_.ss($, ($): d_out.Value => temp_value(['concrete', {
                        'type': ['list', {
                            '[': Structural_Token($.instance['[']),
                            'items': $.derived.items.__l_map(($) => Entity($, $p)),
                            ']': Structural_Token($.instance[']']),
                        }]
                    }]))
                    case 'nothing': return p_.ss($, ($): d_out.Value => temp_value(['concrete', {
                        'type': ['nothing', {
                            '~': {
                                'comments': p_.literal.list([]) //FIXME: we are losing comments here, we need to add them to the unmarshalled result
                            }
                        }]
                    }]))
                    case 'simple': return p_.ss($, ($): d_out.Value => temp_value(['concrete', {
                        'type': ['text', {
                            'value': $.instance.token.value,
                            'delimiter': ['none', null],
                            'trivia': {
                                'comments': $.instance['trailing trivia'].comments
                            }
                        }]
                    }]))
                    case 'optional': return p_.ss($, ($): d_out.Value => temp_value(['concrete', {
                        'type': ['optional', p_.decide.state($.instance, ($): d_out.Value.data.concrete.type_.optional => {
                            switch ($[0]) {
                                case 'list': return p_.ss($, ($) => ['set', {
                                    '*': {
                                        'comments': p_.literal.list([])
                                    },
                                    'value': Non_Entity($['child value'], $p)
                                }])
                                case 'null literal': return p_.ss($, ($) => ['not set', {
                                    '_': {
                                        'comments': p_.literal.list([])
                                    }
                                }])
                                case 'optional': return p_.ss($, ($) => p_.decide.state($, ($) => {
                                    switch ($[0]) {
                                        case 'set': return p_.ss($, ($) => ['set', {
                                            '*': {
                                                'comments': p_.literal.list([])
                                            },
                                            'value': Non_Entity($['child value'], $p)
                                        }])
                                        case 'not set': return p_.ss($, ($) => ['not set', {
                                            '_': {
                                                'comments': p_.literal.list([])
                                            }
                                        }])

                                        default: return p_.au($[0])
                                    }
                                }))
                                default: return p_.au($[0])
                            }
                        })]
                    }]))
                    case 'reference': return p_.ss($, ($): d_out.Value => temp_value(['concrete', {
                        'type': p_.decide.state($.type, ($) => {
                            switch ($[0]) {
                                case 'derived': return p_.ss($, ($) => ['nothing', {
                                    '~': {
                                        'comments': p_.literal.list([])
                                    }
                                }])
                                case 'selected': return p_.ss($, ($) => ['text', {
                                    'value': $.intermediate.instance.token.value,
                                    'delimiter': ['apostrophe', null],
                                    'trivia': {
                                        'comments': p_.literal.list([])
                                    }
                                }])
                                default: return p_.au($[0])
                            }
                        })
                    }]))
                    case 'state': return p_.ss($, ($) => p_.decide.state($.derived['option status'], ($): d_out.Value => {
                        switch ($[0]) {
                            case 'set': return p_.ss($, ($): d_out.Value => temp_value(['concrete', {
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
                            case 'missing data': return p_.ss($, ($) => temp_value(['concrete', {
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
                            default: return p_.au($[0])
                        }
                    }))
                    case 'text': return p_.ss($, ($): d_out.Value => temp_value(['concrete', {
                        'type': ['text', {
                            'value': $.instance.token.value,
                            'delimiter': ['quote', null],
                            'trivia': {
                                'comments': p_.literal.list([])
                            }
                        }]
                    }]))
                    default: return p_.au($[0])
                }
            }))
            default: return p_.au($[0])
        }
    })
}
export const Structural_Token: Structural_Token = ($) => ({
    'comments': $['trailing trivia'].comments
})
