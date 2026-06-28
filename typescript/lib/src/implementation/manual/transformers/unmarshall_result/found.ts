import * as p_di from 'pareto-core/dist/interface/data'
import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/unmarshall_result"
import * as d_location from "../../../../interface/generated/liana/schemas/location/data"
import * as d_astn_location from "astn-core/dist/interface/generated/liana/schemas/location/data"
import * as d_out from "../../../../interface/data/found"

//dependencies
import * as t_parse_tree_to_full_value_range from "astn-core/dist/implementation/manual/transformers/parse_tree/full_value_range"


export const range_overlaps_position = (
    $: d_astn_location.Range,
    $p: {
        'position': d_location.Position

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


export type Document = p_i.Transformer_With_Parameter<
    d_in.Document,
    d_out.Found,
    {
        'position': d_location.Position
    }
>

// export type Items = p_i.Transformer_With_Parameter<
//     d_in.Items,
//     Found,
//     {
//         'position': d_location.Position
//     }
// >

export type Value = p_i.Transformer_With_Parameter<
    d_in.Value,
    d_out.Found,
    {
        'position': d_location.Position
    }
>

export type Value_possibly_found = p_i.Transformer_With_Parameter<
    d_in.Value,
    p_di.Optional_Value<d_out.Found>,
    {
        'position': d_location.Position
    }
>

export const Document: Document = ($, $p) => Value($.content, $p)

export const Value_possibly_found: Value_possibly_found = ($, $p) => {
    return range_overlaps_position(
        t_parse_tree_to_full_value_range.Value($.instance),
        {
            'position': $p.position,
        }
    )
        ? p_.literal.set(Value($, $p))
        : p_.literal.not_set()
}

export const Value: Value = ($, $p) => {



    const this_value = (
    ): d_out.Found => ['value', $]


    return p_.from.state($['unmarshall result']).decide(
        ($) => {
            switch ($[0]) {
                case 'error': return p_.ss($, ($) => this_value())
                case 'success': return p_.ss($, ($) => p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'simple': return p_.ss($, ($) => this_value())
                            case 'component': return p_.ss($, ($) => Value($.value, $p))
                            case 'dictionary': return p_.ss($, ($) => p_.from.list($.intermediate['entries as list']).on_has_match(
                                ($): d_out.Possibly_Found => {
                                    const entry = $
                                    return p_.from.boolean(
                                        range_overlaps_position(
                                            {
                                                'start': $.intermediate['id value pair'].id.range.start,
                                                'end': p_.from.state($.value).decide(
                                                    ($) => {
                                                        switch ($[0]) {
                                                            case 'set': return p_.ss($, ($) => t_parse_tree_to_full_value_range.Value($.instance).end)
                                                            case 'not set': return p_.ss($, ($) => entry.intermediate['id value pair'].id.range.end)
                                                            default: return p_.au($[0])
                                                        }
                                                    }),
                                            },
                                            {
                                                'position': $p.position,
                                            }
                                        ),
                                    ).decide(
                                        (): d_out.Possibly_Found => p_.from.state($.value).decide(
                                            ($): d_out.Possibly_Found => {
                                                switch ($[0]) {
                                                    case 'set': return p_.ss($, ($) => Value_possibly_found($, $p))
                                                    case 'not set': return p_.ss($, ($) => p_.literal.set(['entry', entry]))
                                                    default: return p_.au($[0])
                                                }
                                            }),
                                        () => p_.literal.not_set()
                                    )
                                },
                                () => this_value()
                            ))
                            case 'group': return p_.ss($, ($) => p_.from.state($.derived.style).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'verbose': return p_.ss($, ($) => p_.from.list($.properties).on_has_match(
                                            ($): d_out.Possibly_Found => {
                                                const prop = $
                                                return p_.from.boolean(
                                                    range_overlaps_position(
                                                        t_parse_tree_to_full_value_range.ID_Value_Pair(prop.intermediate['id value pair']),
                                                        {
                                                            'position': $p.position,
                                                        }
                                                    ),
                                                ).decide(
                                                    () => p_.from.state($['definition found']).decide(
                                                        ($): d_out.Possibly_Found => {

                                                            switch ($[0]) {
                                                                case 'yes': return p_.ss($, ($) => p_.from.optional($['value']).decide(
                                                                    ($): d_out.Possibly_Found => p_.literal.set(p_.from.optional(Value_possibly_found($, $p)).decide(
                                                                        ($) => $,
                                                                        (): d_out.Found => ['property', { 'style': ['verbose', prop] }]
                                                                    )),
                                                                    () => {
                                                                        return p_.literal.set(['property', { 'style': ['verbose', prop] }])
                                                                    }
                                                                ))
                                                                case 'no': return p_.ss($, ($) => {

                                                                    return p_.literal.set(['property', { 'style': ['verbose', prop] }])
                                                                })
                                                                default: return p_.au($[0])
                                                            }
                                                        }),
                                                    () => p_.literal.not_set(),
                                                )
                                            },
                                            () => this_value()
                                        ))
                                        case 'concise': return p_.ss($, ($) => p_.from.list($.properties).on_has_match(
                                            ($) => {
                                                const prop = $
                                                return p_.from.boolean(
                                                    range_overlaps_position(
                                                        t_parse_tree_to_full_value_range.Value(prop.item.value),
                                                        {
                                                            'position': $p.position,
                                                        }
                                                    ),
                                                ).decide(
                                                    () => p_.literal.set(p_.from.state($['definition found']).decide(
                                                        ($): d_out.Found => {
                                                            switch ($[0]) {
                                                                case 'yes': return p_.ss($, ($) => Value($['value'], $p))
                                                                case 'no': return p_.ss($, ($) => ['property', { 'style': ['unknown concise', prop] }])
                                                                default: return p_.au($[0])
                                                            }
                                                        })),
                                                    () => p_.literal.not_set(),
                                                )
                                            },
                                            () => this_value()
                                        ))
                                        default: return p_.au($[0])
                                    }
                                }))
                            case 'list': return p_.ss($, ($) => p_.from.list($.derived.items).on_has_match(
                                ($) => Value_possibly_found($, $p),
                                () => this_value()
                            ))
                            case 'nothing': return p_.ss($, ($) => this_value())
                            case 'optional': return p_.ss($, ($) => p_.from.state($.derived.status).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'set': return p_.ss($, ($) => p_.from.optional(Value_possibly_found($['child value'], $p)).decide(
                                            ($): d_out.Found => $,
                                            (): d_out.Found => this_value()
                                        ))
                                        case 'not set': return p_.ss($, ($) => this_value())
                                        default: return p_.au($[0])
                                    }
                                }))
                            case 'reference': return p_.ss($, ($) => this_value())
                            case 'state': return p_.ss($, ($): d_out.Found => {
                                const valid_state = $
                                return p_.from.state($.derived['option status']).decide(
                                    ($) => {
                                        switch ($[0]) {
                                            case 'set': return p_.ss($, ($): d_out.Found => p_.from.optional(Value_possibly_found($.value, $p)).decide(
                                                ($): d_out.Found => $,
                                                (): d_out.Found => ['state', valid_state]
                                            ))
                                            case 'missing data': return p_.ss($, ($) => ['state', valid_state])
                                            default: return p_.au($[0])
                                        }
                                    })
                            })
                            case 'text': return p_.ss($, ($) => this_value())
                            default: return p_.au($[0])
                        }
                    }))
                default: return p_.au($[0])
            }
        })
}