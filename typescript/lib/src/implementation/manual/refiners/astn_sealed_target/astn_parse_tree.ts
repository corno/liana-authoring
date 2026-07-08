import type * as p_i from 'pareto-core/interface/refiner'

//data types
import type * as d_in from "astn-core/interface/generated/liana/schemas/parse_tree/data"
import type * as d_out from "astn-core/interface/generated/liana/schemas/sealed_target/data"
import type * as d_function from "../../../../interface/data/sealed_target_from_parse_tree.js"

//dependencies
// import * as r_from_unmarshall_result from "./unmarshall_result.js"
// import * as r_unmarshall_result_from_parse_tree from "../../transformers/astn_parse_tree/unmarshall_result.js"


//signatures
// export type Document = p_i.Refiner_With_Parameter<
//     d_out.Document,
//     d_function.Error,
//     d_in.Document,
//     d_function.Parameters
// >
// export type Value = p_i.Refiner_With_Parameter<
//     d_out.Value,
//     d_function.Error,
//     d_in.Value,
//     d_function.Parameters
// >

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