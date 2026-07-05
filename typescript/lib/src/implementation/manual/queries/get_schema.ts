import * as p_ from 'pareto-core/implementation/query'
import p_super_query_result from 'pareto-core/implementation/query/super_query_result'

import * as interface_ from "../../../interface/queries.js"

//data types
import * as d from "../../../interface/data/get_schema.js"

//depencencies
import * as r_temp_module_specifier_from_loc from "pareto-liana/implementation/manual/refiners/temp_module_specifier/list_of_characters"

export const $$: interface_.query_functions.get_schema = p_.query_function(
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