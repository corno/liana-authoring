import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/unmarshall_result"
import * as d_out from "../../../../interface/generated/liana/schemas/diagnostics/data"

//dependencies
import * as t_to_unmarshall_result_to_errors from "../unmarshall_result/unmarshall_errors"
import * as t_to_unmarshall_result_to_warnings from "../unmarshall_result/unmarshall_warnings"
import * as t_fp_to_text from "pareto-fountain-pen/dist/implementation/manual/transformers/prose/text"
import * as t_unmarshall_errors_to_prose from "../unmarshall_errors/prose"
import * as t_unmarshall_warnings_to_prose from "../unmarshall_warnings/prose"


export type Document = p_i.Transformer<
    d_in.Document,
    d_out.Diagnostics
>

export const Document: Document = ($) => p_.literal.segmented_list([
    p_.from.list(t_to_unmarshall_result_to_errors.Document($)).map(
        ($) => {
            return ({
                'severity': ['error', null],
                'range': p_.literal.set(['range', $.range]),
                'related information': p_.literal.not_set(),
                'message': t_fp_to_text.Phrases(
                    t_unmarshall_errors_to_prose.Error($),
                    {
                        'indentation': "    ",
                        'newline': "\n",
                    }
                ),
                'type': ['semantic', null],
            })
        }
    ),
    p_.from.list(t_to_unmarshall_result_to_warnings.Document($)).map(
        ($): d_out.Diagnostics.L => {
            return ({
                'severity': ['warning', null],
                'range': p_.literal.set(['range', $.range]),
                'related information': p_.literal.not_set(),
                'message': t_fp_to_text.Phrases(
                    t_unmarshall_warnings_to_prose.Warning($),
                    {
                        'indentation': "    ",
                        'newline': "\n",
                    }
                ),
                'type': ['semantic', null],
            })
        }
    ),
])