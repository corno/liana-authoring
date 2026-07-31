import type * as s_in_definition from "pareto-liana/modules/schema.generated/schemas/resolved/schema"
import type * as s_out from "../unmarshall_result/schema.js"

export type Parameters = {
    'definition': s_in_definition.Module,
    'property path': s_out.Property_Path
}