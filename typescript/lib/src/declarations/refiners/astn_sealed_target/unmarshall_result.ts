
import type * as p_ from 'pareto-core/interface/refiner'
import type * as p_ti from 'pareto-core/interface/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/unmarshall_result.js"
import type * as s_out from "astn-core/interface/data/sealed_target"
import type * as s_in_astn_parse_tree from "astn-core/interface/data/parse_tree"
import type * as s_function from "../../../interface/schemas/sealed_target_from_unmarshall_result.js"

export type Value = p_.Refiner<
    s_out.Value,
    s_function.Error,
    s_in.Value
>
export type Found = p_ti.Transformer< //FIXME; this one shouldn't be here
    s_in_astn_parse_tree.Value,
    s_function.Found
>

