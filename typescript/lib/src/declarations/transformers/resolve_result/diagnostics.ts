
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../interface/schemas/resolve_result.js"
import type * as d_out from "../../../interface/schemas/diagnostics.js"


export type Document = p_.Transformer<
    d_in.Document,
    d_out.Diagnostics
>

