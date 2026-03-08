
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/_p_change_context'

import _p_text_from_list from 'pareto-core/dist/_p_text_from_list'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/text_edits/signatures/transformers/astn_sealed_target"

import * as t_out from "astn-core/dist/interface/generated/liana/schemas/sealed_target/data"

import * as v_primitives_to_text from "liana-core/dist/implementation/manual/transformers/primitives/text"

import * as v_external_location from "../../location/transformers/astn_sealed_target"

export const Text_Edits: t_signatures.Text_Edits = ($) => ['list', _p.list.from.list(
    $,
).map(
    ($) => ['state', _p.decide.state(
        $,
        ($): t_out.Value.state => {
            switch ($[0]) {
                case 'replace':
                    return _p.ss(
                        $,
                        ($) => ({
                            'option': 'replace',
                            'value': ['group', ['verbose', _p.dictionary.literal(
                                {
                                    "range": _p_change_context(
                                        $['range'],
                                        ($) => v_external_location.Range(
                                            $,
                                        ),
                                    ),
                                    "text": _p_change_context(
                                        $['text'],
                                        ($) => ['text', {
                                            'delimiter': ['quote', null],
                                            'value': $,
                                        }],
                                    ),
                                },
                            )]],
                        }),
                    )
                case 'delete':
                    return _p.ss(
                        $,
                        ($) => ({
                            'option': 'delete',
                            'value': ['group', ['verbose', _p.dictionary.literal(
                                {
                                    "range": _p_change_context(
                                        $['range'],
                                        ($) => v_external_location.Range(
                                            $,
                                        ),
                                    ),
                                },
                            )]],
                        }),
                    )
                case 'insert':
                    return _p.ss(
                        $,
                        ($) => ({
                            'option': 'insert',
                            'value': ['group', ['verbose', _p.dictionary.literal(
                                {
                                    "location": _p_change_context(
                                        $['location'],
                                        ($) => v_external_location.Position(
                                            $,
                                        ),
                                    ),
                                    "text": _p_change_context(
                                        $['text'],
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
)]
