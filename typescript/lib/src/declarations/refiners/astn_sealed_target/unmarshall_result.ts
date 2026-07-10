
import type * as p_ from 'pareto-core/interface/refiner'
import type * as p_ti from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../interface/data/unmarshall_result.js"
import type * as d_out from "astn-core/interface/data/sealed_target"
import type * as d_in_astn_parse_tree from "astn-core/interface/data/parse_tree"
import type * as d_function from "../../../interface/data/sealed_target_from_unmarshall_result.js"

export type Value = p_.Refiner<
    d_out.Value,
    d_function.Error,
    d_in.Value
>
export type Found = p_ti.Transformer< //FIXME; this one shouldn't be here
    d_in_astn_parse_tree.Value,
    d_function.Found
>

