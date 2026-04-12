import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'
import _p_cc from 'pareto-core/dist/_p_change_context'

//data types
import * as d_in from "../../../../interface/to_be_generated/unmashall_result"
import * as d_out from "../../../../interface/to_be_generated/formatting_edits"
import * as d_location from "../../../../interface/generated/liana/schemas/location/data"
import * as d_outx from "../../../../interface/to_be_generated/found"
import * as d_function_parameters from "../../../../interface/to_be_generated/unmarshall_result_to_authoring_target"

//dependencies
import * as t_to_unmarshall_result_value_at_position from "../../transformers/unmarshall_result/found"
import * as t_liana_schema_to_authoring_target from "../../transformers/liana_schema/authoring_target"
import * as t_authoring_target_to_text from "astn/dist/implementation/manual/transformers/authoring_target/text"
import * as t_astn_location_to_location from "../../transformers/astn_core_location/location"
import * as t_parse_tree_to_full_range from "astn-core/dist/implementation/manual/transformers/parse_tree/full_value_range"
import * as t_sealed_target_to_text from "astn-core/dist/implementation/manual/transformers/sealed_target/text"
import * as t_unmarshall_result_to_authoring_target from "../../transformers/unmarshall_result/authoring_target"

export type Document = _pi.Transformer_With_Parameter<
    d_in.Document,
    d_out.Formatting_Edits,
    {
        'position': d_location.Position
        'indent': string
        'conversion': d_function_parameters.Parameters
    }
>

export type Found = _pi.Transformer_With_Parameter<
    d_outx.Found,
    d_out.Formatting_Edits,
    {
        'indent': string
        'conversion': d_function_parameters.Parameters
    }
>



export const Found: Found = ($, $p): d_out.Formatting_Edits => {
    switch ($[0]) {
        case 'value': return _p.ss($, ($): d_out.Formatting_Edits => {
            const value = $

            return {
                'replace': {
                    'range': t_astn_location_to_location.Range(
                        t_parse_tree_to_full_range.Value(value.instance)
                    ),
                    'text': t_authoring_target_to_text.Value(
                        t_unmarshall_result_to_authoring_target.Value(value, $p.conversion),
                        {
                            'indentation': $p.indent,
                            'newline': "\n",
                            'write delimiters': true,
                        }
                    )
                }
            }
        })
        case 'entry': return _p.ss($, ($) => ({
            'replace': {
                'range': t_astn_location_to_location.Range(
                    t_parse_tree_to_full_range.ID_Value_Pair($['id value pair'])
                ),
                'text': "FOOOO ENTRY"
            }
        }))
        case 'verbose property': return _p.ss($, ($) => ({
            'replace': {
                'range': t_astn_location_to_location.Range(
                    t_parse_tree_to_full_range.ID_Value_Pair(
                        $['id value pair']
                    )
                ),
                'text': "FOOOO VP"
            }
        }))
        case 'concise property': return _p.ss($, ($) => {

            return {
                'replace': {
                    'range': t_astn_location_to_location.Range(
                        t_parse_tree_to_full_range.Value($.item.value)
                    ),
                    'text': "FOOOO CP"
                }
            }
        })
        case 'valid state': return _p.ss($, ($): d_out.Formatting_Edits => {
            const definition = $.definition

            return {
                'replace': {
                    'range': t_astn_location_to_location.Range(
                        t_parse_tree_to_full_range.Value($['value instance'])
                    ),
                    'text': "FOOOO CP"
                }
            }
        })
        default: return _p.au($[0])
    }
}

export const Document: Document = ($, $p) => {
    return _p.decide.state(
        t_to_unmarshall_result_value_at_position.Document($, $p),
        ($) => Found($, $p)
    )
}