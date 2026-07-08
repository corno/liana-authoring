import * as p_ from 'pareto-core/implementation/transformer'

import type * as interface_ from "../../../../interface/declarations/transformers/deserialize/diagnostics.js"

//depencencies
import * as t_get_schema from "../get_schema/diagnostics.js"
import * as t_deserialize_to_location from "astn-core/implementation/manual/transformers/deserialize_parse_tree/location"
import * as t_deserialize_to_prose from "astn-core/implementation/manual/transformers/deserialize_parse_tree/prose"
import * as t_prose_to_text from "pareto-fountain-pen/implementation/manual/transformers/prose/text"

export const Error: interface_.Error = ($) => p_.from.state($).decide(
	($) => {
		switch ($[0]) {
			case 'schema path': return p_.option($, ($) => ({
				'severity': ['error', null],
				'message': `no schema found`,
				'range': p_.literal.not_set(),
				'related information': p_.literal.not_set(),
				'type': ['deserialize', null]
			}))
			case 'schema': return p_.option($, ($) => t_get_schema.Error($.error, { 'schema path': $['schema path'] }))
			case 'deserialize parse tree': return p_.option($, ($) => ({
				'severity': ['error', null],
				'message': t_prose_to_text.Phrase(
					t_deserialize_to_prose.Error($),
					{
						'indentation': "    ",
						'newline': "\n",
					}
				),
				'range': p_.literal.set(t_deserialize_to_location.Error($)),
				'related information': p_.literal.not_set(),
				'type': ['deserialize', null]
			}))
			default: return p_.exhaustive($[0])
		}
	}
)