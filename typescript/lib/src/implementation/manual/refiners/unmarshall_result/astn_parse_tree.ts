import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import _p_implement_me from 'pareto-core-dev/dist/implement_me'
import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'

//data types
import * as d_in from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"
import * as d_out from "../../../../interface/to_be_generated/unmashall_result"
import * as d_function from "../../../../interface/to_be_generated/unmarshall_result_from_astn_parse_tree"
import * as d_in_definition from "pareto-liana/dist/interface/generated/liana/schemas/schema/data/resolved"
import * as d_location from "astn-core/dist/interface/generated/liana/schemas/location/data"

//dependencies
import * as t_parse_tree_to_location from "astn-core/dist/implementation/manual/transformers/parse_tree/full_value_range"

export type Document = _pi.Refiner_Without_Error_With_Parameter<
    d_out.Document,
    d_in.Document,
    d_function.Parameters
>

export type Value = _pi.Refiner_Without_Error_With_Parameter<
    d_out.Value,
    d_in.Value,
    {
        'definition': d_in_definition.Value
        'definition path': string
        'property path': d_out.Property_Path
        'parent range': _pi.Optional_Value<d_location.Range>
    }
>

export const Document: Document = ($, $p) => ({
    'header': _p.optional.from.optional($['header']).map(($) => $.value),
    'content': Value(
        $.content,
        {
            'definition': $p.definition,
            'definition path': $p['definition path'],
            'property path': $p['property path'],
            'parent range': _p.optional.literal.not_set()
        }
    )
})

export const Value: Value = ($, $p) => {
    const value = $
    const value_range = t_parse_tree_to_location.Value($)
    const optional_value_range = _p.optional.literal.set(value_range)
    return _p.decide.state($.type, ($): d_out.Value => {
        switch ($[0]) {
            case 'concrete': return _p.ss($, ($): d_out.Value => {
                const concrete_value = $
                return {
                    'definition': $p.definition,
                    'definition path x': $p['definition path'],
                    'property path': $p['property path'],
                    'instance': value,
                    'unmarshalled': _p.decide.state($p.definition, ($): d_out.Unmarshalled => {
                        switch ($[0]) {
                            case 'component': return _p.ss($, ($): d_out.Unmarshalled => ['correct', ['component', {
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
                                        'property path': $p['property path'],
                                        'parent range': optional_value_range,
                                    }
                                )
                            }]])
                            case 'dictionary': return _p.ss($, ($): d_out.Unmarshalled => {
                                const dict_def = $
                                const prop_def = $.value
                                return _p.decide.state(concrete_value, ($): d_out.Unmarshalled => {
                                    switch ($[0]) {
                                        case 'dictionary': return _p.ss($, ($): d_out.Unmarshalled => {
                                            return ['correct', ['dictionary', {
                                                'definition': dict_def,
                                                'instance': $,
                                                'entries': $.entries.__l_map(($): d_out.Entry_Data => {
                                                    const entry = $
                                                    return {
                                                        'definition': dict_def,
                                                        'property path': $p['property path'],
                                                        'value': $.assignment.__decide(
                                                            ($) => _p.optional.from.optional(
                                                                $.value,
                                                            ).map(
                                                                ($) => Value(
                                                                    $,
                                                                    {
                                                                        'definition': prop_def,
                                                                        'definition path': `${$p['definition path']}.D`,
                                                                        'property path': _p.list.literal([]),
                                                                        'parent range': _p.optional.literal.set(t_parse_tree_to_location.ID_Value_Pair(entry)),
                                                                    }
                                                                ),
                                                            ),
                                                            () => _p.optional.literal.not_set()
                                                        ),
                                                        'id value pair': $,
                                                        'parent range': value_range,
                                                    }
                                                })
                                            }]]
                                        })
                                        default: return ['incorrect', null]
                                    }
                                })
                            })
                            case 'group': return _p.ss($, ($): d_out.Unmarshalled => {
                                const group_def = $
                                return _p.decide.state(concrete_value, ($): d_out.Unmarshalled => {

                                    const concise_content = (
                                        $: d_in.Items
                                    ): d_out.Group_Concise => {
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
                                                                        'property path': _p.list.nested_literal_old([
                                                                            $p['property path'],
                                                                            [
                                                                                ['group', $.id]
                                                                            ]
                                                                        ]),
                                                                        'parent range': optional_value_range,
                                                                    }
                                                                )
                                                            }],
                                                            (): d_out.Concise_Property_Definition_Found => ['no', null]
                                                        ),
                                                        'parent range': value_range,
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
                                                    'definition found': group_def.__get_possible_entry_deprecated($.id.token.value).__decide(
                                                        ($): d_out.Verbose_Property_Definition_Found => {
                                                            const prop_def = $
                                                            return ['yes', {
                                                                'definition': $,
                                                                'value': id_value_pair.assignment.__decide(
                                                                    ($) => _p.optional.from.optional($.value).map(
                                                                        ($) => Value(
                                                                            $,
                                                                            {
                                                                                'definition': prop_def.value,
                                                                                'definition path': `${$p['definition path']}.${id_value_pair.id.token.value}`,
                                                                                'property path': _p.list.nested_literal_old([
                                                                                    $p['property path'],
                                                                                    [
                                                                                        ['group', id_value_pair.id.token.value]
                                                                                    ]
                                                                                ]),
                                                                                'parent range': _p.optional.literal.set(t_parse_tree_to_location.ID_Value_Pair(id_value_pair)),
                                                                            }
                                                                        )
                                                                    ),
                                                                    () => _p.optional.literal.not_set()
                                                                )
                                                            }]
                                                        },
                                                        () => ['no', null]
                                                    ),
                                                    'parent range': value_range,
                                                }
                                            })
                                        }
                                    }
                                    return _p.decide.state($, ($): d_out.Unmarshalled => {
                                        switch ($[0]) {
                                            case 'dictionary': return _p.ss($, ($): d_out.Unmarshalled => ['correct', ['group', {
                                                'definition': group_def,
                                                'instance': ['dictionary', $],
                                                'type': ['verbose', verbose_content($.entries)]
                                            }]])
                                            case 'group': return _p.ss($, ($): d_out.Unmarshalled => {
                                                return ['correct', ['group', {
                                                    'definition': group_def,
                                                    'instance': ['group', $],
                                                    'type': _p.decide.state($, ($): d_out.Group_Type => {
                                                        switch ($[0]) {
                                                            case 'concise': return _p.ss($, ($) => ['concise', concise_content($.properties)])
                                                            case 'verbose': return _p.ss($, ($) => ['verbose', verbose_content($.properties)])
                                                            default: return _p.au($[0])
                                                        }
                                                    })
                                                }]]
                                            })
                                            case 'list': return _p.ss($, ($): d_out.Unmarshalled => ['correct', ['group', {
                                                'definition': group_def,
                                                'instance': ['list', $],
                                                'type': ['concise', concise_content($.items)]
                                            }]])
                                            default: return ['incorrect', null]
                                        }
                                    })
                                })
                            })
                            case 'list': return _p.ss($, ($) => {
                                const def = $
                                return _p.decide.state(concrete_value, ($): d_out.Unmarshalled => {
                                    switch ($[0]) {
                                        case 'list': return _p.ss($, ($): d_out.Unmarshalled => {
                                            return ['correct', ['list', {
                                                'definition': def,
                                                'instance': $,
                                                'items': $.items.__l_map(($) => Value(
                                                    $.value,
                                                    {
                                                        'definition': def.value,
                                                        'definition path': $p['definition path'] + ".L",
                                                        'property path': _p.list.literal([]),
                                                        'parent range': optional_value_range,
                                                    }
                                                ))
                                            }]]
                                        })
                                        default: return ['incorrect', null]

                                    }
                                })
                            })
                            case 'nothing': return _p.ss($, ($): d_out.Unmarshalled => {
                                const def = $
                                return _p.decide.state(concrete_value, ($): d_out.Unmarshalled => {
                                    switch ($[0]) {
                                        case 'nothing': return _p.ss($, ($) => ['correct', ['nothing', {
                                            'definition': def,
                                            'value': ['nothing', $],
                                        }]])
                                        case 'text': return _p.ss($, ($): d_out.Unmarshalled => $.token.value === "null"
                                            ? ['correct', ['nothing', {
                                                'definition': def,
                                                'value': ['null literal', $],
                                            }]]
                                            : ['incorrect', null]
                                        )
                                        default: return ['incorrect', null]
                                    }
                                })
                            })
                            case 'simple': return _p.ss($, ($): d_out.Unmarshalled => {
                                const def = $
                                return _p.decide.state(concrete_value, ($): d_out.Unmarshalled => {
                                    switch ($[0]) {
                                        case 'text': return _p.ss($, ($): d_out.Unmarshalled => ['correct', ['simple', {
                                            'definition': def,
                                            'instance': $,
                                            'correct string type': _p.decide.state($.token.type, ($) => {
                                                switch ($[0]) {
                                                    case 'quoted': return true
                                                    case 'apostrophed': return false
                                                    case 'undelimited': return true
                                                    case 'backticked': return false
                                                    default: return _p.au($[0])
                                                }
                                            })
                                        }]])
                                        default: return ['incorrect', null]
                                    }
                                })
                            })
                            case 'optional': return _p.ss($, ($): d_out.Unmarshalled => {
                                const def = $
                                return _p.decide.state(concrete_value, ($): d_out.Unmarshalled => {
                                    switch ($[0]) {
                                        case 'text': return _p.ss($, ($): d_out.Unmarshalled => $.token.value === "null"
                                            ? ['correct', ['optional', {
                                                'definition': def,
                                                'status': ['not set', {
                                                    'instance': ['null literal', $],
                                                }],
                                            }]]
                                            : ['incorrect', null]
                                        )
                                        case 'list': return _p.ss($, ($): d_out.Unmarshalled => {
                                            const list = $
                                            return _p.decide.list($.items).has_first_item(
                                                ($, rest): d_out.Unmarshalled => {
                                                    const item_value = $
                                                    return _p.decide.list(rest).has_items(
                                                        ($) => ['incorrect', null], // Error: too many items
                                                        (): d_out.Unmarshalled => ['correct', ['optional', {
                                                            'definition': def,
                                                            'status': ['set', {
                                                                'instance': ['list', list],
                                                                'child value': Value(
                                                                    item_value.value,
                                                                    {
                                                                        'definition': def,
                                                                        'definition path': `${$p['definition path']}.O`,
                                                                        'property path': _p.list.nested_literal_old([
                                                                            $p['property path'],
                                                                            [
                                                                                ['optional', null]
                                                                            ]
                                                                        ]),
                                                                        'parent range': optional_value_range,
                                                                    }
                                                                )
                                                            }]
                                                        }]]
                                                    )
                                                },
                                                (): d_out.Unmarshalled => ['incorrect', null] // Error: empty list
                                            )
                                        })
                                        case 'optional': return _p.ss($, ($): d_out.Unmarshalled => ['correct', ['optional', {
                                            'definition': def,
                                            'status': _p.decide.state($, ($): d_out.Optional['status'] => {
                                                switch ($[0]) {
                                                    case 'set': return _p.ss($, ($) => ['set', {
                                                        'instance': ['optional', $],
                                                        'child value': Value(
                                                            $.value,
                                                            {
                                                                'definition': def,
                                                                'definition path': `${$p['definition path']}.O`,
                                                                'property path': _p.list.nested_literal_old([
                                                                    $p['property path'],
                                                                    [
                                                                        ['optional', null]
                                                                    ]
                                                                ]),
                                                                'parent range': optional_value_range,
                                                            }
                                                        )
                                                    }])
                                                    case 'not set': return _p.ss($, ($) => ['not set', {
                                                        'instance': ['not set', $],
                                                    }])
                                                    default: return _p.au($[0])
                                                }
                                            })
                                        }]])
                                        default: return ['incorrect', null]
                                    }
                                })
                            })
                            case 'reference': return _p.ss($, ($): d_out.Unmarshalled => {
                                const def = $
                                return _p.decide.state($.type, ($): d_out.Unmarshalled => {
                                    switch ($[0]) {
                                        case 'derived': return _p.ss($, ($) => _p.decide.state(concrete_value, ($): d_out.Unmarshalled => {
                                            switch ($[0]) {
                                                case 'nothing': return _p.ss($, ($): d_out.Unmarshalled => ['correct', ['reference', {
                                                    'definition': def,
                                                    'type': ['derived', {
                                                        'instance': ['nothing', $],
                                                    }]
                                                }]])
                                                case 'text': return _p.ss($, ($): d_out.Unmarshalled => $.token.value === "null"
                                                    ? ['correct', ['reference', {
                                                        'definition': def,
                                                        'type': ['derived', {
                                                            'instance': ['null literal', $],
                                                        }]
                                                    }]]
                                                    : ['incorrect', null]
                                                )
                                                default: return ['incorrect', null]
                                            }
                                        }))
                                        case 'selected': return _p.ss($, ($) => _p.decide.state(concrete_value, ($): d_out.Unmarshalled => {
                                            switch ($[0]) {
                                                case 'text': return _p.ss($, ($): d_out.Unmarshalled => ['correct', ['reference', {
                                                    'definition': def,
                                                    'type': ['selected', {
                                                        'instance': $,
                                                    }]
                                                }]])
                                                default: return ['incorrect', null]
                                            }
                                        }))
                                        default: return _p.au($[0])
                                    }
                                })
                            })
                            case 'state': return _p.ss($, ($): d_out.Unmarshalled => {
                                const def = $
                                return _p.decide.state(concrete_value, ($): d_out.Unmarshalled => {
                                    switch ($[0]) {
                                        case 'list': return _p.ss($, ($) => {
                                            const list = $
                                            return ['correct', ['state', {
                                                'definition': def,
                                                'found value type': _p.decide.list($.items).has_first_item(
                                                    ($, rest): d_out.State__found_value_type => {
                                                        const option_value = $.value
                                                        return _p.decide.state($.value.type, ($): d_out.State__found_value_type => {
                                                            switch ($[0]) {
                                                                case 'concrete': return _p.ss($, ($): d_out.State__found_value_type => _p.decide.state($, ($) => {
                                                                    switch ($[0]) {
                                                                        case 'text': return _p.ss($, ($) => {
                                                                            const option_token = $
                                                                            const option_name = $.token.value
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
                                                                                            'property path': $p['property path'],
                                                                                            'value instance': value,
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
                                                                                                                    'property path': _p.list.literal([]),
                                                                                                                    'parent range': optional_value_range,
                                                                                                                }
                                                                                                            )
                                                                                                        }]
                                                                                                    },
                                                                                                    (): d_out.Option_Status => ['unknown', null]
                                                                                                )
                                                                                            }],
                                                                                            'parent range': value_range,
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
                                            }]]

                                        })
                                        case 'state': return _p.ss($, ($): d_out.Unmarshalled => {
                                            return ['correct', ['state', {
                                                'definition': def,
                                                'found value type': ['valid', {
                                                    'definition': def,
                                                    'property path': $p['property path'],
                                                    'value instance': value,
                                                    'instance': ['state', $],
                                                    'option': _p.decide.state($.status, ($): d_out.State_Option => {
                                                        switch ($[0]) {
                                                            case 'missing': return _p.ss($, ($) => ['missing data', $['#']])
                                                            case 'set': return _p.ss($, ($): d_out.State_Option => {
                                                                const value = $.value
                                                                const option_name = $.option.token.value
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
                                                                                    'property path': _p.list.nested_literal_old([
                                                                                        $p['property path'],
                                                                                        [
                                                                                            ['state', option_name]
                                                                                        ]
                                                                                    ]),
                                                                                    'parent range': optional_value_range,
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
                                                    'parent range': value_range,
                                                }]
                                            }]]
                                        })
                                        default: return ['incorrect', null]
                                    }
                                })
                            })
                            case 'text': return _p.ss($, ($) => {
                                const def = $
                                return _p.decide.state(concrete_value, ($): d_out.Unmarshalled => {
                                    switch ($[0]) {
                                        case 'text': return _p.ss($, ($) => ['correct', ['text', {
                                            'definition': def,
                                            'instance': $,
                                        }]])
                                        default: return ['incorrect', null]
                                    }
                                })
                            })
                            default: return _p.au($[0])
                        }
                    }),
                    'optional parent range': $p['parent range']
                }
            })
            case 'include': return _p.ss($, ($) => _p_implement_me("include node deserialization")) //TODO
            case 'missing': return _p.ss($, ($): d_out.Value => {
                return {
                    'definition': $p.definition,
                    'definition path x': $p['definition path'],
                    'property path': $p['property path'],
                    'instance': value,
                    'unmarshalled': ['missing', null],
                    'optional parent range': optional_value_range,
                }
            }) //TODO
            default: return _p.au($[0])
        }
    })
}
