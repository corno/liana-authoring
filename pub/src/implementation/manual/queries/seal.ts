import * as _p from 'pareto-core/dist/query'
import * as _pi from 'pareto-core/dist/interface'

import * as signatures from "../../../interface/signatures"

//data types
import * as d from "../../../interface/generated/liana/schemas/seal/data"
import * as d_temp from "../../../interface/to_be_generated/seal"

//dependencies
import { $$x as q_get_unmarshalled_document } from "pareto-liana/dist/implementation/manual/queries/get_unmarshalled_document"
import * as r_sealed_target_from_unmarshalled_document from "pareto-liana/dist/implementation/manual/refiners/astn_sealed_target/unmarshall_result"
import * as t_sealed_target_to_text from "astn-core/dist/implementation/manual/transformers/sealed_target/text"

export const $$: signatures.queries.seal = _p.query_function(
	($p, $qr) => q_get_unmarshalled_document($qr)(
		{
			'content': $p.content,
			'file path': $p.source['file path'],
			'tab size': $p.source['tab size'],
		},
		($): d_temp.Error => ['unmarshall', $],
	).refine_without_error_transformation(
		($, abort) => r_sealed_target_from_unmarshalled_document.Document(
			$,
			($) => abort(['seal', $]),
		),
	).transform_result(($): d.Result => t_sealed_target_to_text.Document(
		$,
		$p.target
	))
)