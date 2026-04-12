import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'

//data types
import * as d_location from "../../../../interface/generated/liana/schemas/location/data"
import * as d_out from "../../../../interface/to_be_generated/formatting_edits"
import * as d_function_unmarshall from "../../../../interface/to_be_generated/unmarshall_result_from_loc"
import * as d_in from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"

//dependencies
import * as r_unmashall_result_from_list_of_characters from "../unmarshall_result/list_of_characters"
import * as t_unmashall_result_to_formatting_edits from "./unmarshall_result"


//data types
import * as d_function_parameters from "../../../../interface/to_be_generated/unmarshall_result_to_authoring_target"

export type Document = _pi.Refiner_With_Parameter<
    d_out.Formatting_Edits,
    d_function_unmarshall.Error,
    d_in.List_of_Characters,
    {
        'position': d_location.Position
        'unmarshall': d_function_unmarshall.Parameters
        'conversion': d_function_parameters.Parameters
    }
>

export const Document: Document = ($, abort, $p) => {
    return t_unmashall_result_to_formatting_edits.Document(
        r_unmashall_result_from_list_of_characters.Document(
            $,
            abort,
            $p.unmarshall
        ),
        {
            'position': $p.position,
            'indent': "    ",
            'conversion': $p.conversion
            // 'style': $p.style
        }
    )
}