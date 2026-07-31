
import type * as p_ from 'pareto-core/interface/refiner'
import type * as p_ti from 'pareto-core/interface/transformer'

//schemas
import type * as s_in from "../../../schemas/unmarshall_result/schema.js"
import type * as s_out from "astn-core/modules/serialization/schemas/sealed_target/schema"
import type * as s_in_astn_parse_tree from "astn-core/modules/deserialization/schemas/parse_tree/schema"
import type * as s_function from "../../../schemas/sealed_target_from_unmarshall_result/schema.js"

export type Value = p_.Refiner<
    s_out.Value,
    s_function.Error,
    s_in.Value
>
export type Found = p_ti.Transformer< //FIXME; this one shouldn't be here
    s_in_astn_parse_tree.Value,
    s_function.Found
>

