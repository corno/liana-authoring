
import type * as p_ from 'pareto-core/interface/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/unmarshall_errors.js"
import type * as s_out from "pareto-fountain-pen/interface/data/prose"


export type Warning = p_.Transformer<
    s_in.Warnings.L,
    s_out.Phrase.composed
>

