
import * as _p from 'pareto-core/dist/assign'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/sort_alphabetically/signatures/refiners/list_of_characters"

import * as v_deserialize from "astn-core/dist/implementation/manual/refiners/parse_tree/list_of_characters"

import * as v_unmarshall from "./astn_parse_tree"

export const Sort_Parameters: t_signatures.Sort_Parameters = ($, abort, $p) => v_unmarshall.Sort_Parameters(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse error', $],
        ),
        {
            'document resource identifier': $p['document resource identifier'],
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshall error', $],
    ),
)
