
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as s_in from "../../../interface/schemas/unmarshall_result.js"
import type * as s_out from "../../../interface/schemas/unmarshall_errors.js"


export type Document = p_.Transformer<
    s_in.Document,
    s_out.Errors
>

export type Value = p_.Transformer<
    s_in.Value,
    s_out.Errors
>

