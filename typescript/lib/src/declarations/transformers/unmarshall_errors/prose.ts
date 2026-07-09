
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../interface/generated/liana/schemas/unmarshall_errors/data.js"
import type * as d_out from "pareto-fountain-pen/interface/generated/liana/schemas/prose/data"


export type Error = p_.Transformer<
    d_in.Errors.L,
    d_out.Phrase.composed
>

