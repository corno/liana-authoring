
import type * as p_ from 'pareto-core/interface/transformer'
import type * as p_di from 'pareto-core/interface/data'

//data types
import type * as s_in from "astn-core/interface/data/parse_tree"
import type * as s_out from "../../../interface/schemas/unmarshall_result.js"
import type * as s_function from "../../../interface/schemas/unmarshall_result_from_astn_parse_tree.js"
import type * as s_in_definition from "pareto-liana/modules/schema/interface/data/resolved"



export type Document = p_.Transformer_With_Parameter<
    s_in.Document,
    s_out.Document,
    s_function.Parameters
>

export type Value = p_.Transformer_With_Parameter<
    s_in.Value,
    s_out.Value,
    {
        'definition': s_in_definition.Value
        'property path': s_out.Property_Path
        'parent range stack': p_di.Optional_Value<s_out.Range_Stack>
    }
>

