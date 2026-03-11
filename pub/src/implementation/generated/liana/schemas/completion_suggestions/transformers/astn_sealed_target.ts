
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/_p_change_context'

import _p_text_from_list from 'pareto-core/dist/_p_text_from_list'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/completion_suggestions/signatures/transformers/astn_sealed_target"

import * as t_out from "astn-core/dist/interface/generated/liana/schemas/sealed_target/data"

import * as v_primitives_to_text from "liana-core/dist/implementation/manual/transformers/primitives/text"

import * as v_external_location from "../../location/transformers/astn_sealed_target"

import * as v_external_text_edits from "../../text_edits/transformers/astn_sealed_target"

export const Completion_Suggestions: t_signatures.Completion_Suggestions = ($) => ['list', _p.list.from.list(
    $,
).map(
    ($) => ['group', ['verbose', _p.dictionary.literal(
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
            "additional text edits": _p_change_context(
                $['additional text edits'],
                ($) => v_external_text_edits.Text_Edits(
                    $,
                ),
            ),
            "type": _p_change_context(
                $['type'],
                ($) => ['state', _p.decide.state(
                    $,
                    ($): t_out.Value.state => {
                        switch ($[0]) {
                            case 'boolean':
                                return _p.ss(
                                    $,
                                    ($) => ({
                                        'option': 'boolean',
                                        'value': ['nothing', null],
                                    }),
                                )
                            case 'component':
                                return _p.ss(
                                    $,
                                    ($) => ({
                                        'option': 'component',
                                        'value': ['nothing', null],
                                    }),
                                )
                            case 'dictionary':
                                return _p.ss(
                                    $,
                                    ($) => ({
                                        'option': 'dictionary',
                                        'value': ['nothing', null],
                                    }),
                                )
                            case 'group':
                                return _p.ss(
                                    $,
                                    ($) => ({
                                        'option': 'group',
                                        'value': ['nothing', null],
                                    }),
                                )
                            case 'list':
                                return _p.ss(
                                    $,
                                    ($) => ({
                                        'option': 'list',
                                        'value': ['nothing', null],
                                    }),
                                )
                            case 'nothing':
                                return _p.ss(
                                    $,
                                    ($) => ({
                                        'option': 'nothing',
                                        'value': ['nothing', null],
                                    }),
                                )
                            case 'number':
                                return _p.ss(
                                    $,
                                    ($) => ({
                                        'option': 'number',
                                        'value': ['nothing', null],
                                    }),
                                )
                            case 'optional':
                                return _p.ss(
                                    $,
                                    ($) => ({
                                        'option': 'optional',
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
                            case 'state':
                                return _p.ss(
                                    $,
                                    ($) => ({
                                        'option': 'state',
                                        'value': ['nothing', null],
                                    }),
                                )
                            case 'text':
                                return _p.ss(
                                    $,
                                    ($) => ({
                                        'option': 'text',
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
    )]],
)]
