import type * as d_in_definition from "pareto-liana/modules/schema/interface/data/resolved"
import type * as d_out from "./unmarshall_result.js"

export type Parameters = {
    'definition': d_in_definition.Module,
    'property path': d_out.Property_Path
}