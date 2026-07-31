import type * as s_path from "pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/path/schema"
import type * as s_read_file from "pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/read_file/schema"
import type * as s_deserialize_resolved from "liana-core/modules/resolved_document_deserialization/schemas/resolved_document_deserialization/schema"
import type * as s_module_specfier from "pareto-liana/schemas/temp_module_specifier/schema"

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