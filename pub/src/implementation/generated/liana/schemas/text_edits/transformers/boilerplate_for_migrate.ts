
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/_p_change_context'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/text_edits/signatures/transformers/boilerplate_for_migrate"

import * as t_out from "../../../../../../interface/generated/liana/schemas/text_edits/data"

import * as v_location from "../../location/transformers/boilerplate_for_migrate"

export const Text_Edits: t_signatures.Text_Edits = ($) => _p.list.from.list(
    $,
).map(
    ($) => _p.decide.state(
        $,
        ($): t_out.Text_Edits.L => {
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
