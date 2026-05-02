import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'

//data types
import * as d_in from "../../../../interface/to_be_generated/deserialize"
import * as d_out from "../../../../interface/generated/liana/schemas/diagnostics/data"

//depencencies
import * as t_get_schema from "../get_schema/diagnostics"
import * as t_deserialize_to_location from "astn-core/dist/implementation/manual/transformers/deserialize_parse_tree/location"
import * as t_deserialize_to_fp from "astn-core/dist/implementation/manual/transformers/deserialize_parse_tree/fountain_pen"
import * as t_fp_to_text from "pareto-fountain-pen/dist/implementation/manual/transformers/prose/text"

export const Error: _pi.Transformer<d_in.Error, d_out.Diagnostics.L> = ($) => {
	return _p.decide.state($, ($) => {
		switch ($[0]) {
			case 'schema path': return _p.ss($, ($) => ({
				'severity': ['error', null],
				'message': `no schema found`,
				'range': _p.optional.literal.not_set(),
				'related information': _p.optional.literal.not_set(),
				'type': ['deserialize', null]
			}))
			case 'schema': return _p.ss($, ($) => t_get_schema.Error($))
			case 'deserialize': return _p.ss($, ($) => ({
				'severity': ['error', null],
				'message': t_fp_to_text.Phrase(
					t_deserialize_to_fp.Error($),
					{
						'indentation': "    ",
						'newline': "\n",
					}
				),
				'range': _p.optional.literal.set(t_deserialize_to_location.Error($)),
				'related information': _p.optional.literal.not_set(),
				'type': ['deserialize', null]
			}))
			default: return _p.au($[0])
		}
	})
}