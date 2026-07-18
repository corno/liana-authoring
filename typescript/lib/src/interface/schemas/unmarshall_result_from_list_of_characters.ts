import type * as s_parse_tree_deserialization from "astn-core/modules/deserialization/schemas/parse_tree_deserialization"
import type * as s_schema from "pareto-liana/modules/liana.generated/modules/schema/schemas/resolved"

export type Parameters = {
    'tab size': number
    'module': s_schema.Module
}

export type Error = s_parse_tree_deserialization.Error