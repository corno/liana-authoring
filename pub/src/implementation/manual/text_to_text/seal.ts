import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'

import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/text/data"
import * as d_in from "pareto-fountain-pen/dist/interface/generated/liana/schemas/text/data"
import * as d_function from "../../../interface/to_be_generated/seal"

type Signature = _pi.Refiner_With_Parameter<d_out.Text, d_function.Error, d_in.Text, d_function.Parameters>

//dependencies
import * as r_sealed_target_from_loc from "../refiners/astn_sealed_target/list_of_characters"
import * as t_sealed_target_to_text from "astn-core/dist/implementation/manual/transformers/sealed_target/text"
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'


export const $$: Signature = ($, abort, $p) => t_sealed_target_to_text.Document(
    r_sealed_target_from_loc.Document(
        _p_list_from_text($, ($) => $),
        ($) => abort($),
        {
            'unmarshall': $p.unmarshall,
        }
    ),
    $p.target
)