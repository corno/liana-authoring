
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../interface/schemas/sealed_target_from_unmarshall_result.js"
import type * as d_out from "pareto-fountain-pen/interface/data/prose"


export type Found = p_.Transformer<
    d_in.Found,
    d_out.Phrase
>
export type Error = p_.Transformer<
    d_in.Error,
    d_out.Phrase
>

