
import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_di from 'pareto-core/dist/interface/data'
const p_decide_state = <State, B>($: State,  assign: ($: State) => B) => assign($)
const p_decide_optional = <OV extends p_di.Value, B extends p_di.Value>($: p_di.Optional_Value<OV>,  assign: ($: OV) => B,  otherwise: () => B) => p_.from.optional($).decide(assign, otherwise)
const p_decide_text = <B>($: string,  assign: ($: string) => B) => assign($)

import p_change_context from 'pareto-core/dist/implementation/refiner/specials/change_context'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/unmarshall_errors/signatures/transformers/boilerplate_for_migrate"

import * as t_out from "../../../../../../interface/generated/liana/schemas/unmarshall_errors/data"

import * as v_location from "../../astn_location/transformers/boilerplate_for_migrate"

export const Errors: t_signatures.Errors = ($) => p_.from.list(
    $,
).map(
    ($) => ({
        'range': p_change_context(
            $['range'],
            ($) => v_location.Range(
                $,
            ),
        ),
        'type': p_change_context(
            $['type'],
            ($) => p_decide_state(
                $,
                ($): t_out.Errors.L.type_ => {
                    switch ($[0]) {
                        case 'value':
                            return p_.ss(
                                $,
                                ($) => ['value', p_decide_state(
                                    $,
                                    ($): t_out.Errors.L.type_.value => {
                                        switch ($[0]) {
                                            case 'invalid type':
                                                return p_.ss(
                                                    $,
                                                    ($) => ['invalid type', {
                                                        'expected': p_change_context(
                                                            $['expected'],
                                                            ($) => p_.from.list(
                                                                $,
                                                            ).map(
                                                                ($) => p_decide_state(
                                                                    $,
                                                                    ($): t_out.Errors.L.type_.value.invalid_type.expected.L => {
                                                                        switch ($[0]) {
                                                                            case 'dictionary':
                                                                                return p_.ss(
                                                                                    $,
                                                                                    ($) => ['dictionary', null],
                                                                                )
                                                                            case 'group':
                                                                                return p_.ss(
                                                                                    $,
                                                                                    ($) => ['group', null],
                                                                                )
                                                                            case 'list':
                                                                                return p_.ss(
                                                                                    $,
                                                                                    ($) => ['list', null],
                                                                                )
                                                                            case 'nothing':
                                                                                return p_.ss(
                                                                                    $,
                                                                                    ($) => ['nothing', null],
                                                                                )
                                                                            case 'optional':
                                                                                return p_.ss(
                                                                                    $,
                                                                                    ($) => ['optional', null],
                                                                                )
                                                                            case 'state':
                                                                                return p_.ss(
                                                                                    $,
                                                                                    ($) => ['state', null],
                                                                                )
                                                                            case 'text':
                                                                                return p_.ss(
                                                                                    $,
                                                                                    ($) => ['text', null],
                                                                                )
                                                                            default:
                                                                                return p_.au(
                                                                                    $[0],
                                                                                )
                                                                        }
                                                                    },
                                                                ),
                                                            ),
                                                        ),
                                                    }],
                                                )
                                            case 'missing':
                                                return p_.ss(
                                                    $,
                                                    ($) => ['missing', null],
                                                )
                                            default:
                                                return p_.au(
                                                    $[0],
                                                )
                                        }
                                    },
                                )],
                            )
                        case 'dictionary':
                            return p_.ss(
                                $,
                                ($) => ['dictionary', p_decide_state(
                                    $,
                                    ($): t_out.Errors.L.type_.dictionary => {
                                        switch ($[0]) {
                                            case 'duplicate entry':
                                                return p_.ss(
                                                    $,
                                                    ($) => ['duplicate entry', {
                                                        'name': p_change_context(
                                                            $['name'],
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
                                )],
                            )
                        case 'group':
                            return p_.ss(
                                $,
                                ($) => ['group', p_decide_state(
                                    $,
                                    ($): t_out.Errors.L.type_.group => {
                                        switch ($[0]) {
                                            case 'duplicate property':
                                                return p_.ss(
                                                    $,
                                                    ($) => ['duplicate property', {
                                                        'name': p_change_context(
                                                            $['name'],
                                                            ($) => $,
                                                        ),
                                                    }],
                                                )
                                            case 'missing property':
                                                return p_.ss(
                                                    $,
                                                    ($) => ['missing property', {
                                                        'name': p_change_context(
                                                            $['name'],
                                                            ($) => $,
                                                        ),
                                                    }],
                                                )
                                            case 'missing property value':
                                                return p_.ss(
                                                    $,
                                                    ($) => ['missing property value', {
                                                        'name': p_change_context(
                                                            $['name'],
                                                            ($) => $,
                                                        ),
                                                    }],
                                                )
                                            case 'superfluous property':
                                                return p_.ss(
                                                    $,
                                                    ($) => ['superfluous property', {
                                                        'name': p_change_context(
                                                            $['name'],
                                                            ($) => p_.from.optional(
                                                                $,
                                                            ).map(
                                                                ($) => $,
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
                                )],
                            )
                        case 'state':
                            return p_.ss(
                                $,
                                ($) => ['state', p_decide_state(
                                    $,
                                    ($): t_out.Errors.L.type_.state => {
                                        switch ($[0]) {
                                            case 'more than 2 items in list':
                                                return p_.ss(
                                                    $,
                                                    ($) => ['more than 2 items in list', null],
                                                )
                                            case 'missing option name':
                                                return p_.ss(
                                                    $,
                                                    ($) => ['missing option name', null],
                                                )
                                            case 'option name is not a text':
                                                return p_.ss(
                                                    $,
                                                    ($) => ['option name is not a text', null],
                                                )
                                            case 'missing value':
                                                return p_.ss(
                                                    $,
                                                    ($) => ['missing value', null],
                                                )
                                            case 'unknown option':
                                                return p_.ss(
                                                    $,
                                                    ($) => ['unknown option', {
                                                        'found': p_change_context(
                                                            $['found'],
                                                            ($) => $,
                                                        ),
                                                        'expected': p_change_context(
                                                            $['expected'],
                                                            ($) => p_.from.dictionary(
                                                                $,
                                                            ).map(
                                                                ($, id) => null,
                                                            ),
                                                        ),
                                                    }],
                                                )
                                            case 'missing option':
                                                return p_.ss(
                                                    $,
                                                    ($) => ['missing option', null],
                                                )
                                            default:
                                                return p_.au(
                                                    $[0],
                                                )
                                        }
                                    },
                                )],
                            )
                        default:
                            return p_.au(
                                $[0],
                            )
                    }
                },
            ),
        ),
    }),
)

export const Warnings: t_signatures.Warnings = ($) => p_.from.list(
    $,
).map(
    ($) => ({
        'range': p_change_context(
            $['range'],
            ($) => v_location.Range(
                $,
            ),
        ),
        'type': p_change_context(
            $['type'],
            ($) => p_decide_state(
                $,
                ($): t_out.Warnings.L.type_ => {
                    switch ($[0]) {
                        case 'expected apostrophed text':
                            return p_.ss(
                                $,
                                ($) => ['expected apostrophed text', null],
                            )
                        case 'expected quoted text':
                            return p_.ss(
                                $,
                                ($) => ['expected quoted text', null],
                            )
                        case 'expected backticked text':
                            return p_.ss(
                                $,
                                ($) => ['expected backticked text', null],
                            )
                        case 'expected undelimited text':
                            return p_.ss(
                                $,
                                ($) => ['expected undelimited text', null],
                            )
                        case 'expected a group':
                            return p_.ss(
                                $,
                                ($) => ['expected a group', null],
                            )
                        default:
                            return p_.au(
                                $[0],
                            )
                    }
                },
            ),
        ),
    }),
)
