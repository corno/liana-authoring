
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/_p_change_context'

import _p_text_from_list from 'pareto-core/dist/_p_text_from_list'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/hover_info/signatures/transformers/astn_sealed_target"

import * as t_out from "astn-core/dist/interface/generated/liana/schemas/sealed_target/data"

import * as v_primitives_to_text from "liana-core/dist/implementation/manual/transformers/primitives/text"

export const Hover_Texts: t_signatures.Hover_Texts = ($) => ['optional', _p.decide.optional(
    $,
    ($): t_out.Value.optional => ['set', ['list', _p.list.from.list(
        $,
    ).map(
        ($) => ['text', {
            'delimiter': ['quote', null],
            'value': $,
        }],
    )]],
    () => ['not set', null],
)]
