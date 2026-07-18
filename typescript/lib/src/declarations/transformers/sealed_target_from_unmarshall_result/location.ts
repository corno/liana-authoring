
import type * as p_ from 'pareto-core/interface/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/sealed_target_from_unmarshall_result.js"
import type * as s_out from "astn-core/interface/data/location"


export type Error = p_.Transformer<
    s_in.Error,
    s_out.Range
>

