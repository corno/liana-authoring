
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/_p_change_context'

import _p_text_from_list from 'pareto-core/dist/_p_text_from_list'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/format/signatures/transformers/astn_sealed_target"

import * as t_out from "astn-core/dist/interface/generated/liana/schemas/sealed_target/data"

import * as v_primitives_to_text from "liana-core/dist/implementation/manual/transformers/primitives/text"

import * as v_external_location from "../../location/transformers/astn_sealed_target"

import * as v_external_text_edits from "../../text_edits/transformers/astn_sealed_target"

export const Result: t_signatures.Result = ($) => v_external_text_edits.Text_Edits(
    $,
)

export const Error: t_signatures.Error = ($) => ['group', ['verbose', _p.dictionary.literal(
    {
        "message": _p_change_context(
            $['message'],
            ($) => ['text', {
                'delimiter': ['quote', null],
                'value': $,
            }],
        ),
    },
)]]

export const Parameters: t_signatures.Parameters = ($) => ['group', ['verbose', _p.dictionary.literal(
    {
        "options": _p_change_context(
            $['options'],
            ($) => ['group', ['verbose', _p.dictionary.literal(
                {
                    "insert spaces": _p_change_context(
                        $['insert spaces'],
                        ($) => ['text', {
                            'delimiter': ['none', null],
                            'value': v_primitives_to_text.true_false(
                                $,
                            ),
                        }],
                    ),
                    "preserve delimiters": _p_change_context(
                        $['preserve delimiters'],
                        ($) => ['text', {
                            'delimiter': ['none', null],
                            'value': v_primitives_to_text.true_false(
                                $,
                            ),
                        }],
                    ),
                    "preserve final newline state": _p_change_context(
                        $['preserve final newline state'],
                        ($) => ['text', {
                            'delimiter': ['none', null],
                            'value': v_primitives_to_text.true_false(
                                $,
                            ),
                        }],
                    ),
                    "preserve commas": _p_change_context(
                        $['preserve commas'],
                        ($) => ['text', {
                            'delimiter': ['none', null],
                            'value': v_primitives_to_text.true_false(
                                $,
                            ),
                        }],
                    ),
                    "indent string": _p_change_context(
                        $['indent string'],
                        ($) => ['text', {
                            'delimiter': ['quote', null],
                            'value': $,
                        }],
                    ),
                },
            )]],
        ),
    },
)]]
