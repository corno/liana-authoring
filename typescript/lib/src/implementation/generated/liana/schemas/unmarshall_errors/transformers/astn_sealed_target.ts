
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/implementation/specials/change_context'

import _p_text_from_list from 'pareto-core/dist/implementation/specials/text_from_list'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/unmarshall_errors/signatures/transformers/astn_sealed_target"

import * as t_out from "astn-core/dist/interface/generated/liana/schemas/sealed_target/data"

import * as v_primitives_to_text from "liana-core/dist/implementation/manual/transformers/primitives/text"

import * as v_external_location from "../../astn_location/transformers/astn_sealed_target"

export const Errors: t_signatures.Errors = ($) => ['list', _p.list.from.list(
    $,
).map(
    ($) => ['group', ['verbose', _p.literal.dictionary(
        {
            "range": _p_change_context(
                $['range'],
                ($) => v_external_location.Range(
                    $,
                ),
            ),
            "type": _p_change_context(
                $['type'],
                ($) => ['state', _p.decide.state(
                    $,
                    ($): t_out.Value.state => {
                        switch ($[0]) {
                            case 'value':
                                return _p.ss(
                                    $,
                                    ($) => ({
                                        'option': 'value',
                                        'value': ['state', _p.decide.state(
                                            $,
                                            ($): t_out.Value.state => {
                                                switch ($[0]) {
                                                    case 'invalid type':
                                                        return _p.ss(
                                                            $,
                                                            ($) => ({
                                                                'option': 'invalid type',
                                                                'value': ['group', ['verbose', _p.literal.dictionary(
                                                                    {
                                                                        "expected": _p_change_context(
                                                                            $['expected'],
                                                                            ($) => ['list', _p.list.from.list(
                                                                                $,
                                                                            ).map(
                                                                                ($) => ['state', _p.decide.state(
                                                                                    $,
                                                                                    ($): t_out.Value.state => {
                                                                                        switch ($[0]) {
                                                                                            case 'dictionary':
                                                                                                return _p.ss(
                                                                                                    $,
                                                                                                    ($) => ({
                                                                                                        'option': 'dictionary',
                                                                                                        'value': ['nothing', null],
                                                                                                    }),
                                                                                                )
                                                                                            case 'group':
                                                                                                return _p.ss(
                                                                                                    $,
                                                                                                    ($) => ({
                                                                                                        'option': 'group',
                                                                                                        'value': ['nothing', null],
                                                                                                    }),
                                                                                                )
                                                                                            case 'list':
                                                                                                return _p.ss(
                                                                                                    $,
                                                                                                    ($) => ({
                                                                                                        'option': 'list',
                                                                                                        'value': ['nothing', null],
                                                                                                    }),
                                                                                                )
                                                                                            case 'nothing':
                                                                                                return _p.ss(
                                                                                                    $,
                                                                                                    ($) => ({
                                                                                                        'option': 'nothing',
                                                                                                        'value': ['nothing', null],
                                                                                                    }),
                                                                                                )
                                                                                            case 'optional':
                                                                                                return _p.ss(
                                                                                                    $,
                                                                                                    ($) => ({
                                                                                                        'option': 'optional',
                                                                                                        'value': ['nothing', null],
                                                                                                    }),
                                                                                                )
                                                                                            case 'state':
                                                                                                return _p.ss(
                                                                                                    $,
                                                                                                    ($) => ({
                                                                                                        'option': 'state',
                                                                                                        'value': ['nothing', null],
                                                                                                    }),
                                                                                                )
                                                                                            case 'text':
                                                                                                return _p.ss(
                                                                                                    $,
                                                                                                    ($) => ({
                                                                                                        'option': 'text',
                                                                                                        'value': ['nothing', null],
                                                                                                    }),
                                                                                                )
                                                                                            default:
                                                                                                return _p.au(
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
                                                        return _p.ss(
                                                            $,
                                                            ($) => ({
                                                                'option': 'missing',
                                                                'value': ['nothing', null],
                                                            }),
                                                        )
                                                    default:
                                                        return _p.au(
                                                            $[0],
                                                        )
                                                }
                                            },
                                        )],
                                    }),
                                )
                            case 'dictionary':
                                return _p.ss(
                                    $,
                                    ($) => ({
                                        'option': 'dictionary',
                                        'value': ['state', _p.decide.state(
                                            $,
                                            ($): t_out.Value.state => {
                                                switch ($[0]) {
                                                    case 'duplicate entry':
                                                        return _p.ss(
                                                            $,
                                                            ($) => ({
                                                                'option': 'duplicate entry',
                                                                'value': ['group', ['verbose', _p.literal.dictionary(
                                                                    {
                                                                        "name": _p_change_context(
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
                                                        return _p.au(
                                                            $[0],
                                                        )
                                                }
                                            },
                                        )],
                                    }),
                                )
                            case 'group':
                                return _p.ss(
                                    $,
                                    ($) => ({
                                        'option': 'group',
                                        'value': ['state', _p.decide.state(
                                            $,
                                            ($): t_out.Value.state => {
                                                switch ($[0]) {
                                                    case 'duplicate property':
                                                        return _p.ss(
                                                            $,
                                                            ($) => ({
                                                                'option': 'duplicate property',
                                                                'value': ['group', ['verbose', _p.literal.dictionary(
                                                                    {
                                                                        "name": _p_change_context(
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
                                                        return _p.ss(
                                                            $,
                                                            ($) => ({
                                                                'option': 'missing property',
                                                                'value': ['group', ['verbose', _p.literal.dictionary(
                                                                    {
                                                                        "name": _p_change_context(
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
                                                        return _p.ss(
                                                            $,
                                                            ($) => ({
                                                                'option': 'missing property value',
                                                                'value': ['group', ['verbose', _p.literal.dictionary(
                                                                    {
                                                                        "name": _p_change_context(
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
                                                        return _p.ss(
                                                            $,
                                                            ($) => ({
                                                                'option': 'superfluous property',
                                                                'value': ['group', ['verbose', _p.literal.dictionary(
                                                                    {
                                                                        "name": _p_change_context(
                                                                            $['name'],
                                                                            ($) => ['optional', _p.decide.optional(
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
                                                        return _p.au(
                                                            $[0],
                                                        )
                                                }
                                            },
                                        )],
                                    }),
                                )
                            case 'state':
                                return _p.ss(
                                    $,
                                    ($) => ({
                                        'option': 'state',
                                        'value': ['state', _p.decide.state(
                                            $,
                                            ($): t_out.Value.state => {
                                                switch ($[0]) {
                                                    case 'more than 2 items in list':
                                                        return _p.ss(
                                                            $,
                                                            ($) => ({
                                                                'option': 'more than 2 items in list',
                                                                'value': ['nothing', null],
                                                            }),
                                                        )
                                                    case 'missing option name':
                                                        return _p.ss(
                                                            $,
                                                            ($) => ({
                                                                'option': 'missing option name',
                                                                'value': ['nothing', null],
                                                            }),
                                                        )
                                                    case 'option name is not a text':
                                                        return _p.ss(
                                                            $,
                                                            ($) => ({
                                                                'option': 'option name is not a text',
                                                                'value': ['nothing', null],
                                                            }),
                                                        )
                                                    case 'missing value':
                                                        return _p.ss(
                                                            $,
                                                            ($) => ({
                                                                'option': 'missing value',
                                                                'value': ['nothing', null],
                                                            }),
                                                        )
                                                    case 'unknown option':
                                                        return _p.ss(
                                                            $,
                                                            ($) => ({
                                                                'option': 'unknown option',
                                                                'value': ['group', ['verbose', _p.literal.dictionary(
                                                                    {
                                                                        "found": _p_change_context(
                                                                            $['found'],
                                                                            ($) => ['text', {
                                                                                'delimiter': ['quote', null],
                                                                                'value': $,
                                                                            }],
                                                                        ),
                                                                        "expected": _p_change_context(
                                                                            $['expected'],
                                                                            ($) => ['dictionary', _p.dictionary.from.dictionary(
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
                                                        return _p.ss(
                                                            $,
                                                            ($) => ({
                                                                'option': 'missing option',
                                                                'value': ['nothing', null],
                                                            }),
                                                        )
                                                    default:
                                                        return _p.au(
                                                            $[0],
                                                        )
                                                }
                                            },
                                        )],
                                    }),
                                )
                            default:
                                return _p.au(
                                    $[0],
                                )
                        }
                    },
                )],
            ),
        },
    )]],
)]

export const Warnings: t_signatures.Warnings = ($) => ['list', _p.list.from.list(
    $,
).map(
    ($) => ['group', ['verbose', _p.literal.dictionary(
        {
            "range": _p_change_context(
                $['range'],
                ($) => v_external_location.Range(
                    $,
                ),
            ),
            "type": _p_change_context(
                $['type'],
                ($) => ['state', _p.decide.state(
                    $,
                    ($): t_out.Value.state => {
                        switch ($[0]) {
                            case 'expected apostrophed text':
                                return _p.ss(
                                    $,
                                    ($) => ({
                                        'option': 'expected apostrophed text',
                                        'value': ['nothing', null],
                                    }),
                                )
                            case 'expected quoted text':
                                return _p.ss(
                                    $,
                                    ($) => ({
                                        'option': 'expected quoted text',
                                        'value': ['nothing', null],
                                    }),
                                )
                            case 'expected backticked text':
                                return _p.ss(
                                    $,
                                    ($) => ({
                                        'option': 'expected backticked text',
                                        'value': ['nothing', null],
                                    }),
                                )
                            case 'expected undelimited text':
                                return _p.ss(
                                    $,
                                    ($) => ({
                                        'option': 'expected undelimited text',
                                        'value': ['nothing', null],
                                    }),
                                )
                            case 'expected a group':
                                return _p.ss(
                                    $,
                                    ($) => ({
                                        'option': 'expected a group',
                                        'value': ['nothing', null],
                                    }),
                                )
                            default:
                                return _p.au(
                                    $[0],
                                )
                        }
                    },
                )],
            ),
        },
    )]],
)]
