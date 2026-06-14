import * as pt from 'pareto-core/dist/assign'
import * as pi from 'pareto-core/dist/interface'
import p_implement_me from 'pareto-core-dev/dist/implement_me'
import p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'
import p_create_refinement_context from 'pareto-core/dist/__internals/async/create_refinement_context'

//data types
import * as d_in from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"
import * as d_out from "../../../../interface/to_be_generated/unmarshall_result"
import * as d_function from "../../../../interface/to_be_generated/unmarshall_result_from_astn_parse_tree"
import * as d_in_definition from "pareto-liana/dist/interface/generated/liana/schemas/schema/data/resolved"

//dependencies
import * as t_parse_tree_to_full_location from "astn-core/dist/implementation/manual/transformers/parse_tree/full_value_range"
import * as t_parse_tree_to_start_token_location from "astn-core/dist/implementation/manual/transformers/parse_tree/start_token_range"

export type Document = pi.Refiner_Without_Error_With_Parameter<
    d_out.Document,
    d_in.Document,
    d_function.Parameters
>

export type Value = pi.Refiner_Without_Error_With_Parameter<
    d_out.Value,
    d_in.Value,
    {
        'definition': d_in_definition.Value
        'property path': d_out.Property_Path
        'parent range stack': pi.Optional_Value<d_out.Range_Stack>
    }
>

export const Document: Document = ($, $p) => ({
    'header': pt.optional.from.optional($['header']).map(($) => $.value),
    'content': Value(
        $.content,
        {
            'definition': $p.definition['root value'],
            'property path': $p['property path'],
            'parent range stack': pt.optional.literal.not_set()
        }
    )
})

export const Value: Value = ($, $p) => {
    const value = $
    const value_range_stack: d_out.Range_Stack = {
        'range': t_parse_tree_to_full_location.Value($),
        'parent': $p['parent range stack']
    }
    const start_token_range = t_parse_tree_to_start_token_location.Value($)
    const optional_value_range_stack = pt.optional.literal.set(value_range_stack)
    return pt.decide.state($.type, ($): d_out.Value => {
        switch ($[0]) {
            case 'concrete': return pt.ss($, ($): d_out.Value => {
                const concrete_value = $
                return {
                    'definition': $p.definition,
                    'property path': $p['property path'],
                    'instance': value,
                    'unmarshall result': p_create_refinement_context<d_out.Unmarshalled_Value, d_out.Value_Unmarshall_Error>(
                        (abort) => pt.decide.state($p.definition, ($): d_out.Unmarshalled_Value => {
                            switch ($[0]) {
                                case 'component': return pt.ss($, ($): d_out.Unmarshalled_Value => ['component', {
                                    'definition': $,
                                    'value': Value(
                                        value,
                                        {
                                            'definition': pt.decide.state($.type, ($) => {
                                                switch ($[0]) {
                                                    case 'external': return pt.ss($, ($) => $.module['l entry']['root value'])
                                                    case 'internal acyclic': return pt.ss($, ($) => $['l entry']['root value'])
                                                    case 'internal': return pt.ss($, ($) => $['l entry'].get_circular_dependent()['root value'])
                                                    default: return pt.au($[0])
                                                }
                                            }),
                                            'property path': $p['property path'],
                                            'parent range stack': pt.optional.literal.set(value_range_stack),
                                        }
                                    )
                                }])
                                case 'dictionary': return pt.ss($, ($): d_out.Unmarshalled_Value => {
                                    const dict_def = $
                                    return ['dictionary', pt.decide.state(concrete_value, ($): d_out.Dictionary => {
                                        switch ($[0]) {
                                            case 'dictionary': return pt.ss($, ($): d_out.Dictionary => {
                                                const entries = $.entries.__l_map(($): d_out.Entry => {
                                                    const entry = $
                                                    return {
                                                        'definition': dict_def,
                                                        'property path': $p['property path'],
                                                        'id': $.id.token.value,
                                                        'value': $.assignment.__decide(
                                                            ($): d_out.Entry['value'] => $.value.__decide(
                                                                ($): d_out.Entry['value'] => ['set', Value(
                                                                    $,
                                                                    {
                                                                        'definition': dict_def.value,
                                                                        'property path': pt.list.literal([]),
                                                                        'parent range stack': pt.optional.literal.set({
                                                                            'range': t_parse_tree_to_full_location.ID_Value_Pair(entry),
                                                                            'parent': optional_value_range_stack,
                                                                        }),
                                                                    }
                                                                )],
                                                                () => ['not set', null]
                                                            ),
                                                            () => ['not set', null]
                                                        ),
                                                        'intermediate': {
                                                            'id value pair': $,

                                                        },
                                                        'parent range stack': value_range_stack,
                                                    }
                                                })
                                                return {
                                                    'definition': dict_def,
                                                    'intermediate': {
                                                        'instance': $,
                                                        'entries as list': entries,
                                                    },
                                                    'derived': {
                                                        'entries': pt.dictionary.from.list(entries).group(
                                                            ($) => $.intermediate['id value pair'].id.token.value,

                                                        ).__d_map(($) => {
                                                            return {
                                                                'result': pt.decide.list($).has_single_item(
                                                                    ($): d_out.Entry_Unmarshall_Result => ['success', $],
                                                                    ($): d_out.Entry_Unmarshall_Result => ['error', ['duplicate', {
                                                                        'instances': $
                                                                    }]],
                                                                    (): d_out.Entry_Unmarshall_Result => p_unreachable_code_path("we are grouping by id, so there cannot be no entries having this id")
                                                                )
                                                            }
                                                        })
                                                    }
                                                }
                                            })
                                            default: return abort(['incorrect', ['wrong type', null]])
                                        }
                                    })]
                                })
                                case 'group': return pt.ss($, ($): d_out.Unmarshalled_Value => {
                                    const group_def = $
                                    const Concise_Properties = (
                                        $: d_in.Items
                                    ): d_out.Concise_Properties => pt.list.from.list(
                                        $
                                    ).join(
                                        pt.list.from.dictionary(
                                            group_def
                                        ).convert(
                                            ($, id) => ({
                                                'id': id,
                                                'definition': $
                                            })
                                        ),
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
                                                                'property path': pt.list.nested_literal_old([
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
                                    const Verbose_Properties = ($: d_in.ID_Value_Pairs): d_out.Verbose_Properties => {
                                        return $.__l_map(($) => {
                                            const id_value_pair = $
                                            return {
                                                'id': $.id.token.value,
                                                'intermediate': {
                                                    'id value pair': $,
                                                },
                                                'definition found': group_def.__get_possible_entry_deprecated($.id.token.value).__decide(
                                                    ($): d_out.Verbose_Property_Definition_Found => {
                                                        const prop_def = $
                                                        return ['yes', {
                                                            'definition': $,
                                                            'value': id_value_pair.assignment.__decide(
                                                                ($) => pt.optional.from.optional($.value).map(
                                                                    ($) => Value(
                                                                        $,
                                                                        {
                                                                            'definition': prop_def.value,
                                                                            'property path': pt.list.nested_literal_old([
                                                                                $p['property path'],
                                                                                [
                                                                                    ['group', id_value_pair.id.token.value]
                                                                                ]
                                                                            ]),
                                                                            'parent range stack': pt.optional.literal.set({
                                                                                'range': t_parse_tree_to_full_location.ID_Value_Pair(id_value_pair),
                                                                                'parent': optional_value_range_stack,
                                                                            }),
                                                                        }
                                                                    )
                                                                ),
                                                                () => pt.optional.literal.not_set()
                                                            )
                                                        }]
                                                    },
                                                    () => ['no', null]
                                                ),
                                                'parent range stack': value_range_stack,
                                            }
                                        })
                                    }
                                    return ['group', pt.decide.state(concrete_value, ($): d_out.Group => {
                                        const instance: d_out.Group['intermediate']['instance'] = pt.decide.state($, ($) => {
                                            switch ($[0]) {
                                                case 'dictionary': return pt.ss($, ($) => ['dictionary', {
                                                    'dummy': null,
                                                    'properties': Verbose_Properties($.entries)
                                                }])
                                                case 'group': return pt.ss($, ($) => ['group', {
                                                    'dummy': null,
                                                    'type': pt.decide.state($, ($): d_out.Group_Type => {
                                                        switch ($[0]) {
                                                            case 'concise': return pt.ss($, ($) => ['concise', {
                                                                'properties': Concise_Properties($.properties)
                                                            }])
                                                            case 'verbose': return pt.ss($, ($) => ['verbose', {
                                                                'properties': Verbose_Properties($.properties)
                                                            }])
                                                            default: return pt.au($[0])
                                                        }
                                                    })
                                                }])
                                                case 'list': return pt.ss($, ($) => ['list', {
                                                    'dummy': null,
                                                    'properties': Concise_Properties($.items)
                                                }])
                                                default: return abort(['incorrect', ['wrong type', null]])
                                            }
                                        })
                                        const group_type: d_out.Group_Type = pt.decide.state(instance, ($): d_out.Group_Type => {
                                            switch ($[0]) {
                                                case 'dictionary': return pt.ss($, ($) => ['verbose', {
                                                    'properties': $.properties
                                                }])
                                                case 'group': return pt.ss($, ($) => $.type)
                                                case 'list': return pt.ss($, ($) => ['concise', {
                                                    'properties': $.properties
                                                }])
                                                default: return abort(['incorrect', ['wrong type', null]])
                                            }
                                        })
                                        return {
                                            'definition': group_def,
                                            'intermediate': {
                                                'instance': instance,
                                            },
                                            'derived': {
                                                'style': group_type,
                                                'properties': pt.decide.state(group_type, ($): d_out.Group['derived']['properties'] => {
                                                    switch ($[0]) {
                                                        case 'verbose': return pt.ss($, ($) => {
                                                            const instance_lookup = pt.dictionary.from.list($.properties).group(
                                                                ($) => $.intermediate['id value pair'].id.token.value
                                                            )
                                                            return group_def.__d_map(($, id) => ({
                                                                'definition': $,
                                                                'result': instance_lookup.__get_possible_entry_deprecated(id).__decide(
                                                                    ($): d_out.Property['result'] => pt.decide.list($).has_single_item(
                                                                        ($): d_out.Property['result'] => pt.decide.state($['definition found'], ($) => {
                                                                            switch ($[0]) {
                                                                                case 'yes': return pt.ss($, ($): d_out.Property['result'] => $['value'].__decide(
                                                                                    ($): d_out.Property['result'] => ['success', $],
                                                                                    (): d_out.Property['result'] => ['error', ['missing', {
                                                                                        'start token range': start_token_range
                                                                                    }]]
                                                                                ))
                                                                                case 'no': return pt.ss($, () => p_unreachable_code_path("we are iterating over the definitions"))
                                                                                default: return pt.au($[0])
                                                                            }
                                                                        }),
                                                                        ($): d_out.Property['result'] => {
                                                                            const x: d_out.Property_Unmarshall_Error = ['multiple', {
                                                                                'instances': $
                                                                            }]
                                                                            return ['error', x]
                                                                        },
                                                                        (): d_out.Property['result'] => ['error', ['missing', {
                                                                            'start token range': start_token_range
                                                                        }]]
                                                                    ),
                                                                    (): d_out.Property['result'] => ['error', ['missing', {
                                                                        'start token range': start_token_range
                                                                    }]]
                                                                )
                                                            }))
                                                        })
                                                        case 'concise': return pt.ss($, ($) => {
                                                            const instance_lookup = pt.dictionary.from.list(
                                                                pt.list.from.list(
                                                                    $.properties
                                                                ).map_optionally(($) => pt.decide.state($['definition found'], ($): pi.Optional_Value<d_out.Concise_Property_Definition_Found__yes> => {
                                                                    switch ($[0]) {
                                                                        case 'no': return pt.ss($, ($) => pt.optional.literal.not_set())
                                                                        case 'yes': return pt.ss($, ($) => pt.optional.literal.set($))
                                                                        default: return pt.au($[0])
                                                                    }
                                                                }))
                                                            ).group(
                                                                ($) => $.id
                                                            )
                                                            return group_def.__d_map(($, id) => ({
                                                                'definition': $,
                                                                'result': instance_lookup.__get_possible_entry_deprecated(id).__decide(
                                                                    ($): d_out.Property['result'] => pt.decide.list($).has_single_item(
                                                                        ($): d_out.Property['result'] => ['success', $['value']],
                                                                        () => p_unreachable_code_path("definitions are determined based on position. 2 properties cannot have the same position"),
                                                                        (): d_out.Property['result'] => ['error', ['missing', {
                                                                            'start token range': start_token_range
                                                                        }]]
                                                                    ),
                                                                    (): d_out.Property['result'] => ['error', ['missing', {
                                                                        'start token range': start_token_range
                                                                    }]]
                                                                )
                                                            }))
                                                        })
                                                        default: return pt.au($[0])
                                                    }
                                                }),
                                            }
                                        }
                                    })]
                                })
                                case 'list': return pt.ss($, ($) => {
                                    const def = $
                                    return ['list', pt.decide.state(concrete_value, ($) => {
                                        switch ($[0]) {
                                            case 'list': return pt.ss($, ($) => {
                                                return {
                                                    'definition': def,
                                                    'instance': $,
                                                    'derived': {

                                                        'items': $.items.__l_map(($) => Value(
                                                            $.value,
                                                            {
                                                                'definition': def.value,
                                                                'property path': pt.list.literal([]),
                                                                'parent range stack': optional_value_range_stack,
                                                            }
                                                        ))
                                                    }
                                                }
                                            })
                                            default: return abort(['incorrect', ['wrong type', null]])

                                        }
                                    })]
                                })
                                case 'nothing': return pt.ss($, ($): d_out.Unmarshalled_Value => {
                                    const def = $
                                    return ['nothing', {
                                        'definition': def,
                                        'instance': pt.decide.state(concrete_value, ($) => {
                                            switch ($[0]) {
                                                case 'nothing': return pt.ss($, ($) => ['nothing', $])
                                                case 'text': return pt.ss($, ($) => $.token.value === "null"
                                                    ? ['null literal', $]
                                                    : abort(['incorrect', ['wrong type', null]])
                                                )
                                                default: return abort(['incorrect', ['wrong type', null]])
                                            }
                                        })
                                    }]
                                })
                                case 'simple': return pt.ss($, ($): d_out.Unmarshalled_Value => {
                                    const def = $
                                    return ['simple', pt.decide.state(concrete_value, ($) => {
                                        switch ($[0]) {
                                            case 'text': return pt.ss($, ($) => ({
                                                'definition': def,
                                                'value': $.token.value,
                                                'instance': $,
                                            }))
                                            default: return abort(['incorrect', ['wrong type', null]])
                                        }
                                    })]
                                })
                                case 'optional': return pt.ss($, ($): d_out.Unmarshalled_Value => {
                                    const def = $
                                    const instance = pt.decide.state(concrete_value, ($): d_out.Optional_Instance => {
                                        switch ($[0]) {
                                            case 'text': return pt.ss($, ($) => $.token.value === "null"
                                                ? ['null literal', $]
                                                : abort(['incorrect', ['wrong type', null]])
                                            )
                                            case 'list': return pt.ss($, ($) => {
                                                const list = $
                                                return ['list', pt.decide.list($.items).has_first_item(
                                                    ($, rest) => {
                                                        const item_value = $
                                                        return pt.decide.list(rest).has_items(
                                                            ($) => abort(['incorrect', ['wrong type', null]]), // Error: too many items
                                                            () => ({
                                                                'xxx': list,
                                                                'child value': Value(
                                                                    item_value.value,
                                                                    {
                                                                        'definition': def,
                                                                        'property path': pt.list.nested_literal_old([
                                                                            $p['property path'],
                                                                            [
                                                                                ['optional', null]
                                                                            ]
                                                                        ]),
                                                                        'parent range stack': optional_value_range_stack,
                                                                    }
                                                                )
                                                            })
                                                        )
                                                    },
                                                    () => abort(['incorrect', ['wrong type', null]]) // Error: empty list
                                                )]
                                            })
                                            case 'optional': return pt.ss($, ($): d_out.Optional_Instance => ['optional', pt.decide.state($, ($): d_out.Optional_Instance_Optional => {
                                                switch ($[0]) {
                                                    case 'set': return pt.ss($, ($) => ['set', {
                                                        'xxx': $,
                                                        'child value': Value(
                                                            $.value,
                                                            {
                                                                'definition': def,
                                                                'property path': pt.list.nested_literal_old([
                                                                    $p['property path'],
                                                                    [
                                                                        ['optional', null]
                                                                    ]
                                                                ]),
                                                                'parent range stack': optional_value_range_stack,
                                                            }
                                                        )
                                                    }])
                                                    case 'not set': return pt.ss($, ($) => ['not set', $])
                                                    default: return pt.au($[0])
                                                }
                                            })])
                                            default: return abort(['incorrect', ['wrong type', null]])
                                        }
                                    })
                                    return ['optional', {
                                        'definition': def,
                                        'instance': instance,
                                        'derived': pt.decide.state(instance, ($): d_out.Optional['derived'] => {
                                            switch ($[0]) {
                                                case 'list': return pt.ss($, ($) => ({
                                                    'status': ['set', {
                                                        'child value': $['child value']
                                                    }]
                                                }))
                                                case 'optional': return pt.ss($, ($) => pt.decide.state($, ($) => {
                                                    switch ($[0]) {
                                                        case 'set': return pt.ss($, ($) => ({
                                                            'status': ['set', {
                                                                'child value': $['child value']
                                                            }]
                                                        }))
                                                        case 'not set': return pt.ss($, ($) => ({
                                                            'status': ['not set', null]
                                                        }))
                                                        default: return pt.au($[0])
                                                    }
                                                }))
                                                case 'null literal': return pt.ss($, ($) => ({
                                                    'status': ['not set', null]
                                                }))
                                                default: return pt.au($[0])
                                            }
                                        })
                                    }]
                                })
                                case 'reference': return pt.ss($, ($): d_out.Unmarshalled_Value => {
                                    return ['reference', {
                                        'type': pt.decide.state($.type, ($) => {
                                            switch ($[0]) {
                                                case 'derived': return pt.ss($, ($) => {
                                                    return ['derived', {
                                                        'definition': $,
                                                        'intermediate': {
                                                            'instance': pt.decide.state(concrete_value, ($) => {
                                                                switch ($[0]) {
                                                                    case 'nothing': return pt.ss($, ($) => ['nothing', $])
                                                                    case 'text': return pt.ss($, ($) => $.token.value === "null"
                                                                        ? ['null literal', $]
                                                                        : abort(['incorrect', ['wrong type', null]])
                                                                    )
                                                                    default: return abort(['incorrect', ['wrong type', null]])
                                                                }
                                                            }),
                                                        }
                                                    }]
                                                })
                                                case 'selected': return pt.ss($, ($) => {
                                                    const def = $
                                                    return ['selected', pt.decide.state(concrete_value, ($) => {
                                                        switch ($[0]) {
                                                            case 'text': return pt.ss($, ($) => ({
                                                                'definition': def,
                                                                'value': $.token.value,
                                                                'intermediate': {
                                                                    'instance': $,
                                                                }
                                                            }))
                                                            default: return abort(['incorrect', ['wrong type', null]])
                                                        }
                                                    })]
                                                })
                                                default: return pt.au($[0])
                                            }
                                        })
                                    }]
                                })
                                case 'state': return pt.ss($, ($): d_out.Unmarshalled_Value => {
                                    const def = $
                                    const intermediate: d_out.State['intermediate'] = {
                                        'instance': pt.decide.state(concrete_value, ($) => {
                                            switch ($[0]) {
                                                case 'list': return pt.ss($, ($) => {
                                                    const list = $
                                                    return pt.decide.list($.items).has_first_item(
                                                        ($, rest) => {
                                                            const option_value = $.value
                                                            return pt.decide.state($.value.type, ($) => {
                                                                switch ($[0]) {
                                                                    case 'concrete': return pt.ss($, ($) => pt.decide.state($, ($) => {
                                                                        switch ($[0]) {
                                                                            case 'text': return pt.ss($, ($) => {
                                                                                const option_token = $
                                                                                const option_name = $.token.value
                                                                                return pt.decide.list(rest).has_first_item(
                                                                                    ($, rest) => {
                                                                                        const raw_value = $

                                                                                        return pt.decide.list(rest).has_items(
                                                                                            ($) => abort(['incorrect', ['list as state format error', {
                                                                                                'list': list,
                                                                                                'type': ['too many items', null]
                                                                                            }]]),
                                                                                            () => ['list', {
                                                                                                'xxx': list,
                                                                                                'option status': ['set', pt.decide.optional(
                                                                                                    def.options.__get_possible_entry_deprecated(option_name),
                                                                                                    ($): d_out.State_Set => {
                                                                                                        const option_def = $
                                                                                                        return {
                                                                                                            'option': option_name,
                                                                                                            'intermediate': {
                                                                                                                'option token': option_token,
                                                                                                            },
                                                                                                            'definition': option_def,
                                                                                                            'value': Value(
                                                                                                                raw_value.value,
                                                                                                                {
                                                                                                                    'definition': option_def.value,
                                                                                                                    'property path': pt.list.literal([]),
                                                                                                                    'parent range stack': optional_value_range_stack,
                                                                                                                }
                                                                                                            )
                                                                                                        }
                                                                                                    },
                                                                                                    () => abort(['incorrect', ['unknown option', {
                                                                                                        'definition': def,
                                                                                                        'option token': option_token,
                                                                                                    }]])
                                                                                                )],
                                                                                            }]
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
                                                case 'state': return pt.ss($, ($) => ['state', {
                                                    'xxx': $,
                                                    'option status': pt.decide.state($.status, ($): d_out.State_Option => {
                                                        switch ($[0]) {
                                                            case 'missing': return pt.ss($, ($) => ['missing data', { 'intermediate': $['#'] }])
                                                            case 'set': return pt.ss($, ($): d_out.State_Option => {
                                                                const value = $.value
                                                                const option_name = $.option.token.value
                                                                const option_token = $.option
                                                                return ['set', pt.decide.optional(
                                                                    def.options.__get_possible_entry_deprecated(option_name),
                                                                    ($): d_out.State_Set => ({
                                                                        'intermediate': {
                                                                            'option token': option_token,
                                                                        },
                                                                        'option': option_name,
                                                                        'definition': $,
                                                                        'value': Value(
                                                                            value,
                                                                            {
                                                                                'definition': $.value,
                                                                                'property path': pt.list.nested_literal_old([
                                                                                    $p['property path'],
                                                                                    [
                                                                                        ['state', option_name]
                                                                                    ]
                                                                                ]),
                                                                                'parent range stack': optional_value_range_stack,
                                                                            }
                                                                        )
                                                                    }),
                                                                    () => abort(['incorrect', ['unknown option', {
                                                                        'definition': def,
                                                                        'option token': $.option
                                                                    }]])
                                                                )]
                                                            })
                                                            default: return pt.au($[0])
                                                        }
                                                    })
                                                }])
                                                default: return abort(['incorrect', ['wrong type', null]])
                                            }
                                        })
                                    }
                                    return ['state', {
                                        'definition': def,
                                        'parent range stack': value_range_stack,
                                        'property pathx': $p['property path'],
                                        'intermediate': intermediate,
                                        'derived': {
                                            'option status': pt.decide.state(intermediate.instance, ($) => {
                                                switch ($[0]) {
                                                    case 'list': return pt.ss($, ($) => $['option status'])
                                                    case 'state': return pt.ss($, ($) => $['option status'])
                                                    default: return pt.au($[0])
                                                }
                                            })
                                        }
                                    }]
                                })
                                case 'text': return pt.ss($, ($) => {
                                    const def = $
                                    return ['text', pt.decide.state(concrete_value, ($) => {
                                        switch ($[0]) {
                                            case 'text': return pt.ss($, ($) => ({
                                                'definition': def,
                                                'value': $.token.value,
                                                'instance': $,
                                            }))
                                            default: return abort(['incorrect', ['wrong type', null]])
                                        }
                                    })]
                                })
                                default: return pt.au($[0])
                            }
                        })
                    ).__extract_data<d_out.Value['unmarshall result']>(
                        ($) => ['success', $],
                        ($) => ['error', ['incorrect', ['wrong type', null]]],
                    ),
                    'optional parent range stack': $p['parent range stack']
                }
            })
            case 'include': return pt.ss($, ($) => p_implement_me("include node deserialization")) //TODO
            case 'missing': return pt.ss($, ($): d_out.Value => {
                return {
                    'definition': $p.definition,
                    'property path': $p['property path'],
                    'instance': value,
                    'unmarshall result': ['error', ['missing', null]],
                    'optional parent range stack': $p['parent range stack'],
                }
            }) //TODO
            default: return pt.au($[0])
        }
    })
}
