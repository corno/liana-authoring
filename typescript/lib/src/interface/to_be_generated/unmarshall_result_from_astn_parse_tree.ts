import * as _pi from "pareto-core/dist/interface"

import * as d_in_definition from "pareto-liana/dist/interface/generated/liana/schemas/schema/data/resolved"
import * as d_out from "./unmashall_result"

export type Parameters = {
    'definition': d_in_definition.Value,
    'definition path': string
    'property path': d_out.Property_Path
}