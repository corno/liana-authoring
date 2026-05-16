import * as _p from 'pareto-core/dist/query'
import _p_text_from_list from 'pareto-core/dist/_p_text_from_list'
import _p_variables from 'pareto-core/dist/_p_variables'
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'

import * as signatures from "../../../interface/signatures"

//data types
import * as d from "../../../interface/to_be_generated/deserialize"

//depencencies
import * as r_unmarshall_result_from_loc from "../refiners/unmarshall_result/list_of_characters"
import * as r_resolve_result_from_unmarshall_result from "../refiners/resolve_result/unmarshall_result"

export const $$: signatures.queries.deserialize = _p.query_function(
    ($p, $qr) => $qr['get schema path'](
        {
            'context path': $p['file path'].context,
        },
        ($): d.Error => ['schema path', $]
    ).query(
        ($v) => $qr['get schema'](
            {
                'schema path': $v,
                'tab size': $p['tab size'],
            },
            ($): d.Error => ['schema', $]
        )
    ).refine(
        ($v, abort) => _p.decide.state($v, ($) => {
            switch ($[0]) {
                case 'constrained': return _p.ss($, ($): d.Result => ['constrained', r_resolve_result_from_unmarshall_result.Document(
                    r_unmarshall_result_from_loc.Document(
                        _p_list_from_text(
                            $p.content,
                            ($) => $
                        ),
                        ($) => abort(['deserialize parse tree', $]),
                        {
                            'module': $['module resolver'].entry.signature.module,
                            'tab size': $p['tab size'],
                        }
                    ),
                    {
                        'definition': $['module resolver'].entry,
                        'resolver': $.resolver
                    }
                )])
                case 'unconstrained': return _p.ss($, ($) => ['unconstrained', r_unmarshall_result_from_loc.Document(
                    _p_list_from_text(
                        $p.content,
                        ($) => $
                    ),
                    ($) => abort(['deserialize parse tree', $]),
                    {
                        'module': $.module.entry,
                        'tab size': $p['tab size'],
                    }
                )])
                default: return _p.au($[0])
            }
        })
    )
)