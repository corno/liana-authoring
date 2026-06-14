import * as pt from 'pareto-core/dist/query'
import p_text_from_list from 'pareto-core/dist/_p_text_from_list'
import p_variables from 'pareto-core/dist/_p_variables'

import * as signatures from "../../../interface/queries"

//data types
import * as d from "../../../interface/to_be_generated/get_unmarshalled_file"

//depencencies
import { $$ as q_deserialize } from "./deserialize"
import { $$ as q_get_schema } from "./get_schema"
import { $$ as q_get_schema_path } from "./get_schema_path"

export const $$: signatures.queries.load_unmarshalled_file = pt.query_function(
    ($d, $s, $q) => $q['read file'](
        $d['file path'],
        ($): d.Error => ['read file', $]
    ).query(
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