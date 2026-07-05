
import * as p_ from 'pareto-core/implementation/refiner'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/text_edits/signatures/refiners/list_of_characters.js"

import * as v_deserialize from "astn-core/implementation/manual/refiners/parse_tree/list_of_characters"

import * as v_unmarshall from "./astn_parse_tree.js"

export const Text_Edits: t_signatures.Text_Edits = ($, abort, $p) => v_unmarshall.Text_Edits(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse error', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshall error', $],
    ),
)
