import * as d_parse_result from "astn-core/dist/interface/generated/liana/schemas/deserialize_parse_tree/data"
import * as d_schema from "pareto-liana/dist/interface/to_be_generated/temp_module_specifier"

export type Parameters = {
    'tab size': number
    'schema': d_schema.Temp_Module_Specifier
}

export type Error = d_parse_result.Error