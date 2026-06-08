import * as _p from 'pareto-core/dist/query'
import _p_text_from_list from 'pareto-core/dist/_p_text_from_list'
import _p_variables from 'pareto-core/dist/_p_variables'
import _p_cc from 'pareto-core/dist/_p_change_context'

import * as signatures from "../../../interface/signatures"

//data types
import * as d from "../../../interface/to_be_generated/get_unmarshalled_file"

//depencencies
import * as r_unmarshall_result_from_list_of_characters from "../refiners/unmarshall_result/list_of_characters"
import * as t_path_to_text from "pareto-resources/dist/implementation/manual/transformers/unrestricted_path/text"
import * as t_path_to_path from "pareto-resources/dist/implementation/manual/transformers/unrestricted_path/unrestricted_path"
import * as r_temp_module_specifier_from_loc from "pareto-liana/dist/implementation/manual/refiners/temp_module_specifier/list_of_characters"
import { $$ as q_deserialize } from "./deserialize"
import { $$ as q_get_schema } from "./get_schema"
import { $$ as q_get_schema_path } from "./get_schema_path"

export const $$: signatures.queries.load_unmarshalled_file = _p.query_function(
    ($p, $qr) => $qr['read file'](
        $p['file path'],
        ($): d.Error => ['read file', $]
    ).query(
        ($) => _p_variables(() => {
            const instance = $
            return q_deserialize(
                {
                    'get schema': q_get_schema({
                        'read file': $qr['read file']
                    }),
                    'get schema path': q_get_schema_path({
                        'stat': $qr['stat'],
                    })
                }
            )(
                {
                    'content': _p_text_from_list(
                        instance,
                        ($) => $
                    ),
                    'file path': $p['file path'],
                    'tab size': $p['tab size'],
                },
                ($): d.Error => ['deserialize', $]
            )
        })
    )
)