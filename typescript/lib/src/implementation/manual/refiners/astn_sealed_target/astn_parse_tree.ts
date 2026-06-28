import * as p_i from 'pareto-core/dist/interface/refiner'

//data types
import * as d_in from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"
import * as d_out from "astn-core/dist/interface/generated/liana/schemas/sealed_target/data"
import * as d_function from "../../../../interface/data/sealed_target_from_parse_tree"

//dependencies
// import * as r_from_unmarshall_result from "./unmarshall_result"
// import * as r_unmarshall_result_from_parse_tree from "../../transformers/astn_parse_tree/unmarshall_result"


//signatures
export type Document = p_i.Refiner_With_Parameter<
d_out.Document, d_function.Error, d_in.Document, d_function.Parameters
>
export type Value = p_i.Refiner_With_Parameter<
d_out.Value, d_function.Error, d_in.Value, d_function.Parameters
>

// export const Document: Document = ($, abort, $p) => r_from_unmarshall_result.Document(
//     r_unmarshall_result_from_parse_tree.Document($, $p),
//     ($) => abort($),
// )

// export const Value: Value = ($, abort, $p) => r_from_unmarshall_result.Value(
//     r_unmarshall_result_from_parse_tree.Value(
//         $,
//         {

//         }
//     ),
//     ($) => abort($),
// )