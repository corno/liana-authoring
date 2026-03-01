import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import * as _pdev from "pareto-core-dev"

import * as d_function from "../../../interface/generated/liana/schemas/convert_to_json/data"

type Signature = _pi.Refiner_With_Parameter<string, null, string, d_function.Parameters>

//dependencies
import * as t_ast_2_json from "astn/dist/implementation/manual/transformers/parse_tree/json_target"
import * as t_json_to_text from "pareto-json/dist/implementation/manual/transformers/json/text"
import * as r_astn_parse_tree_from_text from "astn-core/dist/implementation/manual/refiners/parse_tree/text"


export const $$: Signature = ($, abort, $p,) => t_json_to_text.Value(
    t_ast_2_json.Document(
        r_astn_parse_tree_from_text.Document(
            $,
            ($) => abort(null),
            {
                'document resource identifier': $p.source['document resource identifier'],
                'tab size': $p.source['tab size']
            },
        )
    ),
    $p.target
)