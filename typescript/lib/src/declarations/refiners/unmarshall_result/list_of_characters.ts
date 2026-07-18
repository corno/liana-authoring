
import type * as p_ from 'pareto-core/interface/refiner'

//schemas
import type * as s_out from "../../../interface/schemas/unmarshall_result.js"
import type * as s_function from "../../../interface/schemas/unmarshall_result_from_list_of_characters.js"
import type * as s_in from "pareto-fountain-pen/interface/data/list_of_characters"


// export type Value = p_.Refiner_With_Parameter<
//     s_out.Value,
//     s_function.Error,
//     s_in.List_of_Characters,
//     s_function.Parameters
// >
export type Document = p_.Refiner_With_Parameter<
    s_out.Document,
    s_function.Error,
    s_in.List_of_Characters,
    s_function.Parameters
>

