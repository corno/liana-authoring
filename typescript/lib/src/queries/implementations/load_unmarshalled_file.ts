import * as p_ from 'pareto-core/implementation/query'
import p_text_from_list from 'pareto-core/implementation/transformer/specials/text_from_list'
import p_variables from 'pareto-core/implementation/query/specials/variables'

import type * as query_interfaces_pareto_filesystem_unrestricted_api from "pareto-filesystem-unrestricted-api/modules/unrestricted/queries/interfaces"

//schemas
import * as d from "../../schemas/get_unmarshalled_file/schema.js"

//depencencies
import { $$ as q_deserialize } from "./deserialize.js"
import { $$ as q_get_schema } from "./get_schema.js"
import { $$ as q_get_schema_path } from "./get_schema_path.js"

export const $$: p_.Query_Implementation<
    p_.Query_Interface<
        d.Result,
        d.Error,
        d.Parameters
    >,
    null,
    {
        'read file': query_interfaces_pareto_filesystem_unrestricted_api.read_file
        'stat': query_interfaces_pareto_filesystem_unrestricted_api.stat_possible_node
    }
> = p_.query(
    (e, $s, $q, $d) => e.query(
        ($d) => $q['read file'](
            $d['file path'],
            ($): d.Error => ['read file', $]
        )
    ).query(
        ($) => p_variables(
            () => q_deserialize(
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
                        $.data,
                        ($) => $
                    ),
                    'file path': $d.deprecated['file path'],
                    'tab size': $d.deprecated['tab size'],
                },
                ($): d.Error => ['deserialize', $]
            )
        )
    )
)