
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/_p_change_context'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/location/signatures/transformers/boilerplate_for_migrate"

import * as t_out from "../../../../../../interface/generated/liana/schemas/location/data"

export const Position: t_signatures.Position = ($) => ({
    'line': _p_change_context(
        $['line'],
        ($) => $,
    ),
    'character': _p_change_context(
        $['character'],
        ($) => $,
    ),
})

export const Range: t_signatures.Range = ($) => ({
    'start': _p_change_context(
        $['start'],
        ($) => Position(
            $,
        ),
    ),
    'end': _p_change_context(
        $['end'],
        ($) => Position(
            $,
        ),
    ),
})
