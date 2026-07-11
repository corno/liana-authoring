import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../interface/schemas/unmarshall_result.js"
import type * as d_out from "../../../interface/schemas/completion_suggestions.js"

import type * as d_location from "../../../interface/schemas/location.js"
import type * as d_outx from "../../../interface/schemas/found.js"


export type Parameters = {
    'position': d_location.Position
    'indent': string
    'style':
    | ['verbose', null]
    | ['concise', null]

}


export type Document = p_.Transformer_With_Parameter<
    d_in.Document,
    d_out.Completion_Suggestions,
    Parameters

>

export type Found = p_.Transformer_With_Parameter<
    d_outx.Found,
    d_out.Completion_Suggestions,
    Parameters
>


