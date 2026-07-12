
import type * as p_ from 'pareto-core/interface/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/deserialize.js"
import type * as s_out from "../../../interface/schemas/diagnostics.js"


export type Error = p_.Transformer<
    s_in.Error,
    s_out.Diagnostics.L
>

