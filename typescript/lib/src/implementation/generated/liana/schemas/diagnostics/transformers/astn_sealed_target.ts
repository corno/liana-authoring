
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/implementation/specials/change_context'

import _p_text_from_list from 'pareto-core/dist/implementation/specials/text_from_list'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/diagnostics/signatures/transformers/astn_sealed_target"

import * as t_out from "astn-core/dist/interface/generated/liana/schemas/sealed_target/data"

import * as v_primitives_to_text from "liana-core/dist/implementation/manual/transformers/primitives/text"

import * as v_external_location from "../../astn_location/transformers/astn_sealed_target"

import * as v_external_path_unrestricted from "../../path_unrestricted/transformers/astn_sealed_target"

export const Diagnostics: t_signatures.Diagnostics = ($) => ['list', _p.list.from.list(
    $,
).map(
    ($) => Diagnostic(
        $,
    ),
)]

export const Diagnostic: t_signatures.Diagnostic = ($) => ['group', ['verbose', _p.literal.dictionary(
    {
        "severity": _p_change_context(
            $['severity'],
            ($) => ['state', _p.decide.state(
                $,
                ($): t_out.Value.state => {
                    switch ($[0]) {
                        case 'error':
                            return _p.ss(
                                $,
                                ($) => ({
                                    'option': 'error',
                                    'value': ['nothing', null],
                                }),
                            )
                        case 'warning':
                            return _p.ss(
                                $,
                                ($) => ({
                                    'option': 'warning',
                                    'value': ['nothing', null],
                                }),
                            )
                        case 'information':
                            return _p.ss(
                                $,
                                ($) => ({
                                    'option': 'information',
                                    'value': ['nothing', null],
                                }),
                            )
                        case 'hint':
                            return _p.ss(
                                $,
                                ($) => ({
                                    'option': 'hint',
                                    'value': ['nothing', null],
                                }),
                            )
                        default:
                            return _p.au(
                                $[0],
                            )
                    }
                },
            )],
        ),
        "range": _p_change_context(
            $['range'],
            ($) => ['optional', _p.decide.optional(
                $,
                ($): t_out.Value.optional => ['set', v_external_location.Possible_Range(
                    $,
                )],
                () => ['not set', null],
            )],
        ),
        "message": _p_change_context(
            $['message'],
            ($) => ['text', {
                'delimiter': ['quote', null],
                'value': $,
            }],
        ),
        "related information": _p_change_context(
            $['related information'],
            ($) => ['optional', _p.decide.optional(
                $,
                ($): t_out.Value.optional => ['set', ['list', _p.list.from.list(
                    $,
                ).map(
                    ($) => ['group', ['verbose', _p.literal.dictionary(
                        {
                            "location": _p_change_context(
                                $['location'],
                                ($) => ['group', ['verbose', _p.literal.dictionary(
                                    {
                                        "file path": _p_change_context(
                                            $['file path'],
                                            ($) => v_external_path_unrestricted.Node_Path(
                                                $,
                                            ),
                                        ),
                                        "range": _p_change_context(
                                            $['range'],
                                            ($) => v_external_location.Possible_Range(
                                                $,
                                            ),
                                        ),
                                    },
                                )]],
                            ),
                            "message": _p_change_context(
                                $['message'],
                                ($) => ['text', {
                                    'delimiter': ['quote', null],
                                    'value': $,
                                }],
                            ),
                        },
                    )]],
                )]],
                () => ['not set', null],
            )],
        ),
        "type": _p_change_context(
            $['type'],
            ($) => ['state', _p.decide.state(
                $,
                ($): t_out.Value.state => {
                    switch ($[0]) {
                        case 'semantic':
                            return _p.ss(
                                $,
                                ($) => ({
                                    'option': 'semantic',
                                    'value': ['nothing', null],
                                }),
                            )
                        case 'deserialize':
                            return _p.ss(
                                $,
                                ($) => ({
                                    'option': 'deserialize',
                                    'value': ['nothing', null],
                                }),
                            )
                        case 'schema':
                            return _p.ss(
                                $,
                                ($) => ({
                                    'option': 'schema',
                                    'value': ['nothing', null],
                                }),
                            )
                        default:
                            return _p.au(
                                $[0],
                            )
                    }
                },
            )],
        ),
    },
)]]

export const Result: t_signatures.Result = ($) => ['group', ['verbose', _p.literal.dictionary(
    {
        "diagnostics": _p_change_context(
            $['diagnostics'],
            ($) => Diagnostics(
                $,
            ),
        ),
    },
)]]

export const Parameters: t_signatures.Parameters = ($) => ['group', ['verbose', _p.literal.dictionary(
    {
        "content": _p_change_context(
            $['content'],
            ($) => ['text', {
                'delimiter': ['quote', null],
                'value': $,
            }],
        ),
        "file path": _p_change_context(
            $['file path'],
            ($) => v_external_path_unrestricted.Node_Path(
                $,
            ),
        ),
        "tab size": _p_change_context(
            $['tab size'],
            ($) => ['text', {
                'delimiter': ['none', null],
                'value': v_primitives_to_text.decimal(
                    $,
                ),
            }],
        ),
    },
)]]
