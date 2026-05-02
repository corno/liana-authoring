

import * as d_function_seal from "../../interface/to_be_generated/sealed_target_from_parse_tree"
import * as d_function_unmarshall from "../../interface/to_be_generated/unmarshall_result_from_loc"


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



