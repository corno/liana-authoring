
import type * as s_function_seal from "../sealed_target_from_parse_tree/schema.js"
import type * as s_function_unmarshall from "../unmarshall_result_from_list_of_characters/schema.js"


export type Parameters = {
    'unmarshall': s_function_unmarshall.Parameters,
    'target': {
        'indentation': string,
        'newline': string,
    }
}

export type Error =
    | ['seal', s_function_seal.Error]
    | ['unmarshall', s_function_unmarshall.Error]



