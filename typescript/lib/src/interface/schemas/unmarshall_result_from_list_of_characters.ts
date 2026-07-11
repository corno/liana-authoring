import type * as s_parse_result from "astn-core/interface/data/deserialize_parse_tree"
import type * as s_schema from "pareto-liana/modules/schema/interface/data/resolved"

export type Parameters = {
    'tab size': number
    'module': s_schema.Module
}

export type Error = s_parse_result.Error