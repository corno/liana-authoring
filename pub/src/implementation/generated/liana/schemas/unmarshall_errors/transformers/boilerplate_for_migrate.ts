
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/_p_change_context'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/unmarshall_errors/signatures/transformers/boilerplate_for_migrate"

import * as t_out from "../../../../../../interface/generated/liana/schemas/unmarshall_errors/data"

import * as v_location from "../../astn_location/transformers/boilerplate_for_migrate"

export const Errors: t_signatures.Errors = ($) => _p.list.from.list(
    $,
).map(
    ($) => ({
        'range': _p_change_context(
            $['range'],
            ($) => v_location.Range(
                $,
            ),
        ),
        'type': _p_change_context(
            $['type'],
            ($) => _p.decide.state(
                $,
                ($): t_out.Errors.L.type_ => {
                    switch ($[0]) {
                        case 'error':
                            return _p.ss(
                                $,
                                ($) => ['error', _p.decide.state(
                                    $,
                                    ($): t_out.Errors.L.type_.error => {
                                        switch ($[0]) {
                                            case 'invalid value type':
                                                return _p.ss(
                                                    $,
                                                    ($) => ['invalid value type', {
                                                        'expected': _p_change_context(
                                                            $['expected'],
                                                            ($) => _p.list.from.list(
                                                                $,
                                                            ).map(
                                                                ($) => _p.decide.state(
                                                                    $,
                                                                    ($): t_out.Errors.L.type_.error.invalid_value_type.expected.L => {
                                                                        switch ($[0]) {
                                                                            case 'text':
                                                                                return _p.ss(
                                                                                    $,
                                                                                    ($) => ['text', null],
                                                                                )
                                                                            case 'verbose group':
                                                                                return _p.ss(
                                                                                    $,
                                                                                    ($) => ['verbose group', null],
                                                                                )
                                                                            case 'concise group':
                                                                                return _p.ss(
                                                                                    $,
                                                                                    ($) => ['concise group', null],
                                                                                )
                                                                            case 'dictionary':
                                                                                return _p.ss(
                                                                                    $,
                                                                                    ($) => ['dictionary', null],
                                                                                )
                                                                            case 'not set':
                                                                                return _p.ss(
                                                                                    $,
                                                                                    ($) => ['not set', null],
                                                                                )
                                                                            case 'nothing':
                                                                                return _p.ss(
                                                                                    $,
                                                                                    ($) => ['nothing', null],
                                                                                )
                                                                            case 'set':
                                                                                return _p.ss(
                                                                                    $,
                                                                                    ($) => ['set', null],
                                                                                )
                                                                            case 'list':
                                                                                return _p.ss(
                                                                                    $,
                                                                                    ($) => ['list', null],
                                                                                )
                                                                            case 'state':
                                                                                return _p.ss(
                                                                                    $,
                                                                                    ($) => ['state', null],
                                                                                )
                                                                            default:
                                                                                return _p.au(
                                                                                    $[0],
                                                                                )
                                                                        }
                                                                    },
                                                                ),
                                                            ),
                                                        ),
                                                    }],
                                                )
                                            case 'duplicate property':
                                                return _p.ss(
                                                    $,
                                                    ($) => ['duplicate property', {
                                                        'name': _p_change_context(
                                                            $['name'],
                                                            ($) => $,
                                                        ),
                                                    }],
                                                )
                                            case 'duplicate entry':
                                                return _p.ss(
                                                    $,
                                                    ($) => ['duplicate entry', {
                                                        'name': _p_change_context(
                                                            $['name'],
                                                            ($) => $,
                                                        ),
                                                    }],
                                                )
                                            case 'missing property':
                                                return _p.ss(
                                                    $,
                                                    ($) => ['missing property', {
                                                        'name': _p_change_context(
                                                            $['name'],
                                                            ($) => $,
                                                        ),
                                                    }],
                                                )
                                            case 'missing value':
                                                return _p.ss(
                                                    $,
                                                    ($) => ['missing value', null],
                                                )
                                            case 'missing property value':
                                                return _p.ss(
                                                    $,
                                                    ($) => ['missing property value', {
                                                        'name': _p_change_context(
                                                            $['name'],
                                                            ($) => $,
                                                        ),
                                                    }],
                                                )
                                            case 'superfluous property':
                                                return _p.ss(
                                                    $,
                                                    ($) => ['superfluous property', {
                                                        'name': _p_change_context(
                                                            $['name'],
                                                            ($) => _p.optional.from.optional(
                                                                $,
                                                            ).map(
                                                                ($) => $,
                                                            ),
                                                        ),
                                                    }],
                                                )
                                            case 'state':
                                                return _p.ss(
                                                    $,
                                                    ($) => ['state', _p.decide.state(
                                                        $,
                                                        ($): t_out.Errors.L.type_.error.state => {
                                                            switch ($[0]) {
                                                                case 'more than 2 items':
                                                                    return _p.ss(
                                                                        $,
                                                                        ($) => ['more than 2 items', null],
                                                                    )
                                                                case 'missing option name':
                                                                    return _p.ss(
                                                                        $,
                                                                        ($) => ['missing option name', null],
                                                                    )
                                                                case 'option name is not a text':
                                                                    return _p.ss(
                                                                        $,
                                                                        ($) => ['option name is not a text', null],
                                                                    )
                                                                case 'missing value':
                                                                    return _p.ss(
                                                                        $,
                                                                        ($) => ['missing value', null],
                                                                    )
                                                                case 'unknown option':
                                                                    return _p.ss(
                                                                        $,
                                                                        ($) => ['unknown option', {
                                                                            'found': _p_change_context(
                                                                                $['found'],
                                                                                ($) => $,
                                                                            ),
                                                                            'expected': _p_change_context(
                                                                                $['expected'],
                                                                                ($) => _p.dictionary.from.dictionary(
                                                                                    $,
                                                                                ).map(
                                                                                    ($, id) => null,
                                                                                ),
                                                                            ),
                                                                        }],
                                                                    )
                                                                case 'missing option':
                                                                    return _p.ss(
                                                                        $,
                                                                        ($) => ['missing option', null],
                                                                    )
                                                                default:
                                                                    return _p.au(
                                                                        $[0],
                                                                    )
                                                            }
                                                        },
                                                    )],
                                                )
                                            default:
                                                return _p.au(
                                                    $[0],
                                                )
                                        }
                                    },
                                )],
                            )
                        case 'warning':
                            return _p.ss(
                                $,
                                ($) => ['warning', _p.decide.state(
                                    $,
                                    ($): t_out.Errors.L.type_.warning => {
                                        switch ($[0]) {
                                            case 'expected apostrophed text':
                                                return _p.ss(
                                                    $,
                                                    ($) => ['expected apostrophed text', null],
                                                )
                                            case 'expected quoted text':
                                                return _p.ss(
                                                    $,
                                                    ($) => ['expected quoted text', null],
                                                )
                                            case 'expected backticked text':
                                                return _p.ss(
                                                    $,
                                                    ($) => ['expected backticked text', null],
                                                )
                                            case 'expected undelimited text':
                                                return _p.ss(
                                                    $,
                                                    ($) => ['expected undelimited text', null],
                                                )
                                            case 'expected a group':
                                                return _p.ss(
                                                    $,
                                                    ($) => ['expected a group', null],
                                                )
                                            default:
                                                return _p.au(
                                                    $[0],
                                                )
                                        }
                                    },
                                )],
                            )
                        default:
                            return _p.au(
                                $[0],
                            )
                    }
                },
            ),
        ),
    }),
)
