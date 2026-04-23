import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'

//data types
import * as d_out from "../../../../interface/generated/liana/schemas/diagnostics/data"
import * as d_function_ur_from_loc from "../../../../interface/to_be_generated/unmarshall_result_from_loc"
import * as d_in from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"
import * as d_loc from "../../../../interface/generated/liana/schemas/location/data"
import * as d_path from "pareto-resources/dist/interface/generated/liana/schemas/path/data"

//dependencies
import * as r_unmashall_result_from_list_of_characters from "../unmarshall_result/list_of_characters"
import * as t_unmashall_result_to_diagnostics from "../../transformers/unmarshall_result/diagnostics"
import * as t_ur_from_loc_to_fp from "../../transformers/unmarshall_result_from_loc/fountain_pen"
import * as t_fp_to_text from "pareto-fountain-pen/dist/implementation/manual/transformers/prose/text"
import * as t_deserialize_parse_tree_to_location from "astn-core/dist/implementation/manual/transformers/deserialize_parse_tree/location"
import * as t_deserialize_parse_tree_to_fp from "astn-core/dist/implementation/manual/transformers/deserialize_parse_tree/fountain_pen"
import * as t_astn_location_to_location from "../../transformers/astn_core_location/location"
import * as t_deserialize_resolved_to_location from "liana-core/dist/implementation/manual/transformers/deserialize_resolved/location"
import * as t_deserialize_resolved_to_fp from "liana-core/dist/implementation/manual/transformers/deserialize_resolved/fountain_pen"

export type Temp_Error = {
    'type':
    | ['schema', null]
    | ['deserialize', null]
    'range': d_loc.Range_FE,
    'message': string,
    'severity':
    | ['error', null]
    | ['warning', null]
    'related information': d_out.Diagnostics.L.related_information
}

export type Document = _pi.Refiner_With_Parameter<
    d_out.Diagnostics,
    Temp_Error,
    d_in.List_of_Characters,
    {
        'unmarshall': d_function_ur_from_loc.Parameters
        'schema path': d_path.Node_Path
    }
>

export const Document: Document = ($, abort, $p) => {
    return t_unmashall_result_to_diagnostics.Document(
        r_unmashall_result_from_list_of_characters.Document(
            $,
            ($) => abort({
                'type': ['deserialize', null],
                'message': t_fp_to_text.Phrase(
                    t_deserialize_parse_tree_to_fp.Error($),
                    {
                        'indentation': "    ",
                        'newline': "\n",
                    }
                ),
                'range': t_astn_location_to_location.Possible_Range(
                    t_deserialize_parse_tree_to_location.Error($)
                ),
                'related information': _p.optional.literal.not_set(),
                'severity': ['error', null],
            }),
            $p.unmarshall
        ),
    )
}
