
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/_p_change_context'

import _p_text_from_list from 'pareto-core/dist/_p_text_from_list'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/unmarshall_errors/signatures/transformers/astn_sealed_target"

import * as t_out from "astn-core/dist/interface/generated/liana/schemas/sealed_target/data"

import * as v_primitives_to_text from "liana-core/dist/implementation/manual/transformers/primitives/text"

import * as v_external_location from "../../astn_location/transformers/astn_sealed_target"

export const Errors: t_signatures.Errors = ($) => ['list', _p.list.from.list(
    $,
).map(
    ($) => ['group', ['verbose', _p.dictionary.literal(
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
                            case 'error':
                                return _p.ss(
                                    $,
                                    ($) => ({
                                        'option': 'error',
                                        'value': ['state', _p.decide.state(
                                            $,
                                            ($): t_out.Value.state => {
                                                switch ($[0]) {
                                                    case 'invalid value type':
                                                        return _p.ss(
                                                            $,
                                                            ($) => ({
                                                                'option': 'invalid value type',
                                                                'value': ['group', ['verbose', _p.dictionary.literal(
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
                                                                                            case 'text':
                                                                                                return _p.ss(
                                                                                                    $,
                                                                                                    ($) => ({
                                                                                                        'option': 'text',
                                                                                                        'value': ['nothing', null],
                                                                                                    }),
                                                                                                )
                                                                                            case 'verbose group':
                                                                                                return _p.ss(
                                                                                                    $,
                                                                                                    ($) => ({
                                                                                                        'option': 'verbose group',
                                                                                                        'value': ['nothing', null],
                                                                                                    }),
                                                                                                )
                                                                                            case 'concise group':
                                                                                                return _p.ss(
                                                                                                    $,
                                                                                                    ($) => ({
                                                                                                        'option': 'concise group',
                                                                                                        'value': ['nothing', null],
                                                                                                    }),
                                                                                                )
                                                                                            case 'dictionary':
                                                                                                return _p.ss(
                                                                                                    $,
                                                                                                    ($) => ({
                                                                                                        'option': 'dictionary',
                                                                                                        'value': ['nothing', null],
                                                                                                    }),
                                                                                                )
                                                                                            case 'not set':
                                                                                                return _p.ss(
                                                                                                    $,
                                                                                                    ($) => ({
                                                                                                        'option': 'not set',
                                                                                                        'value': ['nothing', null],
                                                                                                    }),
                                                                                                )
                                                                                            case 'set':
                                                                                                return _p.ss(
                                                                                                    $,
                                                                                                    ($) => ({
                                                                                                        'option': 'set',
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
                                                                                            case 'state':
                                                                                                return _p.ss(
                                                                                                    $,
                                                                                                    ($) => ({
                                                                                                        'option': 'state',
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
                                                    case 'duplicate property':
                                                        return _p.ss(
                                                            $,
                                                            ($) => ({
                                                                'option': 'duplicate property',
                                                                'value': ['group', ['verbose', _p.dictionary.literal(
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
                                                    case 'duplicate entry':
                                                        return _p.ss(
                                                            $,
                                                            ($) => ({
                                                                'option': 'duplicate entry',
                                                                'value': ['group', ['verbose', _p.dictionary.literal(
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
                                                                'value': ['group', ['verbose', _p.dictionary.literal(
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
                                                    case 'missing value':
                                                        return _p.ss(
                                                            $,
                                                            ($) => ({
                                                                'option': 'missing value',
                                                                'value': ['nothing', null],
                                                            }),
                                                        )
                                                    case 'missing property value':
                                                        return _p.ss(
                                                            $,
                                                            ($) => ({
                                                                'option': 'missing property value',
                                                                'value': ['group', ['verbose', _p.dictionary.literal(
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
                                                                'value': ['group', ['verbose', _p.dictionary.literal(
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
                                                    case 'state':
                                                        return _p.ss(
                                                            $,
                                                            ($) => ({
                                                                'option': 'state',
                                                                'value': ['state', _p.decide.state(
                                                                    $,
                                                                    ($): t_out.Value.state => {
                                                                        switch ($[0]) {
                                                                            case 'more than 2 items':
                                                                                return _p.ss(
                                                                                    $,
                                                                                    ($) => ({
                                                                                        'option': 'more than 2 items',
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
                                                                                        'value': ['group', ['verbose', _p.dictionary.literal(
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
                                    }),
                                )
                            case 'warning':
                                return _p.ss(
                                    $,
                                    ($) => ({
                                        'option': 'warning',
                                        'value': ['state', _p.decide.state(
                                            $,
                                            ($): t_out.Value.state => {
                                                switch ($[0]) {
                                                    case 'expected apostrophed string':
                                                        return _p.ss(
                                                            $,
                                                            ($) => ({
                                                                'option': 'expected apostrophed string',
                                                                'value': ['nothing', null],
                                                            }),
                                                        )
                                                    case 'expected quoted string':
                                                        return _p.ss(
                                                            $,
                                                            ($) => ({
                                                                'option': 'expected quoted string',
                                                                'value': ['nothing', null],
                                                            }),
                                                        )
                                                    case 'expected backticked string':
                                                        return _p.ss(
                                                            $,
                                                            ($) => ({
                                                                'option': 'expected backticked string',
                                                                'value': ['nothing', null],
                                                            }),
                                                        )
                                                    case 'expected undelimited string':
                                                        return _p.ss(
                                                            $,
                                                            ($) => ({
                                                                'option': 'expected undelimited string',
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
