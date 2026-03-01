import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import * as _pdev from "pareto-core-dev"

import * as d_function from "../../../interface/generated/liana/schemas/seal/data"
import * as d_loc from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"
import * as d_seal from "../../../interface/to_be_generated/seal"

type Signature = _pi.Refiner_With_Parameter<d_loc.List_of_Characters, d_seal.Error, d_loc.List_of_Characters, d_seal.Parameters>

//dependencies
import * as r_sealed_target_from_loc from "../refiners/sealed_target/list_of_characters"
import * as t_sealed_target_to_loc from "astn-core/dist/implementation/manual/transformers/sealed_target/list_of_characters"


export const $$: Signature = ($, abort, $p,) => t_sealed_target_to_loc.Document(
    r_sealed_target_from_loc.Document(
        $,
        ($) => abort($),
        {
            'unmarshall': $p.unmarshall,
        }
    ),
    $p.target
)