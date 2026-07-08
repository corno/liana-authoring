import type * as p_di from 'pareto-core/interface/data'
import * as p_ from 'pareto-core/implementation/transformer'
import type * as p_i from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../data/unmarshall_result.js"
import type * as d_out from "../../../data/unmarshall_result.js"
import type * as d_location from "../../../generated/liana/schemas/location/data.js"

export namespace interface_ {
    export type Document = p_i.Transformer_With_Parameter<
        d_in.Document,
        p_di.List<d_out.Range_Stack>,
        {
            'positions': p_di.List<d_location.Position_>
        }
    >
}
