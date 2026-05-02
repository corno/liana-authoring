import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'

//data types
import * as d_in from "../../../../interface/to_be_generated/sealed_target_from_unmarshall_result"
import * as d_out from "astn-core/dist/interface/generated/liana/schemas/location/data"

//dependencies

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"


export const Error: _pi.Transformer<d_in.Error, d_out.Range> = (
    $,
) => $.range