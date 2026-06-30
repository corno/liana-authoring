import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/deserialize"
import * as d_out from "../../../../interface/generated/liana/schemas/diagnostics/data"

//depencencies
import * as t_get_schema from "../get_schema/diagnostics"
import * as t_deserialize_to_location from "astn-core/dist/implementation/manual/transformers/deserialize_parse_tree/location"
import * as t_deserialize_to_fp from "astn-core/dist/implementation/manual/transformers/deserialize_parse_tree/fountain_pen"
import * as t_fp_to_text from "pareto-fountain-pen/dist/implementation/manual/transformers/prose/text"

export const Error: p_i.Transformer<
d_in.Error, d_out.Diagnostics.L
> = ($) => {
	return p_.from.state($).decide(
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
					'message': t_fp_to_text.Phrase(
						t_deserialize_to_fp.Error($),
						{
							'indentation': "    ",
							'newline': "\n",
						}
					),
					'range': p_.literal.set(t_deserialize_to_location.Error($)),
					'related information': p_.literal.not_set(),
					'type': ['deserialize', null]
				}))
				default: return p_.au($[0])
			}
		})
}