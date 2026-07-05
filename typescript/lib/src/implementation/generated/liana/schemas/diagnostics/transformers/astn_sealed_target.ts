
import * as p_ from 'pareto-core/implementation/transformer'
import * as p_di from 'pareto-core/interface/data'
const p_decide_state = <State, B>($: State,  assign: ($: State) => B) => assign($)
const p_decide_optional = <OV extends p_di.Value, B extends p_di.Value>($: p_di.Optional_Value<OV>,  assign: ($: OV) => B,  otherwise: () => B) => p_.from.optional($).decide(assign, otherwise)
const p_decide_text = <B>($: string,  assign: ($: string) => B) => assign($)

import p_change_context from 'pareto-core/implementation/refiner/specials/change_context'

import _p_text_from_list from 'pareto-core/implementation/transformer/specials/text_from_list'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/diagnostics/signatures/transformers/astn_sealed_target.js"

import * as t_out from "astn-core/interface/generated/liana/schemas/sealed_target/data"

import * as v_primitives_to_text from "liana-core/implementation/manual/transformers/primitives/text"

import * as v_external_location from "../../astn_location/transformers/astn_sealed_target.js"

import * as v_external_path_unrestricted from "../../path_unrestricted/transformers/astn_sealed_target.js"

export const Diagnostics: t_signatures.Diagnostics = ($) => ['list', p_.from.list($,
).map(
    ($) => Diagnostic(
        $,
    ),
)]

export const Diagnostic: t_signatures.Diagnostic = ($) => ['group', ['verbose', p_.literal.dictionary(
    {
        "severity": p_change_context(
            $['severity'],
            ($) => ['state', p_decide_state(
                $,
                ($): t_out.Value.state => {
                    switch ($[0]) {
                        case 'error':
                            return p_.option(
                                $,
                                ($) => ({
                                    'option': 'error',
                                    'value': ['nothing', null],
                                }),
                            )
                        case 'warning':
                            return p_.option(
                                $,
                                ($) => ({
                                    'option': 'warning',
                                    'value': ['nothing', null],
                                }),
                            )
                        case 'information':
                            return p_.option(
                                $,
                                ($) => ({
                                    'option': 'information',
                                    'value': ['nothing', null],
                                }),
                            )
                        case 'hint':
                            return p_.option(
                                $,
                                ($) => ({
                                    'option': 'hint',
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
        "range": p_change_context(
            $['range'],
            ($) => ['optional', p_decide_optional(
                $,
                ($): t_out.Value.optional => ['set', v_external_location.Possible_Range(
                    $,
                )],
                () => ['not set', null],
            )],
        ),
        "message": p_change_context(
            $['message'],
            ($) => ['text', {
                'delimiter': ['quote', null],
                'value': $,
            }],
        ),
        "related information": p_change_context(
            $['related information'],
            ($) => ['optional', p_decide_optional(
                $,
                ($): t_out.Value.optional => ['set', ['list', p_.from.list($,
                ).map(
                    ($) => ['group', ['verbose', p_.literal.dictionary(
                        {
                            "location": p_change_context(
                                $['location'],
                                ($) => ['group', ['verbose', p_.literal.dictionary(
                                    {
                                        "file path": p_change_context(
                                            $['file path'],
                                            ($) => v_external_path_unrestricted.Node_Path(
                                                $,
                                            ),
                                        ),
                                        "range": p_change_context(
                                            $['range'],
                                            ($) => v_external_location.Possible_Range(
                                                $,
                                            ),
                                        ),
                                    },
                                )]],
                            ),
                            "message": p_change_context(
                                $['message'],
                                ($) => ['text', {
                                    'delimiter': ['quote', null],
                                    'value': $,
                                }],
                            ),
                        },
                    )]],
                )]],
                () => ['not set', null],
            )],
        ),
        "type": p_change_context(
            $['type'],
            ($) => ['state', p_decide_state(
                $,
                ($): t_out.Value.state => {
                    switch ($[0]) {
                        case 'semantic':
                            return p_.option(
                                $,
                                ($) => ({
                                    'option': 'semantic',
                                    'value': ['nothing', null],
                                }),
                            )
                        case 'deserialize':
                            return p_.option(
                                $,
                                ($) => ({
                                    'option': 'deserialize',
                                    'value': ['nothing', null],
                                }),
                            )
                        case 'schema':
                            return p_.option(
                                $,
                                ($) => ({
                                    'option': 'schema',
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
    },
)]]

export const Result: t_signatures.Result = ($) => ['group', ['verbose', p_.literal.dictionary(
    {
        "diagnostics": p_change_context(
            $['diagnostics'],
            ($) => Diagnostics(
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
)]]
