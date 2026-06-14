import * as p_ from 'pareto-core/dist/query'
import * as p_t from 'pareto-core/dist/assign'
import p_variables from 'pareto-core/dist/_p_variables'

import * as signatures from "../../../interface/queries"

//data types
import * as d from "../../../interface/to_be_generated/get_schema_path"

//depencencies
import * as t_path_to_path from "pareto-resources/dist/implementation/manual/transformers/unrestricted_path/unrestricted_path"


export const $$: signatures.query_functions.get_schema_path = p_.query_function(
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
            ($, abort) => p_t.decide.state($, ($) => {
                switch ($[0]) {
                    case 'does not exist': return p_t.ss($, ($) => abort(['not found', null]))
                    case 'file': return p_t.ss($, ($) => schema_path)
                    case 'directory': return p_t.ss($, ($) => abort(['not found', null]))
                    default: return p_t.au($[0])
                }
            })
        )
    })
)