import * as p_ from 'pareto-core/dist/implementation/query'
import * as p_temp from 'pareto-core/dist/implementation/refiner'
import p_variables from 'pareto-core/dist/implementation/query/specials/variables'
import p_super_query_result from 'pareto-core/dist/implementation/query/super_query_result'

import * as interface_ from "../../../interface/queries"

//data types
import * as d from "../../../interface/data/get_schema_path"

//depencencies
import * as t_path_to_path from "pareto-resources/dist/implementation/manual/transformers/unrestricted_path/unrestricted_path"


export const $$: interface_.query_functions.get_schema_path = p_.query_function(
    ($d, $s, $q) => p_variables(() => {
        const schema_path = t_path_to_path.create_node_path(
            t_path_to_path.extend_context_path_with_single_step(
                $d['context path'],
                { 'addition': ".liana" }
            ),
            { 'node': "schema.slna" }
        )
        return p_super_query_result($q['stat'](
            schema_path,
            ($): d.Error => ['stat error', $]
        )).refine(
            ($, abort) => p_temp.from.state($).decide(($) => {
                switch ($[0]) {
                    case 'does not exist': return p_temp.ss($, ($) => abort(['not found', null]))
                    case 'file': return p_temp.ss($, ($) => schema_path)
                    case 'directory': return p_temp.ss($, ($) => abort(['not found', null]))
                    default: return p_temp.au($[0])
                }
            })
        )
    })
)