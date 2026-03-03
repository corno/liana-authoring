import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'

//data types
// import * as d_in from "pareto-liana/dist/interface/to_be_generated/unmashall_result"
import * as d_location from "../../../../interface/generated/liana/schemas/location/data"
import * as d_out from "../../../../interface/generated/liana/schemas/hover_info/data"
import * as d_function_unmarshall from "pareto-liana/dist/interface/to_be_generated/unmarshall_result_from_loc"
import * as d_in from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"

//dependencies
import * as r_unmashall_result_from_list_of_characters from "pareto-liana/dist/implementation/manual/refiners/unmarshall_result/list_of_characters"
import * as t_unmashall_result_to_hover_info from "../../transformers/unmarshall_result/hover_info"


export type Document = _pi.Refiner_With_Parameter<
    d_out.Hover_Texts,
    d_function_unmarshall.Error,
    d_in.List_of_Characters,
    {
        'position': d_location.Position
        'unmarshall': d_function_unmarshall.Parameters
    }
>

export const Document: Document = ($, abort, $p) => {
    return t_unmashall_result_to_hover_info.Document(
        r_unmashall_result_from_list_of_characters.Document(
            $,
            abort,
            $p.unmarshall
        ),
        {
            'full path': "",
            'id path': "",
            'position': $p.position,
        }
    )
}