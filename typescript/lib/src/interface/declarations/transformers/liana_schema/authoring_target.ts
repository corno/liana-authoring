
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_out from "astn/interface/generated/liana/schemas/authoring_target/data"
import type * as d_in from "pareto-liana/interface/generated/liana/schemas/schema/data/resolved"

export namespace d_function {
    export type Parameters = {
        'style':
        | ['concise', null]
        | ['verbose', null]
    }
}


export type Value = p_.Transformer_With_Parameter<
    d_in.Value,
    d_out.Value,
    d_function.Parameters
>
export type Value_data = p_.Transformer_With_Parameter<
    d_in.Value,
    d_out.Value.data,
    d_function.Parameters
>

