import type * as d_parse_result from "astn-core/interface/generated/liana/schemas/deserialize_parse_tree/data"
import type * as d_schema from "pareto-liana/interface/generated/liana/schemas/schema/data/resolved"

export type Parameters = {
    'tab size': number
    'module': d_schema.Module
}

export type Error = d_parse_result.Error