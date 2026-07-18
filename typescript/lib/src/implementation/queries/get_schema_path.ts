import * as p_ from 'pareto-core/implementation/query'
import * as p_temp from 'pareto-core/implementation/refiner'
import p_variables from 'pareto-core/implementation/query/specials/variables'
import p_super_query_result from 'pareto-core/implementation/query/super_query_result'

import type * as query_interfaces from "../../interface/queries.js"
import type * as query_interfaces_pareto_filesystem_unrestricted_api from "pareto-filesystem-unrestricted-api/modules/unrestricted/interface/queries"

//schemas
import * as d from "../../interface/schemas/retrieval_of_schema_path.js"

//depencencies
import * as t_path_to_path from "pareto-filesystem-unrestricted-api/modules/unrestricted/implementation/transformers/path/path"


export const $$: p_.Query_Implementation<
    query_interfaces.get_schema_path,
    null,
    {
        'stat': query_interfaces_pareto_filesystem_unrestricted_api.stat_possible_node
    }
> = p_.query(
    ($d, $s, $q) => p_variables(
        () => {
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
                ($, abort) => p_temp.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'does not exist': return p_temp.ss($, ($) => abort(['not found', null]))
                            case 'file': return p_temp.ss($, ($) => schema_path)
                            case 'directory': return p_temp.ss($, ($) => abort(['not found', null]))
                            default: return p_temp.exhaustive($[0])
                        }
                    })
            )
        })
)