import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'

//data types
import * as d_in from "../../../../interface/to_be_generated/unmashall_result"
import * as d_location from "../../../../interface/generated/liana/schemas/location/data"
import * as d_out from "../../../../interface/generated/liana/schemas/diagnostics/data"

//dependencies
import * as t_to_unmarshall_result_to_errors from "../unmarshall_result/unmarshall_errors"
import * as t_astn_location_to_location from "../astn_core_location/location"
import * as t_fp_to_text from "pareto-fountain-pen/dist/implementation/manual/transformers/prose/text"
import * as t_unmarshall_errors_to_fp from "../unmarshall_errors/tbd"


export type Document = _pi.Transformer<
    d_in.Document,
    d_out.Diagnostics
>

export const Document: Document = ($) => {
    return t_to_unmarshall_result_to_errors.Document($).__l_map(($) => {
        return ({
            'severity': _p.decide.state($.type, ($) => {
                switch ($[0]) {
                    case 'error': return _p.ss($, ($) => ['error', null])
                    case 'warning': return _p.ss($, ($) => ['warning', null])
                    default: return _p.au($[0])
                }
            }),
            'range': t_astn_location_to_location.Range($.range),
            'related information': _p.optional.literal.not_set(),
            'message': _p.decide.state($.type, ($) => {
                switch ($[0]) {
                    case 'error': return _p.ss($, ($) => t_fp_to_text.Phrase(
                        t_unmarshall_errors_to_fp.Error_Type_Error($),
                        {
                            'indentation': "    ",
                            'newline': "\n",
                        }
                    ))
                    case 'warning':return _p.ss($, ($) => t_fp_to_text.Phrase(
                        t_unmarshall_errors_to_fp.Error_Type_Warning($),
                        {
                            'indentation': "    ",
                            'newline': "\n",
                        }
                    ))
                    default: return _p.au($[0])
                }
            })
        })
    })
}