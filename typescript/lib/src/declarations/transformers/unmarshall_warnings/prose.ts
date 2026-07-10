
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../interface/data/unmarshall_errors.js"
import type * as d_out from "pareto-fountain-pen/interface/data/prose"


export type Warning = p_.Transformer<
    d_in.Warnings.L,
    d_out.Phrase.composed
>

