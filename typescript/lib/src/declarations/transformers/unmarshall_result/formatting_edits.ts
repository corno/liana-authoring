
import type * as p_ from 'pareto-core/interface/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/unmarshall_result.js"
import type * as s_out from "../../../interface/schemas/formatting_edits.js"
import type * as s_location from "../../../interface/schemas/location.js"
import type * as s_outx from "../../../interface/schemas/found.js"
import type * as s_function_parameters from "../../../interface/schemas/unmarshall_result_to_authoring_target.js"

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

