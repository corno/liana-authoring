
import type * as s_in from "../../../interface/schemas/sealed_target_from_unmarshall_result.js"
namespace declarations {
    export type Error = p_.Transformer<
        s_in.Error,
        s_out.Range
    >
}

//dependencies

export const Error: declarations.Error = (
    $,
) => $.range