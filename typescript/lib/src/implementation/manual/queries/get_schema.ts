import * as _p from 'pareto-core/dist/query'
import _p_text_from_list from 'pareto-core/dist/_p_text_from_list'
import _p_variables from 'pareto-core/dist/_p_variables'

import * as signatures from "../../../interface/signatures"

//data types
import * as d from "../../../interface/to_be_generated/get_schema"

//depencencies
import * as r_temp_module_specifier_from_loc from "pareto-liana/dist/implementation/manual/refiners/temp_module_specifier/list_of_characters"

export const $$: signatures.queries.get_schema = _p.query_function(
    ($p, $qr) => _p_variables(() => {

        return $qr['read file'](
            $p['schema path'],
            ($): d.Error => ({
                'schema path': $p['schema path'],
                'type': ['read file', $],
            })
        ).refine(
            ($, abort) => r_temp_module_specifier_from_loc.Module_Specifier(
                $,
                ($) => abort({
                    'schema path': $p['schema path'],
                    'type': ['deserialize', $],
                })

            )
        )
    })
)