
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/implementation/specials/change_context'

import _p_text_from_list from 'pareto-core/dist/implementation/specials/text_from_list'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/completion_suggestions/signatures/transformers/astn_sealed_target"

import * as t_out from "astn-core/dist/interface/generated/liana/schemas/sealed_target/data"

import * as v_primitives_to_text from "liana-core/dist/implementation/manual/transformers/primitives/text"

import * as v_external_location from "../../location/transformers/astn_sealed_target"

import * as v_external_text_edits from "../../text_edits/transformers/astn_sealed_target"

export const Completion_Suggestions: t_signatures.Completion_Suggestions = ($) => ['optional', _p.decide.optional(
    $,
    ($): t_out.Value.optional => ['set', ['group', ['verbose', _p.literal.dictionary(
        {
            "type": _p_change_context(
                $['type'],
                ($) => ['state', _p.decide.state(
                    $,
                    ($): t_out.Value.state => {
                        switch ($[0]) {
                            case 'missing value':
                                return _p.ss(
                                    $,
                                    ($) => ({
                                        'option': 'missing value',
                                        'value': ['nothing', null],
                                    }),
                                )
                            case 'missing option':
                                return _p.ss(
                                    $,
                                    ($) => ({
                                        'option': 'missing option',
                                        'value': ['nothing', null],
                                    }),
                                )
                            case 'reference':
                                return _p.ss(
                                    $,
                                    ($) => ({
                                        'option': 'reference',
                                        'value': ['nothing', null],
                                    }),
                                )
                            case 'property name':
                                return _p.ss(
                                    $,
                                    ($) => ({
                                        'option': 'property name',
                                        'value': ['nothing', null],
                                    }),
                                )
                            case 'option name':
                                return _p.ss(
                                    $,
                                    ($) => ({
                                        'option': 'option name',
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
            "suggestions": _p_change_context(
                $['suggestions'],
                ($) => ['list', _p.list.from.list(
                    $,
                ).map(
                    ($) => ['group', ['verbose', _p.literal.dictionary(
                        {
                            "label": _p_change_context(
                                $['label'],
                                ($) => ['text', {
                                    'delimiter': ['quote', null],
                                    'value': $,
                                }],
                            ),
                            "insert text": _p_change_context(
                                $['insert text'],
                                ($) => ['text', {
                                    'delimiter': ['quote', null],
                                    'value': $,
                                }],
                            ),
                            "documentation": _p_change_context(
                                $['documentation'],
                                ($) => ['text', {
                                    'delimiter': ['quote', null],
                                    'value': $,
                                }],
                            ),
                        },
                    )]],
                )],
            ),
        },
    )]]],
    () => ['not set', null],
)]
