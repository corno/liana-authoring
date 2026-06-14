import * as p_ from 'pareto-core/dist/query'
import p_variables from 'pareto-core/dist/_p_variables'

import * as signatures from "../../../interface/queries"

//data types
import * as d from "../../../interface/to_be_generated/get_schema"

//depencencies
import * as r_temp_module_specifier_from_loc from "pareto-liana/dist/implementation/manual/refiners/temp_module_specifier/list_of_characters"

export const $$: signatures.query_functions.get_schema = p_.query_function(
    ($d, $s, $q) => p_variables(() => {

        return $q['read file'](
            $d['schema path'],
            ($): d.Error => ({
                'schema path': $d['schema path'],
                'type': ['read file', $],
            })
        ).refine(
            ($, abort) => r_temp_module_specifier_from_loc.Module_Specifier(
                $,
                ($) => abort({
                    'schema path': $d['schema path'],
                    'type': ['deserialize', $],
                })

            )
        )
    })
)