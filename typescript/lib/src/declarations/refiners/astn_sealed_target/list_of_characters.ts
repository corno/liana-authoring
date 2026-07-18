import type * as p_ from 'pareto-core/interface/refiner'

//schemas
import type * as s_out from "astn-core/modules/serialization/schemas/sealed_target"
import type * as s_function_unmarshall from "../../../interface/schemas/unmarshall_result_from_list_of_characters.js"
import type * as s_function_seal from "../../../interface/schemas/seal.js"
import type * as s_in from "astn-core/modules/deserialization/schemas/list_of_characters"


export type Document = p_.Refiner_With_Parameter<
    s_out.Document,
    s_function_seal.Error,
    s_in.List_Of_Characters,
    {
        'unmarshall': s_function_unmarshall.Parameters
    }
>

