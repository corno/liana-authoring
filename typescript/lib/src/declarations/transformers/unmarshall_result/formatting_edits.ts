
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../interface/data/unmarshall_result.js"
import type * as d_out from "../../../interface/data/formatting_edits.js"
import type * as d_location from "../../../interface/data/location.js"
import type * as d_outx from "../../../interface/data/found.js"
import type * as d_function_parameters from "../../../interface/data/unmarshall_result_to_authoring_target.js"

export type Document = p_.Transformer_With_Parameter<
    d_in.Document,
    d_out.Optional_Formatting_Edit,
    {
        'position': d_location.Position
        'indent': string
        'conversion': d_function_parameters.Parameters
    }
>

export type Found = p_.Transformer_With_Parameter<
    d_outx.Found,
    d_out.Optional_Formatting_Edit,
    {
        'indent': string
        'conversion': d_function_parameters.Parameters
    }
>

export type Value = p_.Transformer_With_Parameter<
    d_in.Value,
    d_out.Optional_Formatting_Edit,
    {
        'indent': string
        'conversion': d_function_parameters.Parameters
    }
>

