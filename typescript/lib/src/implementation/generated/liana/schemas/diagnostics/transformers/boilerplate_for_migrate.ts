
import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_di from 'pareto-core/dist/interface/data'
const p_decide_state = <State, B>($: State,  assign: ($: State) => B) => assign($)
const p_decide_optional = <OV extends p_di.Value, B extends p_di.Value>($: p_di.Optional_Value<OV>,  assign: ($: OV) => B,  otherwise: () => B) => p_.from.optional($).decide(assign, otherwise)
const p_decide_text = <B>($: string,  assign: ($: string) => B) => assign($)

import p_change_context from 'pareto-core/dist/implementation/refiner/specials/change_context'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/diagnostics/signatures/transformers/boilerplate_for_migrate"

import * as t_out from "../../../../../../interface/generated/liana/schemas/diagnostics/data"

import * as v_location from "../../astn_location/transformers/boilerplate_for_migrate"

import * as v_path_unrestricted from "../../path_unrestricted/transformers/boilerplate_for_migrate"

export const Diagnostics: t_signatures.Diagnostics = ($) => p_.from.list(
    $,
).map(
    ($) => Diagnostic(
        $,
    ),
)

export const Diagnostic: t_signatures.Diagnostic = ($) => ({
    'severity': p_change_context(
        $['severity'],
        ($) => p_decide_state(
            $,
            ($): t_out.Diagnostic.severity => {
                switch ($[0]) {
                    case 'error':
                        return p_.ss(
                            $,
                            ($) => ['error', null],
                        )
                    case 'warning':
                        return p_.ss(
                            $,
                            ($) => ['warning', null],
                        )
                    case 'information':
                        return p_.ss(
                            $,
                            ($) => ['information', null],
                        )
                    case 'hint':
                        return p_.ss(
                            $,
                            ($) => ['hint', null],
                        )
                    default:
                        return p_.au(
                            $[0],
                        )
                }
            },
        ),
    ),
    'range': p_change_context(
        $['range'],
        ($) => p_.from.optional(
            $,
        ).map(
            ($) => v_location.Possible_Range(
                $,
            ),
        ),
    ),
    'message': p_change_context(
        $['message'],
        ($) => $,
    ),
    'related information': p_change_context(
        $['related information'],
        ($) => p_.from.optional(
            $,
        ).map(
            ($) => p_.from.list(
                $,
            ).map(
                ($) => ({
                    'location': p_change_context(
                        $['location'],
                        ($) => ({
                            'file path': p_change_context(
                                $['file path'],
                                ($) => v_path_unrestricted.Node_Path(
                                    $,
                                ),
                            ),
                            'range': p_change_context(
                                $['range'],
                                ($) => v_location.Possible_Range(
                                    $,
                                ),
                            ),
                        }),
                    ),
                    'message': p_change_context(
                        $['message'],
                        ($) => $,
                    ),
                }),
            ),
        ),
    ),
    'type': p_change_context(
        $['type'],
        ($) => p_decide_state(
            $,
            ($): t_out.Diagnostic.type_ => {
                switch ($[0]) {
                    case 'semantic':
                        return p_.ss(
                            $,
                            ($) => ['semantic', null],
                        )
                    case 'deserialize':
                        return p_.ss(
                            $,
                            ($) => ['deserialize', null],
                        )
                    case 'schema':
                        return p_.ss(
                            $,
                            ($) => ['schema', null],
                        )
                    default:
                        return p_.au(
                            $[0],
                        )
                }
            },
        ),
    ),
})

export const Result: t_signatures.Result = ($) => ({
    'diagnostics': p_change_context(
        $['diagnostics'],
        ($) => Diagnostics(
            $,
        ),
    ),
})

export const Parameters: t_signatures.Parameters = ($) => ({
    'content': p_change_context(
        $['content'],
        ($) => $,
    ),
    'file path': p_change_context(
        $['file path'],
        ($) => v_path_unrestricted.Node_Path(
            $,
        ),
    ),
    'tab size': p_change_context(
        $['tab size'],
        ($) => $,
    ),
})
