import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'

//data types
import * as d_in from "../../../../interface/to_be_generated/unmashall_result"
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


    return _p.decide.state($.unmarshalled, ($) => {
        switch ($[0]) {
            case 'incorrect': return _p.ss($, ($) => this_value())
            case 'correct': return _p.ss($, ($) => _p.decide.state($, ($) => {
                switch ($[0]) {
                    case 'simple': return _p.ss($, ($) => this_value())
                    case 'component': return _p.ss($, ($) => Value($.value, $p))
                    case 'dictionary': return _p.ss($, ($) => _p.decide.list($.entries).has_match(
                        ($) => {
                            const entry = $
                            return _p.decide.boolean(
                                range_overlaps_position(
                                    {
                                        'start': $['id value pair'].id.range.start,
                                        'end': $.value.__decide(
                                            ($) => t_parse_tree_to_full_value_range.Value($.instance).end,
                                            () => $['id value pair'].id.range.end
                                        ),
                                    },
                                    {
                                        'position': $p.position,
                                    }
                                ),
                                () => _p.optional.literal.set($.value.__decide(
                                    ($) => Value_possibly_found($, $p).__decide(
                                        ($): d_out.Found => $,
                                        (): d_out.Found => ['entry', entry]
                                    ),
                                    (): d_out.Found => ['entry', entry]
                                )),
                                () => _p.optional.literal.not_set()
                            )
                        },
                        () => this_value()
                    ))
                    case 'group': return _p.ss($, ($) => _p.decide.state($.type, ($) => {
                        switch ($[0]) {
                            case 'verbose': return _p.ss($, ($) => _p.decide.list($.properties).has_match(
                                ($): d_out.Possibly_Found => {
                                    const prop = $
                                    return _p.decide.boolean(
                                        range_overlaps_position(
                                            t_parse_tree_to_full_value_range.ID_Value_Pair(prop['id value pair']),
                                            {
                                                'position': $p.position,
                                            }
                                        ),
                                        () => _p.decide.state($['definition found'], ($): d_out.Possibly_Found => {

                                            switch ($[0]) {
                                                case 'yes': return _p.ss($, ($) => $.value.__decide(
                                                    ($): d_out.Possibly_Found => _p.optional.literal.set(Value_possibly_found($, $p).__decide(
                                                        ($) => $,
                                                        (): d_out.Found => ['verbose property', prop]
                                                    )),
                                                    () => {
                                                        return _p.optional.literal.set(['verbose property', prop])
                                                    }
                                                ))
                                                case 'no': return _p.ss($, ($) => {

                                                    return _p.optional.literal.set(['verbose property', prop])
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
                                                case 'yes': return _p.ss($, ($) => Value($.value, $p))
                                                case 'no': return _p.ss($, ($) => ['concise property', prop])
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
                    case 'list': return _p.ss($, ($) => _p.decide.list($.items).has_match(
                        ($) => Value_possibly_found($, $p),
                        () => this_value()
                    ))
                    case 'nothing': return _p.ss($, ($) => this_value())
                    case 'optional': return _p.ss($, ($) => _p.decide.state($.status, ($) => {
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
                    case 'state': return _p.ss($, ($): d_out.Found => _p.decide.state($['found value type'], ($) => {
                        switch ($[0]) {
                            case 'valid': return _p.ss($, ($): d_out.Found => {
                                const valid_state = $
                                return _p.decide.state($['option'], ($) => {
                                    switch ($[0]) {
                                        case 'set': return _p.ss($, ($): d_out.Found => _p.decide.state($.option, ($) => {
                                            switch ($[0]) {
                                                case 'known': return _p.ss($, ($) => Value_possibly_found($.value, $p).__decide(
                                                    ($): d_out.Found => $,
                                                    (): d_out.Found => ['valid state', valid_state]
                                                ))
                                                case 'unknown': return _p.ss($, ($) => ['valid state', valid_state])
                                                default: return _p.au($[0])
                                            }
                                        }))
                                        case 'missing data': return _p.ss($, ($) => ['valid state', valid_state])
                                        default: return _p.au($[0])
                                    }
                                })
                            })
                            case 'list format error': return _p.ss($, ($) => this_value())
                            default: return _p.au($[0])
                        }
                    }))
                    case 'text': return _p.ss($, ($) => this_value())
                    default: return _p.au($[0])
                }
            }))
            case 'missing': return _p.ss($, ($) => this_value())
            default: return _p.au($[0])
        }
    })
}