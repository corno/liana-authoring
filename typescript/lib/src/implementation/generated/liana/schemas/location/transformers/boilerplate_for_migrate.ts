
import * as p_ from 'pareto-core/dist/implementation/transformer'

import p_change_context from 'pareto-core/dist/implementation/refiner/specials/change_context'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/location/signatures/transformers/boilerplate_for_migrate"

import * as t_out from "../../../../../../interface/generated/liana/schemas/location/data"

export const Position: t_signatures.Position = ($) => ({
    'line': p_change_context(
        $['line'],
        ($) => $,
    ),
    'character': p_change_context(
        $['character'],
        ($) => $,
    ),
})

export const Range_FE: t_signatures.Range_FE = ($) => ({
    'start': p_change_context(
        $['start'],
        ($) => Position(
            $,
        ),
    ),
    'end': p_change_context(
        $['end'],
        ($) => Position(
            $,
        ),
    ),
})
