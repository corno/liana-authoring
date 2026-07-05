
import * as p_ from 'pareto-core/implementation/transformer'
import * as p_di from 'pareto-core/interface/data'
const p_decide_state = <State, B>($: State,  assign: ($: State) => B) => assign($)
const p_decide_optional = <OV extends p_di.Value, B extends p_di.Value>($: p_di.Optional_Value<OV>,  assign: ($: OV) => B,  otherwise: () => B) => p_.from.optional($).decide(assign, otherwise)
const p_decide_text = <B>($: string,  assign: ($: string) => B) => assign($)

import p_change_context from 'pareto-core/implementation/refiner/specials/change_context'

import _p_text_from_list from 'pareto-core/implementation/transformer/specials/text_from_list'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/path_unrestricted/signatures/transformers/astn_sealed_target.js"

import * as t_out from "astn-core/interface/generated/liana/schemas/sealed_target/data"

import * as v_primitives_to_text from "liana-core/implementation/manual/transformers/primitives/text"

export const Node_Path: t_signatures.Node_Path = ($) => ['group', ['verbose', p_.literal.dictionary(
    {
        "context": p_change_context(
            $['context'],
            ($) => Context_Path(
                $,
            ),
        ),
        "node": p_change_context(
            $['node'],
            ($) => ['text', {
                'delimiter': ['quote', null],
                'value': $,
            }],
        ),
    },
)]]

export const Context_Path: t_signatures.Context_Path = ($) => ['group', ['verbose', p_.literal.dictionary(
    {
        "start": p_change_context(
            $['start'],
            ($) => Start(
                $,
            ),
        ),
        "subpath": p_change_context(
            $['subpath'],
            ($) => Context_Subpath(
                $,
            ),
        ),
    },
)]]

export const Context_Subpath: t_signatures.Context_Subpath = ($) => ['list', p_.from.list($,
).map(
    ($) => ['text', {
        'delimiter': ['quote', null],
        'value': $,
    }],
)]

export const Start: t_signatures.Start = ($) => ['state', p_decide_state(
    $,
    ($): t_out.Value.state => {
        switch ($[0]) {
            case 'absolute':
                return p_.option(
                    $,
                    ($) => ({
                        'option': 'absolute',
                        'value': ['nothing', null],
                    }),
                )
            case 'relative':
                return p_.option(
                    $,
                    ($) => ({
                        'option': 'relative',
                        'value': ['group', ['verbose', p_.literal.dictionary(
                            {
                                "up steps": p_change_context(
                                    $['up steps'],
                                    ($) => Up_Steps(
                                        $,
                                    ),
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
)]

export const Up_Steps: t_signatures.Up_Steps = ($) => ['text', {
    'delimiter': ['none', null],
    'value': v_primitives_to_text.decimal(
        $,
    ),
}]
