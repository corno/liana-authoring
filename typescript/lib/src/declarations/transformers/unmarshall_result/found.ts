import type * as p_di from 'pareto-core/interface/data'

import type * as p_ from 'pareto-core/interface/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/unmarshall_result.js"
import type * as s_location from "../../../interface/schemas/location.js"
import type * as s_astn_location from "astn-core/interface/data/location"
import type * as s_out from "../../../interface/schemas/found.js"


export type Document = p_.Transformer_With_Parameter<
    s_in.Document,
    s_out.Found,
    {
        'position': s_location.Position
    }
>

// export type Items = p_.Transformer_With_Parameter<
//     s_in.Items,
//     Found,
//     {
//         'position': s_location.Position
//     }
// >

export type Value = p_.Transformer_With_Parameter<
    s_in.Value,
    s_out.Found,
    {
        'position': s_location.Position
    }
>

export type Value_possibly_found = p_.Transformer_With_Parameter<
    s_in.Value,
    p_di.Optional_Value<s_out.Found>,
    {
        'position': s_location.Position
    }
>


