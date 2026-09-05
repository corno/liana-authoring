
import type * as p_ from 'pareto-core/transformer'

//schemas
import type * as s_in from "../../../schemas/sealed_target_from_unmarshall_result/schema.js"
import type * as s_out from "astn-core/modules/deserialization/schemas/location/schema"


namespace declarations_ {

    export type Error = p_.Transformer<
        s_in.Error,
        s_out.Range
    >
}

//dependencies

export const Error: declarations_.Error = (
    $,
) => $.range
