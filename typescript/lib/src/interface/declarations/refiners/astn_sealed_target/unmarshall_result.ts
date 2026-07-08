
import type * as p_ from 'pareto-core/interface/refiner'
import type * as p_ti from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../data/unmarshall_result.js"
import type * as d_out from "astn-core/interface/generated/liana/schemas/sealed_target/data"
import type * as d_in_astn_parse_tree from "astn-core/interface/generated/liana/schemas/parse_tree/data"
import type * as d_function from "../../../data/sealed_target_from_unmarshall_result.js"

//dependencies
import * as t_astn_parse_tree_to_location from "astn-core/implementation/manual/transformers/parse_tree/start_token_range"

//signatures
// export type Document = p_.Refiner<
// d_out.Document, d_function.Error, d_in.Document
// >

export type Value = p_.Refiner<
    d_out.Value,
    d_function.Error,
    d_in.Value
>
export type Found = p_ti.Transformer< //FIXME; this one shouldn't be here
    d_in_astn_parse_tree.Value,
    d_function.Found
>

