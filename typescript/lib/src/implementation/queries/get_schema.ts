import * as p_ from 'pareto-core/implementation/query'
import p_super_query_result from 'pareto-core/implementation/query/super_query_result'

import type * as query_interfaces from "../../interface/queries.js"
import type * as query_interfaces_pareto_filesystem_unrestricted_api from "pareto-filesystem-unrestricted-api/interface/queries"

//schemas
import * as d from "../../interface/schemas/get_schema.js"

//depencencies
import * as r_temp_module_specifier_from_loc from "pareto-liana/implementation/refiners/temp_module_specifier/list_of_characters"

export const $$: p_.Query_Implementation<
    query_interfaces.get_schema,
    null,
    {
        'read file': query_interfaces_pareto_filesystem_unrestricted_api.read_file
    }
> = p_.query(
    ($d, $s, $q) => p_super_query_result($q['read file'](
        $d['schema path'],
        ($): d.Error => ({
            'schema path': $d['schema path'],
            'type': ['read file', $],
        })
    )).refine(
        ($, abort) => r_temp_module_specifier_from_loc.Module_Specifier(
            $,
            ($) => abort({
                'schema path': $d['schema path'],
                'type': ['deserialize', $],
            })

        )
    )
)