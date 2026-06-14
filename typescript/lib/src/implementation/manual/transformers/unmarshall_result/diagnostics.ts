import * as p_di from 'pareto-core/dist/data/interface'
import * as pt from 'pareto-core/dist/assign'
import * as p_ti from 'pareto-core/dist/transformer/interface'

//data types
import * as d_in from "../../../../interface/to_be_generated/unmarshall_result"
import * as d_out from "../../../../interface/generated/liana/schemas/diagnostics/data"

//dependencies
import * as t_to_unmarshall_result_to_errors from "../unmarshall_result/unmarshall_errors"
import * as t_to_unmarshall_result_to_warnings from "../unmarshall_result/unmarshall_warnings"
import * as t_fp_to_text from "pareto-fountain-pen/dist/implementation/manual/transformers/prose/text"
import * as t_unmarshall_errors_to_fp from "../unmarshall_errors/fountain_pen"
import * as t_unmarshall_warnings_to_fp from "../unmarshall_warnings/fountain_pen"


export type Document = p_ti.Transformer<
    d_in.Document,
    d_out.Diagnostics
>

export const Document: Document = ($) => pt.list.nested_literal_old([
    t_to_unmarshall_result_to_errors.Document($).__l_map(($) => {
        return ({
            'severity': ['error', null],
            'range': pt.optional.literal.set(['range', $.range]),
            'related information': pt.optional.literal.not_set(),
            'message': t_fp_to_text.Phrase(
                t_unmarshall_errors_to_fp.Error($),
                {
                    'indentation': "    ",
                    'newline': "\n",
                }
            ),
            'type': ['semantic', null],
        })
    }),
    t_to_unmarshall_result_to_warnings.Document($).__l_map(($): d_out.Diagnostics.L => {
        return ({
            'severity': ['warning', null],
            'range': pt.optional.literal.set(['range', $.range]),
            'related information': pt.optional.literal.not_set(),
            'message': t_fp_to_text.Phrase(
                t_unmarshall_warnings_to_fp.Warning($),
                {
                    'indentation': "    ",
                    'newline': "\n",
                }
            ),
            'type': ['semantic', null],
        })
    }),
])