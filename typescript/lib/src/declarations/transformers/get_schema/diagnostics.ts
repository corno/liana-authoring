import type * as p_ from 'pareto-core/interface/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/retrieval_of_schema.js"
import type * as s_out from "../../../interface/schemas/diagnostics.js"
import type * as s_path from "pareto-filesystem-unrestricted-api/modules/unrestricted/interface/schemas/path"

export namespace s_function {
    export type Parameters = {
        'schema path': s_path.Node_Path
    }
}


export type Error = p_.Transformer_With_Parameter<
    s_in.Error,
    s_out.Diagnostics.L,
    s_function.Parameters
>

