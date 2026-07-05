import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/resolve_result"
import * as d_out from "../../../../interface/generated/liana/schemas/diagnostics/data"

//dependencies
import * as t_to_resolve_result_to_errors from "../resolve_result/resolve_errors"
import * as t_prose_to_text from "pareto-fountain-pen/dist/implementation/manual/transformers/prose/text"
import * as t_resolve_errors_to_prose from "../resolve_errors/prose"


export type Document = p_i.Transformer<
    d_in.Document,
    d_out.Diagnostics
>

export const Document: Document = ($) => p_.from.list(t_to_resolve_result_to_errors.Document($)).map(
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
    }))