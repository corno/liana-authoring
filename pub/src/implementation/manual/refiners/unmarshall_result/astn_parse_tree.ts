import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import * as _pdev from 'pareto-core-dev'

import * as d_in from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"
import * as d_out from "../../../../interface/to_be_generated/unmashall_result"
import * as d_function from "../../../../interface/to_be_generated/unmarshall_result_from_astn_parse_tree"

import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'

export type Document = _pi.Refiner_Without_Error_With_Parameter<
    d_out.Document,
    d_in.Document,
    d_function.Parameters
>

export type Value = _pi.Refiner_Without_Error_With_Parameter<
    d_out.Value,
    d_in.Value,
    d_function.Parameters
>

export const Document: Document = ($, $p) => ({
    'content': Value(
        $.content,
        $p
    )
})

export const Value: Value = ($, $p) => {
    const value = $
    return _p.decide.state($.type, ($): d_out.Value => {
        switch ($[0]) {
            case 'concrete': return _p.ss($, ($): d_out.Value => {
                const concrete_value = $
                return {
                    'definition': $p.definition,
                    'definition path': $p['definition path'],
                    'instance': value,
                    'unmarshalled': _p.decide.state($p.definition, ($): d_out.Unmarshalled_Value_Type => {
                        switch ($[0]) {
                            case 'boolean': return _p.ss($, ($): d_out.Unmarshalled_Value_Type => {
                                return ['boolean', {
                                    'definition': $,
                                    'found value type': _p.decide.state(concrete_value, ($) => {
                                        switch ($[0]) {
                                            case 'text': return _p.ss($, ($) => ['valid', {
                                                'instance': $,
                                                // 'parsed': xx,
                                                'range': $.range,
                                                'correct string type': _p.decide.state($.type, ($) => {
                                                    switch ($[0]) {
                                                        case 'quoted': return false
                                                        case 'apostrophed': return false
                                                        case 'undelimited': return true
                                                        case 'backticked': return false
                                                        default: return _p.au($[0])
                                                    }
                                                })
                                            }])
                                            default: return ['invalid', value]
                                        }
                                    })
                                }]
                            })
                            case 'component': return _p.ss($, ($): d_out.Unmarshalled_Value_Type => ['component', {
                                'definition': $,
                                'value': Value(
                                    value,
                                    {
                                        'definition': _p.decide.state($.type, ($) => {
                                            switch ($[0]) {
                                                case 'external': return _p.ss($, ($) => $.module['l entry']['root value'])
                                                case 'internal acyclic': return _p.ss($, ($) => $['l entry']['root value'])
                                                case 'internal': return _p.ss($, ($) => $['l entry'].get_circular_dependent()['root value'])
                                                default: return _p.au($[0])
                                            }
                                        }),
                                        'definition path': _p.decide.state($.type, ($) => {
                                            switch ($[0]) {
                                                case 'external': return _p.ss($, ($) => `${$.import['l id']}:${$.module['l id']}`)
                                                case 'internal acyclic': return _p.ss($, ($) => $['l id'])
                                                case 'internal': return _p.ss($, ($) => $['l id'])
                                                default: return _p.au($[0])
                                            }
                                        }),
                                    }
                                )
                            }])
                            case 'dictionary': return _p.ss($, ($): d_out.Unmarshalled_Value_Type => {
                                const prop_def = $.value
                                return ['dictionary', {
                                    'definition': $,
                                    'found value type': _p.decide.state(concrete_value, ($) => {
                                        switch ($[0]) {
                                            case 'dictionary': return _p.ss($, ($) => {
                                                const range = $['{'].range

                                                const op_expect_exactly_one_element = <T>($: _pi.List<T>): _pi.Optional_Value<T> => _p.number.natural.from.list($).amount_of_items() !== 1
                                                    ? _p.optional.literal.not_set()
                                                    // there is an element, so this statement will always return a 'set'
                                                    : $.__deprecated_get_possible_item_at(0)


                                                type ID_Value_Pair<T> = {
                                                    'id': string,
                                                    'value': T,
                                                }
                                                const op_group = <T>(
                                                    $: _pi.List<ID_Value_Pair<T>>,
                                                ): _pi.Dictionary<_pi.List<T>> => _p.dictionary.from.list($).group(($) => $.id).__d_map(($) => $.__l_map(($) => $.value))

                                                return ['valid', {
                                                    'instance': $,
                                                    'entries': $.entries.__l_map(($): d_out.Entry_Data => {
                                                        const id = $.id.value
                                                        return {
                                                            // 'id value pair': $,
                                                            'value': _p.optional.from.optional(
                                                                $.value,
                                                            ).map(
                                                                ($) => Value(
                                                                    $.value,
                                                                    {
                                                                        'definition': prop_def,
                                                                        'definition path': `${$p['definition path']}.${id}`,
                                                                    }
                                                                ),
                                                            ),
                                                            'id value pair': $
                                                        }
                                                    })
                                                }]
                                            })
                                            default: return ['invalid', value]
                                        }
                                    })
                                }]
                            })
                            case 'group': return _p.ss($, ($): d_out.Unmarshalled_Value_Type => {
                                const group_def = $
                                return ['group', {
                                    'definition': $,
                                    'found value type': _p.decide.state(concrete_value, ($): d_out.Group_Found_Value_Type => {

                                        const concise_content = ($: d_in.Items): d_out.Group_Concise => {
                                            const property_definitions_as_list = _p.list.from.dictionary(
                                                group_def
                                            ).convert(
                                                ($, id) => ({
                                                    'id': id,
                                                    'definition': $
                                                })
                                            )

                                            return {
                                                'properties': _p.list.from.list(
                                                    $
                                                ).join(
                                                    property_definitions_as_list,
                                                    ($, $o): d_out.Concise_Property => {
                                                        const instance = $
                                                        return {
                                                            'item': $,
                                                            'definition found': $o.__decide(
                                                                ($): d_out.Concise_Property_Definition_Found => ['yes', {
                                                                    'definition': $.definition,
                                                                    'id': $.id,
                                                                    'value': Value(
                                                                        instance.value,
                                                                        {
                                                                            'definition': $.definition.value,
                                                                            'definition path': `${$p['definition path']}.${$.id}`,
                                                                        }
                                                                    )
                                                                }],
                                                                (): d_out.Concise_Property_Definition_Found => ['no', null]
                                                            )
                                                        }
                                                    }
                                                )
                                            }
                                        }
                                        const verbose_content = ($: d_in.ID_Value_Pairs): d_out.Group_Verbose => {
                                            return {
                                                'properties': $.__l_map(($) => {
                                                    const id_value_pair = $
                                                    return {
                                                        'id value pair': $,
                                                        'definition found': group_def.__get_possible_entry_deprecated($.id.value).__decide(
                                                            ($): d_out.Verbose_Property_Definition_Found => {
                                                                const prop_def = $
                                                                return ['yes', {
                                                                    'definition': $,
                                                                    'value': _p.optional.from.optional(id_value_pair.value).map(
                                                                        ($) => Value(
                                                                            $.value,
                                                                            {
                                                                                'definition': prop_def.value,
                                                                                'definition path': `${$p['definition path']}.${id_value_pair.id.value}`,
                                                                            }
                                                                        )
                                                                    )
                                                                }]
                                                            },
                                                            () => ['no', null]
                                                        )
                                                    }
                                                })
                                            }
                                        }
                                        return _p.decide.state($, ($): d_out.Group_Found_Value_Type => {
                                            switch ($[0]) {
                                                case 'dictionary': return _p.ss($, ($): d_out.Group_Found_Value_Type => ['valid', {
                                                    'instance': ['dictionary', $],
                                                    'type': ['verbose', verbose_content($.entries)]
                                                }])
                                                case 'group': return _p.ss($, ($): d_out.Group_Found_Value_Type => {
                                                    return ['valid', {
                                                        'instance': ['group', $],
                                                        'type': _p.decide.state($, ($): d_out.Group_Type => {
                                                            switch ($[0]) {
                                                                case 'concise': return _p.ss($, ($) => ['concise', concise_content($.items)])
                                                                case 'verbose': return _p.ss($, ($) => ['verbose', verbose_content($.entries)])
                                                                default: return _p.au($[0])
                                                            }
                                                        })
                                                    }]
                                                })
                                                case 'list': return _p.ss($, ($): d_out.Group_Found_Value_Type => ['valid', {
                                                    'instance': ['list', $],
                                                    'type': ['concise', concise_content($.items)]
                                                }])
                                                default: return ['invalid', value]
                                            }
                                        })
                                    })
                                }]
                            })
                            case 'list': return _p.ss($, ($) => {
                                const prop_def = $.value
                                return ['list', {
                                    'definition': $,
                                    'found value type': _p.decide.state(concrete_value, ($) => {
                                        switch ($[0]) {
                                            case 'list': return _p.ss($, ($) => {
                                                return ['valid', {
                                                    'instance': $,
                                                    'items': _pdev.implement_me("list elements deserialization") //TODO
                                                }]
                                            })
                                            default: return ['invalid', value]

                                        }
                                    })
                                }]
                            })
                            case 'nothing': return _p.ss($, ($): d_out.Unmarshalled_Value_Type => {
                                return ['nothing', {
                                    'definition': $,
                                    'found value type': _p.decide.state(concrete_value, ($): d_out.Nothing['found value type'] => {
                                        switch ($[0]) {
                                            case 'nothing': return _p.ss($, ($) => ['valid', {
                                                'value': ['nothing', $],
                                            }])
                                            case 'text': return _p.ss($, ($) => $.value === "null" ?
                                                ['valid', {
                                                    'value': ['null literal', $],
                                                }] :
                                                ['invalid', value]
                                            )
                                            default: return ['invalid', value]
                                        }
                                    })
                                }]
                            })
                            case 'number': return _p.ss($, ($): d_out.Unmarshalled_Value_Type => {
                                return ['number', {
                                    'definition': $,
                                    'found value type': _p.decide.state(concrete_value, ($) => {
                                        switch ($[0]) {
                                            case 'text': return _p.ss($, ($) => ['valid', {
                                                'instance': $,
                                                'range': $.range,
                                                'correct string type': _p.decide.state($.type, ($) => {
                                                    switch ($[0]) {
                                                        case 'quoted': return true
                                                        case 'apostrophed': return false
                                                        case 'undelimited': return true
                                                        case 'backticked': return false
                                                        default: return _p.au($[0])
                                                    }
                                                })
                                            }])
                                            default: return ['invalid', value]
                                        }
                                    })
                                }]
                            })
                            case 'optional': return _p.ss($, ($): d_out.Unmarshalled_Value_Type => {
                                const def = $
                                return ['optional', {
                                    'definition': $,
                                    'found value type': _p.decide.state(concrete_value, ($) => {
                                        switch ($[0]) {
                                            case 'nothing': return _p.ss($, ($) => ['valid', ['not set', {
                                                'instance': ['nothing', $],
                                            }]])
                                            case 'text': return _p.ss($, ($) => $.value === "null" ?
                                                ['valid', ['not set', {
                                                    'instance': ['null literal', $],
                                                }]] :
                                                ['invalid', value]
                                            )
                                            case 'optional': return _p.ss($, ($) => _p.decide.state($, ($) => {
                                                switch ($[0]) {
                                                    case 'set': return _p.ss($, ($) => ['valid', ['set', {
                                                        'instance': $,
                                                        'child value': Value(
                                                            $.value,
                                                            {
                                                                'definition': def,
                                                                'definition path': `${$p['definition path']}.O`,
                                                            }
                                                        )
                                                    }]])
                                                    default: return _p.au($[0])
                                                }
                                            }))
                                            default: return ['invalid', value]
                                        }
                                    })
                                }]
                            })
                            case 'reference': return _p.ss($, ($): d_out.Unmarshalled_Value_Type => {
                                return ['reference', {
                                    'definition': $,
                                    'found value type': _p.decide.state(concrete_value, ($) => {
                                        switch ($[0]) {
                                            case 'text': return _p.ss($, ($) => ['valid', {
                                                'instance': $,
                                            }])
                                            // case 'nothing': return pa.ss($, () => ['invalid', data.location])
                                            default: return ['invalid', value]
                                        }
                                    })
                                }]
                            })
                            case 'state': return _p.ss($, ($): d_out.Unmarshalled_Value_Type => {
                                const def = $
                                return ['state', {
                                    'definition': $,
                                    'found value type': _p.decide.state(concrete_value, ($): d_out.State__found_value_type => {
                                        switch ($[0]) {
                                            case 'list': return _p.ss($, ($) => {
                                                const list = $
                                                return _p.decide.list($.items).has_first_item(
                                                    ($, rest): d_out.State__found_value_type => {
                                                        const option_value = $.value
                                                        return _p.decide.state($.value.type, ($): d_out.State__found_value_type => {
                                                            switch ($[0]) {
                                                                case 'concrete': return _p.ss($, ($): d_out.State__found_value_type => _p.decide.state($, ($) => {
                                                                    switch ($[0]) {
                                                                        case 'text': return _p.ss($, ($) => {
                                                                            const option_token = $
                                                                            const option_name = $.value
                                                                            return _p.decide.list(rest).has_first_item(
                                                                                ($, rest): d_out.State__found_value_type => {
                                                                                    const raw_value = $
                                                                                    return _p.decide.list(rest).has_items(
                                                                                        ($) => ['list format error', {
                                                                                            'list': list,
                                                                                            'type': ['too many items', null]
                                                                                        }],
                                                                                        (): d_out.State__found_value_type => ['valid', {
                                                                                            'definition': def,
                                                                                            'instance': ['list', list],
                                                                                            'option': ['set', {
                                                                                                'option token': option_token,
                                                                                                'option': _p.decide.optional(
                                                                                                    def.options.__get_possible_entry_deprecated(option_name),
                                                                                                    ($): d_out.Option_Status => {
                                                                                                        const option_def = $
                                                                                                        return ['known', {
                                                                                                            'definition': option_def,
                                                                                                            'value': Value(
                                                                                                                raw_value.value,
                                                                                                                {
                                                                                                                    'definition': option_def.value,
                                                                                                                    'definition path': `${$p['definition path']}.${option_name}`,
                                                                                                                }
                                                                                                            )
                                                                                                        }]
                                                                                                    },
                                                                                                    (): d_out.Option_Status => ['unknown', null]
                                                                                                )
                                                                                            }]
                                                                                        }]
                                                                                    )
                                                                                },
                                                                                (): d_out.State__found_value_type => ['list format error', {
                                                                                    'list': list,
                                                                                    'type': ['missing value item', null]
                                                                                }]
                                                                            )
                                                                        })
                                                                        default: return ['list format error', {
                                                                            'list': list,
                                                                            'type': ['option item is not a text', {
                                                                                'value': option_value
                                                                            }]
                                                                        }]
                                                                    }
                                                                }))
                                                                default: return ['list format error', {
                                                                    'list': list,
                                                                    'type': ['option item is not a text', {
                                                                        'value': option_value
                                                                    }]
                                                                }]
                                                            }
                                                        })

                                                    },
                                                    (): d_out.State__found_value_type => ['list format error', {
                                                        'list': $,
                                                        'type': ['missing option item', null]
                                                    }]
                                                )
                                            })
                                            case 'state': return _p.ss($, ($): d_out.State__found_value_type => {
                                                return ['valid', {
                                                    'definition': def,
                                                    'instance': ['state', $],
                                                    'option': _p.decide.state($.status, ($): d_out.State_Option => {
                                                        switch ($[0]) {
                                                            case 'missing': return _p.ss($, ($) => ['missing data', $['#']])
                                                            case 'set': return _p.ss($, ($): d_out.State_Option => {
                                                                const value = $.value
                                                                const option_name = $.option.value
                                                                return ['set', {
                                                                    'option token': $.option,
                                                                    'option': _p.decide.optional(
                                                                        def.options.__get_possible_entry_deprecated(option_name),
                                                                        ($): d_out.Option_Status => ['known', {
                                                                            'definition': $,
                                                                            'value': Value(
                                                                                value,
                                                                                {
                                                                                    'definition': $.value,
                                                                                    'definition path': `${$p['definition path']}.${option_name}`,
                                                                                }
                                                                            )
                                                                        }],
                                                                        () => ['unknown', null]
                                                                    )
                                                                }]
                                                            })
                                                            default: return _p.au($[0])
                                                        }
                                                    }),
                                                }]
                                            })
                                            default: return ['invalid', value]
                                        }
                                    })
                                }]
                            })
                            case 'text': return _p.ss($, ($) => {
                                return ['text', {
                                    'definition': $,
                                    'found value type': _p.decide.state(concrete_value, ($) => {
                                        switch ($[0]) {
                                            case 'text': return _p.ss($, ($) => ['valid', {
                                                'instance': $,
                                            }])
                                            default: return ['invalid', value]
                                        }
                                    })
                                }]
                            })
                            default: return _p.au($[0])
                        }
                    })
                }
            })
            case 'include': return _p.ss($, ($) => _pdev.implement_me("include node deserialization")) //TODO
            case 'missing': return _p.ss($, ($): d_out.Value => {
                return {
                    'definition': $p.definition,
                    'definition path': $p['definition path'],
                    'instance': value,
                    'unmarshalled': ['missing', null],
                }
            }) //TODO
            default: return _p.au($[0])
        }
    })
}
