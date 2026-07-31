import type * as p_di from 'pareto-core/interface/data'

import * as p_ from 'pareto-core/implementation/transformer'

//schemas
import type * as s_in from "../../../schemas/unmarshall_result/schema.js"
import type * as s_location from "../../../schemas/location/schema.js"
import type * as s_out from "../../../schemas/found/schema.js"


namespace interface_ {

    export type Document = p_.Transformer_With_Parameter<
        s_in.Document,
        s_out.Found,
        {
            'position': s_location.Position
        }
    >

    // export type Items = p_.Transformer_With_Parameter<
    //     s_in.Items,
    //     Found,
    //     {
    //         'position': s_location.Position
    //     }
    // >

    export type Value = p_.Transformer_With_Parameter<
        s_in.Value,
        s_out.Found,
        {
            'position': s_location.Position
        }
    >

    export type Value_possibly_found = p_.Transformer_With_Parameter<
        s_in.Value,
        p_di.Optional_Value<s_out.Found>,
        {
            'position': s_location.Position
        }
    >
}


//schemas
import type * as s_astn_location from "astn-core/modules/deserialization/schemas/location/schema"

//dependencies
 import * as t_parse_tree_to_full_value_location from "astn-core/modules/deserialization/schemas/parse_tree/transformers/full_value_range"



export const range_overlaps_position = (
    $: s_astn_location.Range,
    $p: {
        'position': s_location.Position

    }
): boolean =>
    (
        $.start.relative.line < $p.position.line
        ||
        ($.start.relative.line === $p.position.line && $.start.relative.column <= $p.position.character)
    )
    &&
    (
        $.end.relative.line > $p.position.line
        ||
        ($.end.relative.line === $p.position.line && $.end.relative.column >= $p.position.character)
    )


export const Document: interface_.Document = ($, $p) => Value($.content, $p)

export const Value_possibly_found: interface_.Value_possibly_found = ($, $p) => {
    return range_overlaps_position(
        t_parse_tree_to_full_value_location.Value($.instance),
        {
            'position': $p.position,
        }
    )
        ? p_.literal.set(Value($, $p))
        : p_.literal.not_set()
}

export const Value: interface_.Value = ($, $p) => {



    const this_value = (
    ): s_out.Found => ['value', $]


    return p_.from.state($['unmarshall result']).decide(
        ($) => {
            switch ($[0]) {
                case 'error': return p_.option($, ($) => this_value())
                case 'success': return p_.option($, ($) => p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'simple': return p_.option($, ($) => this_value())
                            case 'component': return p_.option($, ($) => Value($.value, $p))
                            case 'dictionary': return p_.option($, ($) => p_.from.list($.intermediate['entries as list']).on_has_match(
                                ($): s_out.Possibly_Found => {
                                    const entry = $
                                    return p_.from.boolean(
                                        range_overlaps_position(
                                            {
                                                'start': $.intermediate['id value pair'].id.range.start,
                                                'end': p_.from.state($.value).decide(
                                                    ($) => {
                                                        switch ($[0]) {
                                                            case 'set': return p_.option($, ($) => t_parse_tree_to_full_value_location.Value($.instance).end)
                                                            case 'not set': return p_.option($, ($) => entry.intermediate['id value pair'].id.range.end)
                                                            default: return p_.exhaustive($[0])
                                                        }
                                                    }),
                                            },
                                            {
                                                'position': $p.position,
                                            }
                                        ),
                                    ).decide(
                                        (): s_out.Possibly_Found => p_.from.state($.value).decide(
                                            ($): s_out.Possibly_Found => {
                                                switch ($[0]) {
                                                    case 'set': return p_.option($, ($) => Value_possibly_found($, $p))
                                                    case 'not set': return p_.option($, ($) => p_.literal.set(['entry', entry]))
                                                    default: return p_.exhaustive($[0])
                                                }
                                            }),
                                        () => p_.literal.not_set()
                                    )
                                },
                                () => this_value()
                            ))
                            case 'group': return p_.option($, ($) => p_.from.state($.derived.style).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'verbose': return p_.option($, ($) => p_.from.list($.properties).on_has_match(
                                            ($): s_out.Possibly_Found => {
                                                const prop = $
                                                return p_.from.boolean(
                                                    range_overlaps_position(
                                                        t_parse_tree_to_full_value_location.ID_Value_Pair(prop.intermediate['id value pair']),
                                                        {
                                                            'position': $p.position,
                                                        }
                                                    ),
                                                ).decide(
                                                    () => p_.from.state($['definition found']).decide(
                                                        ($): s_out.Possibly_Found => {

                                                            switch ($[0]) {
                                                                case 'yes': return p_.option($, ($) => p_.from.optional($['value']).decide(
                                                                    ($): s_out.Possibly_Found => p_.literal.set(p_.from.optional(Value_possibly_found($, $p)).decide(
                                                                        ($) => $,
                                                                        (): s_out.Found => ['property', { 'style': ['verbose', prop] }]
                                                                    )),
                                                                    () => {
                                                                        return p_.literal.set(['property', { 'style': ['verbose', prop] }])
                                                                    }
                                                                ))
                                                                case 'no': return p_.option($, ($) => {

                                                                    return p_.literal.set(['property', { 'style': ['verbose', prop] }])
                                                                })
                                                                default: return p_.exhaustive($[0])
                                                            }
                                                        }),
                                                    () => p_.literal.not_set(),
                                                )
                                            },
                                            () => this_value()
                                        ))
                                        case 'concise': return p_.option($, ($) => p_.from.list($.properties).on_has_match(
                                            ($) => {
                                                const prop = $
                                                return p_.from.boolean(
                                                    range_overlaps_position(
                                                        t_parse_tree_to_full_value_location.Value(prop.item.value),
                                                        {
                                                            'position': $p.position,
                                                        }
                                                    ),
                                                ).decide(
                                                    () => p_.literal.set(p_.from.state($['definition found']).decide(
                                                        ($): s_out.Found => {
                                                            switch ($[0]) {
                                                                case 'yes': return p_.option($, ($) => Value($['value'], $p))
                                                                case 'no': return p_.option($, ($) => ['property', { 'style': ['unknown concise', prop] }])
                                                                default: return p_.exhaustive($[0])
                                                            }
                                                        })),
                                                    () => p_.literal.not_set(),
                                                )
                                            },
                                            () => this_value()
                                        ))
                                        default: return p_.exhaustive($[0])
                                    }
                                }))
                            case 'list': return p_.option($, ($) => p_.from.list($.derived.items).on_has_match(
                                ($) => Value_possibly_found($, $p),
                                () => this_value()
                            ))
                            case 'nothing': return p_.option($, ($) => this_value())
                            case 'optional': return p_.option($, ($) => p_.from.state($.derived.status).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'set': return p_.option($, ($) => p_.from.optional(Value_possibly_found($['child value'], $p)).decide(
                                            ($): s_out.Found => $,
                                            (): s_out.Found => this_value()
                                        ))
                                        case 'not set': return p_.option($, ($) => this_value())
                                        default: return p_.exhaustive($[0])
                                    }
                                }))
                            case 'reference': return p_.option($, ($) => this_value())
                            case 'state': return p_.option($, ($): s_out.Found => {
                                const valid_state = $
                                return p_.from.state($.derived['option status']).decide(
                                    ($) => {
                                        switch ($[0]) {
                                            case 'set': return p_.option($, ($): s_out.Found => p_.from.optional(Value_possibly_found($.value, $p)).decide(
                                                ($): s_out.Found => $,
                                                (): s_out.Found => ['state', valid_state]
                                            ))
                                            case 'missing data': return p_.option($, ($) => ['state', valid_state])
                                            default: return p_.exhaustive($[0])
                                        }
                                    })
                            })
                            case 'text': return p_.option($, ($) => this_value())
                            default: return p_.exhaustive($[0])
                        }
                    }))
                default: return p_.exhaustive($[0])
            }
        })
}
