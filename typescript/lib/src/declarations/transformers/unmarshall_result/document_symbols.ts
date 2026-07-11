
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../interface/schemas/unmarshall_result.js"
import type * as d_out from "../../../interface/schemas/document_symbols.js"

export type Document = p_.Transformer<
    d_in.Document,
    d_out.Value
>

export type Value = p_.Transformer<
    d_in.Value,
    d_out.Value
>

