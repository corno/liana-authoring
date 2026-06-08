import * as d_path from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_path/data"
import * as d_read_file from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_read_file/data"
import * as d_deserialize_resolved from "liana-core/dist/interface/to_be_generated/deserialize_resolved"
import * as d_module_specfier from "pareto-liana/dist/interface/to_be_generated/temp_module_specifier"

export type Result = d_module_specfier.Temp_Module_Specifier

export type Parameters = {
	'tab size': number
	'schema path': d_path.Node_Path
}

export type Error = {
	'schema path': d_path.Node_Path
	'type':
	| ['read file', d_read_file.Error]
	| ['deserialize', d_deserialize_resolved.Error]
}