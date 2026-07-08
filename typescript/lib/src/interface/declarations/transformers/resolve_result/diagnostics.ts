
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../data/resolve_result.js"
import type * as d_out from "../../../generated/liana/schemas/diagnostics/data.js"


export type Document = p_.Transformer<
    d_in.Document,
    d_out.Diagnostics
>

