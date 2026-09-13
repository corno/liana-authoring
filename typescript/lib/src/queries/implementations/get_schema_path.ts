import * as p_ from 'pareto-core/query'
import * as p_temp from 'pareto-core/refiner'
import p_variables from 'pareto-core/query/specials/variables'

import type * as query_interfaces from "../interfaces.js"
import type * as query_interfaces_pareto_filesystem_unrestricted_api from "pareto-filesystem-unrestricted-api/modules/unrestricted/queries/interfaces"

//schemas
import * as d from "../../schemas/retrieval_of_schema_path/schema.js"

//depencencies
import * as t_path_to_path from "pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/path/transformers/path_extended_with_single_step"


export const $$: p_.Query_Implementation<
    query_interfaces.get_schema_path,
    null,
    {
        'stat': query_interfaces_pareto_filesystem_unrestricted_api.stat_possible_node
    }
> = p_.query(
    (e, $s, $q, $d) => p_variables(
        () => {
            const schema_path = {
                'context': t_path_to_path.Context_Path(
                    $d.deprecated['context path'],
                    { 'addition': ".liana" }
                ),
                'node': "schema.slna"
            }
            return e.query(
                ($d) => $q['stat'](
                    schema_path,
                    ($): d.Error => ['stat error', $]
                )).refine(
                    ($, abort) => p_temp.from.state($).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'does not exist': return p_temp.option($, ($) => abort(['not found', null]))
                                case 'file': return p_temp.option($, ($) => schema_path)
                                case 'directory': return p_temp.option($, ($) => abort(['not found', null]))
                                default: return p_temp.exhaustive($[0])
                            }
                        })
                )
        })
)