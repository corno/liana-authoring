import * as _p from 'pareto-core/dist/query'
import * as _pi from 'pareto-core/dist/interface'
import * as _pdev from 'pareto-core-dev'

import * as signatures from "../../../interface/signatures"

//data types
import * as d from "../../../interface/generated/liana/schemas/get_completion_suggestions/data"

//dependencies
import { $$x as q_get_unmarshalled_document } from "pareto-liana/dist/implementation/manual/queries/get_unmarshalled_document"
import * as t_unmarshall_result_to_completion_suggestions from "../transformers/unmarshall_result/completion_suggestions"

export const $$: signatures.queries.get_completion_suggestions = _p.query_function(
    ($p, $qr) => q_get_unmarshalled_document($qr)(
        {
            'content': $p.content,
            'file path': $p.source['file path'],
            'tab size': $p.source['tab size']
        },
        ($) => $,
    ).transform_result(($): d.Result => ({
        'completion suggestions': t_unmarshall_result_to_completion_suggestions.Document(
            $,
            {
                'position': $p.position,
                'indent': $p.indent,
            }
        ).__decide(
            ($) => $,
            () => _p.list.literal([]),
        )
    }))
)