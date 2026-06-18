import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/resolve_result"
import * as d_out from "../../../../interface/generated/liana/schemas/diagnostics/data"

//dependencies
import * as t_to_resolve_result_to_errors from "../resolve_result/resolve_errors"
import * as t_fp_to_text from "pareto-fountain-pen/dist/implementation/manual/transformers/prose/text"
import * as t_resolve_errors_to_fp from "../resolve_errors/fountain_pen"


export type Document = p_i.Transformer<
    d_in.Document,
    d_out.Diagnostics
>

export const Document: Document = ($) => p_.literal.nested_list([
    t_to_resolve_result_to_errors.Document($).__l_map_deprecated(($) => {
        return ({
            'severity': $.severity,
            'range': p_.literal.set(['range', $.range]),
            'related information': p_.literal.not_set(),
            'message': t_fp_to_text.Phrase(
                t_resolve_errors_to_fp.Error($),
                {
                    'indentation': "    ",
                    'newline': "\n",
                }
            ),
            'type': ['semantic', null],
        })
    }),
])