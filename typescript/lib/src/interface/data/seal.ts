
import * as d_function_seal from "../../interface/data/sealed_target_from_parse_tree"
import * as d_function_unmarshall from "./unmarshall_result_from_list_of_characters"


export type Parameters = {
    'unmarshall': d_function_unmarshall.Parameters,
    'target': {
        'indentation': string,
        'newline': string,
    }
}

export type Error =
    | ['seal', d_function_seal.Error]
    | ['unmarshall', d_function_unmarshall.Error]



