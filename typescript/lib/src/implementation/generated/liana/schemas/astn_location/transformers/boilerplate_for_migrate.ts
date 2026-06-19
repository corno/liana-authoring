
import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_di from 'pareto-core/dist/interface/data'
const p_decide_state = <State, B>($: State,  assign: ($: State) => B) => assign($)
const p_decide_optional = <OV extends p_di.Value, B extends p_di.Value>($: p_di.Optional_Value<OV>,  assign: ($: OV) => B,  otherwise: () => B) => $.__decide(assign, otherwise)
const p_decide_text = <B>($: string,  assign: ($: string) => B) => assign($)

import p_change_context from 'pareto-core/dist/implementation/refiner/specials/change_context'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/astn_location/signatures/transformers/boilerplate_for_migrate"

import * as t_out from "../../../../../../interface/generated/liana/schemas/astn_location/data"

export const Range: t_signatures.Range = ($) => ({
    'start': p_change_context(
        $['start'],
        ($) => Location(
            $,
        ),
    ),
    'end': p_change_context(
        $['end'],
        ($) => Location(
            $,
        ),
    ),
})

export const Possible_Range: t_signatures.Possible_Range = ($) => p_decide_state(
    $,
    ($): t_out.Possible_Range => {
        switch ($[0]) {
            case 'range':
                return p_.ss(
                    $,
                    ($) => ['range', Range(
                        $,
                    )],
                )
            case 'end of document':
                return p_.ss(
                    $,
                    ($) => ['end of document', {
                        'end': p_change_context(
                            $['end'],
                            ($) => Location(
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

export const Location: t_signatures.Location = ($) => ({
    'relative': p_change_context(
        $['relative'],
        ($) => Relative_Location(
            $,
        ),
    ),
    'absolute': p_change_context(
        $['absolute'],
        ($) => $,
    ),
})

export const Relative_Location: t_signatures.Relative_Location = ($) => ({
    'line': p_change_context(
        $['line'],
        ($) => $,
    ),
    'column': p_change_context(
        $['column'],
        ($) => $,
    ),
})
