
//schemas
import type * as s_function_unmarshall from "../../../interface/schemas/unmarshall_result_from_list_of_characters.js"
import type * as s_function_seal from "../../../interface/schemas/seal.js"
import type * as s_in from "../../../interface/schemas/list_of_characters.js"


namespace declarations {

    export type Document = p_.Refiner_With_Parameter<
        s_out.Document,
        s_function_seal.Error,
        s_in.List_Of_Characters,
        {
            'unmarshall': s_function_unmarshall.Parameters
        }
    >


}

//dependencies
import * as r_unmarshall_result_from_list_of_characters from "../unmarshall_result/list_of_characters.js"
import * as r_sealed_target_from_unmarshall_result from "./unmarshall_result.js"

export const Document: interface_.Document = ($, abort, $p) => {
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