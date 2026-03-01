
import * as _p from 'pareto-core/dist/assign'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/get_completion_suggestions/signatures/refiners/list_of_characters"

import * as v_deserialize from "astn-core/dist/implementation/manual/refiners/parse_tree/list_of_characters"

import * as v_unmarshall from "./astn_parse_tree"

export const Result: t_signatures.Result = ($, abort, $p) => v_unmarshall.Result(
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

export const Parameters: t_signatures.Parameters = ($, abort, $p) => v_unmarshall.Parameters(
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
