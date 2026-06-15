
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/specials/change_context'

import _p_text_from_list from 'pareto-core/dist/specials/text_from_list'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/location/signatures/transformers/astn_sealed_target"

import * as t_out from "astn-core/dist/interface/generated/liana/schemas/sealed_target/data"

import * as v_primitives_to_text from "liana-core/dist/implementation/manual/transformers/primitives/text"

export const Position: t_signatures.Position = ($) => ['group', ['verbose', _p.literal.dictionary(
    {
        "line": _p_change_context(
            $['line'],
            ($) => ['text', {
                'delimiter': ['none', null],
                'value': v_primitives_to_text.decimal(
                    $,
                ),
            }],
        ),
        "character": _p_change_context(
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

export const Range_FE: t_signatures.Range_FE = ($) => ['group', ['verbose', _p.literal.dictionary(
    {
        "start": _p_change_context(
            $['start'],
            ($) => Position(
                $,
            ),
        ),
        "end": _p_change_context(
            $['end'],
            ($) => Position(
                $,
            ),
        ),
    },
)]]
