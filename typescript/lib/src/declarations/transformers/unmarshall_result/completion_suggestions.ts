import type * as p_ from 'pareto-core/interface/transformer'

//schemas
import type * as s_in from "../../../schemas/unmarshall_result/schema.js"
import type * as s_out from "../../../schemas/completion_suggestions/schema.js"

import type * as s_location from "../../../schemas/location/schema.js"
import type * as s_outx from "../../../schemas/found/schema.js"


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


