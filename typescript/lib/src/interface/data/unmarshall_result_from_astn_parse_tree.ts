import * as d_in_definition from "pareto-liana/interface/generated/liana/schemas/schema/data/resolved"
import * as d_out from "./unmarshall_result.js"

export type Parameters = {
    'definition': d_in_definition.Module,
    'property path': d_out.Property_Path
}