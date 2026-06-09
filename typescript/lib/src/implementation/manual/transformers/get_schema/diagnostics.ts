import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'

import * as d_in from "../../../../interface/to_be_generated/get_schema"
import * as d_out from "../../../../interface/generated/liana/schemas/diagnostics/data"
import * as d_path from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_path/data"

import * as t_deserialize_resolved_to_fp from "liana-core/dist/implementation/manual/transformers/deserialize_resolved/fountain_pen"
import * as t_fp_to_text from "pareto-fountain-pen/dist/implementation/manual/transformers/prose/text"
import * as t_deserialize_resolved_to_location from "liana-core/dist/implementation/manual/transformers/deserialize_resolved/location"

export const Error: _pi.Transformer_With_Parameter<d_in.Error, d_out.Diagnostics.L, { 'schema path': d_path.Node_Path }> = ($, $p) => {
	return _p.decide.state($.type, ($) => {
		switch ($[0]) {
			case 'read file': return _p.ss($, ($): d_out.Diagnostics.L => ({
				'message': "Failed to read schema file",
				'severity': ['error', null],
				'related information': _p.optional.literal.not_set(),
				'range': _p.optional.literal.not_set(),
				'type': ['schema', null]
		}))
			case 'deserialize': return _p.ss($, ($): d_out.Diagnostics.L => ({
				'message': "failed to deserialize schema: " + t_fp_to_text.Phrase(t_deserialize_resolved_to_fp.Error($), { 'indentation': "    ", 'newline': "\n" }),
				'severity': ['error', null],
				'related information': _p.optional.literal.set(_p.list.literal([
					{
						'location': {
							'file path': $p['schema path'],
							'range': t_deserialize_resolved_to_location.Error($)
						},
						'message': t_fp_to_text.Phrase(t_deserialize_resolved_to_fp.Error($), { 'indentation': "    ", 'newline': "\n" })
					}
				])),
				'range': _p.optional.literal.not_set(),
				'type': ['schema', null]

			}))
			default: return _p.au($[0])
		}
	})
}