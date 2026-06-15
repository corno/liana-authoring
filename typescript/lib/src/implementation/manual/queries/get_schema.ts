import * as p_ from 'pareto-core/dist/implementation/query'
import p_super_query_result from 'pareto-core/dist/implementation/query/super_query_result'

import * as signatures from "../../../interface/queries"

//data types
import * as d from "../../../interface/data/get_schema"

//depencencies
import * as r_temp_module_specifier_from_loc from "pareto-liana/dist/implementation/manual/refiners/temp_module_specifier/list_of_characters"

export const $$: signatures.query_functions.get_schema = p_.query_function(
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