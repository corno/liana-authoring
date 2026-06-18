import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'
import * as p_di from 'pareto-core/dist/interface/data'
import p_implement_me from 'pareto-core-dev/dist/implement_me'
import p_unreachable_code_path from 'pareto-core/dist/implementation/specials/unreachable_code_path'
import p_create_refinement_context from 'pareto-core/dist/implementation/__internal/sync/create_refinement_context'

//data types
import * as d_in from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"
import * as d_out from "../../../../interface/data/unmarshall_result"
import * as d_function from "../../../../interface/data/unmarshall_result_from_astn_parse_tree"
import * as d_in_definition from "pareto-liana/dist/interface/generated/liana/schemas/schema/data/resolved"

//dependencies
import * as t_parse_tree_to_full_location from "astn-core/dist/implementation/manual/transformers/parse_tree/full_value_range"
import * as t_parse_tree_to_start_token_location from "astn-core/dist/implementation/manual/transformers/parse_tree/start_token_range"

export type Document = p_i.Transformer_With_Parameter<
    d_in.Document,
    d_out.Document,
    d_function.Parameters
>

export type Value = p_i.Transformer_With_Parameter<
    d_in.Value,
    d_out.Value,
    {
        'definition': d_in_definition.Value
        'property path': d_out.Property_Path
        'parent range stack': p_di.Optional_Value<d_out.Range_Stack>
    }
>

export const Document: Document = ($, $p) => ({
    'header': p_.from.optional($['header']).map(($) => $.value),
    'content': Value(
        $.content,
        {
            'definition': $p.definition['root value'],
            'property path': $p['property path'],
            'parent range stack': p_.literal.not_set()
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
    const optional_value_range_stack = p_.literal.set(value_range_stack)
    return p_.from.state($.type).decide(($): d_out.Value => {
        switch ($[0]) {
            case 'concrete': return p_.ss($, ($): d_out.Value => {
                const concrete_value = $
                return {
                    'definition': $p.definition,
                    'property path': $p['property path'],
                    'instance': value,
                    'unmarshall result': p_create_refinement_context<d_out.Unmarshalled_Value, d_out.Value_Unmarshall_Error>(
                        (abort) => p_.from.state($p.definition).decide(($): d_out.Unmarshalled_Value => {
                            switch ($[0]) {
                                case 'component': return p_.ss($, ($): d_out.Unmarshalled_Value => ['component', {
                                    'definition': $,
                                    'value': Value(
                                        value,
                                        {
                                            'definition': p_.from.state($.type).decide(($) => {
                                                switch ($[0]) {
                                                    case 'external': return p_.ss($, ($) => $.module['l entry']['root value'])
                                                    case 'internal acyclic': return p_.ss($, ($) => $['l entry']['root value'])
                                                    case 'internal': return p_.ss($, ($) => $['l entry'].get_circular_dependent()['root value'])
                                                    default: return p_.au($[0])
                                                }
                                            }),
                                            'property path': $p['property path'],
                                            'parent range stack': p_.literal.set(value_range_stack),
                                        }
                                    )
                                }])
                                case 'dictionary': return p_.ss($, ($): d_out.Unmarshalled_Value => {
                                    const dict_def = $
                                    return ['dictionary', p_.from.state(concrete_value).decide(($): d_out.Dictionary => {
                                        switch ($[0]) {
                                            case 'dictionary': return p_.ss($, ($): d_out.Dictionary => {
                                                const entries = $.entries.__l_map_deprecated(($): d_out.Entry => {
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
                                                                        'property path': p_.literal.list([]),
                                                                        'parent range stack': p_.literal.set({
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
                                                        'entries': p_.from.list(entries).group(
                                                            ($) => $.intermediate['id value pair'].id.token.value,

                                                        ).__d_map_deprecated(($) => {
                                                            return {
                                                                'result': p_.from.list($).on_has_single_item(
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
                                case 'group': return p_.ss($, ($): d_out.Unmarshalled_Value => {
                                    const group_def = $
                                    const Concise_Properties = (
                                        $: d_in.Items
                                    ): d_out.Concise_Properties => p_.from.list(
                                        $
                                    ).join(
                                        p_.from.dictionary(
                                            group_def
                                        ).convert_to_list(
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
                                                                'property path': p_.literal.nested_list([
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
                                        return $.__l_map_deprecated(($) => {
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
                                                                ($) => p_.from.optional($.value).map(
                                                                    ($) => Value(
                                                                        $,
                                                                        {
                                                                            'definition': prop_def.value,
                                                                            'property path': p_.literal.nested_list([
                                                                                $p['property path'],
                                                                                [
                                                                                    ['group', id_value_pair.id.token.value]
                                                                                ]
                                                                            ]),
                                                                            'parent range stack': p_.literal.set({
                                                                                'range': t_parse_tree_to_full_location.ID_Value_Pair(id_value_pair),
                                                                                'parent': optional_value_range_stack,
                                                                            }),
                                                                        }
                                                                    )
                                                                ),
                                                                () => p_.literal.not_set()
                                                            )
                                                        }]
                                                    },
                                                    () => ['no', null]
                                                ),
                                                'parent range stack': value_range_stack,
                                            }
                                        })
                                    }
                                    return ['group', p_.from.state(concrete_value).decide(($): d_out.Group => {
                                        const instance: d_out.Group['intermediate']['instance'] = p_.from.state($).decide(($) => {
                                            switch ($[0]) {
                                                case 'dictionary': return p_.ss($, ($) => ['dictionary', {
                                                    'dummy': null,
                                                    'properties': Verbose_Properties($.entries)
                                                }])
                                                case 'group': return p_.ss($, ($) => ['group', {
                                                    'dummy': null,
                                                    'type': p_.from.state($).decide(($): d_out.Group_Type => {
                                                        switch ($[0]) {
                                                            case 'concise': return p_.ss($, ($) => ['concise', {
                                                                'properties': Concise_Properties($.properties)
                                                            }])
                                                            case 'verbose': return p_.ss($, ($) => ['verbose', {
                                                                'properties': Verbose_Properties($.properties)
                                                            }])
                                                            default: return p_.au($[0])
                                                        }
                                                    })
                                                }])
                                                case 'list': return p_.ss($, ($) => ['list', {
                                                    'dummy': null,
                                                    'properties': Concise_Properties($.items)
                                                }])
                                                default: return abort(['incorrect', ['wrong type', null]])
                                            }
                                        })
                                        const group_type: d_out.Group_Type = p_.from.state(instance).decide(($): d_out.Group_Type => {
                                            switch ($[0]) {
                                                case 'dictionary': return p_.ss($, ($) => ['verbose', {
                                                    'properties': $.properties
                                                }])
                                                case 'group': return p_.ss($, ($) => $.type)
                                                case 'list': return p_.ss($, ($) => ['concise', {
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
                                                'properties': p_.from.state(group_type).decide(($): d_out.Group['derived']['properties'] => {
                                                    switch ($[0]) {
                                                        case 'verbose': return p_.ss($, ($) => {
                                                            const instance_lookup = p_.from.list($.properties).group(
                                                                ($) => $.intermediate['id value pair'].id.token.value
                                                            )
                                                            return group_def.__d_map_deprecated(($, id) => ({
                                                                'definition': $,
                                                                'result': instance_lookup.__get_possible_entry_deprecated(id).__decide(
                                                                    ($): d_out.Property['result'] => p_.from.list($).on_has_single_item(
                                                                        ($): d_out.Property['result'] => p_.from.state($['definition found']).decide(($) => {
                                                                            switch ($[0]) {
                                                                                case 'yes': return p_.ss($, ($): d_out.Property['result'] => $['value'].__decide(
                                                                                    ($): d_out.Property['result'] => ['success', $],
                                                                                    (): d_out.Property['result'] => ['error', ['missing', {
                                                                                        'start token range': start_token_range
                                                                                    }]]
                                                                                ))
                                                                                case 'no': return p_.ss($, () => p_unreachable_code_path("we are iterating over the definitions"))
                                                                                default: return p_.au($[0])
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
                                                        case 'concise': return p_.ss($, ($) => {
                                                            const instance_lookup = p_.from.list(
                                                                p_.from.list(
                                                                    $.properties
                                                                ).map_optionally(($) => p_.from.state($['definition found']).decide(($): p_di.Optional_Value<d_out.Concise_Property_Definition_Found__yes> => {
                                                                    switch ($[0]) {
                                                                        case 'no': return p_.ss($, ($) => p_.literal.not_set())
                                                                        case 'yes': return p_.ss($, ($) => p_.literal.set($))
                                                                        default: return p_.au($[0])
                                                                    }
                                                                }))
                                                            ).group(
                                                                ($) => $.id
                                                            )
                                                            return group_def.__d_map_deprecated(($, id) => ({
                                                                'definition': $,
                                                                'result': instance_lookup.__get_possible_entry_deprecated(id).__decide(
                                                                    ($): d_out.Property['result'] => p_.from.list($).on_has_single_item(
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
                                                        default: return p_.au($[0])
                                                    }
                                                }),
                                            }
                                        }
                                    })]
                                })
                                case 'list': return p_.ss($, ($) => {
                                    const def = $
                                    return ['list', p_.from.state(concrete_value).decide(($) => {
                                        switch ($[0]) {
                                            case 'list': return p_.ss($, ($) => {
                                                return {
                                                    'definition': def,
                                                    'instance': $,
                                                    'derived': {

                                                        'items': $.items.__l_map_deprecated(($) => Value(
                                                            $.value,
                                                            {
                                                                'definition': def.value,
                                                                'property path': p_.literal.list([]),
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
                                case 'nothing': return p_.ss($, ($): d_out.Unmarshalled_Value => {
                                    const def = $
                                    return ['nothing', {
                                        'definition': def,
                                        'instance': p_.from.state(concrete_value).decide(($) => {
                                            switch ($[0]) {
                                                case 'nothing': return p_.ss($, ($) => ['nothing', $])
                                                case 'text': return p_.ss($, ($) => $.token.value === "null"
                                                    ? ['null literal', $]
                                                    : abort(['incorrect', ['wrong type', null]])
                                                )
                                                default: return abort(['incorrect', ['wrong type', null]])
                                            }
                                        })
                                    }]
                                })
                                case 'simple': return p_.ss($, ($): d_out.Unmarshalled_Value => {
                                    const def = $
                                    return ['simple', p_.from.state(concrete_value).decide(($) => {
                                        switch ($[0]) {
                                            case 'text': return p_.ss($, ($) => ({
                                                'definition': def,
                                                'value': $.token.value,
                                                'instance': $,
                                            }))
                                            default: return abort(['incorrect', ['wrong type', null]])
                                        }
                                    })]
                                })
                                case 'optional': return p_.ss($, ($): d_out.Unmarshalled_Value => {
                                    const def = $
                                    const instance = p_.from.state(concrete_value).decide(($): d_out.Optional_Instance => {
                                        switch ($[0]) {
                                            case 'text': return p_.ss($, ($) => $.token.value === "null"
                                                ? ['null literal', $]
                                                : abort(['incorrect', ['wrong type', null]])
                                            )
                                            case 'list': return p_.ss($, ($) => {
                                                const list = $
                                                return ['list', p_.from.list($.items).on_has_first_item(
                                                    ($, rest) => {
                                                        const item_value = $
                                                        return p_.from.list(rest).on_has_items(
                                                            ($) => abort(['incorrect', ['wrong type', null]]), // Error: too many items
                                                            () => ({
                                                                'xxx': list,
                                                                'child value': Value(
                                                                    item_value.value,
                                                                    {
                                                                        'definition': def,
                                                                        'property path': p_.literal.nested_list([
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
                                            case 'optional': return p_.ss($, ($): d_out.Optional_Instance => ['optional', p_.from.state($).decide(($): d_out.Optional_Instance_Optional => {
                                                switch ($[0]) {
                                                    case 'set': return p_.ss($, ($) => ['set', {
                                                        'xxx': $,
                                                        'child value': Value(
                                                            $.value,
                                                            {
                                                                'definition': def,
                                                                'property path': p_.literal.nested_list([
                                                                    $p['property path'],
                                                                    [
                                                                        ['optional', null]
                                                                    ]
                                                                ]),
                                                                'parent range stack': optional_value_range_stack,
                                                            }
                                                        )
                                                    }])
                                                    case 'not set': return p_.ss($, ($) => ['not set', $])
                                                    default: return p_.au($[0])
                                                }
                                            })])
                                            default: return abort(['incorrect', ['wrong type', null]])
                                        }
                                    })
                                    return ['optional', {
                                        'definition': def,
                                        'instance': instance,
                                        'derived': p_.from.state(instance).decide(($): d_out.Optional['derived'] => {
                                            switch ($[0]) {
                                                case 'list': return p_.ss($, ($) => ({
                                                    'status': ['set', {
                                                        'child value': $['child value']
                                                    }]
                                                }))
                                                case 'optional': return p_.ss($, ($) => p_.from.state($).decide(($) => {
                                                    switch ($[0]) {
                                                        case 'set': return p_.ss($, ($) => ({
                                                            'status': ['set', {
                                                                'child value': $['child value']
                                                            }]
                                                        }))
                                                        case 'not set': return p_.ss($, ($) => ({
                                                            'status': ['not set', null]
                                                        }))
                                                        default: return p_.au($[0])
                                                    }
                                                }))
                                                case 'null literal': return p_.ss($, ($) => ({
                                                    'status': ['not set', null]
                                                }))
                                                default: return p_.au($[0])
                                            }
                                        })
                                    }]
                                })
                                case 'reference': return p_.ss($, ($): d_out.Unmarshalled_Value => {
                                    return ['reference', {
                                        'type': p_.from.state($.type).decide(($) => {
                                            switch ($[0]) {
                                                case 'derived': return p_.ss($, ($) => {
                                                    return ['derived', {
                                                        'definition': $,
                                                        'intermediate': {
                                                            'instance': p_.from.state(concrete_value).decide(($) => {
                                                                switch ($[0]) {
                                                                    case 'nothing': return p_.ss($, ($) => ['nothing', $])
                                                                    case 'text': return p_.ss($, ($) => $.token.value === "null"
                                                                        ? ['null literal', $]
                                                                        : abort(['incorrect', ['wrong type', null]])
                                                                    )
                                                                    default: return abort(['incorrect', ['wrong type', null]])
                                                                }
                                                            }),
                                                        }
                                                    }]
                                                })
                                                case 'selected': return p_.ss($, ($) => {
                                                    const def = $
                                                    return ['selected', p_.from.state(concrete_value).decide(($) => {
                                                        switch ($[0]) {
                                                            case 'text': return p_.ss($, ($) => ({
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
                                                default: return p_.au($[0])
                                            }
                                        })
                                    }]
                                })
                                case 'state': return p_.ss($, ($): d_out.Unmarshalled_Value => {
                                    const def = $
                                    const intermediate: d_out.State['intermediate'] = {
                                        'instance': p_.from.state(concrete_value).decide(($) => {
                                            switch ($[0]) {
                                                case 'list': return p_.ss($, ($) => {
                                                    const list = $
                                                    return p_.from.list($.items).on_has_first_item(
                                                        ($, rest) => {
                                                            const option_value = $.value
                                                            return p_.from.state($.value.type).decide(($) => {
                                                                switch ($[0]) {
                                                                    case 'concrete': return p_.ss($, ($) => p_.from.state($).decide(($) => {
                                                                        switch ($[0]) {
                                                                            case 'text': return p_.ss($, ($) => {
                                                                                const option_token = $
                                                                                const option_name = $.token.value
                                                                                return p_.from.list(rest).on_has_first_item(
                                                                                    ($, rest) => {
                                                                                        const raw_value = $

                                                                                        return p_.from.list(rest).on_has_items(
                                                                                            ($) => abort(['incorrect', ['list as state format error', {
                                                                                                'list': list,
                                                                                                'type': ['too many items', null]
                                                                                            }]]),
                                                                                            () => ['list', {
                                                                                                'xxx': list,
                                                                                                'option status': ['set', p_.from.optional(
                                                                                                    def.options.__get_possible_entry_deprecated(option_name),
                                                                                                ).decide(
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
                                                                                                                    'property path': p_.literal.list([]),
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
                                                case 'state': return p_.ss($, ($) => ['state', {
                                                    'xxx': $,
                                                    'option status': p_.from.state($.status).decide(($): d_out.State_Option => {
                                                        switch ($[0]) {
                                                            case 'missing': return p_.ss($, ($) => ['missing data', { 'intermediate': $['#'] }])
                                                            case 'set': return p_.ss($, ($): d_out.State_Option => {
                                                                const value = $.value
                                                                const option_name = $.option.token.value
                                                                const option_token = $.option
                                                                return ['set', p_.from.optional(
                                                                    def.options.__get_possible_entry_deprecated(option_name),
                                                                ).decide(
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
                                                                                'property path': p_.literal.nested_list([
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
                                                            default: return p_.au($[0])
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
                                            'option status': p_.from.state(intermediate.instance).decide(($) => {
                                                switch ($[0]) {
                                                    case 'list': return p_.ss($, ($) => $['option status'])
                                                    case 'state': return p_.ss($, ($) => $['option status'])
                                                    default: return p_.au($[0])
                                                }
                                            })
                                        }
                                    }]
                                })
                                case 'text': return p_.ss($, ($) => {
                                    const def = $
                                    return ['text', p_.from.state(concrete_value).decide(($) => {
                                        switch ($[0]) {
                                            case 'text': return p_.ss($, ($) => ({
                                                'definition': def,
                                                'value': $.token.value,
                                                'instance': $,
                                            }))
                                            default: return abort(['incorrect', ['wrong type', null]])
                                        }
                                    })]
                                })
                                default: return p_.au($[0])
                            }
                        })
                    ).__extract_data<d_out.Value['unmarshall result']>(
                        ($) => ['success', $],
                        ($) => ['error', ['incorrect', ['wrong type', null]]],
                    ),
                    'optional parent range stack': $p['parent range stack']
                }
            })
            case 'include': return p_.ss($, ($) => p_implement_me("include node deserialization")) //TODO
            case 'missing': return p_.ss($, ($): d_out.Value => {
                return {
                    'definition': $p.definition,
                    'property path': $p['property path'],
                    'instance': value,
                    'unmarshall result': ['error', ['missing', null]],
                    'optional parent range stack': $p['parent range stack'],
                }
            }) //TODO
            default: return p_.au($[0])
        }
    })
}
