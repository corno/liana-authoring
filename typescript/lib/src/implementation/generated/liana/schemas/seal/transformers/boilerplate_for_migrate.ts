
import * as p_ from 'pareto-core/dist/implementation/transformer'

import p_change_context from 'pareto-core/dist/implementation/refiner/specials/change_context'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/seal/signatures/transformers/boilerplate_for_migrate"

import * as t_out from "../../../../../../interface/generated/liana/schemas/seal/data"

import * as v_path_unrestricted from "../../path_unrestricted/transformers/boilerplate_for_migrate"

export const Result: t_signatures.Result = ($) => $

export const Parameters: t_signatures.Parameters = ($) => ({
    'content': p_change_context(
        $['content'],
        ($) => $,
    ),
    'source': p_change_context(
        $['source'],
        ($) => ({
            'file path': p_change_context(
                $['file path'],
                ($) => v_path_unrestricted.Node_Path(
                    $,
                ),
            ),
            'tab size': p_change_context(
                $['tab size'],
                ($) => $,
            ),
        }),
    ),
    'target': p_change_context(
        $['target'],
        ($) => ({
            'indentation': p_change_context(
                $['indentation'],
                ($) => $,
            ),
            'newline': p_change_context(
                $['newline'],
                ($) => $,
            ),
        }),
    ),
})
