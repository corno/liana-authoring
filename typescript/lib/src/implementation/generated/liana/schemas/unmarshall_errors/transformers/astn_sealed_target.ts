
import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_di from 'pareto-core/dist/interface/data'
const p_decide_state = <State, B>($: State,  assign: ($: State) => B) => assign($)
const p_decide_optional = <OV extends p_di.Value, B extends p_di.Value>($: p_di.Optional_Value<OV>,  assign: ($: OV) => B,  otherwise: () => B) => $.__decide(assign, otherwise)
const p_decide_text = <B>($: string,  assign: ($: string) => B) => assign($)

import p_change_context from 'pareto-core/dist/implementation/refiner/specials/change_context'

import _p_text_from_list from 'pareto-core/dist/implementation/transformer/specials/text_from_list'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/unmarshall_errors/signatures/transformers/astn_sealed_target"

import * as t_out from "astn-core/dist/interface/generated/liana/schemas/sealed_target/data"

import * as v_primitives_to_text from "liana-core/dist/implementation/manual/transformers/primitives/text"

import * as v_external_location from "../../astn_location/transformers/astn_sealed_target"

export const Errors: t_signatures.Errors = ($) => ['list', p_.from.list(
    $,
).map(
    ($) => ['group', ['verbose', p_.literal.dictionary(
        {
            "range": p_change_context(
                $['range'],
                ($) => v_external_location.Range(
                    $,
                ),
            ),
            "type": p_change_context(
                $['type'],
                ($) => ['state', p_decide_state(
                    $,
                    ($): t_out.Value.state => {
                        switch ($[0]) {
                            case 'value':
                                return p_.ss(
                                    $,
                                    ($) => ({
                                        'option': 'value',
                                        'value': ['state', p_decide_state(
                                            $,
                                            ($): t_out.Value.state => {
                                                switch ($[0]) {
                                                    case 'invalid type':
                                                        return p_.ss(
                                                            $,
                                                            ($) => ({
                                                                'option': 'invalid type',
                                                                'value': ['group', ['verbose', p_.literal.dictionary(
                                                                    {
                                                                        "expected": p_change_context(
                                                                            $['expected'],
                                                                            ($) => ['list', p_.from.list(
                                                                                $,
                                                                            ).map(
                                                                                ($) => ['state', p_decide_state(
                                                                                    $,
                                                                                    ($): t_out.Value.state => {
                                                                                        switch ($[0]) {
                                                                                            case 'dictionary':
                                                                                                return p_.ss(
                                                                                                    $,
                                                                                                    ($) => ({
                                                                                                        'option': 'dictionary',
                                                                                                        'value': ['nothing', null],
                                                                                                    }),
                                                                                                )
                                                                                            case 'group':
                                                                                                return p_.ss(
                                                                                                    $,
                                                                                                    ($) => ({
                                                                                                        'option': 'group',
                                                                                                        'value': ['nothing', null],
                                                                                                    }),
                                                                                                )
                                                                                            case 'list':
                                                                                                return p_.ss(
                                                                                                    $,
                                                                                                    ($) => ({
                                                                                                        'option': 'list',
                                                                                                        'value': ['nothing', null],
                                                                                                    }),
                                                                                                )
                                                                                            case 'nothing':
                                                                                                return p_.ss(
                                                                                                    $,
                                                                                                    ($) => ({
                                                                                                        'option': 'nothing',
                                                                                                        'value': ['nothing', null],
                                                                                                    }),
                                                                                                )
                                                                                            case 'optional':
                                                                                                return p_.ss(
                                                                                                    $,
                                                                                                    ($) => ({
                                                                                                        'option': 'optional',
                                                                                                        'value': ['nothing', null],
                                                                                                    }),
                                                                                                )
                                                                                            case 'state':
                                                                                                return p_.ss(
                                                                                                    $,
                                                                                                    ($) => ({
                                                                                                        'option': 'state',
                                                                                                        'value': ['nothing', null],
                                                                                                    }),
                                                                                                )
                                                                                            case 'text':
                                                                                                return p_.ss(
                                                                                                    $,
                                                                                                    ($) => ({
                                                                                                        'option': 'text',
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
                                                                            )],
                                                                        ),
                                                                    },
                                                                )]],
                                                            }),
                                                        )
                                                    case 'missing':
                                                        return p_.ss(
                                                            $,
                                                            ($) => ({
                                                                'option': 'missing',
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
                                    }),
                                )
                            case 'dictionary':
                                return p_.ss(
                                    $,
                                    ($) => ({
                                        'option': 'dictionary',
                                        'value': ['state', p_decide_state(
                                            $,
                                            ($): t_out.Value.state => {
                                                switch ($[0]) {
                                                    case 'duplicate entry':
                                                        return p_.ss(
                                                            $,
                                                            ($) => ({
                                                                'option': 'duplicate entry',
                                                                'value': ['group', ['verbose', p_.literal.dictionary(
                                                                    {
                                                                        "name": p_change_context(
                                                                            $['name'],
                                                                            ($) => ['text', {
                                                                                'delimiter': ['quote', null],
                                                                                'value': $,
                                                                            }],
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
                                        )],
                                    }),
                                )
                            case 'group':
                                return p_.ss(
                                    $,
                                    ($) => ({
                                        'option': 'group',
                                        'value': ['state', p_decide_state(
                                            $,
                                            ($): t_out.Value.state => {
                                                switch ($[0]) {
                                                    case 'duplicate property':
                                                        return p_.ss(
                                                            $,
                                                            ($) => ({
                                                                'option': 'duplicate property',
                                                                'value': ['group', ['verbose', p_.literal.dictionary(
                                                                    {
                                                                        "name": p_change_context(
                                                                            $['name'],
                                                                            ($) => ['text', {
                                                                                'delimiter': ['quote', null],
                                                                                'value': $,
                                                                            }],
                                                                        ),
                                                                    },
                                                                )]],
                                                            }),
                                                        )
                                                    case 'missing property':
                                                        return p_.ss(
                                                            $,
                                                            ($) => ({
                                                                'option': 'missing property',
                                                                'value': ['group', ['verbose', p_.literal.dictionary(
                                                                    {
                                                                        "name": p_change_context(
                                                                            $['name'],
                                                                            ($) => ['text', {
                                                                                'delimiter': ['quote', null],
                                                                                'value': $,
                                                                            }],
                                                                        ),
                                                                    },
                                                                )]],
                                                            }),
                                                        )
                                                    case 'missing property value':
                                                        return p_.ss(
                                                            $,
                                                            ($) => ({
                                                                'option': 'missing property value',
                                                                'value': ['group', ['verbose', p_.literal.dictionary(
                                                                    {
                                                                        "name": p_change_context(
                                                                            $['name'],
                                                                            ($) => ['text', {
                                                                                'delimiter': ['quote', null],
                                                                                'value': $,
                                                                            }],
                                                                        ),
                                                                    },
                                                                )]],
                                                            }),
                                                        )
                                                    case 'superfluous property':
                                                        return p_.ss(
                                                            $,
                                                            ($) => ({
                                                                'option': 'superfluous property',
                                                                'value': ['group', ['verbose', p_.literal.dictionary(
                                                                    {
                                                                        "name": p_change_context(
                                                                            $['name'],
                                                                            ($) => ['optional', p_decide_optional(
                                                                                $,
                                                                                ($): t_out.Value.optional => ['set', ['text', {
                                                                                    'delimiter': ['quote', null],
                                                                                    'value': $,
                                                                                }]],
                                                                                () => ['not set', null],
                                                                            )],
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
                                        )],
                                    }),
                                )
                            case 'state':
                                return p_.ss(
                                    $,
                                    ($) => ({
                                        'option': 'state',
                                        'value': ['state', p_decide_state(
                                            $,
                                            ($): t_out.Value.state => {
                                                switch ($[0]) {
                                                    case 'more than 2 items in list':
                                                        return p_.ss(
                                                            $,
                                                            ($) => ({
                                                                'option': 'more than 2 items in list',
                                                                'value': ['nothing', null],
                                                            }),
                                                        )
                                                    case 'missing option name':
                                                        return p_.ss(
                                                            $,
                                                            ($) => ({
                                                                'option': 'missing option name',
                                                                'value': ['nothing', null],
                                                            }),
                                                        )
                                                    case 'option name is not a text':
                                                        return p_.ss(
                                                            $,
                                                            ($) => ({
                                                                'option': 'option name is not a text',
                                                                'value': ['nothing', null],
                                                            }),
                                                        )
                                                    case 'missing value':
                                                        return p_.ss(
                                                            $,
                                                            ($) => ({
                                                                'option': 'missing value',
                                                                'value': ['nothing', null],
                                                            }),
                                                        )
                                                    case 'unknown option':
                                                        return p_.ss(
                                                            $,
                                                            ($) => ({
                                                                'option': 'unknown option',
                                                                'value': ['group', ['verbose', p_.literal.dictionary(
                                                                    {
                                                                        "found": p_change_context(
                                                                            $['found'],
                                                                            ($) => ['text', {
                                                                                'delimiter': ['quote', null],
                                                                                'value': $,
                                                                            }],
                                                                        ),
                                                                        "expected": p_change_context(
                                                                            $['expected'],
                                                                            ($) => ['dictionary', p_.from.dictionary(
                                                                                $,
                                                                            ).map(
                                                                                ($, id) => ['nothing', null],
                                                                            )],
                                                                        ),
                                                                    },
                                                                )]],
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
                                                    default:
                                                        return p_.au(
                                                            $[0],
                                                        )
                                                }
                                            },
                                        )],
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
    )]],
)]

export const Warnings: t_signatures.Warnings = ($) => ['list', p_.from.list(
    $,
).map(
    ($) => ['group', ['verbose', p_.literal.dictionary(
        {
            "range": p_change_context(
                $['range'],
                ($) => v_external_location.Range(
                    $,
                ),
            ),
            "type": p_change_context(
                $['type'],
                ($) => ['state', p_decide_state(
                    $,
                    ($): t_out.Value.state => {
                        switch ($[0]) {
                            case 'expected apostrophed text':
                                return p_.ss(
                                    $,
                                    ($) => ({
                                        'option': 'expected apostrophed text',
                                        'value': ['nothing', null],
                                    }),
                                )
                            case 'expected quoted text':
                                return p_.ss(
                                    $,
                                    ($) => ({
                                        'option': 'expected quoted text',
                                        'value': ['nothing', null],
                                    }),
                                )
                            case 'expected backticked text':
                                return p_.ss(
                                    $,
                                    ($) => ({
                                        'option': 'expected backticked text',
                                        'value': ['nothing', null],
                                    }),
                                )
                            case 'expected undelimited text':
                                return p_.ss(
                                    $,
                                    ($) => ({
                                        'option': 'expected undelimited text',
                                        'value': ['nothing', null],
                                    }),
                                )
                            case 'expected a group':
                                return p_.ss(
                                    $,
                                    ($) => ({
                                        'option': 'expected a group',
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
    )]],
)]
