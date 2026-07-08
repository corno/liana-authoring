
import type * as p_ from 'pareto-core/interface/transformer'

import type * as d_out_2 from "../../../generated/liana/schemas/diagnostics/data.js"
import type * as d_in from "liana-core/interface/data/deserialize_resolved"

//data types
import type * as d_loc from "../../../generated/liana/schemas/location/data.js"
import type * as d_path from "pareto-resources/interface/generated/liana/schemas/fs_unrestricted_path/data"

export namespace d_function {
    export type Parameters = {
        'schema path': d_path.Node_Path
    }
}

export namespace d_out {

    export type Error = {
        'type':
        | ['schema', null]
        | ['deserialize', null]
        'range': d_loc.Range_FE,
        'message': string,
        'severity':
        | ['error', null]
        | ['warning', null]
        'related information': d_out_2.Diagnostic.related_information
    }
}


export type Error = p_.Transformer_With_Parameter<
    d_in.Error,
    d_out.Error,
    d_function.Parameters
>

