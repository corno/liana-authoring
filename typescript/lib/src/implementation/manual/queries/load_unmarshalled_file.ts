import * as p_ from 'pareto-core/dist/implementation/query'
import p_text_from_list from 'pareto-core/dist/implementation/specials/text_from_list'
import p_variables from 'pareto-core/dist/implementation/specials/variables'
import p_super_query_result from 'pareto-core/dist/implementation/query/super_query_result'

import * as signatures from "../../../interface/queries"

//data types
import * as d from "../../../interface/data/get_unmarshalled_file"

//depencencies
import { $$ as q_deserialize } from "./deserialize"
import { $$ as q_get_schema } from "./get_schema"
import { $$ as q_get_schema_path } from "./get_schema_path"

export const $$: signatures.query_functions.load_unmarshalled_file = p_.query_function(
    ($d, $s, $q) => p_super_query_result($q['read file'](
        $d['file path'],
        ($): d.Error => ['read file', $]
    )).query(
        ($) => p_variables(() => {
            const instance = $
            return q_deserialize(
                null,
                {
                    'get schema': q_get_schema(
                        null,
                        {
                            'read file': $q['read file']
                        },
                    ),
                    'get schema path': q_get_schema_path(
                        null,
                        {
                            'stat': $q['stat'],
                        },
                    )
                },
            )(
                {
                    'content': p_text_from_list(
                        instance,
                        ($) => $
                    ),
                    'file path': $d['file path'],
                    'tab size': $d['tab size'],
                },
                ($): d.Error => ['deserialize', $]
            )
        })
    )
)