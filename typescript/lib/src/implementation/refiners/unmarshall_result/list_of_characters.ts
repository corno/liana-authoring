import * as p_ from 'pareto-core/implementation/refiner'

//schemas
import type * as s_function from "../../../interface/schemas/unmarshall_result_from_list_of_characters.js"
import type * as s_in from "../../../interface/schemas/list_of_characters.js"


// export type Value = p_.Refiner_With_Parameter<
//     s_out.Value,
//     s_function.Error,
//     s_in.List_Of_Characters,
//     s_function.Parameters
// >
export type Document = p_.Refiner_With_Parameter<
    s_out.Document,
    s_function.Error,
    s_in.List_Of_Characters,
    s_function.Parameters
>



//depencencies
import * as t_parse_tree_to_unmarshall_result from "../../transformers/astn_parse_tree/unmarshall_result.js"
import * as r_parse_tree_from_list_of_characters from "astn-core/implementation/refiners/parse_tree/list_of_characters"

export const Document: interface_.Document = ($, abort, $p) => {

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