
import * as p_ from 'pareto-core/implementation/transformer'

import p_change_context from 'pareto-core/implementation/refiner/specials/change_context'

import _p_text_from_list from 'pareto-core/implementation/transformer/specials/text_from_list'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/get_completion_suggestions/signatures/transformers/astn_sealed_target.js"

import * as t_out from "astn-core/interface/generated/liana/schemas/sealed_target/data"

import * as v_primitives_to_text from "liana-core/implementation/manual/transformers/primitives/text"

import * as v_external_completion_suggestions from "../../completion_suggestions/transformers/astn_sealed_target.js"

import * as v_external_location from "../../location/transformers/astn_sealed_target.js"

import * as v_external_path_unrestricted from "../../path_unrestricted/transformers/astn_sealed_target.js"

export const Result: t_signatures.Result = ($) => ['group', ['verbose', p_.literal.dictionary(
    {
        "completion suggestions": p_change_context(
            $['completion suggestions'],
            ($) => v_external_completion_suggestions.Completion_Suggestions(
                $,
            ),
        ),
    },
)]]

export const Parameters: t_signatures.Parameters = ($) => ['group', ['verbose', p_.literal.dictionary(
    {
        "content": p_change_context(
            $['content'],
            ($) => ['text', {
                'delimiter': ['quote', null],
                'value': $,
            }],
        ),
        "source": p_change_context(
            $['source'],
            ($) => ['group', ['verbose', p_.literal.dictionary(
                {
                    "file path": p_change_context(
                        $['file path'],
                        ($) => v_external_path_unrestricted.Node_Path(
                            $,
                        ),
                    ),
                    "tab size": p_change_context(
                        $['tab size'],
                        ($) => ['text', {
                            'delimiter': ['none', null],
                            'value': v_primitives_to_text.decimal(
                                $,
                            ),
                        }],
                    ),
                },
            )]],
        ),
        "position": p_change_context(
            $['position'],
            ($) => v_external_location.Position(
                $,
            ),
        ),
        "indent": p_change_context(
            $['indent'],
            ($) => ['text', {
                'delimiter': ['quote', null],
                'value': $,
            }],
        ),
    },
)]]
