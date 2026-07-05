
import * as p_ from 'pareto-core/implementation/transformer'

import p_change_context from 'pareto-core/implementation/refiner/specials/change_context'

import _p_text_from_list from 'pareto-core/implementation/transformer/specials/text_from_list'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/format/signatures/transformers/astn_sealed_target.js"

import * as t_out from "astn-core/interface/generated/liana/schemas/sealed_target/data"

import * as v_primitives_to_text from "liana-core/implementation/manual/transformers/primitives/text"

import * as v_external_location from "../../location/transformers/astn_sealed_target.js"

import * as v_external_text_edits from "../../text_edits/transformers/astn_sealed_target.js"

export const Result: t_signatures.Result = ($) => v_external_text_edits.Text_Edits(
    $,
)

export const Error: t_signatures.Error = ($) => ['group', ['verbose', p_.literal.dictionary(
    {
        "message": p_change_context(
            $['message'],
            ($) => ['text', {
                'delimiter': ['quote', null],
                'value': $,
            }],
        ),
    },
)]]

export const Parameters: t_signatures.Parameters = ($) => ['group', ['verbose', p_.literal.dictionary(
    {
        "options": p_change_context(
            $['options'],
            ($) => ['group', ['verbose', p_.literal.dictionary(
                {
                    "insert spaces": p_change_context(
                        $['insert spaces'],
                        ($) => ['text', {
                            'delimiter': ['none', null],
                            'value': v_primitives_to_text.true_false(
                                $,
                            ),
                        }],
                    ),
                    "preserve delimiters": p_change_context(
                        $['preserve delimiters'],
                        ($) => ['text', {
                            'delimiter': ['none', null],
                            'value': v_primitives_to_text.true_false(
                                $,
                            ),
                        }],
                    ),
                    "preserve final newline state": p_change_context(
                        $['preserve final newline state'],
                        ($) => ['text', {
                            'delimiter': ['none', null],
                            'value': v_primitives_to_text.true_false(
                                $,
                            ),
                        }],
                    ),
                    "preserve commas": p_change_context(
                        $['preserve commas'],
                        ($) => ['text', {
                            'delimiter': ['none', null],
                            'value': v_primitives_to_text.true_false(
                                $,
                            ),
                        }],
                    ),
                    "indent string": p_change_context(
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
