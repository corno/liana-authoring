import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'
import * as _pdev from 'pareto-core-dev'

//data types
import * as d_out from "../../../../interface/generated/liana/schemas/diagnostics/data"
import * as d_function_ur_from_loc from "pareto-liana/dist/interface/to_be_generated/unmarshall_result_from_loc"
import * as d_in from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"
import * as d_loc from "../../../../interface/generated/liana/schemas/location/data"

//dependencies
import * as r_unmashall_result_from_list_of_characters from "pareto-liana/dist/implementation/manual/refiners/unmarshall_result/list_of_characters"
import * as t_unmashall_result_to_diagnostics from "../../transformers/unmarshall_result/diagnostics"
import * as t_ur_from_loc_to_fp from "pareto-liana/dist/implementation/manual/transformers/unmarshall_result_from_loc/fountain_pen"
import * as t_fp_to_text from "pareto-fountain-pen/dist/implementation/manual/transformers/prose/text"
import * as t_deserialize_parse_tree_to_location from "astn-core/dist/implementation/manual/transformers/deserialize_parse_tree/location"
import * as t_astn_location_to_location from "../../transformers/astn_core_location/location"


export type Document = _pi.Refiner_With_Parameter<
    d_out.Diagnostics,
    d_out.Diagnostics,
    d_in.List_of_Characters,
    {
        'unmarshall': d_function_ur_from_loc.Parameters
    }
>

export const Document: Document = ($, abort, $p) => {
    return t_unmashall_result_to_diagnostics.Document(
        r_unmashall_result_from_list_of_characters.Document(
            $,
            ($) => abort(_p.decide.state($, ($) => _p.list.literal<d_out.Diagnostics.L>([
                {
                    'message': t_fp_to_text.Phrase(
                        t_ur_from_loc_to_fp.Error($),
                        {
                            'indentation': "    ",
                            'newline': "\n",
                        }
                    ),
                    'range': _p.decide.state($, ($): d_loc.Range => {
                        switch ($[0]) {
                            case 'schema': return _p.ss($, ($) => ({
                                'start': {
                                    'line': 0,
                                    'character': 0,
                                },
                                'end': {
                                    'line': 0,
                                    'character': 0,
                                }
                            }))
                            case 'parse': return _p.ss($, ($) => t_astn_location_to_location.Range(
                                t_deserialize_parse_tree_to_location.Error($)
                            ))
                            default: return _p.au($[0])
                        }
                    }),
                    'related information': _p.optional.literal.not_set(),
                    'severity': ['error', null],
                }
            ]))),
            $p.unmarshall
        ),
    )
}