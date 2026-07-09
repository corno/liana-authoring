import * as p_ from 'pareto-core/implementation/transformer'

import type * as interface_ from "../../../declarations/transformers/resolve_result/diagnostics.js"

//dependencies
import * as t_to_resolve_result_to_errors from "../resolve_result/resolve_errors.js"
import * as t_prose_to_text from "pareto-fountain-pen/implementation/transformers/prose/text"
import * as t_resolve_errors_to_prose from "../resolve_errors/prose.js"

export const Document: interface_.Document = ($) => p_.from.list(t_to_resolve_result_to_errors.Document($)).map(
    ($) => ({
        'severity': $.severity,
        'range': p_.literal.set(['range', $.range]),
        'related information': p_.literal.not_set(),
        'message': t_prose_to_text.Phrase(
            t_resolve_errors_to_prose.Error($),
            {
                'indentation': "    ",
                'newline': "\n",
            }
        ),
        'type': ['semantic', null],
    })
)