
import * as p_ from 'pareto-core/implementation/transformer'
import * as p_di from 'pareto-core/interface/data'
const p_decide_state = <State, B>($: State,  assign: ($: State) => B) => assign($)
const p_decide_optional = <OV extends p_di.Value, B extends p_di.Value>($: p_di.Optional_Value<OV>,  assign: ($: OV) => B,  otherwise: () => B) => p_.from.optional($).decide(assign, otherwise)
const p_decide_text = <B>($: string,  assign: ($: string) => B) => assign($)

import p_change_context from 'pareto-core/implementation/refiner/specials/change_context'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/completion_suggestions/signatures/transformers/boilerplate_for_migrate.js"

import * as t_out from "../../../../../../interface/generated/liana/schemas/completion_suggestions/data.js"

import * as v_location from "../../location/transformers/boilerplate_for_migrate.js"

import * as v_text_edits from "../../text_edits/transformers/boilerplate_for_migrate.js"

export const Completion_Suggestions: t_signatures.Completion_Suggestions = ($) => p_.from.optional($,
).map(
    ($) => ({
        'type': p_change_context(
            $['type'],
            ($) => p_decide_state(
                $,
                ($): t_out.Completion_Suggestions.O.type_ => {
                    switch ($[0]) {
                        case 'missing value':
                            return p_.option(
                                $,
                                ($) => ['missing value', null],
                            )
                        case 'missing option':
                            return p_.option(
                                $,
                                ($) => ['missing option', null],
                            )
                        case 'reference':
                            return p_.option(
                                $,
                                ($) => ['reference', null],
                            )
                        case 'property name':
                            return p_.option(
                                $,
                                ($) => ['property name', null],
                            )
                        case 'option name':
                            return p_.option(
                                $,
                                ($) => ['option name', null],
                            )
                        default:
                            return p_.au(
                                $[0],
                            )
                    }
                },
            ),
        ),
        'suggestions': p_change_context(
            $['suggestions'],
            ($) => p_.from.list($,
            ).map(
                ($) => ({
                    'label': p_change_context(
                        $['label'],
                        ($) => $,
                    ),
                    'insert text': p_change_context(
                        $['insert text'],
                        ($) => $,
                    ),
                    'documentation': p_change_context(
                        $['documentation'],
                        ($) => $,
                    ),
                }),
            ),
        ),
    }),
)
