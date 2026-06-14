import * as pt from 'pareto-core/dist/assign'
import * as p_di from 'pareto-core/dist/data/interface'
import p_change_context from 'pareto-core/dist/specials/change_context'
import * as p_ti from 'pareto-core/dist/transformer/interface'

//data types
import * as d_in from "../../../../interface/to_be_generated/unmarshall_result"
import * as d_out from "../../../../interface/to_be_generated/formatting_edits"
import * as d_location from "../../../../interface/generated/liana/schemas/location/data"
import * as d_outx from "../../../../interface/to_be_generated/found"
import * as d_function_parameters from "../../../../interface/to_be_generated/unmarshall_result_to_authoring_target"

//dependencies
import * as t_to_unmarshall_result_value_at_position from "./found"
import * as t_authoring_target_to_text from "astn/dist/implementation/manual/transformers/authoring_target/text"
import * as t_parse_tree_to_full_range from "astn-core/dist/implementation/manual/transformers/parse_tree/full_value_range"
import * as t_unmarshall_result_to_authoring_target from "./authoring_target"

export type Document = p_ti.Transformer_With_Parameter<
    d_in.Document,
    d_out.Optional_Formatting_Edit,
    {
        'position': d_location.Position
        'indent': string
        'conversion': d_function_parameters.Parameters
    }
>

export type Found = p_ti.Transformer_With_Parameter<
    d_outx.Found,
    d_out.Optional_Formatting_Edit,
    {
        'indent': string
        'conversion': d_function_parameters.Parameters
    }
>

export type Value = p_ti.Transformer_With_Parameter<
    d_in.Value,
    d_out.Optional_Formatting_Edit,
    {
        'indent': string
        'conversion': d_function_parameters.Parameters
    }
>


const Value: Value = (value, $p) => {
    return pt.optional.literal.set({
        'range': t_parse_tree_to_full_range.Value(value.instance),
        'text': t_authoring_target_to_text.Value(
            t_unmarshall_result_to_authoring_target.Any_Value(value, $p.conversion),
            {
                'indentation': $p.indent,
                'newline': "\n",
                'write delimiters': true,
            }
        )
    })
}

export const Found: Found = ($, $p): d_out.Optional_Formatting_Edit => {

    switch ($[0]) {
        case 'value': return pt.ss($, ($): d_out.Optional_Formatting_Edit => {
            return Value($, $p)
        })
        case 'entry': return pt.ss($, ($) => pt.decide.state($.value, ($) => {
            switch ($[0]) {
                case 'set': return pt.ss($, ($) => Value($, $p))
                case 'not set': return pt.ss($, ($) => pt.optional.literal.not_set())
                default: return pt.au($[0])
            }
        }))
        case 'property': return pt.ss($, ($) => pt.decide.state($.style, ($) => {
            switch ($[0]) {
                case 'verbose': return pt.ss($, ($) => pt.decide.state($['definition found'], ($) => {
                    switch ($[0]) {
                        case 'yes': return pt.ss($, ($) => $['value'].__decide(
                            ($) => Value($, $p),
                            () => pt.optional.literal.not_set()
                        ))
                        case 'no': return pt.ss($, ($) => pt.optional.literal.not_set())
                        default: return pt.au($[0])
                    }
                }))
                case 'unknown concise': return pt.ss($, ($) => {
                    return pt.optional.literal.not_set()
                })
                default: return pt.au($[0])
            }
        }))
        case 'state': return pt.ss($, ($): d_out.Optional_Formatting_Edit => pt.decide.state($.derived['option status'], ($) => {
            switch ($[0]) {
                case 'set': return pt.ss($, ($) => Value($.value, $p))
                case 'missing data': return pt.ss($, ($) => pt.optional.literal.not_set())
                default: return pt.au($[0])
            }
        }))
        default: return pt.au($[0])
    }
}

export const Document: Document = ($, $p) => {
    return pt.decide.state(
        t_to_unmarshall_result_value_at_position.Document($, $p),
        ($) => Found($, $p)
    )
}