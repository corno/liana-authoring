import * as pt from 'pareto-core/dist/query'
import * as _pa from 'pareto-core/dist/assign'
import p_variables from 'pareto-core/dist/_p_variables'

import * as signatures from "../../../interface/signatures"

//data types
import * as d from "../../../interface/to_be_generated/get_schema_path"

//depencencies
import * as t_path_to_text from "pareto-resources/dist/implementation/manual/transformers/unrestricted_path/text"
import * as t_path_to_path from "pareto-resources/dist/implementation/manual/transformers/unrestricted_path/unrestricted_path"


export const $$: signatures.queries.get_schema_path = pt.query_function(
    ($d, $s, $q) => p_variables(() => {
        const schema_path = t_path_to_path.create_node_path(
            t_path_to_path.extend_context_path_with_single_step(
                $d['context path'],
                { 'addition': ".liana" }
            ),
            { 'node': "schema.slna" }
        )
        return $q['stat'](
            schema_path,
            ($): d.Error => ['stat error', $]
        ).refine(
            ($, abort) => _pa.decide.state($, ($) => {
                switch ($[0]) {
                    case 'does not exist': return _pa.ss($, ($) => abort(['not found', null]))
                    case 'file': return _pa.ss($, ($) => schema_path)
                    case 'directory': return _pa.ss($, ($) => abort(['not found', null]))
                    default: return _pa.au($[0])
                }
            })
        )
    })
)