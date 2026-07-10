import type * as d_path from "pareto-resources/interface/data/fs_unrestricted_path"
import type * as d_read_file from "pareto-filesystem-unrestricted-api/interface/data/fs_unrestricted_read_file"
import type * as d_deserialize_resolved from "liana-core/interface/data/deserialize_resolved"
import type * as d_module_specfier from "pareto-liana/interface/data/temp_module_specifier"

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