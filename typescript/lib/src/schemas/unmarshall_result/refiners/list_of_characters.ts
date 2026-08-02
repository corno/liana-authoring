
import * as p_ from 'pareto-core/implementation/refiner'

//schemas
import type * as s_out from "../../../schemas/unmarshall_result/schema.js"
import type * as s_function from "../../../schemas/unmarshall_result_from_list_of_characters/schema.js"
import type * as s_in from "astn-core/modules/deserialization/schemas/list_of_characters/schema"


// export type Value = p_.Refiner_With_Parameter<
//     s_out.Value,
//     s_function.Error,
//     s_in.List_of_Characters,
//     s_function.Parameters
// >
namespace declarations_ {

    export type Document = p_.Refiner_With_Parameter<
        s_out.Document,
        s_function.Error,
        s_in.List_Of_Characters,
        s_function.Parameters
    >
}


//depencencies
import * as t_parse_tree_to_unmarshall_result from "../../astn_parse_tree/transformers/unmarshall_result.js"
import * as r_parse_tree_from_list_of_characters from "astn-core/modules/deserialization/schemas/parse_tree/refiners/list_of_characters"

export const Document: declarations_.Document = ($, abort, $p) => {

    return t_parse_tree_to_unmarshall_result.Document(
        r_parse_tree_from_list_of_characters.Document(
            $,
            ($) => abort($),
            {
                'tab size': $p['tab size'],
            },
        ),
        {
            'definition': $p.module,
            'property path': p_.literal.list([]),
        }
    )
}
