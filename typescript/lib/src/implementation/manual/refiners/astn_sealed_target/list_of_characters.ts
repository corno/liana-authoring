import * as p_i from 'pareto-core/dist/interface/refiner'

//data types
// import * as d_in from "pareto-liana/dist/interface/to_be_generated/unmashall_result"
import * as d_location from "../../../../interface/generated/liana/schemas/location/data"
import * as d_out from "astn-core/dist/interface/generated/liana/schemas/sealed_target/data"
import * as d_function_unmarshall from "../../../../interface/data/unmarshall_result_from_loc"
import * as d_function_seal from "../../../../interface/data/seal"
import * as d_in from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"

//dependencies
import * as r_unmarshall_result_from_list_of_characters from "../unmarshall_result/list_of_characters"
import * as r_sealed_target_from_unmarshall_result from "./unmarshall_result"


export type Document = p_i.Refiner_With_Parameter<
    d_out.Document,
    d_function_seal.Error,
    d_in.List_of_Characters,
    {
        'unmarshall': d_function_unmarshall.Parameters
    }
>

export const Document: Document = ($, abort, $p) => {
    return r_sealed_target_from_unmarshall_result.Value(
        r_unmarshall_result_from_list_of_characters.Document(
            $,
            ($) => abort(['unmarshall', $]),
            $p.unmarshall
        ).content,
        ($) => abort(['seal', $]
        )
    )
}