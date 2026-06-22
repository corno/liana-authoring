
import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_di from 'pareto-core/dist/interface/data'
const p_decide_state = <State, B>($: State,  assign: ($: State) => B) => assign($)
const p_decide_optional = <OV extends p_di.Value, B extends p_di.Value>($: p_di.Optional_Value<OV>,  assign: ($: OV) => B,  otherwise: () => B) => p_.from.optional($).decide(assign, otherwise)
const p_decide_text = <B>($: string,  assign: ($: string) => B) => assign($)

import p_change_context from 'pareto-core/dist/implementation/refiner/specials/change_context'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/path_unrestricted/signatures/transformers/boilerplate_for_migrate"

import * as t_out from "../../../../../../interface/generated/liana/schemas/path_unrestricted/data"

export const Node_Path: t_signatures.Node_Path = ($) => ({
    'context': p_change_context(
        $['context'],
        ($) => Context_Path(
            $,
        ),
    ),
    'node': p_change_context(
        $['node'],
        ($) => $,
    ),
})

export const Context_Path: t_signatures.Context_Path = ($) => ({
    'start': p_change_context(
        $['start'],
        ($) => Start(
            $,
        ),
    ),
    'subpath': p_change_context(
        $['subpath'],
        ($) => Context_Subpath(
            $,
        ),
    ),
})

export const Context_Subpath: t_signatures.Context_Subpath = ($) => p_.from.list(
    $,
).map(
    ($) => $,
)

export const Start: t_signatures.Start = ($) => p_decide_state(
    $,
    ($): t_out.Start => {
        switch ($[0]) {
            case 'absolute':
                return p_.ss(
                    $,
                    ($) => ['absolute', null],
                )
            case 'relative':
                return p_.ss(
                    $,
                    ($) => ['relative', {
                        'up steps': p_change_context(
                            $['up steps'],
                            ($) => Up_Steps(
                                $,
                            ),
                        ),
                    }],
                )
            default:
                return p_.au(
                    $[0],
                )
        }
    },
)

export const Up_Steps: t_signatures.Up_Steps = ($) => $
