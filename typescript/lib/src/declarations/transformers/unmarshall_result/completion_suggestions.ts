import type * as p_ from 'pareto-core/interface/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/unmarshall_result.js"
import type * as s_out from "../../../interface/schemas/completion_suggestions.js"

import type * as s_location from "../../../interface/schemas/location.js"
import type * as s_outx from "../../../interface/schemas/found.js"


export type Parameters = {
    'position': s_location.Position
    'indent': string
    'style':
    | ['verbose', null]
    | ['concise', null]

}


export type Document = p_.Transformer_With_Parameter<
    s_in.Document,
    s_out.Completion_Suggestions,
    Parameters

>

export type Found = p_.Transformer_With_Parameter<
    s_outx.Found,
    s_out.Completion_Suggestions,
    Parameters
>


