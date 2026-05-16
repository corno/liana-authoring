import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'
import _p_cc from 'pareto-core/dist/_p_change_context'

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

export type Document = _pi.Transformer_With_Parameter<
    d_in.Document,
    d_out.Optional_Formatting_Edit,
    {
        'position': d_location.Position
        'indent': string
        'conversion': d_function_parameters.Parameters
    }
>

export type Found = _pi.Transformer_With_Parameter<
    d_outx.Found,
    d_out.Optional_Formatting_Edit,
    {
        'indent': string
        'conversion': d_function_parameters.Parameters
    }
>



export const Found: Found = ($, $p): d_out.Optional_Formatting_Edit => {

    const do_value = (value: d_in.Value): d_out.Optional_Formatting_Edit => {
        return _p.optional.literal.set({
            'range': t_parse_tree_to_full_range.Value(value.instance),
            'text': t_authoring_target_to_text.Value(
                t_unmarshall_result_to_authoring_target.Value(value, $p.conversion),
                {
                    'indentation': $p.indent,
                    'newline': "\n",
                    'write delimiters': true,
                }
            )
        })
    }
    switch ($[0]) {
        case 'value': return _p.ss($, ($): d_out.Optional_Formatting_Edit => {
            return do_value($)
        })
        case 'entry': return _p.ss($, ($) => $.value.__decide(
            ($) => do_value($),
            () => _p.optional.literal.not_set()
        ))
        case 'property': return _p.ss($, ($) => _p.decide.state($.style, ($) => {
            switch ($[0]) {
                case 'verbose': return _p.ss($, ($) => _p.decide.state($['definition found'], ($) => {
                    switch ($[0]) {
                        case 'yes': return _p.ss($, ($) => $.value.__decide(
                            ($) => do_value($),
                            () => _p.optional.literal.not_set()
                        ))
                        case 'no': return _p.ss($, ($) => _p.optional.literal.not_set())
                        default: return _p.au($[0])
                    }
                }))
                case 'unknown concise': return _p.ss($, ($) => {
                    return _p.optional.literal.not_set()
                })

                default: return _p.au($[0])
            }
        }))
        case 'state': return _p.ss($, ($): d_out.Optional_Formatting_Edit => {
            const definition = $.definition

            return _p.decide.state($['option status'], ($) => {
                switch ($[0]) {
                    case 'set': return _p.ss($, ($) => do_value($.value))
                    case 'missing data': return _p.ss($, ($) => _p.optional.literal.not_set())
                    default: return _p.au($[0])
                }
            })
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