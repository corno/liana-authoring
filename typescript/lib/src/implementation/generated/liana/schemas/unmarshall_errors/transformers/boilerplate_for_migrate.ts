
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/specials/change_context'

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
                        case 'value':
                            return _p.ss(
                                $,
                                ($) => ['value', _p.decide.state(
                                    $,
                                    ($): t_out.Errors.L.type_.value => {
                                        switch ($[0]) {
                                            case 'invalid type':
                                                return _p.ss(
                                                    $,
                                                    ($) => ['invalid type', {
                                                        'expected': _p_change_context(
                                                            $['expected'],
                                                            ($) => _p.list.from.list(
                                                                $,
                                                            ).map(
                                                                ($) => _p.decide.state(
                                                                    $,
                                                                    ($): t_out.Errors.L.type_.value.invalid_type.expected.L => {
                                                                        switch ($[0]) {
                                                                            case 'dictionary':
                                                                                return _p.ss(
                                                                                    $,
                                                                                    ($) => ['dictionary', null],
                                                                                )
                                                                            case 'group':
                                                                                return _p.ss(
                                                                                    $,
                                                                                    ($) => ['group', null],
                                                                                )
                                                                            case 'list':
                                                                                return _p.ss(
                                                                                    $,
                                                                                    ($) => ['list', null],
                                                                                )
                                                                            case 'nothing':
                                                                                return _p.ss(
                                                                                    $,
                                                                                    ($) => ['nothing', null],
                                                                                )
                                                                            case 'optional':
                                                                                return _p.ss(
                                                                                    $,
                                                                                    ($) => ['optional', null],
                                                                                )
                                                                            case 'state':
                                                                                return _p.ss(
                                                                                    $,
                                                                                    ($) => ['state', null],
                                                                                )
                                                                            case 'text':
                                                                                return _p.ss(
                                                                                    $,
                                                                                    ($) => ['text', null],
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
                                            case 'missing':
                                                return _p.ss(
                                                    $,
                                                    ($) => ['missing', null],
                                                )
                                            default:
                                                return _p.au(
                                                    $[0],
                                                )
                                        }
                                    },
                                )],
                            )
                        case 'dictionary':
                            return _p.ss(
                                $,
                                ($) => ['dictionary', _p.decide.state(
                                    $,
                                    ($): t_out.Errors.L.type_.dictionary => {
                                        switch ($[0]) {
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
                                            default:
                                                return _p.au(
                                                    $[0],
                                                )
                                        }
                                    },
                                )],
                            )
                        case 'group':
                            return _p.ss(
                                $,
                                ($) => ['group', _p.decide.state(
                                    $,
                                    ($): t_out.Errors.L.type_.group => {
                                        switch ($[0]) {
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
                                            default:
                                                return _p.au(
                                                    $[0],
                                                )
                                        }
                                    },
                                )],
                            )
                        case 'state':
                            return _p.ss(
                                $,
                                ($) => ['state', _p.decide.state(
                                    $,
                                    ($): t_out.Errors.L.type_.state => {
                                        switch ($[0]) {
                                            case 'more than 2 items in list':
                                                return _p.ss(
                                                    $,
                                                    ($) => ['more than 2 items in list', null],
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
            ),
        ),
    }),
)

export const Warnings: t_signatures.Warnings = ($) => _p.list.from.list(
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
                ($): t_out.Warnings.L.type_ => {
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
            ),
        ),
    }),
)
