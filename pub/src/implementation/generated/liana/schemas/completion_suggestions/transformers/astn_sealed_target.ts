
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/_p_change_context'

import _p_text_from_list from 'pareto-core/dist/_p_text_from_list'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/completion_suggestions/signatures/transformers/astn_sealed_target"

import * as t_out from "astn-core/dist/interface/generated/liana/schemas/sealed_target/data"

import * as v_primitives_to_text from "liana-core/dist/implementation/manual/transformers/primitives/text"

import * as v_external_location from "../../location/transformers/astn_sealed_target"

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
        },
    )]],
)]
