
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/_p_change_context'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/path/signatures/transformers/boilerplate_for_migrate"

import * as t_out from "../../../../../../interface/generated/liana/schemas/path/data"

export const Node_Path: t_signatures.Node_Path = ($) => ({
    'context': _p_change_context(
        $['context'],
        ($) => Context_Path(
            $,
        ),
    ),
    'node': _p_change_context(
        $['node'],
        ($) => $,
    ),
})

export const Context_Path: t_signatures.Context_Path = ($) => ({
    'start': _p_change_context(
        $['start'],
        ($) => Start(
            $,
        ),
    ),
    'subpath': _p_change_context(
        $['subpath'],
        ($) => Context_Subpath(
            $,
        ),
    ),
})

export const Context_Subpath: t_signatures.Context_Subpath = ($) => _p.list.from.list(
    $,
).map(
    ($) => $,
)

export const Start: t_signatures.Start = ($) => _p.decide.state(
    $,
    ($): t_out.Start => {
        switch ($[0]) {
            case 'absolute':
                return _p.ss(
                    $,
                    ($) => ['absolute', null],
                )
            case 'relative':
                return _p.ss(
                    $,
                    ($) => ['relative', {
                        'up steps': _p_change_context(
                            $['up steps'],
                            ($) => Up_Steps(
                                $,
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
)

export const Up_Steps: t_signatures.Up_Steps = ($) => $

export const Non_Normalized_Path: t_signatures.Non_Normalized_Path = ($) => ({
    'leading slash': _p_change_context(
        $['leading slash'],
        ($) => $,
    ),
    'segments': _p_change_context(
        $['segments'],
        ($) => _p.list.from.list(
            $,
        ).map(
            ($) => _p.decide.state(
                $,
                ($): t_out.Non_Normalized_Path.segments.L => {
                    switch ($[0]) {
                        case 'parent':
                            return _p.ss(
                                $,
                                ($) => ['parent', null],
                            )
                        case 'child':
                            return _p.ss(
                                $,
                                ($) => ['child', $],
                            )
                        case 'current':
                            return _p.ss(
                                $,
                                ($) => ['current', null],
                            )
                        case 'nothing':
                            return _p.ss(
                                $,
                                ($) => ['nothing', null],
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
    'trailing slash': _p_change_context(
        $['trailing slash'],
        ($) => $,
    ),
})
