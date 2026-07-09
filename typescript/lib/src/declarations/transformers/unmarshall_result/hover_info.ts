
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../interface/data/unmarshall_result.js"
import type * as d_location from "../../../interface/generated/liana/schemas/location/data.js"
import type * as d_out from "../../../interface/generated/liana/schemas/hover_info/data.js"


export type Document = p_.Transformer_With_Parameter<
    d_in.Document,
    d_out.Hover_Texts,
    {
        'position': d_location.Position_
    }
>

