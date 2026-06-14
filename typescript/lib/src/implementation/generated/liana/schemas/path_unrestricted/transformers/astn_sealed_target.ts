
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/specials/change_context'

import _p_text_from_list from 'pareto-core/dist/specials/text_from_list'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/path_unrestricted/signatures/transformers/astn_sealed_target"

import * as t_out from "astn-core/dist/interface/generated/liana/schemas/sealed_target/data"

import * as v_primitives_to_text from "liana-core/dist/implementation/manual/transformers/primitives/text"

export const Node_Path: t_signatures.Node_Path = ($) => ['group', ['verbose', _p.dictionary.literal(
    {
        "context": _p_change_context(
            $['context'],
            ($) => Context_Path(
                $,
            ),
        ),
        "node": _p_change_context(
            $['node'],
            ($) => ['text', {
                'delimiter': ['quote', null],
                'value': $,
            }],
        ),
    },
)]]

export const Context_Path: t_signatures.Context_Path = ($) => ['group', ['verbose', _p.dictionary.literal(
    {
        "start": _p_change_context(
            $['start'],
            ($) => Start(
                $,
            ),
        ),
        "subpath": _p_change_context(
            $['subpath'],
            ($) => Context_Subpath(
                $,
            ),
        ),
    },
)]]

export const Context_Subpath: t_signatures.Context_Subpath = ($) => ['list', _p.list.from.list(
    $,
).map(
    ($) => ['text', {
        'delimiter': ['quote', null],
        'value': $,
    }],
)]

export const Start: t_signatures.Start = ($) => ['state', _p.decide.state(
    $,
    ($): t_out.Value.state => {
        switch ($[0]) {
            case 'absolute':
                return _p.ss(
                    $,
                    ($) => ({
                        'option': 'absolute',
                        'value': ['nothing', null],
                    }),
                )
            case 'relative':
                return _p.ss(
                    $,
                    ($) => ({
                        'option': 'relative',
                        'value': ['group', ['verbose', _p.dictionary.literal(
                            {
                                "up steps": _p_change_context(
                                    $['up steps'],
                                    ($) => Up_Steps(
                                        $,
                                    ),
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
)]

export const Up_Steps: t_signatures.Up_Steps = ($) => ['text', {
    'delimiter': ['none', null],
    'value': v_primitives_to_text.decimal(
        $,
    ),
}]
