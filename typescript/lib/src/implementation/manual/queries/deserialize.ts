import * as p_ from 'pareto-core/dist/implementation/query'
import * as p_r from 'pareto-core/dist/implementation/refiner'
import p_list_from_text from 'pareto-core/dist/implementation/specials/list_from_text'

import * as signatures from "../../../interface/queries"

//data types
import * as d from "../../../interface/data/deserialize"

//depencencies
import * as r_unmarshall_result_from_loc from "../refiners/unmarshall_result/list_of_characters"
import * as r_resolve_result_from_unmarshall_result from "../refiners/resolve_result/unmarshall_result"

export const $$: signatures.query_functions.deserialize = p_.query_function(
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
        ($v, abort) => p_r.decide.state($v, ($) => {
            switch ($[0]) {
                case 'constrained': return p_r.ss($, ($): d.Result => ['constrained', r_resolve_result_from_unmarshall_result.Document(
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
                case 'unconstrained': return p_r.ss($, ($) => ['unconstrained', r_unmarshall_result_from_loc.Document(
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
                default: return p_r.au($[0])
            }
        })
    )
)