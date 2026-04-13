
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/_p_change_context'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/get_completion_suggestions/signatures/transformers/boilerplate_for_migrate"

import * as t_out from "../../../../../../interface/generated/liana/schemas/get_completion_suggestions/data"

import * as v_completion_suggestions from "../../completion_suggestions/transformers/boilerplate_for_migrate"

import * as v_location from "../../location/transformers/boilerplate_for_migrate"

import * as v_path from "../../path/transformers/boilerplate_for_migrate"

export const Result: t_signatures.Result = ($) => ({
    'completion suggestions': _p_change_context(
        $['completion suggestions'],
        ($) => v_completion_suggestions.Completion_Suggestions(
            $,
        ),
    ),
})

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
    'position': _p_change_context(
        $['position'],
        ($) => v_location.Position(
            $,
        ),
    ),
    'indent': _p_change_context(
        $['indent'],
        ($) => $,
    ),
})
