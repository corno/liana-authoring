import type * as p_di from 'pareto-core/interface/data'

import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as s_in from "../../../interface/schemas/unmarshall_result.js"
import type * as s_out from "../../../interface/schemas/unmarshall_result.js"
import type * as s_location from "../../../interface/schemas/location.js"


export type Document = p_.Transformer_With_Parameter<
    s_in.Document,
    p_di.List<s_out.Range_Stack>,
    {
        'positions': p_di.List<s_location.Position_>
    }
>

