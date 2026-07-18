import * as p_ from 'pareto-core/implementation/refiner'

import type * as interface_ from "../../../declarations/refiners/unmarshall_result/list_of_characters.js"

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