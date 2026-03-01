import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'
import * as _pdev from 'pareto-core-dev'

//data types
import * as d_in from "pareto-liana/dist/interface/to_be_generated/unmashall_result"
import * as d_astn_location from "astn-core/dist/interface/generated/liana/schemas/location/data"
import * as d_location from "../../../../interface/generated/liana/schemas/location/data"
import * as d_out from "../../../../interface/to_be_generated/found"

// import { $$ as op_expect_1_element } from "pareto-standard-operations/dist/implementation/operations/impure/list/expect_exactly_one_element"

//dependencies
import * as t_parse_tree_to_start_token_range from "astn-core/dist/implementation/manual/transformers/parse_tree/start_token_range"
import * as t_parse_tree_to_full_value_range from "astn-core/dist/implementation/manual/transformers/parse_tree/full_value_range"
import * as t_astn_location_to_location from "../astn_core_location/location"


const range_is_at_position = (
    $: d_location.Range,
    $p: {
        'position': d_location.Position

    }
): boolean => (
    $.start.line < $p.position.line
    ||
    ($.start.line === $p.position.line && $.start.character <= $p.position.character)
) && (
        $.end.line > $p.position.line
        ||
        ($.end.line === $p.position.line && $.end.character >= $p.position.character)
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
    return range_is_at_position(
        t_astn_location_to_location.Range(
            t_parse_tree_to_full_value_range.Value($.instance)
        ),
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
            case 'number': return _p.ss($, ($) => this_value())
            case 'boolean': return _p.ss($, ($) => this_value())
            case 'component': return _p.ss($, ($) => Value($.value, $p))
            case 'dictionary': return _p.ss($, ($) => _p.decide.state($['found value type'], ($) => {
                switch ($[0]) {
                    case 'valid': return _p.ss($, ($) => _p.decide.list($.entries).has_match(
                        ($) => {
                            const entry = $
                            return _p.decide.boolean(
                                range_is_at_position(
                                    {
                                        'start': t_astn_location_to_location.Relative_Location($['id value pair'].id.range.start.relative),
                                        'end': t_astn_location_to_location.Relative_Location($.value.__decide(
                                            ($) => t_parse_tree_to_full_value_range.Value($.instance).end.relative,
                                            () => $['id value pair'].id.range.end.relative
                                        )),
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
                    case 'invalid': return _p.ss($, ($) => this_value())
                    default: return _p.au($[0])
                }
            }))
            case 'group': return _p.ss($, ($) => _p.decide.state($['found value type'], ($) => {
                switch ($[0]) {
                    case 'valid': return _p.ss($, ($) => _p.decide.state($.type, ($) => {
                        switch ($[0]) {
                            case 'verbose': return _p.ss($, ($) => _p.decide.list($.properties).has_match(
                                ($): d_out.Possibly_Found => {
                                    const prop = $
                                    return _p.decide.boolean(
                                        range_is_at_position(
                                            t_astn_location_to_location.Range(
                                                t_parse_tree_to_full_value_range.ID_Value_Pair(prop['id value pair'])
                                            ),
                                            {
                                                'position': $p.position,
                                            }
                                        ),
                                        () => _p.optional.literal.set(_p.decide.state($['definition found'], ($): d_out.Found => {
                                            switch ($[0]) {
                                                case 'yes': return _p.ss($, ($) => $.value.__decide(
                                                    ($): d_out.Found => Value($, $p),
                                                    (): d_out.Found => ['verbose property', prop],
                                                ))
                                                case 'no': return _p.ss($, ($) => ['verbose property', prop])
                                                default: return _p.au($[0])
                                            }
                                        })),
                                        () => _p.optional.literal.not_set(),
                                    )
                                },
                                () => this_value()
                            ))
                            case 'concise': return _p.ss($, ($) => _p.decide.list($.properties).has_match(
                                ($) => {
                                    const prop = $
                                    return _p.decide.boolean(
                                        range_is_at_position(
                                            t_astn_location_to_location.Range(
                                                t_parse_tree_to_full_value_range.Value(prop.item.value)
                                            ),
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
                    case 'invalid': return _p.ss($, ($) => this_value())
                    default: return _p.au($[0])
                }
            }))
            case 'list': return _p.ss($, ($) => _p.decide.state($['found value type'], ($) => {
                switch ($[0]) {
                    case 'valid': return _p.ss($, ($) => _p.decide.list($.items).has_match(
                        ($) => Value_possibly_found($, $p),
                        () => this_value()
                    ))
                    case 'invalid': return _p.ss($, ($) => this_value())
                    default: return _p.au($[0])
                }
            }))
            case 'nothing': return _p.ss($, ($) => this_value())
            case 'optional': return _p.ss($, ($) => _p.decide.state($['found value type'], ($) => {
                switch ($[0]) {
                    case 'valid': return _p.ss($, ($) => _p.decide.state($, ($) => {
                        switch ($[0]) {
                            case 'set': return _p.ss($, ($) => Value_possibly_found($['child value'], $p).__decide(
                                ($): d_out.Found => $,
                                (): d_out.Found => this_value()
                            ))
                            case 'not set': return _p.ss($, ($) => this_value())
                            default: return _p.au($[0])
                        }
                    }))
                    case 'invalid': return _p.ss($, ($) => this_value())
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
                    case 'invalid': return _p.ss($, ($) => this_value())
                    case 'list format error': return _p.ss($, ($) => this_value())
                    default: return _p.au($[0])
                }
            }))
            case 'text': return _p.ss($, ($) => this_value())
            default: return _p.au($[0])
        }
    })
}