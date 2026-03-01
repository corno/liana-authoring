
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/_p_change_context'

import _p_text_from_list from 'pareto-core/dist/_p_text_from_list'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/get_completion_suggestions/signatures/transformers/astn_sealed_target"

import * as t_out from "astn-core/dist/interface/generated/liana/schemas/sealed_target/data"

import * as v_primitives_to_text from "liana-core/dist/implementation/manual/transformers/primitives/text"

import * as v_external_completion_suggestions from "../../completion_suggestions/transformers/astn_sealed_target"

import * as v_external_location from "../../location/transformers/astn_sealed_target"

import * as v_external_path from "../../path/transformers/astn_sealed_target"

export const Result: t_signatures.Result = ($) => ['group', ['verbose', _p.dictionary.literal(
    {
        "completion suggestions": _p_change_context(
            $['completion suggestions'],
            ($) => v_external_completion_suggestions.Completion_Suggestions(
                $,
            ),
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
        "source": _p_change_context(
            $['source'],
            ($) => ['group', ['verbose', _p.dictionary.literal(
                {
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
            )]],
        ),
        "position": _p_change_context(
            $['position'],
            ($) => v_external_location.Position(
                $,
            ),
        ),
        "indent": _p_change_context(
            $['indent'],
            ($) => ['text', {
                'delimiter': ['quote', null],
                'value': $,
            }],
        ),
    },
)]]
