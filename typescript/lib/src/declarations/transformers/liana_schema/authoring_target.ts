
import type * as p_ from 'pareto-core/interface/transformer'

//schemas
import type * as s_out from "astn/modules/authoring_target/schemas/authoring_target/schema"
import type * as s_in from "pareto-liana/modules/schema.generated/schemas/resolved/schema"

export namespace s_function {
    export type Parameters = {
        'style':
        | ['concise', null]
        | ['verbose', null]
    }
}


export type Value = p_.Transformer_With_Parameter<
    s_in.Value,
    s_out.Value,
    s_function.Parameters
>
export type Value_data = p_.Transformer_With_Parameter<
    s_in.Value,
    s_out.Value.data,
    s_function.Parameters
>

