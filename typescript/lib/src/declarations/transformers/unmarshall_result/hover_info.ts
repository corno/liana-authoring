
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as s_in from "../../../interface/schemas/unmarshall_result.js"
import type * as s_location from "../../../interface/schemas/location.js"
import type * as s_out from "../../../interface/schemas/hover_info.js"


export type Document = p_.Transformer_With_Parameter<
    s_in.Document,
    s_out.Hover_Texts,
    {
        'position': s_location.Position_
    }
>

