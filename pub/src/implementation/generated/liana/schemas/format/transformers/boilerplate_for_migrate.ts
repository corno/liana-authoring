
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/_p_change_context'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/format/signatures/transformers/boilerplate_for_migrate"

import * as t_out from "../../../../../../interface/generated/liana/schemas/format/data"

import * as v_location from "../../location/transformers/boilerplate_for_migrate"

export const Result: t_signatures.Result = ($) => _p.list.from.list(
    $,
).map(
    ($) => _p.decide.state(
        $,
        ($): t_out.Result.L => {
            switch ($[0]) {
                case 'replace':
                    return _p.ss(
                        $,
                        ($) => ['replace', {
                            'range': _p_change_context(
                                $['range'],
                                ($) => v_location.Range(
                                    $,
                                ),
                            ),
                            'text': _p_change_context(
                                $['text'],
                                ($) => $,
                            ),
                        }],
                    )
                case 'delete':
                    return _p.ss(
                        $,
                        ($) => ['delete', {
                            'range': _p_change_context(
                                $['range'],
                                ($) => v_location.Range(
                                    $,
                                ),
                            ),
                        }],
                    )
                case 'insert':
                    return _p.ss(
                        $,
                        ($) => ['insert', {
                            'location': _p_change_context(
                                $['location'],
                                ($) => v_location.Position(
                                    $,
                                ),
                            ),
                            'text': _p_change_context(
                                $['text'],
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
    ),
)

export const Error: t_signatures.Error = ($) => ({
    'message': _p_change_context(
        $['message'],
        ($) => $,
    ),
})

export const Parameters: t_signatures.Parameters = ($) => ({
    'options': _p_change_context(
        $['options'],
        ($) => ({
            'insert spaces': _p_change_context(
                $['insert spaces'],
                ($) => $,
            ),
            'preserve delimiters': _p_change_context(
                $['preserve delimiters'],
                ($) => $,
            ),
            'preserve final newline state': _p_change_context(
                $['preserve final newline state'],
                ($) => $,
            ),
            'preserve commas': _p_change_context(
                $['preserve commas'],
                ($) => $,
            ),
            'indent string': _p_change_context(
                $['indent string'],
                ($) => $,
            ),
        }),
    ),
})
