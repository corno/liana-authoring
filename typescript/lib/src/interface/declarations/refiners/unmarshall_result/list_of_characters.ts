import * as p_ from 'pareto-core/implementation/refiner'
import type * as p_i from 'pareto-core/interface/refiner'

//data types
import type * as d_out from "../../../data/unmarshall_result.js"
import type * as d_function from "../../../data/unmarshall_result_from_list_of_characters.js"
import type * as d_in from "pareto-fountain-pen/interface/generated/liana/schemas/list_of_characters/data"

export namespace interface_ {
    // export type Value = p_i.Refiner_With_Parameter<
    //     d_out.Value,
    //     d_function.Error,
    //     d_in.List_of_Characters,
    //     d_function.Parameters
    // >
    export type Document = p_i.Refiner_With_Parameter<
        d_out.Document,
        d_function.Error,
        d_in.List_of_Characters,
        d_function.Parameters
    >
}
