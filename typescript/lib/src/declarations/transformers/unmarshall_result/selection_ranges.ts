import type * as p_di from 'pareto-core/interface/data'

import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../interface/data/unmarshall_result.js"
import type * as d_out from "../../../interface/data/unmarshall_result.js"
import type * as d_location from "../../../interface/generated/liana/schemas/location/data.js"


export type Document = p_.Transformer_With_Parameter<
    d_in.Document,
    p_di.List<d_out.Range_Stack>,
    {
        'positions': p_di.List<d_location.Position_>
    }
>

