import type * as p_ from 'pareto-core/interface/refiner'

//data types
import type * as d_out from "astn-core/interface/data/sealed_target"
import type * as d_function_unmarshall from "../../../interface/data/unmarshall_result_from_list_of_characters.js"
import type * as d_function_seal from "../../../interface/data/seal.js"
import type * as d_in from "pareto-fountain-pen/interface/data/list_of_characters"


export type Document = p_.Refiner_With_Parameter<
    d_out.Document,
    d_function_seal.Error,
    d_in.List_of_Characters,
    {
        'unmarshall': d_function_unmarshall.Parameters
    }
>

