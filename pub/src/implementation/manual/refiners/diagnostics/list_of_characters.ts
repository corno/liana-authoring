import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'
import * as _pdev from 'pareto-core-dev'

//data types
import * as d_out from "../../../../interface/generated/liana/schemas/diagnostics/data"
import * as d_function_deserialize_unmarshall_result from "pareto-liana/dist/interface/to_be_generated/unmarshall_result_from_loc"
import * as d_in from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"

//dependencies
import * as r_unmashall_result_from_list_of_characters from "pareto-liana/dist/implementation/manual/refiners/unmarshall_result/list_of_characters"
import * as t_unmashall_result_to_diagnostics from "../../transformers/unmarshall_result/diagnostics"


export type Document = _pi.Refiner_With_Parameter<
    d_out.Diagnostics,
    d_function_deserialize_unmarshall_result.Error,
    d_in.List_of_Characters,
    {
        'unmarshall': d_function_deserialize_unmarshall_result.Parameters
    }
>

export const Document: Document = ($, abort, $p) => {
    return t_unmashall_result_to_diagnostics.Document(
        r_unmashall_result_from_list_of_characters.Document(
            $,
            abort,
            $p.unmarshall
        ),
    )
}