
import type * as p_i from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../data/unmarshall_result.js"
import type * as d_location from "../../../generated/liana/schemas/location/data.js"
import type * as d_out from "../../../generated/liana/schemas/hover_info/data.js"


    export type Document = p_i.Transformer_With_Parameter<
        d_in.Document,
        d_out.Hover_Texts,
        {
            'position': d_location.Position_
        }
    >

