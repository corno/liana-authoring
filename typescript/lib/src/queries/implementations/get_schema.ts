import * as p_ from 'pareto-core/implementation/query'

import type * as query_interfaces from "../interfaces.js"
import type * as query_interfaces_pareto_filesystem_unrestricted_api from "pareto-filesystem-unrestricted-api/modules/unrestricted/queries/interfaces"

//schemas
import * as d from "../../schemas/retrieval_of_schema/schema.js"

//depencencies
import * as r_temp_module_specifier_from_loc from "pareto-liana/schemas/temp_module_specifier/refiners/list_of_characters"

export const $$: p_.Query_Implementation<
    query_interfaces.get_schema,
    null,
    {
        'read file': query_interfaces_pareto_filesystem_unrestricted_api.read_file
    }
> = p_.query(
    (e, $s, $q, $d) => e.query(
        ($d) => $q['read file'](
            $d['schema path'],
            ($): d.Error => ({
                'schema path': $d['schema path'],
                'type': ['read file', $],
            })
        )).refine(
            ($, abort) => r_temp_module_specifier_from_loc.Module_Specifier(
                $.data,
                ($) => abort({
                    'schema path': $d.deprecated['schema path'],
                    'type': ['deserialize', $],
                })

            )
        )
)