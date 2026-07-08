
import type * as p_ from 'pareto-core/interface/transformer'
import type * as p_di from 'pareto-core/interface/data'

//data types
import type * as d_in from "astn-core/interface/generated/liana/schemas/parse_tree/data"
import type * as d_out from "../../../data/unmarshall_result.js"
import type * as d_function from "../../../data/unmarshall_result_from_astn_parse_tree.js"
import type * as d_in_definition from "pareto-liana/interface/generated/liana/schemas/schema/data/resolved"



    export type Document = p_.Transformer_With_Parameter<
        d_in.Document,
        d_out.Document,
        d_function.Parameters
    >

    export type Value = p_.Transformer_With_Parameter<
        d_in.Value,
        d_out.Value,
        {
            'definition': d_in_definition.Value
            'property path': d_out.Property_Path
            'parent range stack': p_di.Optional_Value<d_out.Range_Stack>
        }
    >

