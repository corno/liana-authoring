
import * as p_ from 'pareto-core/dist/implementation/transformer'

import p_change_context from 'pareto-core/dist/implementation/specials/change_context'

import _p_text_from_list from 'pareto-core/dist/implementation/specials/text_from_list'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/get_on_hover_info/signatures/transformers/astn_sealed_target"

import * as t_out from "astn-core/dist/interface/generated/liana/schemas/sealed_target/data"

import * as v_primitives_to_text from "liana-core/dist/implementation/manual/transformers/primitives/text"

import * as v_external_hover_info from "../../hover_info/transformers/astn_sealed_target"

import * as v_external_location from "../../location/transformers/astn_sealed_target"

import * as v_external_path_unrestricted from "../../path_unrestricted/transformers/astn_sealed_target"

export const Result: t_signatures.Result = ($) => ['group', ['verbose', p_.literal.dictionary(
    {
        "contents": p_change_context(
            $['contents'],
            ($) => ['group', ['verbose', p_.literal.dictionary(
                {
                    "hover texts": p_change_context(
                        $['hover texts'],
                        ($) => v_external_hover_info.Hover_Texts(
                            $,
                        ),
                    ),
                },
            )]],
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
    },
)]]
