import type * as p_i from 'pareto-core/interface/refiner'

//schemas
import type * as s_in from "astn-core/modules/deserialization/schemas/parse_tree/schema"
import type * as s_out from "../schema.js"
import type * as s_function from "../../../schemas/sealed_target_from_parse_tree/schema.js"

//dependencies
// import * as r_from_unmarshall_result from "./unmarshall_result.js"
// import * as r_unmarshall_result_from_parse_tree from "../../transformers/astn_parse_tree/unmarshall_result.js"


//signatures
// export type Document = p_i.Refiner_With_Parameter<
//     s_out.Document,
//     s_function.Error,
//     s_in.Document,
//     s_function.Parameters
// >
// export type Value = p_i.Refiner_With_Parameter<
//     s_out.Value,
//     s_function.Error,
//     s_in.Value,
//     s_function.Parameters
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