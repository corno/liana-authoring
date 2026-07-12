
import type * as p_ from 'pareto-core/interface/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/unmarshall_result.js"
import type * as s_out from "../../../interface/schemas/diagnostics.js"


export type Document = p_.Transformer<
    s_in.Document,
    s_out.Diagnostics
>

