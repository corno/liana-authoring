import * as p_ri from 'pareto-core/interface/refiner'
import p_list_from_text from 'pareto-core/implementation/refiner/specials/list_from_text'

import * as d_out from "pareto-fountain-pen/interface/generated/liana/schemas/text/data"
import * as d_in from "pareto-fountain-pen/interface/generated/liana/schemas/text/data"
import * as d_function from "../../../interface/data/seal.js"

type Signature = p_ri.Refiner_With_Parameter<
    d_out.Text,
    d_function.Error,
    d_in.Text,
    d_function.Parameters
>

//dependencies
import * as r_sealed_target_from_loc from "../refiners/astn_sealed_target/list_of_characters.js"
import * as t_sealed_target_to_text from "astn-core/implementation/manual/transformers/sealed_target/text"


export const $$: Signature = ($, abort, $p) => t_sealed_target_to_text.Document(
    r_sealed_target_from_loc.Document(
        p_list_from_text(
            $,
            ($) => $
        ),
        ($) => abort($),
        {
            'unmarshall': $p.unmarshall,
        }
    ),
    $p.target
)