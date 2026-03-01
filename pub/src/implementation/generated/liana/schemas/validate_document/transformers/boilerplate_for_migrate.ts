
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/_p_change_context'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/validate_document/signatures/transformers/boilerplate_for_migrate"

import * as t_out from "../../../../../../interface/generated/liana/schemas/validate_document/data"

import * as v_location from "../../location/transformers/boilerplate_for_migrate"

import * as v_path from "../../path/transformers/boilerplate_for_migrate"

export const Result: t_signatures.Result = ($) => ({
    'diagnostics': _p_change_context(
        $['diagnostics'],
        ($) => _p.list.from.list(
            $,
        ).map(
            ($) => ({
                'severity': _p_change_context(
                    $['severity'],
                    ($) => _p.decide.state(
                        $,
                        ($): t_out.Result.diagnostics.L.severity => {
                            switch ($[0]) {
                                case 'error':
                                    return _p.ss(
                                        $,
                                        ($) => ['error', null],
                                    )
                                case 'warning':
                                    return _p.ss(
                                        $,
                                        ($) => ['warning', null],
                                    )
                                case 'information':
                                    return _p.ss(
                                        $,
                                        ($) => ['information', null],
                                    )
                                case 'hint':
                                    return _p.ss(
                                        $,
                                        ($) => ['hint', null],
                                    )
                                default:
                                    return _p.au(
                                        $[0],
                                    )
                            }
                        },
                    ),
                ),
                'range': _p_change_context(
                    $['range'],
                    ($) => v_location.Range(
                        $,
                    ),
                ),
                'message': _p_change_context(
                    $['message'],
                    ($) => $,
                ),
                'related information': _p_change_context(
                    $['related information'],
                    ($) => _p.optional.from.optional(
                        $,
                    ).map(
                        ($) => _p.list.from.list(
                            $,
                        ).map(
                            ($) => ({
                                'location': _p_change_context(
                                    $['location'],
                                    ($) => ({
                                        'file path': _p_change_context(
                                            $['file path'],
                                            ($) => v_path.Node_Path(
                                                $,
                                            ),
                                        ),
                                        'range': _p_change_context(
                                            $['range'],
                                            ($) => v_location.Range(
                                                $,
                                            ),
                                        ),
                                    }),
                                ),
                                'message': _p_change_context(
                                    $['message'],
                                    ($) => $,
                                ),
                            }),
                        ),
                    ),
                ),
            }),
        ),
    ),
})

export const Parameters: t_signatures.Parameters = ($) => ({
    'content': _p_change_context(
        $['content'],
        ($) => $,
    ),
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
})
