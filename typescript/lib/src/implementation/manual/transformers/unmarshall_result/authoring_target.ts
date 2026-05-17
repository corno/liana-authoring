import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'
import _p_cc from 'pareto-core/dist/_p_change_context'

//data types
import * as d_in from "../../../../interface/to_be_generated/unmarshall_result"
import * as d_in_parse_tree from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"
import * as d_out from "astn/dist/interface/generated/liana/schemas/authoring_target/data"
import * as d_function from "../../../../interface/to_be_generated/unmarshall_result_to_authoring_target"

//dependencies
import * as t_parse_tree_to_authoring_target from "astn/dist/implementation/manual/transformers/parse_tree/authoring_target"

//FIXME: we are losing comments in the transformation from the parse tree to the unmarshalled result, we need to add them to the unmarshalled result and then to the authoring target


export type Document = _pi.Transformer_With_Parameter<
    d_in.Document,
    d_out.Document,
    d_function.Parameters
>

export type Value = _pi.Transformer_With_Parameter<
    d_in.Value,
    d_out.Value,
    d_function.Parameters
>

export type Structural_Token = _pi.Transformer<
    d_in_parse_tree.Structural_Token,
    d_out.Token_Trivia
>

const temp_value = ($: d_out.Value.data): d_out.Value => ({
    'data': $
})

export const Document: Document = ($, $p): d_out.Document => {
    return {
        'header': _p.optional.from.optional($['header']).map(($) => t_parse_tree_to_authoring_target.Value($)),
        'content': Value($['content'], {
            'style': $p.style,
            'impact': ['deep', null]
        })
    }
}

export const Value: Value = ($, $p): d_out.Value => {
    const instance = $['instance']
    return _p.decide.state($['unmarshall result'], ($) => {
        switch ($[0]) {
            case 'error': return _p.ss($, ($) => _p.decide.state($, ($) => {
                switch ($[0]) {
                    case 'incorrect': return _p.ss($, ($) => t_parse_tree_to_authoring_target.Value(instance))
                    case 'missing': return _p.ss($, ($): d_out.Value => temp_value(['missing', {
                        '#': {
                            'comments': _p.list.literal([])
                        }
                    }]))
                    default: return _p.au($[0])
                }
            }))
            case 'success': return _p.ss($, ($) => _p.decide.state($, ($): d_out.Value => {
                switch ($[0]) {
                    case 'component': return _p.ss($, ($): d_out.Value => Value($.value, $p))
                    case 'dictionary': return _p.ss($, ($): d_out.Value => temp_value(['concrete', {
                        'type': ['dictionary', {
                            '{': Structural_Token($.intermediate.instance['{']),
                            'entries': $.intermediate['entries as list'].__l_map(($): d_out.ID_Value_Pairs.L => {
                                return {
                                    'id': $.intermediate['id value pair'].id.token.value,
                                    'value': _p.optional.from.optional($.value).map(($) => {
                                        const value = $
                                        return _p.decide.state($p.impact, ($) => {
                                            switch ($[0]) {
                                                case 'shallow': return _p.ss($, ($) => t_parse_tree_to_authoring_target.Value(value.instance))
                                                case 'deep': return _p.ss($, ($) => Value(value, $p))
                                                default: return _p.au($[0])
                                            }
                                        })
                                    })
                                }
                            }),
                            '}': Structural_Token($.intermediate.instance['}']),
                        }]
                    }]))
                    case 'group': return _p.ss($, ($): d_out.Value => {
                        const unmarsalled_group = $
                        return temp_value(['concrete', {
                            'type': ['group', _p.decide.state($p.style, ($): d_out.Value.data.concrete.type_.group => {
                                switch ($[0]) {
                                    case 'concise': return _p.ss($, ($) => ['concise', {
                                        '<': {
                                            'comments': _p.list.literal([]) //FIXME: we are losing comments here, we need to add them to the unmarshalled result
                                        },
                                        'properties': _p.decide.state(unmarsalled_group.derived.style, ($): d_out.Items => {
                                            switch ($[0]) {
                                                //convert concise to concise
                                                case 'concise': return _p.ss($, ($) => $.properties.__l_map(($) => {
                                                    const item = $.item
                                                    return _p.decide.state($['definition found'], ($) => {
                                                        switch ($[0]) {
                                                            case 'no': return _p.ss($, ($) => t_parse_tree_to_authoring_target.Value(item.value))
                                                            case 'yes': return _p.ss($, ($) => Value($.value, $p))
                                                            default: return _p.au($[0])
                                                        }
                                                    })
                                                }))
                                                //convert verbose to concise
                                                case 'verbose': return _p.ss($, ($) => $.properties.__l_map(($): d_out.Items.L => {
                                                    const item = $
                                                    return _p.decide.state($['definition found'], ($) => {
                                                        switch ($[0]) {
                                                            case 'yes': return _p.ss($, ($): d_out.Items.L => $.value.__decide(
                                                                ($) => Value($, $p),
                                                                () => temp_value(['concrete', {
                                                                    'type': ['nothing', {
                                                                        '~': {
                                                                            'comments': _p.list.literal([])
                                                                        }
                                                                    }]
                                                                }])
                                                            ))
                                                            case 'no': return _p.ss($, ($): d_out.Items.L => item.intermediate['id value pair'].assignment.__decide(
                                                                ($): d_out.Items.L => $.value.__decide(
                                                                    ($) => t_parse_tree_to_authoring_target.Value($),
                                                                    () => temp_value(['concrete', {
                                                                        'type': ['nothing', {
                                                                            '~': {
                                                                                'comments': _p.list.literal([])
                                                                            }
                                                                        }]
                                                                    }])
                                                                ),
                                                                (): d_out.Items.L => temp_value(['concrete', {
                                                                    'type': ['nothing', {
                                                                        '~': {
                                                                            'comments': _p.list.literal([])
                                                                        }
                                                                    }]
                                                                }])
                                                            ))
                                                            default: return _p.au($[0])
                                                        }
                                                    })
                                                }))
                                                default: return _p.au($[0])
                                            }
                                        }),
                                        '>': {
                                            'comments': _p.list.literal([]) //FIXME: we are losing comments here, we need to add them to the unmarshalled result
                                        },
                                    }])
                                    case 'verbose': return _p.ss($, ($) => ['verbose', {
                                        '(': {
                                            'comments': _p.list.literal([]) //FIXME: we are losing comments here, we need to add them to the unmarshalled result
                                        },
                                        'properties': _p.decide.state(unmarsalled_group.derived.style, ($): d_out.ID_Value_Pairs => {
                                            switch ($[0]) {
                                                //convert concise to verbose
                                                case 'concise': return _p.ss($, ($): d_out.ID_Value_Pairs => _p.list.from.list($.properties).filter(($): _pi.Optional_Value<d_out.ID_Value_Pairs.L> => {
                                                    return _p.decide.state($['definition found'], ($): _pi.Optional_Value<d_out.ID_Value_Pairs.L> => {
                                                        switch ($[0]) {
                                                            case 'no': return _p.ss($, ($) => _p.optional.literal.not_set())
                                                            case 'yes': return _p.ss($, ($): _pi.Optional_Value<d_out.ID_Value_Pairs.L> => _p.optional.literal.set({
                                                                'id': $.id,
                                                                'value': _p.optional.literal.set(Value($.value, $p))
                                                            }))
                                                            default: return _p.au($[0])
                                                        }
                                                    })
                                                }))
                                                //convert verbose to verbose
                                                case 'verbose': return _p.ss($, ($) => $.properties.__l_map(($): d_out.ID_Value_Pairs.L => {
                                                    const item = $
                                                    return {
                                                        'id': $.intermediate['id value pair'].id.token.value,
                                                        'value': _p.decide.state($['definition found'], ($): d_out.ID_Value_Pairs.L.value => {
                                                            switch ($[0]) {
                                                                case 'yes': return _p.ss($, ($) => _p.optional.from.optional($.value).map(($) => Value($, $p)))
                                                                case 'no': return _p.ss($, ($) => item.intermediate['id value pair'].assignment.__decide(
                                                                    ($): d_out.ID_Value_Pairs.L.value => $.value.__decide(
                                                                        ($) => _p.optional.literal.set(t_parse_tree_to_authoring_target.Value($)),
                                                                        () => _p.optional.literal.set(temp_value(['concrete', {
                                                                            'type': ['nothing', {
                                                                                '~': {
                                                                                    'comments': _p.list.literal([])
                                                                                }
                                                                            }]
                                                                        }]))
                                                                    ),
                                                                    (): d_out.ID_Value_Pairs.L.value => _p.optional.literal.set(temp_value(['concrete', {
                                                                        'type': ['nothing', {
                                                                            '~': {
                                                                                'comments': _p.list.literal([])
                                                                            }
                                                                        }]
                                                                    }])
                                                                    )))
                                                                default: return _p.au($[0])
                                                            }
                                                        })
                                                    }
                                                }))
                                                default: return _p.au($[0])
                                            }
                                        }),
                                        ')': {
                                            'comments': _p.list.literal([]) //FIXME: we are losing comments here, we need to add them to the unmarshalled result
                                        },
                                    }])
                                    default: return _p.au($[0])
                                }
                            })]
                        }])
                    })
                    case 'list': return _p.ss($, ($): d_out.Value => temp_value(['concrete', {
                        'type': ['list', {
                            '[': Structural_Token($.instance['[']),
                            'items': $.derived.items.__l_map(($) => {
                                const item = $
                                return _p.decide.state($p.impact, ($): d_out.Value => {
                                    switch ($[0]) {
                                        case 'shallow': return _p.ss($, ($) => t_parse_tree_to_authoring_target.Value(item.instance))
                                        case 'deep': return _p.ss($, ($) => Value(item, $p))
                                        default: return _p.au($[0])
                                    }
                                })
                            }),
                            ']': Structural_Token($.instance[']']),
                        }]
                    }]))
                    case 'nothing': return _p.ss($, ($): d_out.Value => temp_value(['concrete', {
                        'type': ['nothing', {
                            '~': {
                                'comments': _p.list.literal([]) //FIXME: we are losing comments here, we need to add them to the unmarshalled result
                            }
                        }]
                    }]))
                    case 'simple': return _p.ss($, ($): d_out.Value => temp_value(['concrete', {
                        'type': ['text', {
                            'value': $.instance.token.value,
                            'delimiter': ['none', null],
                            'trivia': {
                                'comments': $.instance['trailing trivia'].comments
                            }
                        }]
                    }]))
                    case 'optional': return _p.ss($, ($): d_out.Value => temp_value(['concrete', {
                        'type': ['optional', _p.decide.state($.instance, ($): d_out.Value.data.concrete.type_.optional => {
                            switch ($[0]) {
                                case 'list': return _p.ss($, ($) => ['set', {
                                    '*': {
                                        'comments': _p.list.literal([])
                                    },
                                    'value': Value($['child value'], $p)
                                }])
                                case 'null literal': return _p.ss($, ($) => ['not set', {
                                    '_': {
                                        'comments': _p.list.literal([])
                                    }
                                }])
                                case 'optional': return _p.ss($, ($) => _p.decide.state($, ($) => {
                                    switch ($[0]) {
                                        case 'set': return _p.ss($, ($) => ['set', {
                                            '*': {
                                                'comments': _p.list.literal([])
                                            },
                                            'value': Value($['child value'], $p)
                                        }])
                                        case 'not set': return _p.ss($, ($) => ['not set', {
                                            '_': {
                                                'comments': _p.list.literal([])
                                            }
                                        }])

                                        default: return _p.au($[0])
                                    }
                                }))
                                default: return _p.au($[0])
                            }
                        })]
                    }]))
                    case 'reference': return _p.ss($, ($): d_out.Value => temp_value(['concrete', {
                        'type': _p.decide.state($.type, ($) => {
                            switch ($[0]) {
                                case 'derived': return _p.ss($, ($) => ['nothing', {
                                    '~': {
                                        'comments': _p.list.literal([])
                                    }
                                }])
                                case 'selected': return _p.ss($, ($) => ['text', {
                                    'value': $.intermediate.instance.token.value,
                                    'delimiter': ['apostrophe', null],
                                    'trivia': {
                                        'comments': _p.list.literal([])
                                    }
                                }])
                                default: return _p.au($[0])
                            }
                        })
                    }]))
                    case 'state': return _p.ss($, ($) => _p.decide.state($.derived['option status'], ($): d_out.Value => {
                        switch ($[0]) {
                            case 'set': return _p.ss($, ($): d_out.Value => temp_value(['concrete', {
                                'type': ['state', {
                                    '|': {
                                        'comments': _p.list.literal([])
                                    },
                                    'status': ['set', {
                                        'option': $.intermediate['option token'].token.value,
                                        'value': Value($.value, $p)
                                    }]
                                }]
                            }]))
                            case 'missing data': return _p.ss($, ($) => temp_value(['concrete', {
                                'type': ['state', {
                                    '|': {
                                        'comments': _p.list.literal([])
                                    },
                                    'status': ['missing', {
                                        '#': {
                                            'comments': _p.list.literal([])
                                        },
                                    }]
                                }]
                            }]))
                            default: return _p.au($[0])
                        }
                    }))
                    case 'text': return _p.ss($, ($): d_out.Value => temp_value(['concrete', {
                        'type': ['text', {
                            'value': $.instance.token.value,
                            'delimiter': ['quote', null],
                            'trivia': {
                                'comments': _p.list.literal([])
                            }
                        }]
                    }]))
                    default: return _p.au($[0])
                }
            }))
            default: return _p.au($[0])
        }
    })
}
export const Structural_Token: Structural_Token = ($) => ({
    'comments': $['trailing trivia'].comments
})
