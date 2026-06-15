
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/implementation/specials/change_context'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/diagnostics/signatures/transformers/boilerplate_for_migrate"

import * as t_out from "../../../../../../interface/generated/liana/schemas/diagnostics/data"

import * as v_location from "../../astn_location/transformers/boilerplate_for_migrate"

import * as v_path_unrestricted from "../../path_unrestricted/transformers/boilerplate_for_migrate"

export const Diagnostics: t_signatures.Diagnostics = ($) => _p.list.from.list(
    $,
).map(
    ($) => Diagnostic(
        $,
    ),
)

export const Diagnostic: t_signatures.Diagnostic = ($) => ({
    'severity': _p_change_context(
        $['severity'],
        ($) => _p.decide.state(
            $,
            ($): t_out.Diagnostic.severity => {
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
        ($) => _p.optional.from.optional(
            $,
        ).map(
            ($) => v_location.Possible_Range(
                $,
            ),
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
                                ($) => v_path_unrestricted.Node_Path(
                                    $,
                                ),
                            ),
                            'range': _p_change_context(
                                $['range'],
                                ($) => v_location.Possible_Range(
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
    'type': _p_change_context(
        $['type'],
        ($) => _p.decide.state(
            $,
            ($): t_out.Diagnostic.type_ => {
                switch ($[0]) {
                    case 'semantic':
                        return _p.ss(
                            $,
                            ($) => ['semantic', null],
                        )
                    case 'deserialize':
                        return _p.ss(
                            $,
                            ($) => ['deserialize', null],
                        )
                    case 'schema':
                        return _p.ss(
                            $,
                            ($) => ['schema', null],
                        )
                    default:
                        return _p.au(
                            $[0],
                        )
                }
            },
        ),
    ),
})

export const Result: t_signatures.Result = ($) => ({
    'diagnostics': _p_change_context(
        $['diagnostics'],
        ($) => Diagnostics(
            $,
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
        ($) => v_path_unrestricted.Node_Path(
            $,
        ),
    ),
    'tab size': _p_change_context(
        $['tab size'],
        ($) => $,
    ),
})
