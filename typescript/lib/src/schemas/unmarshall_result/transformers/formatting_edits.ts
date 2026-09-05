
import * as p_ from 'pareto-core/transformer'

//schemas
import type * as s_in from "../../../schemas/unmarshall_result/schema.js"
import type * as s_out from "../../../schemas/formatting_edits/schema.js"
import type * as s_location from "../../../schemas/location/schema.js"
import type * as s_outx from "../../../schemas/found/schema.js"
import type * as s_function_parameters from "../../../schemas/unmarshall_result_to_authoring_target/schema.js"

namespace declarations_ {

    export type Document = p_.Transformer_With_Parameter<
        s_in.Document,
        s_out.Optional_Formatting_Edit,
        {
            'position': s_location.Position
            'indentation': string
            'conversion': s_function_parameters.Parameters
        }
    >

    export type Found = p_.Transformer_With_Parameter<
        s_outx.Found,
        s_out.Optional_Formatting_Edit,
        {
            'indentation': string
            'conversion': s_function_parameters.Parameters
        }
    >

    export type Value = p_.Transformer_With_Parameter<
        s_in.Value,
        s_out.Optional_Formatting_Edit,
        {
            'indentation': string
            'conversion': s_function_parameters.Parameters
        }
    >
}


//dependencies
import * as t_to_unmarshall_result_value_at_position from "./found.js"
import * as t_authoring_target_to_serialized from "astn/modules/authoring_target/schemas/authoring_target/transformers/serialized"
import * as t_parse_tree_to_full_value_location from "astn-core/modules/deserialization/schemas/parse_tree/transformers/full_value_range"

import * as t_unmarshall_result_to_authoring_target from "./authoring_target.js"


const Value: declarations_.Value = (value, $p) => {
    return p_.literal.set({
        'range': t_parse_tree_to_full_value_location.Value(value.instance),
        'lines': t_authoring_target_to_serialized.Value(
            t_unmarshall_result_to_authoring_target.Any_Value(value, $p.conversion),
            {
                'paragraph': {
                    'indentation': $p.indentation,
                },
                'value': {
                    'write delimiters': true,
                }
            }
        )
    })
}

export const Found: declarations_.Found = ($, $p): s_out.Optional_Formatting_Edit => {

    switch ($[0]) {
        case 'value': return p_.option($, ($): s_out.Optional_Formatting_Edit => {
            return Value($, $p)
        })
        case 'entry': return p_.option($, ($) => p_.from.state($.value).decide(
            ($) => {
                switch ($[0]) {
                    case 'set': return p_.option($, ($) => Value($, $p))
                    case 'not set': return p_.option($, ($) => p_.literal.not_set())
                    default: return p_.exhaustive($[0])
                }
            }))
        case 'property': return p_.option($, ($) => p_.from.state($.style).decide(
            ($) => {
                switch ($[0]) {
                    case 'verbose': return p_.option($, ($) => p_.from.state($['definition found']).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'yes': return p_.option($, ($) => p_.from.optional($['value']).decide(
                                    ($) => Value($, $p),
                                    () => p_.literal.not_set()
                                ))
                                case 'no': return p_.option($, ($) => p_.literal.not_set())
                                default: return p_.exhaustive($[0])
                            }
                        }))
                    case 'unknown concise': return p_.option($, ($) => {
                        return p_.literal.not_set()
                    })
                    default: return p_.exhaustive($[0])
                }
            }))
        case 'state': return p_.option($, ($): s_out.Optional_Formatting_Edit => p_.from.state($.derived['option status']).decide(
            ($) => {
                switch ($[0]) {
                    case 'set': return p_.option($, ($) => Value($.value, $p))
                    case 'missing data': return p_.option($, ($) => p_.literal.not_set())
                    default: return p_.exhaustive($[0])
                }
            }))
        default: return p_.exhaustive($[0])
    }
}

export const Document: declarations_.Document = ($, $p) => {
    return p_.from.state(
        t_to_unmarshall_result_value_at_position.Document($, $p),
    ).decide(
        ($) => Found($, $p)
    )
}
