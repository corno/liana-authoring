import * as p_ from 'pareto-core/implementation/transformer'
import type * as p_i from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../data/resolve_result.js"
import type * as d_out from "../../../data/resolve_errors.js"

export namespace interface_ {

    export type Document = p_i.Transformer<
        d_in.Document,
        d_out.Errors
    >

    export type Value = p_i.Transformer<
        d_in.Value,
        d_out.Errors
    >

}
