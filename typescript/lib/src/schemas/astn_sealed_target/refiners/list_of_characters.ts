import type * as p_ from 'pareto-core/refiner'

//schemas
import type * as s_out from "../schema.js"
import type * as s_function_unmarshall from "../../../schemas/unmarshall_result_from_list_of_characters/schema.js"
import type * as s_function_seal from "../../../schemas/sealing/schema.js"
import type * as s_in from "astn-core/modules/deserialization/schemas/list_of_characters/schema"

namespace declarations_ {

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
import * as r_unmarshall_result_from_list_of_characters from "../../unmarshall_result/refiners/list_of_characters.js"
import * as r_sealed_target_from_unmarshall_result from "./unmarshall_result.js"

export const Document: declarations_.Document = ($, abort, $p) => {
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
