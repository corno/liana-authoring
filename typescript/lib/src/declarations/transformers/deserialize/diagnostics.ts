
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../interface/schemas/deserialize.js"
import type * as d_out from "../../../interface/schemas/diagnostics.js"


export type Error = p_.Transformer<
    d_in.Error,
    d_out.Diagnostics.L
>

