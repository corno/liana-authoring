
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/implementation/specials/change_context'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/astn_location/signatures/transformers/boilerplate_for_migrate"

import * as t_out from "../../../../../../interface/generated/liana/schemas/astn_location/data"

export const Range: t_signatures.Range = ($) => ({
    'start': _p_change_context(
        $['start'],
        ($) => Location(
            $,
        ),
    ),
    'end': _p_change_context(
        $['end'],
        ($) => Location(
            $,
        ),
    ),
})

export const Possible_Range: t_signatures.Possible_Range = ($) => _p.decide.state(
    $,
    ($): t_out.Possible_Range => {
        switch ($[0]) {
            case 'range':
                return _p.ss(
                    $,
                    ($) => ['range', Range(
                        $,
                    )],
                )
            case 'end of document':
                return _p.ss(
                    $,
                    ($) => ['end of document', {
                        'end': _p_change_context(
                            $['end'],
                            ($) => Location(
                                $,
                            ),
                        ),
                    }],
                )
            default:
                return _p.au(
                    $[0],
                )
        }
    },
)

export const Location: t_signatures.Location = ($) => ({
    'relative': _p_change_context(
        $['relative'],
        ($) => Relative_Location(
            $,
        ),
    ),
    'absolute': _p_change_context(
        $['absolute'],
        ($) => $,
    ),
})

export const Relative_Location: t_signatures.Relative_Location = ($) => ({
    'line': _p_change_context(
        $['line'],
        ($) => $,
    ),
    'column': _p_change_context(
        $['column'],
        ($) => $,
    ),
})
