
import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_di from 'pareto-core/dist/interface/data'
const p_decide_state = <State, B>($: State,  assign: ($: State) => B) => assign($)
const p_decide_optional = <OV extends p_di.Value, B extends p_di.Value>($: p_di.Optional_Value<OV>,  assign: ($: OV) => B,  otherwise: () => B) => p_.from.optional($).decide(assign, otherwise)
const p_decide_text = <B>($: string,  assign: ($: string) => B) => assign($)

import p_change_context from 'pareto-core/dist/implementation/refiner/specials/change_context'

import _p_text_from_list from 'pareto-core/dist/implementation/transformer/specials/text_from_list'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/completion_suggestions/signatures/transformers/astn_sealed_target"

import * as t_out from "astn-core/dist/interface/generated/liana/schemas/sealed_target/data"

import * as v_primitives_to_text from "liana-core/dist/implementation/manual/transformers/primitives/text"

import * as v_external_location from "../../location/transformers/astn_sealed_target"

import * as v_external_text_edits from "../../text_edits/transformers/astn_sealed_target"

export const Completion_Suggestions: t_signatures.Completion_Suggestions = ($) => ['optional', p_decide_optional(
    $,
    ($): t_out.Value.optional => ['set', ['group', ['verbose', p_.literal.dictionary(
        {
            "type": p_change_context(
                $['type'],
                ($) => ['state', p_decide_state(
                    $,
                    ($): t_out.Value.state => {
                        switch ($[0]) {
                            case 'missing value':
                                return p_.ss(
                                    $,
                                    ($) => ({
                                        'option': 'missing value',
                                        'value': ['nothing', null],
                                    }),
                                )
                            case 'missing option':
                                return p_.ss(
                                    $,
                                    ($) => ({
                                        'option': 'missing option',
                                        'value': ['nothing', null],
                                    }),
                                )
                            case 'reference':
                                return p_.ss(
                                    $,
                                    ($) => ({
                                        'option': 'reference',
                                        'value': ['nothing', null],
                                    }),
                                )
                            case 'property name':
                                return p_.ss(
                                    $,
                                    ($) => ({
                                        'option': 'property name',
                                        'value': ['nothing', null],
                                    }),
                                )
                            case 'option name':
                                return p_.ss(
                                    $,
                                    ($) => ({
                                        'option': 'option name',
                                        'value': ['nothing', null],
                                    }),
                                )
                            default:
                                return p_.au(
                                    $[0],
                                )
                        }
                    },
                )],
            ),
            "suggestions": p_change_context(
                $['suggestions'],
                ($) => ['list', p_.from.list($,
                ).map(
                    ($) => ['group', ['verbose', p_.literal.dictionary(
                        {
                            "label": p_change_context(
                                $['label'],
                                ($) => ['text', {
                                    'delimiter': ['quote', null],
                                    'value': $,
                                }],
                            ),
                            "insert text": p_change_context(
                                $['insert text'],
                                ($) => ['text', {
                                    'delimiter': ['quote', null],
                                    'value': $,
                                }],
                            ),
                            "documentation": p_change_context(
                                $['documentation'],
                                ($) => ['text', {
                                    'delimiter': ['quote', null],
                                    'value': $,
                                }],
                            ),
                        },
                    )]],
                )],
            ),
        },
    )]]],
    () => ['not set', null],
)]
