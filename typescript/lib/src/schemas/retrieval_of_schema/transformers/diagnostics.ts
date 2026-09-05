import * as p_ from 'pareto-core/transformer'

//schemas
import type * as s_in from "../../../schemas/retrieval_of_schema/schema.js"
import type * as s_out from "../../../schemas/diagnostics/schema.js"
import type * as s_path from "pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/path/schema"

export namespace s_function {
    export type Parameters = {
        'schema path': s_path.Node_Path
    }
}


namespace declarations_ {

    export type Error = p_.Transformer_With_Parameter<
        s_in.Error,
        s_out.Diagnostics.L,
        s_function.Parameters
    >
}

//dependencies
import * as ser_deserialize_resolved from "liana-core/modules/resolved_document_deserialization/schemas/resolved_document_deserialization/serializers"
import * as ser_rich_phrase from "pareto-fountain-pen/modules/rich_phrase/schemas/rich_phrase/serializers"
import * as t_resolved_document_deserialization_to_location from "liana-core/modules/resolved_document_deserialization/schemas/resolved_document_deserialization/transformers/location"

export const Error: declarations_.Error = ($, $p) => {
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
					'message': "failed to deserialize schema: " + ser_deserialize_resolved.Error($),
					'severity': ['error', null],
					'related information': p_.literal.set(p_.literal.list([
						{
							'location': {
								'file path': $p['schema path'],
								'range': t_resolved_document_deserialization_to_location.Error($)
							},
							'message': ser_deserialize_resolved.Error($)
						}
					])),
					'range': p_.literal.not_set(),
					'type': ['schema', null]

				}))
				default: return p_.exhaustive($[0])
			}
		})
}
