import * as p_ from 'pareto-core/implementation/transformer'

import type * as s_in from "../../../interface/schemas/get_schema.js"
namespace declarations {
    export type Error = p_.Transformer_With_Parameter<
        s_in.Error,
        s_out.Diagnostics.L,
        s_parameters.Parameters
    >
}

//schemas
import type * as s_path from "../../../interface/schemas/fs_unrestricted_path"

namespace s_parameters {
	export type Parameters = {
		'schema path': s_path.Node_Path
	}
}

//dependencies
import * as t_deserialize_resolved_to_prose from "liana-core/implementation/transformers/deserialize_resolved/prose"
import * as t_prose_to_text from "pareto-fountain-pen/implementation/transformers/prose/text"
import * as t_deserialize_resolved_to_location from "liana-core/implementation/transformers/deserialize_resolved/location"

export const Error: declarations.Error = ($, $p) => {
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