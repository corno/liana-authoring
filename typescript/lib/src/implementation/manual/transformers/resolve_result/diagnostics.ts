import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'

//data types
import * as d_in from "../../../../interface/to_be_generated/resolve_result"
import * as d_out from "../../../../interface/generated/liana/schemas/diagnostics/data"

//dependencies
import * as t_to_resolve_result_to_errors from "../resolve_result/resolve_errors"
import * as t_fp_to_text from "pareto-fountain-pen/dist/implementation/manual/transformers/prose/text"
import * as t_resolve_errors_to_fp from "../resolve_errors/fountain_pen"


export type Document = _pi.Transformer<
    d_in.Document,
    d_out.Diagnostics
>

export const Document: Document = ($) => _p.list.nested_literal_old([
    t_to_resolve_result_to_errors.Document($).__l_map(($) => {
        return ({
            'severity': ['error', null],
            'range': _p.optional.literal.set(['range', $.range]),
            'related information': _p.optional.literal.not_set(),
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