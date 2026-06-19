
import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_di from 'pareto-core/dist/interface/data'
const p_decide_state = <State, B>($: State,  assign: ($: State) => B) => assign($)
const p_decide_optional = <OV extends p_di.Value, B extends p_di.Value>($: p_di.Optional_Value<OV>,  assign: ($: OV) => B,  otherwise: () => B) => $.__decide(assign, otherwise)
const p_decide_text = <B>($: string,  assign: ($: string) => B) => assign($)

import p_change_context from 'pareto-core/dist/implementation/refiner/specials/change_context'

import _p_text_from_list from 'pareto-core/dist/implementation/transformer/specials/text_from_list'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/astn_location/signatures/transformers/astn_sealed_target"

import * as t_out from "astn-core/dist/interface/generated/liana/schemas/sealed_target/data"

import * as v_primitives_to_text from "liana-core/dist/implementation/manual/transformers/primitives/text"

export const Range: t_signatures.Range = ($) => ['group', ['verbose', p_.literal.dictionary(
    {
        "start": p_change_context(
            $['start'],
            ($) => Location(
                $,
            ),
        ),
        "end": p_change_context(
            $['end'],
            ($) => Location(
                $,
            ),
        ),
    },
)]]

export const Possible_Range: t_signatures.Possible_Range = ($) => ['state', p_decide_state(
    $,
    ($): t_out.Value.state => {
        switch ($[0]) {
            case 'range':
                return p_.ss(
                    $,
                    ($) => ({
                        'option': 'range',
                        'value': Range(
                            $,
                        ),
                    }),
                )
            case 'end of document':
                return p_.ss(
                    $,
                    ($) => ({
                        'option': 'end of document',
                        'value': ['group', ['verbose', p_.literal.dictionary(
                            {
                                "end": p_change_context(
                                    $['end'],
                                    ($) => Location(
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

export const Location: t_signatures.Location = ($) => ['group', ['verbose', p_.literal.dictionary(
    {
        "relative": p_change_context(
            $['relative'],
            ($) => Relative_Location(
                $,
            ),
        ),
        "absolute": p_change_context(
            $['absolute'],
            ($) => ['text', {
                'delimiter': ['none', null],
                'value': v_primitives_to_text.decimal(
                    $,
                ),
            }],
        ),
    },
)]]

export const Relative_Location: t_signatures.Relative_Location = ($) => ['group', ['verbose', p_.literal.dictionary(
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
        "column": p_change_context(
            $['column'],
            ($) => ['text', {
                'delimiter': ['none', null],
                'value': v_primitives_to_text.decimal(
                    $,
                ),
            }],
        ),
    },
)]]
