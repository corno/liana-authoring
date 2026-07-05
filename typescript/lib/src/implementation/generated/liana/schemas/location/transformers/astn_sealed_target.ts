
import * as p_ from 'pareto-core/implementation/transformer'

import p_change_context from 'pareto-core/implementation/refiner/specials/change_context'

import _p_text_from_list from 'pareto-core/implementation/transformer/specials/text_from_list'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/location/signatures/transformers/astn_sealed_target.js"

import * as t_out from "astn-core/interface/generated/liana/schemas/sealed_target/data"

import * as v_primitives_to_text from "liana-core/implementation/manual/transformers/primitives/text"

export const Position: t_signatures.Position = ($) => ['group', ['verbose', p_.literal.dictionary(
    {
        "line": p_change_context(
            $['line'],
            ($) => ['text', {
                'delimiter': ['none', null],
                'value': v_primitives_to_text.decimal(
                    $,
                ),
            }],
        ),
        "character": p_change_context(
            $['character'],
            ($) => ['text', {
                'delimiter': ['none', null],
                'value': v_primitives_to_text.decimal(
                    $,
                ),
            }],
        ),
    },
)]]

export const Range_FE: t_signatures.Range_FE = ($) => ['group', ['verbose', p_.literal.dictionary(
    {
        "start": p_change_context(
            $['start'],
            ($) => Position(
                $,
            ),
        ),
        "end": p_change_context(
            $['end'],
            ($) => Position(
                $,
            ),
        ),
    },
)]]
