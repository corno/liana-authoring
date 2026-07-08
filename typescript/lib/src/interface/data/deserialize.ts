import type * as d_path from "pareto-resources/interface/generated/liana/schemas/fs_unrestricted_path/data"
import type * as d_unmarshall_result from "./unmarshall_result.js"
import type * as d_resolve_result from "./resolve_result.js"
import type * as d_deserialize_parse_tree from "astn-core/interface/generated/liana/schemas/deserialize_parse_tree/data"
import type * as d_load_schema from "./get_schema.js"
import type * as d_schema_path from "./get_schema_path.js"

export type Result = 
| ['unconstrained', d_unmarshall_result.Document]
| ['constrained', d_resolve_result.Document]

export type Error =
    | ['schema path', d_schema_path.Error]
    | ['schema', {
        'schema path': d_path.Node_Path,
        'error': d_load_schema.Error
    }]
    | ['deserialize parse tree', d_deserialize_parse_tree.Error]

export type Parameters = {
    'tab size': number,
    'file path': d_path.Node_Path,
    'content': string,
}