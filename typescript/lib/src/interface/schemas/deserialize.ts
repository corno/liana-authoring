import type * as s_path from "pareto-filesystem-unrestricted-api/modules/unrestricted/interface/schemas/path"
import type * as s_unmarshall_result from "./unmarshall_result.js"
import type * as s_resolve_result from "./resolve_result.js"
import type * as s_deserialize_parse_tree from "astn-core/modules/deserialization/schemas/parse_tree_deserialization"
import type * as s_load_schema from "./get_schema.js"
import type * as s_schema_path from "./get_schema_path.js"

export type Result = 
| ['unconstrained', s_unmarshall_result.Document]
| ['constrained', s_resolve_result.Document]

export type Error =
    | ['schema path', s_schema_path.Error]
    | ['schema', {
        'schema path': s_path.Node_Path,
        'error': s_load_schema.Error
    }]
    | ['deserialize parse tree', s_deserialize_parse_tree.Error]

export type Parameters = {
    'tab size': number,
    'file path': s_path.Node_Path,
    'content': string,
}