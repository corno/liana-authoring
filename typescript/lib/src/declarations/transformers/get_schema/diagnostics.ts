import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../interface/data/get_schema.js"
import type * as d_out from "../../../interface/data/diagnostics.js"
import type * as d_path from "pareto-resources/interface/data/fs_unrestricted_path"

export namespace d_function {
    export type Parameters = {
        'schema path': d_path.Node_Path
    }
}


export type Error = p_.Transformer_With_Parameter<
    d_in.Error,
    d_out.Diagnostics.L,
    d_function.Parameters
>

