import * as p_ from 'pareto-core/implementation/refiner'
import type * as p_i from 'pareto-core/interface/refiner'

//data types
import type * as d_out from "../../../../interface/data/unmarshall_result.js"
import type * as d_function from "../../../../interface/data/unmarshall_result_from_list_of_characters.js"
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
import * as temp_interface_ from "../../../../interface/declarations/refiners/unmarshall_result/list_of_characters.js"

//depencencies
import * as t_parse_tree_to_unmarshall_result from "../../transformers/astn_parse_tree/unmarshall_result.js"
import * as r_parse_tree_from_list_of_characters from "astn-core/implementation/manual/refiners/parse_tree/list_of_characters"

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