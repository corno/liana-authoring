import * as pt from 'pareto-core/dist/assign'
import * as p_ri from 'pareto-core/dist/refiner/interface'

//data types
import * as d_out from "../../../../interface/to_be_generated/unmarshall_result"
import * as d_function from "../../../../interface/to_be_generated/unmarshall_result_from_loc"
import * as d_in from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"

export type Value = p_ri.Refiner_With_Parameter<d_out.Value, d_function.Error, d_in.List_of_Characters, d_function.Parameters>
export type Document = p_ri.Refiner_With_Parameter<d_out.Document, d_function.Error, d_in.List_of_Characters, d_function.Parameters>

//depencencies
import * as r_from_parse_tree from "./astn_parse_tree"
import * as r_parse_tree_from_list_of_characters from "astn-core/dist/implementation/manual/refiners/parse_tree/list_of_characters"

export const Document: Document = ($, abort, $p) => {

    return r_from_parse_tree.Document(
        r_parse_tree_from_list_of_characters.Document(
            $,
            ($) => abort($),
            {
                'tab size': $p['tab size'],
            },
        ),
        {
            'definition': $p.module,
            'property path': pt.list.literal([]),
        }
    )
}