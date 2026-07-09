import * as p_ from 'pareto-core/implementation/transformer'

import type * as interface_ from "../../../declarations/transformers/get_schema/diagnostics.js"

//data types
import type * as d_path from "pareto-resources/interface/generated/liana/schemas/fs_unrestricted_path/data"

namespace d_function {
	export type Parameters = {
		'schema path': d_path.Node_Path
	}
}

//dependencies
import * as t_deserialize_resolved_to_prose from "liana-core/implementation/manual/transformers/deserialize_resolved/prose"
import * as t_prose_to_text from "pareto-fountain-pen/implementation/manual/transformers/prose/text"
import * as t_deserialize_resolved_to_location from "liana-core/implementation/manual/transformers/deserialize_resolved/location"

export const Error: interface_.Error = ($, $p) => {
	return p_.from.state($.type).decide(
		($) => {
			switch ($[0]) {
				case 'read file': return p_.option($, ($) => ({
					'message': "Failed to read schema file",
					'severity': ['error', null],
					'related information': p_.literal.not_set(),
					'range': p_.literal.not_set(),
					'type': ['schema', null]
				}))
				case 'deserialize': return p_.option($, ($) => ({
					'message': "failed to deserialize schema: " + t_prose_to_text.Phrase(t_deserialize_resolved_to_prose.Error($), { 'indentation': "    ", 'newline': "\n" }),
					'severity': ['error', null],
					'related information': p_.literal.set(p_.literal.list([
						{
							'location': {
								'file path': $p['schema path'],
								'range': t_deserialize_resolved_to_location.Error($)
							},
							'message': t_prose_to_text.Phrase(t_deserialize_resolved_to_prose.Error($), { 'indentation': "    ", 'newline': "\n" })
						}
					])),
					'range': p_.literal.not_set(),
					'type': ['schema', null]

				}))
				default: return p_.exhaustive($[0])
			}
		})
}