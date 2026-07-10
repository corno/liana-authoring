import type * as p_di from 'pareto-core/interface/data'

import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../interface/data/unmarshall_result.js"
import type * as d_location from "../../../interface/data/location.js"
import type * as d_astn_location from "astn-core/interface/data/location"
import type * as d_out from "../../../interface/data/found.js"


export type Document = p_.Transformer_With_Parameter<
    d_in.Document,
    d_out.Found,
    {
        'position': d_location.Position
    }
>

// export type Items = p_.Transformer_With_Parameter<
//     d_in.Items,
//     Found,
//     {
//         'position': d_location.Position
//     }
// >

export type Value = p_.Transformer_With_Parameter<
    d_in.Value,
    d_out.Found,
    {
        'position': d_location.Position
    }
>

export type Value_possibly_found = p_.Transformer_With_Parameter<
    d_in.Value,
    p_di.Optional_Value<d_out.Found>,
    {
        'position': d_location.Position
    }
>


