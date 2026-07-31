import * as p_ from 'pareto-core/implementation/transformer'
import type * as p_di from 'pareto-core/interface/data'
import p_implement_me from 'pareto-core-dev/implement_me'
import p_unreachable_code_path from 'pareto-core/implementation/transformer/specials/unreachable_code_path'
import p_create_refinement_context from 'pareto-core/implementation/__internal/sync/create_refinement_context'

//schemas
import type * as s_in from "astn-core/modules/deserialization/schemas/parse_tree/schema"
import type * as s_out from "../../../schemas/unmarshall_result.js"

import type * as s_function from "../../../schemas/unmarshall_result_from_astn_parse_tree.js"
import type * as s_in_definition from "pareto-liana/modules/schema.generated/schemas/resolved/schema"



export type Document = p_.Transformer_With_Parameter<
    s_in.Document,
    s_out.Document,
    s_function.Parameters
>

export type Value = p_.Transformer_With_Parameter<
    s_in.Value,
    s_out.Value,
    {
        'definition': s_in_definition.Value
        'property path': s_out.Property_Path
        'parent range stack': p_di.Optional_Value<s_out.Range_Stack>
    }
>



//dependencies
import * as t_parse_tree_to_full_value_location from "astn-core/modules/deserialization/schemas/parse_tree/transformers/full_value_range"

import * as t_parse_tree_to_start_token_location from "astn-core/modules/deserialization/schemas/parse_tree/transformers/start_token_range"

export const Document: Document = ($, $p) => ({
    'header': p_.from.optional($['header']).map(
        ($) => $.value),
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
    const value_range_stack: s_out.Range_Stack = {
        'range': t_parse_tree_to_full_value_location.Value($),
        'parent': $p['parent range stack']
    }
    const start_token_range = t_parse_tree_to_start_token_location.Value($)
    const optional_value_range_stack = p_.literal.set(value_range_stack)
    return p_.from.state($.type).decide(
        ($) => {
            switch ($[0]) {
                case 'concrete': return p_.option($, ($) => {
                    const $v_concrete_value = $
                    return {
                        'definition': $p.definition,
                        'property path': $p['property path'],
                        'instance': value,
                        'unmarshall result': p_create_refinement_context<s_out.Unmarshalled_Value, s_out.Value_Unmarshall_Error>(
                            (abort) => p_.from.state($p.definition).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'component': return p_.option($, ($) => ['component', {
                                            'definition': $,
                                            'value': Value(
                                                value,
                                                {
                                                    'definition': p_.from.state($.type).decide(
                                                        ($) => {
                                                            switch ($[0]) {
                                                                case 'external': return p_.option($, ($) => $.module['l entry']['root value'])
                                                                case 'internal acyclic': return p_.option($, ($) => $['l entry']['root value'])
                                                                case 'internal': return p_.option($, ($) => $['l entry'].get_circular_dependent()['root value'])
                                                                default: return p_.exhaustive($[0])
                                                            }
                                                        }),
                                                    'property path': $p['property path'],
                                                    'parent range stack': p_.literal.set(value_range_stack),
                                                }
                                            )
                                        }])
                                        case 'dictionary': return p_.option($, ($): s_out.Unmarshalled_Value => {
                                            const dict_def = $
                                            return ['dictionary', p_.from.state($v_concrete_value).decide(
                                                ($): s_out.Dictionary => {
                                                    switch ($[0]) {
                                                        case 'dictionary': return p_.option($, ($): s_out.Dictionary => {
                                                            const $_entries = p_.from.list($.entries).map(
                                                                ($): s_out.Entry => {
                                                                    const entry = $
                                                                    return {
                                                                        'definition': dict_def,
                                                                        'property path': $p['property path'],
                                                                        'id': $.id.token.value,
                                                                        'value': p_.from.optional($.assignment).decide(
                                                                            ($): s_out.Entry['value'] => p_.from.optional($.value).decide(
                                                                                ($): s_out.Entry['value'] => ['set', Value(
                                                                                    $,
                                                                                    {
                                                                                        'definition': dict_def.value,
                                                                                        'property path': p_.literal.list([]),
                                                                                        'parent range stack': p_.literal.set({
                                                                                            'range': t_parse_tree_to_full_value_location.ID_Value_Pair(entry),
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
                                                                    'entries as list': $_entries,
                                                                },
                                                                'derived': {
                                                                    'entries': p_.from.list($_entries).group(
                                                                        ($) => $.intermediate['id value pair'].id.token.value,
                                                                        ($) => ({
                                                                            'result': p_.from.list($).on_has_single_item(
                                                                                ($): s_out.Entry_Unmarshall_Result => ['success', $],
                                                                                ($): s_out.Entry_Unmarshall_Result => ['error', ['duplicate', {
                                                                                    'instances': $
                                                                                }]],
                                                                                (): s_out.Entry_Unmarshall_Result => p_unreachable_code_path("we are grouping by id, so there cannot be no entries having this id")
                                                                            )
                                                                        })
                                                                    )
                                                                }
                                                            }
                                                        })
                                                        default: return abort(['incorrect', ['wrong type', null]])
                                                    }
                                                })]
                                        })
                                        case 'group': return p_.option($, ($): s_out.Unmarshalled_Value => {
                                            const $_group_def = $
                                            const Concise_Properties = (
                                                $: s_in.Items
                                            ): s_out.Concise_Properties => p_.from.list($).join(
                                                p_.from.dictionary($_group_def).convert_to_list(
                                                    ($, id) => ({
                                                        'id': id,
                                                        'definition': $
                                                    })
                                                ),
                                                ($, $o): s_out.Concise_Property => {
                                                    const instance = $
                                                    return {
                                                        'item': $,
                                                        'definition found': p_.from.optional($o).decide(
                                                            ($): s_out.Concise_Property_Definition_Found => ['yes', {
                                                                'definition': $.definition,
                                                                'id': $.id,
                                                                'value': Value(
                                                                    instance.value,
                                                                    {
                                                                        'definition': $.definition.value,
                                                                        'property path': p_.literal.chain(
                                                                            $p['property path'],
                                                                            ['group', $.id]
                                                                        ),
                                                                        'parent range stack': optional_value_range_stack,
                                                                    }
                                                                )
                                                            }],
                                                            (): s_out.Concise_Property_Definition_Found => ['no', {
                                                                'item': instance
                                                            }]
                                                        ),
                                                        'parent range stack': value_range_stack,
                                                    }
                                                }
                                            )
                                            const Verbose_Properties = ($: s_in.ID_Value_Pairs): s_out.Verbose_Properties => {
                                                return p_.from.list($).map(
                                                    ($) => {
                                                        const id_value_pair = $
                                                        return {
                                                            'id': $.id.token.value,
                                                            'intermediate': {
                                                                'id value pair': $,
                                                            },
                                                            'definition found': p_.from.dictionary($_group_def).get_possible_entry(
                                                                $.id.token.value,
                                                                ($): s_out.Verbose_Property_Definition_Found => {
                                                                    const prop_def = $
                                                                    return ['yes', {
                                                                        'definition': $,
                                                                        'value': p_.from.optional(id_value_pair.assignment).decide(
                                                                            ($) => p_.from.optional($.value).map(
                                                                                ($) => Value(
                                                                                    $,
                                                                                    {
                                                                                        'definition': prop_def.value,
                                                                                        'property path': p_.literal.chain(
                                                                                            $p['property path'],
                                                                                            ['group', id_value_pair.id.token.value]
                                                                                        ),
                                                                                        'parent range stack': p_.literal.set({
                                                                                            'range': t_parse_tree_to_full_value_location.ID_Value_Pair(id_value_pair),
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
                                            return ['group', p_.from.state($v_concrete_value).decide(
                                                ($): s_out.Group => {
                                                    const instance: s_out.Group['intermediate']['instance'] = p_.from.state($).decide(
                                                        ($) => {
                                                            switch ($[0]) {
                                                                case 'dictionary': return p_.option($, ($) => ['dictionary', {
                                                                    'dummy': null,
                                                                    'properties': Verbose_Properties($.entries)
                                                                }])
                                                                case 'group': return p_.option($, ($) => ['group', {
                                                                    'dummy': null,
                                                                    'type': p_.from.state($).decide(
                                                                        ($): s_out.Group_Type => {
                                                                            switch ($[0]) {
                                                                                case 'concise': return p_.option($, ($) => ['concise', {
                                                                                    'properties': Concise_Properties($.properties)
                                                                                }])
                                                                                case 'verbose': return p_.option($, ($) => ['verbose', {
                                                                                    'properties': Verbose_Properties($.properties)
                                                                                }])
                                                                                default: return p_.exhaustive($[0])
                                                                            }
                                                                        })
                                                                }])
                                                                case 'list': return p_.option($, ($) => ['list', {
                                                                    'dummy': null,
                                                                    'properties': Concise_Properties($.items)
                                                                }])
                                                                default: return abort(['incorrect', ['wrong type', null]])
                                                            }
                                                        })
                                                    const group_type: s_out.Group_Type = p_.from.state(instance).decide(
                                                        ($): s_out.Group_Type => {
                                                            switch ($[0]) {
                                                                case 'dictionary': return p_.option($, ($) => ['verbose', {
                                                                    'properties': $.properties
                                                                }])
                                                                case 'group': return p_.option($, ($) => $.type)
                                                                case 'list': return p_.option($, ($) => ['concise', {
                                                                    'properties': $.properties
                                                                }])
                                                                default: return abort(['incorrect', ['wrong type', null]])
                                                            }
                                                        })
                                                    return {
                                                        'definition': $_group_def,
                                                        'intermediate': {
                                                            'instance': instance,
                                                        },
                                                        'derived': {
                                                            'style': group_type,
                                                            'properties': p_.from.state(group_type).decide(
                                                                ($): s_out.Group['derived']['properties'] => {
                                                                    switch ($[0]) {
                                                                        case 'verbose': return p_.option($, ($) => {
                                                                            const $v_instance_lookup = p_.from.list($.properties).group(
                                                                                ($) => $.intermediate['id value pair'].id.token.value,
                                                                                ($) => $
                                                                            )
                                                                            return p_.from.dictionary($_group_def).map(
                                                                                ($, id) => ({
                                                                                    'definition': $,
                                                                                    'result': p_.from.dictionary($v_instance_lookup).get_possible_entry(
                                                                                        id,
                                                                                        ($): s_out.Property['result'] => p_.from.list($).on_has_single_item(
                                                                                            ($): s_out.Property['result'] => p_.from.state($['definition found']).decide(
                                                                                                ($) => {
                                                                                                    switch ($[0]) {
                                                                                                        case 'yes': return p_.option($, ($): s_out.Property['result'] => p_.from.optional($['value']).decide(
                                                                                                            ($): s_out.Property['result'] => ['success', $],
                                                                                                            (): s_out.Property['result'] => ['error', ['missing', {
                                                                                                                'start token range': start_token_range
                                                                                                            }]]
                                                                                                        ))
                                                                                                        case 'no': return p_.option($, () => p_unreachable_code_path("we are iterating over the definitions"))
                                                                                                        default: return p_.exhaustive($[0])
                                                                                                    }
                                                                                                }),
                                                                                            ($): s_out.Property['result'] => {
                                                                                                const x: s_out.Property_Unmarshall_Error = ['multiple', {
                                                                                                    'instances': $
                                                                                                }]
                                                                                                return ['error', x]
                                                                                            },
                                                                                            (): s_out.Property['result'] => ['error', ['missing', {
                                                                                                'start token range': start_token_range
                                                                                            }]]
                                                                                        ),
                                                                                        (): s_out.Property['result'] => ['error', ['missing', {
                                                                                            'start token range': start_token_range
                                                                                        }]]
                                                                                    )
                                                                                }))
                                                                        })
                                                                        case 'concise': return p_.option($, ($) => {
                                                                            const $_instance_lookup = p_.from.list(
                                                                                p_.from.list($.properties).map_optionally(
                                                                                    ($) => p_.from.state($['definition found']).decide(
                                                                                        ($): p_di.Optional_Value<s_out.Concise_Property_Definition_Found__yes> => {
                                                                                            switch ($[0]) {
                                                                                                case 'no': return p_.option($, ($) => p_.literal.not_set())
                                                                                                case 'yes': return p_.option($, ($) => p_.literal.set($))
                                                                                                default: return p_.exhaustive($[0])
                                                                                            }
                                                                                        }))
                                                                            ).group(
                                                                                ($) => $.id,
                                                                                ($) => $
                                                                            )
                                                                            return p_.from.dictionary($_group_def).map(
                                                                                ($, id) => ({
                                                                                    'definition': $,
                                                                                    'result': p_.from.dictionary($_instance_lookup).get_possible_entry(
                                                                                        id,
                                                                                        ($): s_out.Property['result'] => p_.from.list($).on_has_single_item(
                                                                                            ($): s_out.Property['result'] => ['success', $['value']],
                                                                                            () => p_unreachable_code_path("definitions are determined based on position. 2 properties cannot have the same position"),
                                                                                            (): s_out.Property['result'] => ['error', ['missing', {
                                                                                                'start token range': start_token_range
                                                                                            }]]
                                                                                        ),
                                                                                        (): s_out.Property['result'] => ['error', ['missing', {
                                                                                            'start token range': start_token_range
                                                                                        }]]
                                                                                    )
                                                                                }))
                                                                        })
                                                                        default: return p_.exhaustive($[0])
                                                                    }
                                                                }),
                                                        }
                                                    }
                                                })]
                                        })
                                        case 'list': return p_.option($, ($) => {
                                            const def = $
                                            return ['list', p_.from.state($v_concrete_value).decide(
                                                ($) => {
                                                    switch ($[0]) {
                                                        case 'list': return p_.option($, ($) => {
                                                            return {
                                                                'definition': def,
                                                                'instance': $,
                                                                'derived': {

                                                                    'items': p_.from.list($.items).map(
                                                                        ($) => Value(
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
                                        case 'nothing': return p_.option($, ($): s_out.Unmarshalled_Value => {
                                            const def = $
                                            return ['nothing', {
                                                'definition': def,
                                                'instance': p_.from.state($v_concrete_value).decide(
                                                    ($) => {
                                                        switch ($[0]) {
                                                            case 'nothing': return p_.option($, ($) => ['nothing', $])
                                                            case 'text': return p_.option($, ($) => $.token.value === "null"
                                                                ? ['null literal', $]
                                                                : abort(['incorrect', ['wrong type', null]])
                                                            )
                                                            default: return abort(['incorrect', ['wrong type', null]])
                                                        }
                                                    })
                                            }]
                                        })
                                        case 'simple': return p_.option($, ($): s_out.Unmarshalled_Value => {
                                            const def = $
                                            return ['simple', p_.from.state($v_concrete_value).decide(
                                                ($) => {
                                                    switch ($[0]) {
                                                        case 'text': return p_.option($, ($) => ({
                                                            'definition': def,
                                                            'value': $.token.value,
                                                            'instance': $,
                                                        }))
                                                        default: return abort(['incorrect', ['wrong type', null]])
                                                    }
                                                })]
                                        })
                                        case 'optional': return p_.option($, ($): s_out.Unmarshalled_Value => {
                                            const def = $
                                            const instance = p_.from.state($v_concrete_value).decide(
                                                ($): s_out.Optional_Instance => {
                                                    switch ($[0]) {
                                                        case 'text': return p_.option($, ($) => $.token.value === "null"
                                                            ? ['null literal', $]
                                                            : abort(['incorrect', ['wrong type', null]])
                                                        )
                                                        case 'list': return p_.option($, ($) => {
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
                                                                                    'property path': p_.literal.chain(
                                                                                        $p['property path'],
                                                                                        ['optional', null]
                                                                                    ),
                                                                                    'parent range stack': optional_value_range_stack,
                                                                                }
                                                                            )
                                                                        })
                                                                    )
                                                                },
                                                                () => abort(['incorrect', ['wrong type', null]]) // Error: empty list
                                                            )]
                                                        })
                                                        case 'optional': return p_.option($, ($): s_out.Optional_Instance => ['optional', p_.from.state($).decide(
                                                            ($): s_out.Optional_Instance_Optional => {
                                                                switch ($[0]) {
                                                                    case 'set': return p_.option($, ($) => ['set', {
                                                                        'xxx': $,
                                                                        'child value': Value(
                                                                            $.value,
                                                                            {
                                                                                'definition': def,
                                                                                'property path': p_.literal.chain(
                                                                                    $p['property path'],
                                                                                    ['optional', null]
                                                                                ),
                                                                                'parent range stack': optional_value_range_stack,
                                                                            }
                                                                        )
                                                                    }])
                                                                    case 'not set': return p_.option($, ($) => ['not set', $])
                                                                    default: return p_.exhaustive($[0])
                                                                }
                                                            })])
                                                        default: return abort(['incorrect', ['wrong type', null]])
                                                    }
                                                })
                                            return ['optional', {
                                                'definition': def,
                                                'instance': instance,
                                                'derived': p_.from.state(instance).decide(
                                                    ($): s_out.Optional['derived'] => {
                                                        switch ($[0]) {
                                                            case 'list': return p_.option($, ($) => ({
                                                                'status': ['set', {
                                                                    'child value': $['child value']
                                                                }]
                                                            }))
                                                            case 'optional': return p_.option($, ($) => p_.from.state($).decide(
                                                                ($) => {
                                                                    switch ($[0]) {
                                                                        case 'set': return p_.option($, ($) => ({
                                                                            'status': ['set', {
                                                                                'child value': $['child value']
                                                                            }]
                                                                        }))
                                                                        case 'not set': return p_.option($, ($) => ({
                                                                            'status': ['not set', null]
                                                                        }))
                                                                        default: return p_.exhaustive($[0])
                                                                    }
                                                                }))
                                                            case 'null literal': return p_.option($, ($) => ({
                                                                'status': ['not set', null]
                                                            }))
                                                            default: return p_.exhaustive($[0])
                                                        }
                                                    })
                                            }]
                                        })
                                        case 'reference': return p_.option($, ($): s_out.Unmarshalled_Value => {
                                            return ['reference', {
                                                'type': p_.from.state($.type).decide(
                                                    ($) => {
                                                        switch ($[0]) {
                                                            case 'derived': return p_.option($, ($) => {
                                                                return ['derived', {
                                                                    'definition': $,
                                                                    'intermediate': {
                                                                        'instance': p_.from.state($v_concrete_value).decide(
                                                                            ($) => {
                                                                                switch ($[0]) {
                                                                                    case 'nothing': return p_.option($, ($) => ['nothing', $])
                                                                                    case 'text': return p_.option($, ($) => $.token.value === "null"
                                                                                        ? ['null literal', $]
                                                                                        : abort(['incorrect', ['wrong type', null]])
                                                                                    )
                                                                                    default: return abort(['incorrect', ['wrong type', null]])
                                                                                }
                                                                            }),
                                                                    }
                                                                }]
                                                            })
                                                            case 'selected': return p_.option($, ($) => {
                                                                const def = $
                                                                return ['selected', p_.from.state($v_concrete_value).decide(
                                                                    ($) => {
                                                                        switch ($[0]) {
                                                                            case 'text': return p_.option($, ($) => ({
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
                                                            default: return p_.exhaustive($[0])
                                                        }
                                                    })
                                            }]
                                        })
                                        case 'state': return p_.option($, ($): s_out.Unmarshalled_Value => {
                                            const $v_def = $
                                            const intermediate: s_out.State['intermediate'] = {
                                                'instance': p_.from.state($v_concrete_value).decide(
                                                    ($) => {
                                                        switch ($[0]) {
                                                            //if the state is written in the JSON format; ["state name", ...]
                                                            case 'list': return p_.option($, ($) => {
                                                                const list = $
                                                                return p_.from.list($.items).on_has_first_item(
                                                                    ($, rest) => {
                                                                        const option_value = $.value
                                                                        return p_.from.state($.value.type).decide(
                                                                            ($) => {
                                                                                switch ($[0]) {
                                                                                    case 'concrete': return p_.option($, ($) => p_.from.state($).decide(
                                                                                        ($) => {
                                                                                            switch ($[0]) {
                                                                                                case 'text': return p_.option($, ($) => {
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
                                                                                                                    'option status': ['set', p_.from.dictionary($v_def.options).get_possible_entry(
                                                                                                                        option_name,
                                                                                                                        ($): s_out.State_Set => {
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
                                                                                                                            'definition': $v_def,
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
                                                            case 'state': return p_.option($, ($) => ['state', {
                                                                'xxx': $,
                                                                'option status': p_.from.state($.status).decide(
                                                                    ($): s_out.State_Option => {
                                                                        switch ($[0]) {
                                                                            case 'missing': return p_.option($, ($) => ['missing data', { 'intermediate': $['#'] }])
                                                                            case 'set': return p_.option($, ($): s_out.State_Option => {
                                                                                const value = $.value
                                                                                const option_name = $.option.token.value
                                                                                const option_token = $.option
                                                                                return ['set', p_.from.dictionary($v_def.options).get_possible_entry(
                                                                                    option_name,
                                                                                    ($): s_out.State_Set => ({
                                                                                        'intermediate': {
                                                                                            'option token': option_token,
                                                                                        },
                                                                                        'option': option_name,
                                                                                        'definition': $,
                                                                                        'value': Value(
                                                                                            value,
                                                                                            {
                                                                                                'definition': $.value,
                                                                                                'property path': p_.literal.chain(
                                                                                                    $p['property path'],
                                                                                                    ['state', option_name]
                                                                                                ),
                                                                                                'parent range stack': optional_value_range_stack,
                                                                                            }
                                                                                        )
                                                                                    }),
                                                                                    () => abort(['incorrect', ['unknown option', {
                                                                                        'definition': $v_def,
                                                                                        'option token': $.option
                                                                                    }]])
                                                                                )]
                                                                            })
                                                                            default: return p_.exhaustive($[0])
                                                                        }
                                                                    })
                                                            }])
                                                            default: return abort(['incorrect', ['wrong type', null]])
                                                        }
                                                    })
                                            }
                                            return ['state', {
                                                'definition': $v_def,
                                                'parent range stack': value_range_stack,
                                                'property pathx': $p['property path'],
                                                'intermediate': intermediate,
                                                'derived': {
                                                    'option status': p_.from.state(intermediate.instance).decide(
                                                        ($) => {
                                                            switch ($[0]) {
                                                                case 'list': return p_.option($, ($) => $['option status'])
                                                                case 'state': return p_.option($, ($) => $['option status'])
                                                                default: return p_.exhaustive($[0])
                                                            }
                                                        })
                                                }
                                            }]
                                        })
                                        case 'text': return p_.option($, ($) => {
                                            const def = $
                                            return ['text', p_.from.state($v_concrete_value).decide(
                                                ($) => {
                                                    switch ($[0]) {
                                                        case 'text': return p_.option($, ($) => ({
                                                            'definition': def,
                                                            'value': $.token.value,
                                                            'instance': $,
                                                        }))
                                                        default: return abort(['incorrect', ['wrong type', null]])
                                                    }
                                                })]
                                        })
                                        default: return p_.exhaustive($[0])
                                    }
                                })
                        ).__decide<s_out.Value['unmarshall result']>(
                            ($) => ['success', $],
                            ($) => ['error', $],
                        ),
                        'optional parent range stack': $p['parent range stack']
                    }
                })
                case 'include': return p_.option($, ($) => p_implement_me("include node deserialization")) //TODO
                case 'missing': return p_.option($, ($): s_out.Value => {
                    return {
                        'definition': $p.definition,
                        'property path': $p['property path'],
                        'instance': value,
                        'unmarshall result': ['error', ['missing', null]],
                        'optional parent range stack': $p['parent range stack'],
                    }
                }) //TODO
                default: return p_.exhaustive($[0])
            }
        })
}
