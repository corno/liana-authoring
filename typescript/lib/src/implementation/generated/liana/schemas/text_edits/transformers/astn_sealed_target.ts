
import * as p_ from 'pareto-core/implementation/transformer'
import * as p_di from 'pareto-core/interface/data'
const p_decide_state = <State, B>($: State,  assign: ($: State) => B) => assign($)
const p_decide_optional = <OV extends p_di.Value, B extends p_di.Value>($: p_di.Optional_Value<OV>,  assign: ($: OV) => B,  otherwise: () => B) => p_.from.optional($).decide(assign, otherwise)
const p_decide_text = <B>($: string,  assign: ($: string) => B) => assign($)

import p_change_context from 'pareto-core/implementation/refiner/specials/change_context'

import _p_text_from_list from 'pareto-core/implementation/transformer/specials/text_from_list'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/text_edits/signatures/transformers/astn_sealed_target.js"

import * as t_out from "astn-core/interface/generated/liana/schemas/sealed_target/data"

import * as v_primitives_to_text from "liana-core/implementation/manual/transformers/primitives/text"

import * as v_external_location from "../../astn_location/transformers/astn_sealed_target.js"

export const Text_Edits: t_signatures.Text_Edits = ($) => ['list', p_.from.list($,
).map(
    ($) => ['state', p_decide_state(
        $,
        ($): t_out.Value.state => {
            switch ($[0]) {
                case 'replace':
                    return p_.option(
                        $,
                        ($) => ({
                            'option': 'replace',
                            'value': ['group', ['verbose', p_.literal.dictionary(
                                {
                                    "range": p_change_context(
                                        $['range'],
                                        ($) => v_external_location.Range(
                                            $,
                                        ),
                                    ),
                                    "text": p_change_context(
                                        $['text'],
                                        ($) => ['text', {
                                            'delimiter': ['quote', null],
                                            'value': $,
                                        }],
                                    ),
                                },
                            )]],
                        }),
                    )
                case 'delete':
                    return p_.option(
                        $,
                        ($) => ({
                            'option': 'delete',
                            'value': ['group', ['verbose', p_.literal.dictionary(
                                {
                                    "range": p_change_context(
                                        $['range'],
                                        ($) => v_external_location.Range(
                                            $,
                                        ),
                                    ),
                                },
                            )]],
                        }),
                    )
                case 'insert':
                    return p_.option(
                        $,
                        ($) => ({
                            'option': 'insert',
                            'value': ['group', ['verbose', p_.literal.dictionary(
                                {
                                    "location": p_change_context(
                                        $['location'],
                                        ($) => v_external_location.Location(
                                            $,
                                        ),
                                    ),
                                    "text": p_change_context(
                                        $['text'],
                                        ($) => ['text', {
                                            'delimiter': ['quote', null],
                                            'value': $,
                                        }],
                                    ),
                                },
                            )]],
                        }),
                    )
                default:
                    return p_.au(
                        $[0],
                    )
            }
        },
    )],
)]
