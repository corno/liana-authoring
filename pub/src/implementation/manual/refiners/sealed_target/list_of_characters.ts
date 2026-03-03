import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'

//data types
// import * as d_in from "pareto-liana/dist/interface/to_be_generated/unmashall_result"
import * as d_location from "../../../../interface/generated/liana/schemas/location/data"
import * as d_out from "astn-core/dist/interface/generated/liana/schemas/sealed_target/data"
import * as d_function_unmarshall from "pareto-liana/dist/interface/to_be_generated/unmarshall_result_from_loc"
import * as d_function_seal from "../../../../interface/to_be_generated/seal"
import * as d_in from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"

//dependencies
import * as r_unmashall_result_from_list_of_characters from "pareto-liana/dist/implementation/manual/refiners/unmarshall_result/list_of_characters"
import * as r_sealed_target_from_unmarshall_result from "pareto-liana/dist/implementation/manual/refiners/astn_sealed_target/unmarshall_result"


export type Document = _pi.Refiner_With_Parameter<
    d_out.Document,
    d_function_seal.Error,
    d_in.List_of_Characters,
    {
        'unmarshall': d_function_unmarshall.Parameters
    }
>

export const Document: Document = ($, abort, $p) => {
    return r_sealed_target_from_unmarshall_result.Document(
        r_unmashall_result_from_list_of_characters.Document(
            $,
            ($) => abort(['unmarshall', $]),
            $p.unmarshall
        ),
        ($) => abort(['seal', $]
        )
    )
}