import type * as p_di from 'pareto-core/interface/data'
import * as p_ from 'pareto-core/implementation/transformer'
import type * as p_i from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../../interface/data/unmarshall_result.js"
import type * as d_location from "../../../../interface/generated/liana/schemas/location/data.js"
import type * as d_astn_location from "astn-core/interface/generated/liana/schemas/location/data"
import type * as d_out from "../../../../interface/data/found.js"

export namespace interface_ {
    export type Document = p_i.Transformer_With_Parameter<
        d_in.Document,
        d_out.Found,
        {
            'position': d_location.Position
        }
    >

    // export type Items = p_i.Transformer_With_Parameter<
    //     d_in.Items,
    //     Found,
    //     {
    //         'position': d_location.Position
    //     }
    // >

    export type Value = p_i.Transformer_With_Parameter<
        d_in.Value,
        d_out.Found,
        {
            'position': d_location.Position
        }
    >

    export type Value_possibly_found = p_i.Transformer_With_Parameter<
        d_in.Value,
        p_di.Optional_Value<d_out.Found>,
        {
            'position': d_location.Position
        }
    >

}
