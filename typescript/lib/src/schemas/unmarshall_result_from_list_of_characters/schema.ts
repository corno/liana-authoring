import type * as s_parse_tree_deserialization from "astn-runtime/modules/deserialization/schemas/parse_tree_deserialization/schema"
import type * as s_schema from "pareto-liana/modules/schema.generated/schemas/resolved/schema"

export type Parameters = {
    'tab size': number
    'module': s_schema.Module
}

export type Error = s_parse_tree_deserialization.Error