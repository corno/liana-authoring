import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import _p_implement_me from 'pareto-core-dev/dist/implement_me'
import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'
import _p_create_refinement_context from 'pareto-core/dist/__internals/async/create_refinement_context'

//data types
import * as d_in from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"
import * as d_out from "../../../../interface/to_be_generated/unmashall_result"
import * as d_function from "../../../../interface/to_be_generated/unmarshall_result_from_astn_parse_tree"
import * as d_in_definition from "pareto-liana/dist/interface/generated/liana/schemas/schema/data/resolved"

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
        'parent range stack': _pi.Optional_Value<d_out.Range_Stack>
    }
>

export const Document: Document = ($, $p) => ({
    'header': _p.optional.from.optional($['header']).map(($) => $.value),
    'content': Value(
        $.content,
        {
            'definition': $p.definition['root value'],
            'definition path': $p['definition path'],
            'property path': $p['property path'],
            'parent range stack': _p.optional.literal.not_set()
        }
    )
})

export const Value: Value = ($, $p) => {
    const value = $
    const value_range_stack: d_out.Range_Stack = {
        'range': t_parse_tree_to_location.Value($),
        'parent': $p['parent range stack']
    }
    const optional_value_range_stack = _p.optional.literal.set(value_range_stack)
    return _p.decide.state($.type, ($): d_out.Value => {
        switch ($[0]) {
            case 'concrete': return _p.ss($, ($): d_out.Value => {
                const concrete_value = $
                return {
                    'definition': $p.definition,
                    'definition path x': $p['definition path'],
                    'property path': $p['property path'],
                    'instance': value,
                    'unmarshall result': _p_create_refinement_context<d_out.Unmarshalled_Value, d_out.Unmarshall_Error>(
                        (abort) => _p.decide.state($p.definition, ($): d_out.Unmarshalled_Value => {
                            switch ($[0]) {
                                case 'component': return _p.ss($, ($): d_out.Unmarshalled_Value => ['component', {
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
                                            'parent range stack': _p.optional.literal.set(value_range_stack),
                                        }
                                    )
                                }])
                                case 'dictionary': return _p.ss($, ($): d_out.Unmarshalled_Value => {
                                    const dict_def = $
                                    const prop_def = $.value
                                    return ['dictionary', _p.decide.state(concrete_value, ($) => {
                                        switch ($[0]) {
                                            case 'dictionary': return _p.ss($, ($) => {
                                                return {
                                                    'definition': dict_def,
                                                    'instance': $,
                                                    'entries': $.entries.__l_map(($): d_out.Entry => {
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
                                                                            'parent range stack': _p.optional.literal.set({
                                                                                'range': t_parse_tree_to_location.ID_Value_Pair(entry),
                                                                                'parent': optional_value_range_stack,
                                                                            }),
                                                                        }
                                                                    ),
                                                                ),
                                                                () => _p.optional.literal.not_set()
                                                            ),
                                                            'id value pair': $,
                                                            'parent range stack': value_range_stack,
                                                        }
                                                    })
                                                }
                                            })
                                            default: return abort(['incorrect', ['wrong type', null]])
                                        }
                                    })]
                                })
                                case 'group': return _p.ss($, ($): d_out.Unmarshalled_Value => {
                                    const group_def = $
                                    return ['group', _p.decide.state(concrete_value, ($) => {

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
                                                                            'parent range stack': optional_value_range_stack,
                                                                        }
                                                                    )
                                                                }],
                                                                (): d_out.Concise_Property_Definition_Found => ['no', {
                                                                    'item': instance
                                                                }]
                                                            ),
                                                            'parent range stack': value_range_stack,
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
                                                                                    'parent range stack': _p.optional.literal.set({
                                                                                        'range': t_parse_tree_to_location.ID_Value_Pair(id_value_pair),
                                                                                        'parent': optional_value_range_stack,
                                                                                    }),
                                                                                }
                                                                            )
                                                                        ),
                                                                        () => _p.optional.literal.not_set()
                                                                    )
                                                                }]
                                                            },
                                                            () => ['no', null]
                                                        ),
                                                        'parent range stack': value_range_stack,
                                                    }
                                                })
                                            }
                                        }
                                        return _p.decide.state($, ($) => {
                                            switch ($[0]) {
                                                case 'dictionary': return _p.ss($, ($) => ({
                                                    'definition': group_def,
                                                    'instance': ['dictionary', {
                                                        'dummy': null
                                                    }],
                                                    'type': ['verbose', verbose_content($.entries)]
                                                }))
                                                case 'group': return _p.ss($, ($) => {
                                                    return {
                                                        'definition': group_def,
                                                        'instance': ['group', {
                                                            'dummy': null
                                                        }],
                                                        'type': _p.decide.state($, ($): d_out.Group_Type => {
                                                            switch ($[0]) {
                                                                case 'concise': return _p.ss($, ($) => ['concise', concise_content($.properties)])
                                                                case 'verbose': return _p.ss($, ($) => ['verbose', verbose_content($.properties)])
                                                                default: return _p.au($[0])
                                                            }
                                                        })
                                                    }
                                                })
                                                case 'list': return _p.ss($, ($) => ({
                                                    'definition': group_def,
                                                    'instance': ['list', {
                                                        'dummy': null
                                                    }],
                                                    'type': ['concise', concise_content($.items)]
                                                }))
                                                default: return abort(['incorrect', ['wrong type', null]])
                                            }
                                        })
                                    })]
                                })
                                case 'list': return _p.ss($, ($) => {
                                    const def = $
                                    return ['list', _p.decide.state(concrete_value, ($) => {
                                        switch ($[0]) {
                                            case 'list': return _p.ss($, ($) => {
                                                return {
                                                    'definition': def,
                                                    'instance': $,
                                                    'items': $.items.__l_map(($) => Value(
                                                        $.value,
                                                        {
                                                            'definition': def.value,
                                                            'definition path': $p['definition path'] + ".L",
                                                            'property path': _p.list.literal([]),
                                                            'parent range stack': optional_value_range_stack,
                                                        }
                                                    ))
                                                }
                                            })
                                            default: return abort(['incorrect', ['wrong type', null]])

                                        }
                                    })]
                                })
                                case 'nothing': return _p.ss($, ($): d_out.Unmarshalled_Value => {
                                    const def = $
                                    return ['nothing', _p.decide.state(concrete_value, ($) => {
                                        switch ($[0]) {
                                            case 'nothing': return _p.ss($, ($) => ({
                                                'definition': def,
                                                'value': ['nothing', $],
                                            }))
                                            case 'text': return _p.ss($, ($) => $.token.value === "null"
                                                ? {
                                                    'definition': def,
                                                    'value': ['null literal', $],
                                                }
                                                : abort(['incorrect', ['wrong type', null]])
                                            )
                                            default: return abort(['incorrect', ['wrong type', null]])
                                        }
                                    })]
                                })
                                case 'simple': return _p.ss($, ($): d_out.Unmarshalled_Value => {
                                    const def = $
                                    return ['simple', _p.decide.state(concrete_value, ($) => {
                                        switch ($[0]) {
                                            case 'text': return _p.ss($, ($) => ({
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
                                            }))
                                            default: return abort(['incorrect', ['wrong type', null]])
                                        }
                                    })]
                                })
                                case 'optional': return _p.ss($, ($): d_out.Unmarshalled_Value => {
                                    const def = $
                                    return ['optional', _p.decide.state(concrete_value, ($) => {
                                        switch ($[0]) {
                                            case 'text': return _p.ss($, ($) => $.token.value === "null"
                                                ? {
                                                    'definition': def,
                                                    'status': ['not set', {
                                                        'instance': ['null literal', $],
                                                    }],
                                                }
                                                : abort(['incorrect', ['wrong type', null]])
                                            )
                                            case 'list': return _p.ss($, ($) => {
                                                const list = $
                                                return _p.decide.list($.items).has_first_item(
                                                    ($, rest) => {
                                                        const item_value = $
                                                        return _p.decide.list(rest).has_items(
                                                            ($) => abort(['incorrect', ['wrong type', null]]), // Error: too many items
                                                            () => ({
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
                                                                            'parent range stack': optional_value_range_stack,
                                                                        }
                                                                    )
                                                                }]
                                                            })
                                                        )
                                                    },
                                                    () => abort(['incorrect', ['wrong type', null]]) // Error: empty list
                                                )
                                            })
                                            case 'optional': return _p.ss($, ($) => ({
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
                                                                    'parent range stack': optional_value_range_stack,
                                                                }
                                                            )
                                                        }])
                                                        case 'not set': return _p.ss($, ($) => ['not set', {
                                                            'instance': ['not set', $],
                                                        }])
                                                        default: return _p.au($[0])
                                                    }
                                                })
                                            }))
                                            default: return abort(['incorrect', ['wrong type', null]])
                                        }
                                    })]
                                })
                                case 'reference': return _p.ss($, ($): d_out.Unmarshalled_Value => {
                                    const def = $
                                    return ['reference', _p.decide.state($.type, ($): d_out.Reference => {
                                        switch ($[0]) {
                                            case 'derived': return _p.ss($, ($) => _p.decide.state(concrete_value, ($) => {
                                                switch ($[0]) {
                                                    case 'nothing': return _p.ss($, ($) => ({
                                                        'definition': def,
                                                        'type': ['derived', {
                                                            'instance': ['nothing', $],
                                                        }]
                                                    }))
                                                    case 'text': return _p.ss($, ($) => $.token.value === "null"
                                                        ? {
                                                            'definition': def,
                                                            'type': ['derived', {
                                                                'instance': ['null literal', $],
                                                            }]
                                                        }
                                                        : abort(['incorrect', ['wrong type', null]])
                                                    )
                                                    default: return abort(['incorrect', ['wrong type', null]])
                                                }
                                            }))
                                            case 'selected': return _p.ss($, ($) => _p.decide.state(concrete_value, ($) => {
                                                switch ($[0]) {
                                                    case 'text': return _p.ss($, ($) => ({
                                                        'definition': def,
                                                        'type': ['selected', {
                                                            'instance': $,
                                                        }]
                                                    }))
                                                    default: return abort(['incorrect', ['wrong type', null]])
                                                }
                                            }))
                                            default: return _p.au($[0])
                                        }
                                    })]
                                })
                                case 'state': return _p.ss($, ($): d_out.Unmarshalled_Value => {
                                    const def = $
                                    return ['state', _p.decide.state(concrete_value, ($): d_out.State => {
                                        switch ($[0]) {
                                            case 'list': return _p.ss($, ($): d_out.State => {
                                                const list = $
                                                return _p.decide.list($.items).has_first_item(
                                                    ($, rest): d_out.State => {
                                                        const option_value = $.value
                                                        return _p.decide.state($.value.type, ($): d_out.State => {
                                                            switch ($[0]) {
                                                                case 'concrete': return _p.ss($, ($) => _p.decide.state($, ($): d_out.State => {
                                                                    switch ($[0]) {
                                                                        case 'text': return _p.ss($, ($) => {
                                                                            const option_token = $
                                                                            const option_name = $.token.value
                                                                            return _p.decide.list(rest).has_first_item(
                                                                                ($, rest) => {
                                                                                    const raw_value = $
                                                                                    return _p.decide.list(rest).has_items(
                                                                                        ($) => abort(['incorrect', ['list as state format error', {
                                                                                            'list': list,
                                                                                            'type': ['too many items', null]
                                                                                        }]]),
                                                                                        () => ({
                                                                                            'definition': def,
                                                                                            'property path': $p['property path'],
                                                                                            'instance': ['list', list],
                                                                                            'option status': ['set', _p.decide.optional(
                                                                                                def.options.__get_possible_entry_deprecated(option_name),
                                                                                                ($): d_out.State_Set => {
                                                                                                    const option_def = $
                                                                                                    return {
                                                                                                        'option token': option_token,
                                                                                                        'definition': option_def,
                                                                                                        'value': Value(
                                                                                                            raw_value.value,
                                                                                                            {
                                                                                                                'definition': option_def.value,
                                                                                                                'definition path': `${$p['definition path']}.${option_name}`,
                                                                                                                'property path': _p.list.literal([]),
                                                                                                                'parent range stack': optional_value_range_stack,
                                                                                                            }
                                                                                                        )
                                                                                                    }
                                                                                                },
                                                                                                () => abort(['unknown option', {
                                                                                                    'definition': def,
                                                                                                    'option token': option_token,
                                                                                                }])
                                                                                            )],
                                                                                            'parent range stack': value_range_stack,
                                                                                        })
                                                                                    )
                                                                                },
                                                                                () => abort(['incorrect', ['list as state format error', {
                                                                                    'list': list,
                                                                                    'type': ['missing value item', null]
                                                                                }]])
                                                                            )
                                                                        })
                                                                        default: return abort(['incorrect', ['list as state format error', {
                                                                            'list': list,
                                                                            'type': ['option item is not a text', {
                                                                                'value': option_value
                                                                            }]
                                                                        }]])
                                                                    }
                                                                }))
                                                                default: return abort(['incorrect', ['list as state format error', {
                                                                    'list': list,
                                                                    'type': ['option item is not a text', {
                                                                        'value': option_value
                                                                    }]
                                                                }]])
                                                            }
                                                        })

                                                    },
                                                    () => abort(['incorrect', ['list as state format error', {
                                                        'list': $,
                                                        'type': ['missing option item', null]
                                                    }]])
                                                )

                                            })
                                            case 'state': return _p.ss($, ($) => {
                                                return {
                                                    'definition': def,
                                                    'property path': $p['property path'],
                                                    'instance': ['state', $],
                                                    'option status': _p.decide.state($.status, ($): d_out.State_Option => {
                                                        switch ($[0]) {
                                                            case 'missing': return _p.ss($, ($) => ['missing data', $['#']])
                                                            case 'set': return _p.ss($, ($): d_out.State_Option => {
                                                                const value = $.value
                                                                const option_name = $.option.token.value
                                                                const option_token = $.option
                                                                return ['set', _p.decide.optional(
                                                                        def.options.__get_possible_entry_deprecated(option_name),
                                                                        ($): d_out.State_Set => ({
                                                                            'option token': option_token,
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
                                                                                    'parent range stack': optional_value_range_stack,
                                                                                }
                                                                            )
                                                                        }),
                                                                        () => abort(['unknown option', {
                                                                            'definition': def,
                                                                            'option token': $.option
                                                                        }])
                                                                    )]
                                                            })
                                                            default: return _p.au($[0])
                                                        }
                                                    }),
                                                    'parent range stack': value_range_stack,
                                                }
                                            })
                                            default: return abort(['incorrect', ['wrong type', null]])
                                        }
                                    })]
                                })
                                case 'text': return _p.ss($, ($) => {
                                    const def = $
                                    return ['text', _p.decide.state(concrete_value, ($) => {
                                        switch ($[0]) {
                                            case 'text': return _p.ss($, ($) => ({
                                                'definition': def,
                                                'instance': $,
                                            }))
                                            default: return abort(['incorrect', ['wrong type', null]])
                                        }
                                    })]
                                })
                                default: return _p.au($[0])
                            }
                        })
                    ).__extract_data<d_out.Value['unmarshall result']>(
                        ($) => ['success', $],
                        ($) => ['error', ['incorrect', ['wrong type', null]]],
                    ),
                    'optional parent range stack': $p['parent range stack']
                }
            })
            case 'include': return _p.ss($, ($) => _p_implement_me("include node deserialization")) //TODO
            case 'missing': return _p.ss($, ($): d_out.Value => {
                return {
                    'definition': $p.definition,
                    'definition path x': $p['definition path'],
                    'property path': $p['property path'],
                    'instance': value,
                    'unmarshall result': ['error', ['missing', null]],
                    'optional parent range stack': $p['parent range stack'],
                }
            }) //TODO
            default: return _p.au($[0])
        }
    })
}
