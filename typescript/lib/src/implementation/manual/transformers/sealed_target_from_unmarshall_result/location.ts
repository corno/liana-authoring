
import type * as p_i from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../../interface/data/sealed_target_from_unmarshall_result.js"
import type * as d_out from "astn-core/interface/generated/liana/schemas/location/data"

export namespace interface_ {
    export type Error = p_i.Transformer<
        d_in.Error,
        d_out.Range
    >
}

//dependencies

export const Error: interface_.Error = (
    $,
) => $.range