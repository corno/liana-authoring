import type * as d_parse_result from "astn-core/interface/data/deserialize_parse_tree"
import type * as d_schema from "pareto-liana/modules/schema/interface/data/resolved"

export type Parameters = {
    'tab size': number
    'module': d_schema.Module
}

export type Error = d_parse_result.Error