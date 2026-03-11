
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/_p_change_context'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/completion_suggestions/signatures/transformers/boilerplate_for_migrate"

import * as t_out from "../../../../../../interface/generated/liana/schemas/completion_suggestions/data"

import * as v_location from "../../location/transformers/boilerplate_for_migrate"

import * as v_text_edits from "../../text_edits/transformers/boilerplate_for_migrate"

export const Completion_Suggestions: t_signatures.Completion_Suggestions = ($) => _p.list.from.list(
    $,
).map(
    ($) => ({
        'label': _p_change_context(
            $['label'],
            ($) => $,
        ),
        'insert text': _p_change_context(
            $['insert text'],
            ($) => $,
        ),
        'documentation': _p_change_context(
            $['documentation'],
            ($) => $,
        ),
        'additional text edits': _p_change_context(
            $['additional text edits'],
            ($) => v_text_edits.Text_Edits(
                $,
            ),
        ),
        'type': _p_change_context(
            $['type'],
            ($) => _p.decide.state(
                $,
                ($): t_out.Completion_Suggestions.L.type_ => {
                    switch ($[0]) {
                        case 'boolean':
                            return _p.ss(
                                $,
                                ($) => ['boolean', null],
                            )
                        case 'component':
                            return _p.ss(
                                $,
                                ($) => ['component', null],
                            )
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
                        case 'number':
                            return _p.ss(
                                $,
                                ($) => ['number', null],
                            )
                        case 'optional':
                            return _p.ss(
                                $,
                                ($) => ['optional', null],
                            )
                        case 'reference':
                            return _p.ss(
                                $,
                                ($) => ['reference', null],
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
    }),
)
