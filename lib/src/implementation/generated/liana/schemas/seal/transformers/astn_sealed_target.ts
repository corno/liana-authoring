
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/_p_change_context'

import _p_text_from_list from 'pareto-core/dist/_p_text_from_list'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/seal/signatures/transformers/astn_sealed_target"

import * as t_out from "astn-core/dist/interface/generated/liana/schemas/sealed_target/data"

import * as v_primitives_to_text from "liana-core/dist/implementation/manual/transformers/primitives/text"

import * as v_external_path from "../../path/transformers/astn_sealed_target"

export const Result: t_signatures.Result = ($) => ['text', {
    'delimiter': ['quote', null],
    'value': $,
}]

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
        "target": _p_change_context(
            $['target'],
            ($) => ['group', ['verbose', _p.dictionary.literal(
                {
                    "indentation": _p_change_context(
                        $['indentation'],
                        ($) => ['text', {
                            'delimiter': ['quote', null],
                            'value': $,
                        }],
                    ),
                    "newline": _p_change_context(
                        $['newline'],
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
