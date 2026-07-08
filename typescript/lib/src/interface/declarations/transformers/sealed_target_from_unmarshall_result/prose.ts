
import type * as p_i from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../data/sealed_target_from_unmarshall_result.js"
import type * as d_out from "pareto-fountain-pen/interface/generated/liana/schemas/prose/data"


    export type Found = p_i.Transformer<
        d_in.Found,
        d_out.Phrase
    >
    export type Error = p_i.Transformer<
        d_in.Error,
        d_out.Phrase
    >

