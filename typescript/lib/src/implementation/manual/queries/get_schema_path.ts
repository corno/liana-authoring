import * as _p from 'pareto-core/dist/query'
import _p_text_from_list from 'pareto-core/dist/_p_text_from_list'
import _p_variables from 'pareto-core/dist/_p_variables'

import * as signatures from "../../../interface/signatures"

//data types
import * as d from "../../../interface/to_be_generated/get_schema_path"

//depencencies
import * as t_path_to_text from "pareto-resources/dist/implementation/manual/transformers/path/text"
import * as t_path_to_path from "pareto-resources/dist/implementation/manual/transformers/path/path"


export const $$: signatures.queries.get_schema_path = _p.query_function(
    ($p, $qr) => _p_variables(() => {
        const schema_path = t_path_to_path.create_node_path(
            t_path_to_path.extend_context_path_with_single_step(
                $p['context path'],
                { 'addition': ".liana" }
            ),
            { 'node': "schema.slna" }
        )
        return $qr['stat'](
            schema_path,
            ($): d.Error => ['stat error', $]
        ).refine(
            ($, abort) => _p.decide.state($, ($) => {
                switch ($[0]) {
                    case 'does not exist': return _p.ss($, ($) => abort(['not found', null]))
                    case 'file': return _p.ss($, ($) => schema_path)
                    case 'directory': return _p.ss($, ($) => abort(['not found', null]))
                    default: return _p.au($[0])
                }
            })
        )
    })
)