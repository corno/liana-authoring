import * as d_path from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_path/data"
import * as d_unmarshall_result from "./unmarshall_result"
import * as d_resolve_result from "./resolve_result"
import * as d_deserialize_parse_tree from "astn-core/dist/interface/generated/liana/schemas/deserialize_parse_tree/data"
import * as d_load_schema from "./get_schema"
import * as d_schema_path from "./get_schema_path"

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