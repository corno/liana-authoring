
import type * as p_i from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../data/unmarshall_result.js"
import type * as d_out from "../../../generated/liana/schemas/unmarshall_errors/data.js"


    export type Document = p_i.Transformer<
        d_in.Document,
        d_out.Warnings
    >

    export type Value = p_i.Transformer<
        d_in.Value,
        d_out.Warnings
    >

