import * as p_ti from 'pareto-core/dist/transformer/interface'
import * as pt from 'pareto-core/dist/transformer/implementation'

//data types
import * as d_in from "../../../../interface/to_be_generated/deserialize"
import * as d_out from "../../../../interface/generated/liana/schemas/diagnostics/data"
import * as d_path from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_path/data"

//depencencies
import * as t_get_schema from "../get_schema/diagnostics"
import * as t_deserialize_to_location from "astn-core/dist/implementation/manual/transformers/deserialize_parse_tree/location"
import * as t_deserialize_to_fp from "astn-core/dist/implementation/manual/transformers/deserialize_parse_tree/fountain_pen"
import * as t_fp_to_text from "pareto-fountain-pen/dist/implementation/manual/transformers/prose/text"

export const Error: p_ti.Transformer<d_in.Error, d_out.Diagnostics.L> = ($) => {
	return pt.decide.state($, ($) => {
		switch ($[0]) {
			case 'schema path': return pt.ss($, ($) => ({
				'severity': ['error', null],
				'message': `no schema found`,
				'range': pt.optional.literal.not_set(),
				'related information': pt.optional.literal.not_set(),
				'type': ['deserialize', null]
			}))
			case 'schema': return pt.ss($, ($) => t_get_schema.Error($.error, { 'schema path': $['schema path'] }))
			case 'deserialize parse tree': return pt.ss($, ($) => ({
				'severity': ['error', null],
				'message': t_fp_to_text.Phrase(
					t_deserialize_to_fp.Error($),
					{
						'indentation': "    ",
						'newline': "\n",
					}
				),
				'range': pt.optional.literal.set(t_deserialize_to_location.Error($)),
				'related information': pt.optional.literal.not_set(),
				'type': ['deserialize', null]
			}))
			default: return pt.au($[0])
		}
	})
}