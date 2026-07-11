
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../interface/schemas/unmarshall_result.js"
import type * as d_location from "../../../interface/schemas/location.js"
import type * as d_out from "../../../interface/schemas/hover_info.js"


export type Document = p_.Transformer_With_Parameter<
    d_in.Document,
    d_out.Hover_Texts,
    {
        'position': d_location.Position_
    }
>

