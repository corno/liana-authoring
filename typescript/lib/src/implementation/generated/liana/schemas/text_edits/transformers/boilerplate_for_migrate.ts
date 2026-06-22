
import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_di from 'pareto-core/dist/interface/data'
const p_decide_state = <State, B>($: State,  assign: ($: State) => B) => assign($)
const p_decide_optional = <OV extends p_di.Value, B extends p_di.Value>($: p_di.Optional_Value<OV>,  assign: ($: OV) => B,  otherwise: () => B) => p_.from.optional($).decide(assign, otherwise)
const p_decide_text = <B>($: string,  assign: ($: string) => B) => assign($)

import p_change_context from 'pareto-core/dist/implementation/refiner/specials/change_context'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/text_edits/signatures/transformers/boilerplate_for_migrate"

import * as t_out from "../../../../../../interface/generated/liana/schemas/text_edits/data"

import * as v_location from "../../astn_location/transformers/boilerplate_for_migrate"

export const Text_Edits: t_signatures.Text_Edits = ($) => p_.from.list($,
).map(
    ($) => p_decide_state(
        $,
        ($): t_out.Text_Edits.L => {
            switch ($[0]) {
                case 'replace':
                    return p_.ss(
                        $,
                        ($) => ['replace', {
                            'range': p_change_context(
                                $['range'],
                                ($) => v_location.Range(
                                    $,
                                ),
                            ),
                            'text': p_change_context(
                                $['text'],
                                ($) => $,
                            ),
                        }],
                    )
                case 'delete':
                    return p_.ss(
                        $,
                        ($) => ['delete', {
                            'range': p_change_context(
                                $['range'],
                                ($) => v_location.Range(
                                    $,
                                ),
                            ),
                        }],
                    )
                case 'insert':
                    return p_.ss(
                        $,
                        ($) => ['insert', {
                            'location': p_change_context(
                                $['location'],
                                ($) => v_location.Location(
                                    $,
                                ),
                            ),
                            'text': p_change_context(
                                $['text'],
                                ($) => $,
                            ),
                        }],
                    )
                default:
                    return p_.au(
                        $[0],
                    )
            }
        },
    ),
)
