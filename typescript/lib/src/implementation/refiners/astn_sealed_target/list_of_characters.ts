
import type * as interface_ from "../../../declarations/refiners/astn_sealed_target/list_of_characters.js"

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