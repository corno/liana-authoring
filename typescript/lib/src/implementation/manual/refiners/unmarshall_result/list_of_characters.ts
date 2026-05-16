import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'

//data types
import * as d_out from "../../../../interface/to_be_generated/unmarshall_result"
import * as d_function from "../../../../interface/to_be_generated/unmarshall_result_from_loc"
import * as d_in from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"

export type Value = _pi.Refiner_With_Parameter<d_out.Value, d_function.Error, d_in.List_of_Characters, d_function.Parameters>
export type Document = _pi.Refiner_With_Parameter<d_out.Document, d_function.Error, d_in.List_of_Characters, d_function.Parameters>

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
            'definition': _p.decide.state($p.schema, ($) => {
                switch ($[0]) {
                    case 'constrained': return _p.ss($, ($) => $.entry.signature.module)
                    case 'unconstrained':return _p.ss($, ($) => $.entry)
                    default: return _p.au($[0])
                }
            }),
            'definition path': _p.decide.state($p.schema, ($) => {
                switch ($[0]) {
                    case 'constrained': return _p.ss($, ($) => $.id)
                    case 'unconstrained':return _p.ss($, ($) => $.id)
                    default: return _p.au($[0])
                }
            }),
            'property path': _p.list.literal([]),
        }
    )
}