import * as pq from 'pareto-core/dist/query'
import * as pa from 'pareto-core/dist/assign'
import p_text_from_list from 'pareto-core/dist/_p_text_from_list'
import p_variables from 'pareto-core/dist/_p_variables'
import p_list_from_text from 'pareto-core/dist/_p_list_from_text'

import * as signatures from "../../../interface/signatures"

//data types
import * as d from "../../../interface/to_be_generated/deserialize"

//depencencies
import * as r_unmarshall_result_from_loc from "../refiners/unmarshall_result/list_of_characters"
import * as r_resolve_result_from_unmarshall_result from "../refiners/resolve_result/unmarshall_result"

export const $$: signatures.queries.deserialize = pq.query_function(
    ($d, $s, $q) => $q['get schema path'](
        {
            'context path': $d['file path'].context,
        },
        ($): d.Error => ['schema path', $]
    ).query(
        ($v) => $q['get schema'](
            {
                'schema path': $v,
                'tab size': $d['tab size'],
            },
            ($): d.Error => ['schema', {
                'error': $,
                'schema path': $v,
            }]
        )
    ).refine(
        ($v, abort) => pa.decide.state($v, ($) => {
            switch ($[0]) {
                case 'constrained': return pa.ss($, ($): d.Result => ['constrained', r_resolve_result_from_unmarshall_result.Document(
                    r_unmarshall_result_from_loc.Document(
                        p_list_from_text(
                            $d.content,
                            ($) => $
                        ),
                        ($) => abort(['deserialize parse tree', $]),
                        {
                            'module': $['module resolver'].entry.signature.module,
                            'tab size': $d['tab size'],
                        }
                    ),
                    {
                        'definition': $['module resolver'].entry,
                        'resolvers': $.resolver
                    }
                )])
                case 'unconstrained': return pa.ss($, ($) => ['unconstrained', r_unmarshall_result_from_loc.Document(
                    p_list_from_text(
                        $d.content,
                        ($) => $
                    ),
                    ($) => abort(['deserialize parse tree', $]),
                    {
                        'module': $.module.entry,
                        'tab size': $d['tab size'],
                    }
                )])
                default: return pa.au($[0])
            }
        })
    )
)