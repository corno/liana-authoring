
import * as p_ from 'pareto-core/implementation/transformer'

import p_change_context from 'pareto-core/implementation/refiner/specials/change_context'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/get_completion_suggestions/signatures/transformers/boilerplate_for_migrate.js"

import * as t_out from "../../../../../../interface/generated/liana/schemas/get_completion_suggestions/data.js"

import * as v_completion_suggestions from "../../completion_suggestions/transformers/boilerplate_for_migrate.js"

import * as v_location from "../../location/transformers/boilerplate_for_migrate.js"

import * as v_path_unrestricted from "../../path_unrestricted/transformers/boilerplate_for_migrate.js"

export const Result: t_signatures.Result = ($) => ({
    'completion suggestions': p_change_context(
        $['completion suggestions'],
        ($) => v_completion_suggestions.Completion_Suggestions(
            $,
        ),
    ),
})

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
    'position': p_change_context(
        $['position'],
        ($) => v_location.Position(
            $,
        ),
    ),
    'indent': p_change_context(
        $['indent'],
        ($) => $,
    ),
})
