import * as p_ from 'pareto-core/implementation/transformer'

import type * as interface_ from "../../../declarations/transformers/deserialize/diagnostics.js"

//depencencies
import * as t_get_schema from "../get_schema/diagnostics.js"
import * as t_deserialize_to_location from "astn-core/modules/deserialization/schemas/parse_tree_deserialization/transformers/location"
import * as ser_parse_tree_deserialization from "astn-core/modules/deserialization/schemas/parse_tree_deserialization/serializers"

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
				'message': ser_parse_tree_deserialization.Error($),
				'range': p_.literal.set(t_deserialize_to_location.Error($)),
				'related information': p_.literal.not_set(),
				'type': ['deserialize', null]
			}))
			default: return p_.exhaustive($[0])
		}
	}
)