import type * as s_path from "pareto-resources/interface/data/fs_unrestricted_path"
import type * as s_read_file from "pareto-filesystem-unrestricted-api/interface/data/fs_unrestricted_read_file"
import type * as s_deserialize_resolved from "liana-core/interface/data/deserialize_resolved"
import type * as s_module_specfier from "pareto-liana/interface/data/temp_module_specifier"

export type Result = s_module_specfier.Temp_Module_Specifier

export type Parameters = {
	'tab size': number
	'schema path': s_path.Node_Path
}

export type Error = {
	'schema path': s_path.Node_Path
	'type':
	| ['read file', s_read_file.Error]
	| ['deserialize', s_deserialize_resolved.Error]
}