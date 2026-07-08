import * as p_ from 'pareto-core/implementation/transformer'
import type * as p_i from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../../interface/data/unmarshall_result.js"
import type * as d_out from "../../../../interface/data/formatting_edits.js"
import type * as d_location from "../../../../interface/generated/liana/schemas/location/data.js"
import type * as d_outx from "../../../../interface/data/found.js"
import type * as d_function_parameters from "../../../../interface/data/unmarshall_result_to_authoring_target.js"

//dependencies
import * as t_to_unmarshall_result_value_at_position from "./found.js"
import * as t_authoring_target_to_text from "astn/implementation/manual/transformers/authoring_target/text"
import * as t_parse_tree_to_full_range from "astn-core/implementation/manual/transformers/parse_tree/full_value_range"
import * as t_unmarshall_result_to_authoring_target from "./authoring_target.js"

export namespace interface_ {
    export type Document = p_i.Transformer_With_Parameter<
        d_in.Document,
        d_out.Optional_Formatting_Edit,
        {
            'position': d_location.Position
            'indent': string
            'conversion': d_function_parameters.Parameters
        }
    >

    export type Found = p_i.Transformer_With_Parameter<
        d_outx.Found,
        d_out.Optional_Formatting_Edit,
        {
            'indent': string
            'conversion': d_function_parameters.Parameters
        }
    >

    export type Value = p_i.Transformer_With_Parameter<
        d_in.Value,
        d_out.Optional_Formatting_Edit,
        {
            'indent': string
            'conversion': d_function_parameters.Parameters
        }
    >
}
