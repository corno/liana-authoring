
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/_p_change_context'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/seal/signatures/transformers/boilerplate_for_migrate"

import * as t_out from "../../../../../../interface/generated/liana/schemas/seal/data"

import * as v_path from "../../path/transformers/boilerplate_for_migrate"

export const Result: t_signatures.Result = ($) => $

export const Parameters: t_signatures.Parameters = ($) => ({
    'content': _p_change_context(
        $['content'],
        ($) => $,
    ),
    'source': _p_change_context(
        $['source'],
        ($) => ({
            'file path': _p_change_context(
                $['file path'],
                ($) => v_path.Node_Path(
                    $,
                ),
            ),
            'tab size': _p_change_context(
                $['tab size'],
                ($) => $,
            ),
        }),
    ),
    'target': _p_change_context(
        $['target'],
        ($) => ({
            'indentation': _p_change_context(
                $['indentation'],
                ($) => $,
            ),
            'newline': _p_change_context(
                $['newline'],
                ($) => $,
            ),
        }),
    ),
})
