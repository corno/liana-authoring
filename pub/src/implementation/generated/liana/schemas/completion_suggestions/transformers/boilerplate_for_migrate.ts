
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/_p_change_context'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/completion_suggestions/signatures/transformers/boilerplate_for_migrate"

import * as t_out from "../../../../../../interface/generated/liana/schemas/completion_suggestions/data"

import * as v_location from "../../location/transformers/boilerplate_for_migrate"

export const Completion_Suggestions: t_signatures.Completion_Suggestions = ($) => _p.list.from.list(
    $,
).map(
    ($) => ({
        'label': _p_change_context(
            $['label'],
            ($) => $,
        ),
        'insert text': _p_change_context(
            $['insert text'],
            ($) => $,
        ),
        'documentation': _p_change_context(
            $['documentation'],
            ($) => $,
        ),
    }),
)
