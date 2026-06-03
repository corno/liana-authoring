import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'

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


export type Document = _pi.Transformer_With_Parameter<
    d_in.Document,
    d_out.Found,
    {
        'position': d_location.Position
    }
>

// export type Items = _pi.Transformer_With_Parameter<
//     d_in.Items,
//     Found,
//     {
//         'position': d_location.Position
//     }
// >

export type Value = _pi.Transformer_With_Parameter<
    d_in.Value,
    d_out.Found,
    {
        'position': d_location.Position
    }
>

export type Value_possibly_found = _pi.Transformer_With_Parameter<
    d_in.Value,
    _pi.Optional_Value<d_out.Found>,
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
        ? _p.optional.literal.set(Value($, $p))
        : _p.optional.literal.not_set()
}

export const Value: Value = ($, $p) => {

    const value = $

    const value_range = t_parse_tree_to_start_token_range.Value($.instance)


    const this_value = (
    ): d_out.Found => ['value', $]


    return _p.decide.state($['unmarshall result'], ($) => {
        switch ($[0]) {
            case 'error': return _p.ss($, ($) => this_value())
            case 'success': return _p.ss($, ($) => _p.decide.state($, ($) => {
                switch ($[0]) {
                    case 'simple': return _p.ss($, ($) => this_value())
                    case 'component': return _p.ss($, ($) => Value($.value, $p))
                    case 'dictionary': return _p.ss($, ($) => _p.decide.list($.intermediate['entries as list']).has_match(
                        ($): d_out.Possibly_Found => {
                            const entry = $
                            return _p.decide.boolean<d_out.Possibly_Found>(
                                range_overlaps_position(
                                    {
                                        'start': $.intermediate['id value pair'].id.range.start,
                                        'end': _p.decide.state($.value, ($) => {
                                            switch ($[0]) {
                                                case 'set': return _p.ss($, ($) => t_parse_tree_to_full_value_range.Value($.instance).end)
                                                case 'not set':return _p.ss($, ($) => entry.intermediate['id value pair'].id.range.end)
                                                default: return _p.au($[0])
                                            }
                                        }),
                                    },
                                    {
                                        'position': $p.position,
                                    }
                                ),
                                (): d_out.Possibly_Found => _p.decide.state($.value, ($): d_out.Possibly_Found => {
                                    switch ($[0]) {
                                        case 'set': return _p.ss($, ($) =>  Value_possibly_found($, $p))
                                        case 'not set':return _p.ss($, ($) => _p.optional.literal.set(['entry', entry]))
                                        default: return _p.au($[0])
                                    }
                                }),
                                () => _p.optional.literal.not_set()
                            )
                        },
                        () => this_value()
                    ))
                    case 'group': return _p.ss($, ($) => _p.decide.state($.derived.style, ($) => {
                        switch ($[0]) {
                            case 'verbose': return _p.ss($, ($) => _p.decide.list($.properties).has_match(
                                ($): d_out.Possibly_Found => {
                                    const prop = $
                                    return _p.decide.boolean(
                                        range_overlaps_position(
                                            t_parse_tree_to_full_value_range.ID_Value_Pair(prop.intermediate['id value pair']),
                                            {
                                                'position': $p.position,
                                            }
                                        ),
                                        () => _p.decide.state($['definition found'], ($): d_out.Possibly_Found => {

                                            switch ($[0]) {
                                                case 'yes': return _p.ss($, ($) => $['value'].__decide(
                                                    ($): d_out.Possibly_Found => _p.optional.literal.set(Value_possibly_found($, $p).__decide(
                                                        ($) => $,
                                                        (): d_out.Found => ['property', {'style': ['verbose', prop]}]
                                                    )),
                                                    () => {
                                                        return _p.optional.literal.set(['property', {'style': ['verbose', prop]}])
                                                    }
                                                ))
                                                case 'no': return _p.ss($, ($) => {

                                                    return _p.optional.literal.set(['property', {'style': ['verbose', prop]}])
                                                })
                                                default: return _p.au($[0])
                                            }
                                        }),
                                        () => _p.optional.literal.not_set(),
                                    )
                                },
                                () => this_value()
                            ))
                            case 'concise': return _p.ss($, ($) => _p.decide.list($.properties).has_match(
                                ($) => {
                                    const prop = $
                                    return _p.decide.boolean(
                                        range_overlaps_position(
                                            t_parse_tree_to_full_value_range.Value(prop.item.value),
                                            {
                                                'position': $p.position,
                                            }
                                        ),
                                        () => _p.optional.literal.set(_p.decide.state($['definition found'], ($): d_out.Found => {
                                            switch ($[0]) {
                                                case 'yes': return _p.ss($, ($) => Value($['value'], $p))
                                                case 'no': return _p.ss($, ($) => ['property', {'style': ['unknown concise', prop]}])
                                                default: return _p.au($[0])
                                            }
                                        })),
                                        () => _p.optional.literal.not_set(),
                                    )
                                },
                                () => this_value()
                            ))
                            default: return _p.au($[0])
                        }
                    }))
                    case 'list': return _p.ss($, ($) => _p.decide.list($.derived.items).has_match(
                        ($) => Value_possibly_found($, $p),
                        () => this_value()
                    ))
                    case 'nothing': return _p.ss($, ($) => this_value())
                    case 'optional': return _p.ss($, ($) => _p.decide.state($.derived.status, ($) => {
                        switch ($[0]) {
                            case 'set': return _p.ss($, ($) => Value_possibly_found($['child value'], $p).__decide(
                                ($): d_out.Found => $,
                                (): d_out.Found => this_value()
                            ))
                            case 'not set': return _p.ss($, ($) => this_value())
                            default: return _p.au($[0])
                        }
                    }))
                    case 'reference': return _p.ss($, ($) => this_value())
                    case 'state': return _p.ss($, ($): d_out.Found => {
                        const valid_state = $
                        return _p.decide.state($.derived['option status'], ($) => {
                            switch ($[0]) {
                                case 'set': return _p.ss($, ($): d_out.Found => Value_possibly_found($.value, $p).__decide(
                                    ($): d_out.Found => $,
                                    (): d_out.Found => ['state', valid_state]
                                ))
                                case 'missing data': return _p.ss($, ($) => ['state', valid_state])
                                default: return _p.au($[0])
                            }
                        })
                    })
                    case 'text': return _p.ss($, ($) => this_value())
                    default: return _p.au($[0])
                }
            }))
            default: return _p.au($[0])
        }
    })
}