
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/sealed_target_from_unmarshall_result"
import * as d_out from "astn-core/dist/interface/generated/liana/schemas/location/data"

//dependencies

export const Error: p_i.Transformer<
d_in.Error, d_out.Range
> = (
    $,
) => $.range