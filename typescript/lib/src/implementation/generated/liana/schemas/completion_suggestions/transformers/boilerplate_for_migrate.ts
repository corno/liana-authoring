
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/specials/change_context'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/completion_suggestions/signatures/transformers/boilerplate_for_migrate"

import * as t_out from "../../../../../../interface/generated/liana/schemas/completion_suggestions/data"

import * as v_location from "../../location/transformers/boilerplate_for_migrate"

import * as v_text_edits from "../../text_edits/transformers/boilerplate_for_migrate"

export const Completion_Suggestions: t_signatures.Completion_Suggestions = ($) => _p.optional.from.optional(
    $,
).map(
    ($) => ({
        'type': _p_change_context(
            $['type'],
            ($) => _p.decide.state(
                $,
                ($): t_out.Completion_Suggestions.O.type_ => {
                    switch ($[0]) {
                        case 'missing value':
                            return _p.ss(
                                $,
                                ($) => ['missing value', null],
                            )
                        case 'missing option':
                            return _p.ss(
                                $,
                                ($) => ['missing option', null],
                            )
                        case 'reference':
                            return _p.ss(
                                $,
                                ($) => ['reference', null],
                            )
                        case 'property name':
                            return _p.ss(
                                $,
                                ($) => ['property name', null],
                            )
                        case 'option name':
                            return _p.ss(
                                $,
                                ($) => ['option name', null],
                            )
                        default:
                            return _p.au(
                                $[0],
                            )
                    }
                },
            ),
        ),
        'suggestions': _p_change_context(
            $['suggestions'],
            ($) => _p.list.from.list(
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
            ),
        ),
    }),
)
