
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../data/unmarshall_result.js"
import type * as d_out from "../../../generated/liana/schemas/unmarshall_errors/data.js"


    export type Document = p_.Transformer<
        d_in.Document,
        d_out.Errors
    >

    export type Value = p_.Transformer<
        d_in.Value,
        d_out.Errors
    >

