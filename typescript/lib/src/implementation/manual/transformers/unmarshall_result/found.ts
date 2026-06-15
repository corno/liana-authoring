import * as p_di from 'pareto-core/dist/data/interface'
import * as pt from 'pareto-core/dist/transformer/implementation'
import * as p_ti from 'pareto-core/dist/transformer/interface'

//data types
import * as d_in from "../../../../interface/to_be_generated/unmarshall_result"
import * as d_location from "../../../../interface/generated/liana/schemas/location/data"
import * as d_astn_location from "astn-core/dist/interface/generated/liana/schemas/location/data"
import * as d_out from "../../../../interface/to_be_generated/found"

// import { $$ as op_expect_1_element } from "pareto-standard-operations/dist/implementation/operations/impure/list/expect_exactly_one_element"

//dependencies
import * as t_parse_tree_to_start_token_range from "astn-core/dist/implementation/manual/transformers/parse_tree/start_token_range"
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


export type Document = p_ti.Transformer_With_Parameter<
    d_in.Document,
    d_out.Found,
    {
        'position': d_location.Position
    }
>

// export type Items = p_ti.Transformer_With_Parameter<
//     d_in.Items,
//     Found,
//     {
//         'position': d_location.Position
//     }
// >

export type Value = p_ti.Transformer_With_Parameter<
    d_in.Value,
    d_out.Found,
    {
        'position': d_location.Position
    }
>

export type Value_possibly_found = p_ti.Transformer_With_Parameter<
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
        ? pt.literal.set(Value($, $p))
        : pt.literal.not_set()
}

export const Value: Value = ($, $p) => {

    const value = $

    const value_range = t_parse_tree_to_start_token_range.Value($.instance)


    const this_value = (
    ): d_out.Found => ['value', $]


    return pt.decide.state($['unmarshall result'], ($) => {
        switch ($[0]) {
            case 'error': return pt.ss($, ($) => this_value())
            case 'success': return pt.ss($, ($) => pt.decide.state($, ($) => {
                switch ($[0]) {
                    case 'simple': return pt.ss($, ($) => this_value())
                    case 'component': return pt.ss($, ($) => Value($.value, $p))
                    case 'dictionary': return pt.ss($, ($) => pt.decide.list($.intermediate['entries as list']).has_match(
                        ($): d_out.Possibly_Found => {
                            const entry = $
                            return pt.decide.boolean<d_out.Possibly_Found>(
                                range_overlaps_position(
                                    {
                                        'start': $.intermediate['id value pair'].id.range.start,
                                        'end': pt.decide.state($.value, ($) => {
                                            switch ($[0]) {
                                                case 'set': return pt.ss($, ($) => t_parse_tree_to_full_value_range.Value($.instance).end)
                                                case 'not set':return pt.ss($, ($) => entry.intermediate['id value pair'].id.range.end)
                                                default: return pt.au($[0])
                                            }
                                        }),
                                    },
                                    {
                                        'position': $p.position,
                                    }
                                ),
                                (): d_out.Possibly_Found => pt.decide.state($.value, ($): d_out.Possibly_Found => {
                                    switch ($[0]) {
                                        case 'set': return pt.ss($, ($) =>  Value_possibly_found($, $p))
                                        case 'not set':return pt.ss($, ($) => pt.literal.set(['entry', entry]))
                                        default: return pt.au($[0])
                                    }
                                }),
                                () => pt.literal.not_set()
                            )
                        },
                        () => this_value()
                    ))
                    case 'group': return pt.ss($, ($) => pt.decide.state($.derived.style, ($) => {
                        switch ($[0]) {
                            case 'verbose': return pt.ss($, ($) => pt.decide.list($.properties).has_match(
                                ($): d_out.Possibly_Found => {
                                    const prop = $
                                    return pt.decide.boolean(
                                        range_overlaps_position(
                                            t_parse_tree_to_full_value_range.ID_Value_Pair(prop.intermediate['id value pair']),
                                            {
                                                'position': $p.position,
                                            }
                                        ),
                                        () => pt.decide.state($['definition found'], ($): d_out.Possibly_Found => {

                                            switch ($[0]) {
                                                case 'yes': return pt.ss($, ($) => $['value'].__decide(
                                                    ($): d_out.Possibly_Found => pt.literal.set(Value_possibly_found($, $p).__decide(
                                                        ($) => $,
                                                        (): d_out.Found => ['property', {'style': ['verbose', prop]}]
                                                    )),
                                                    () => {
                                                        return pt.literal.set(['property', {'style': ['verbose', prop]}])
                                                    }
                                                ))
                                                case 'no': return pt.ss($, ($) => {

                                                    return pt.literal.set(['property', {'style': ['verbose', prop]}])
                                                })
                                                default: return pt.au($[0])
                                            }
                                        }),
                                        () => pt.literal.not_set(),
                                    )
                                },
                                () => this_value()
                            ))
                            case 'concise': return pt.ss($, ($) => pt.decide.list($.properties).has_match(
                                ($) => {
                                    const prop = $
                                    return pt.decide.boolean(
                                        range_overlaps_position(
                                            t_parse_tree_to_full_value_range.Value(prop.item.value),
                                            {
                                                'position': $p.position,
                                            }
                                        ),
                                        () => pt.literal.set(pt.decide.state($['definition found'], ($): d_out.Found => {
                                            switch ($[0]) {
                                                case 'yes': return pt.ss($, ($) => Value($['value'], $p))
                                                case 'no': return pt.ss($, ($) => ['property', {'style': ['unknown concise', prop]}])
                                                default: return pt.au($[0])
                                            }
                                        })),
                                        () => pt.literal.not_set(),
                                    )
                                },
                                () => this_value()
                            ))
                            default: return pt.au($[0])
                        }
                    }))
                    case 'list': return pt.ss($, ($) => pt.decide.list($.derived.items).has_match(
                        ($) => Value_possibly_found($, $p),
                        () => this_value()
                    ))
                    case 'nothing': return pt.ss($, ($) => this_value())
                    case 'optional': return pt.ss($, ($) => pt.decide.state($.derived.status, ($) => {
                        switch ($[0]) {
                            case 'set': return pt.ss($, ($) => Value_possibly_found($['child value'], $p).__decide(
                                ($): d_out.Found => $,
                                (): d_out.Found => this_value()
                            ))
                            case 'not set': return pt.ss($, ($) => this_value())
                            default: return pt.au($[0])
                        }
                    }))
                    case 'reference': return pt.ss($, ($) => this_value())
                    case 'state': return pt.ss($, ($): d_out.Found => {
                        const valid_state = $
                        return pt.decide.state($.derived['option status'], ($) => {
                            switch ($[0]) {
                                case 'set': return pt.ss($, ($): d_out.Found => Value_possibly_found($.value, $p).__decide(
                                    ($): d_out.Found => $,
                                    (): d_out.Found => ['state', valid_state]
                                ))
                                case 'missing data': return pt.ss($, ($) => ['state', valid_state])
                                default: return pt.au($[0])
                            }
                        })
                    })
                    case 'text': return pt.ss($, ($) => this_value())
                    default: return pt.au($[0])
                }
            }))
            default: return pt.au($[0])
        }
    })
}