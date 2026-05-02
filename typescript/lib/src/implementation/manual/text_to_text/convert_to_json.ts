import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'

import * as d_function from "../../../interface/generated/liana/schemas/convert_to_json/data"
import * as d_function_deserialize_parse_tree from "astn-core/dist/interface/generated/liana/schemas/deserialize_parse_tree/data"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/text/data"
import * as d_in from "pareto-fountain-pen/dist/interface/generated/liana/schemas/text/data"

type Signature = _pi.Refiner_With_Parameter<d_out.Text, d_function_deserialize_parse_tree.Error, d_in.Text, d_function.Parameters>

//dependencies
import * as t_ast_2_json from "astn/dist/implementation/manual/transformers/parse_tree/json_target"
import * as t_json_to_text from "pareto-json/dist/implementation/manual/transformers/json/text"
import * as r_astn_parse_tree_from_text from "astn-core/dist/implementation/manual/refiners/parse_tree/text"


export const $$: Signature = ($, abort, $p,) => t_json_to_text.Value(
    t_ast_2_json.Document(
        r_astn_parse_tree_from_text.Document(
            $,
            ($) => abort($),
            {
                'tab size': $p.source['tab size']
            },
        )
    ),
    $p.target
)