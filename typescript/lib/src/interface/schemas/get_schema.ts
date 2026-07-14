import type * as s_path from "./fs_unrestricted_path.js"
import type * as s_read_file from "./fs_unrestricted_read_file.js"
import type * as s_deserialize_resolved from "./deserialize_resolved.js"
import type * as s_module_specfier from "./temp_module_specifier.js"

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