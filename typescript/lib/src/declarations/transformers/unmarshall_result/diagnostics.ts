
import type * as p_ from 'pareto-core/interface/transformer'

//schemas
import type * as s_in from "../../../schemas/unmarshall_result/schema.js"
import type * as s_out from "../../../schemas/diagnostics/schema.js"


export type Document = p_.Transformer<
    s_in.Document,
    s_out.Diagnostics
>

