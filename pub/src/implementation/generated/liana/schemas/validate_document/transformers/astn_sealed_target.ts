
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/_p_change_context'

import _p_text_from_list from 'pareto-core/dist/_p_text_from_list'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/validate_document/signatures/transformers/astn_sealed_target"

import * as t_out from "astn-core/dist/interface/generated/liana/schemas/sealed_target/data"

import * as v_primitives_to_text from "liana-core/dist/implementation/manual/transformers/primitives/text"

import * as v_external_location from "../../location/transformers/astn_sealed_target"

import * as v_external_path from "../../path/transformers/astn_sealed_target"

export const Result: t_signatures.Result = ($) => ['group', ['verbose', _p.dictionary.literal(
    {
        "diagnostics": _p_change_context(
            $['diagnostics'],
            ($) => ['list', _p.list.from.list(
                $,
            ).map(
                ($) => ['group', ['verbose', _p.dictionary.literal(
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
                            ($) => v_external_location.Range(
                                $,
                            ),
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
                                    ($) => ['group', ['verbose', _p.dictionary.literal(
                                        {
                                            "location": _p_change_context(
                                                $['location'],
                                                ($) => ['group', ['verbose', _p.dictionary.literal(
                                                    {
                                                        "file path": _p_change_context(
                                                            $['file path'],
                                                            ($) => v_external_path.Node_Path(
                                                                $,
                                                            ),
                                                        ),
                                                        "range": _p_change_context(
                                                            $['range'],
                                                            ($) => v_external_location.Range(
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
                    },
                )]],
            )],
        ),
    },
)]]

export const Parameters: t_signatures.Parameters = ($) => ['group', ['verbose', _p.dictionary.literal(
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
            ($) => v_external_path.Node_Path(
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
