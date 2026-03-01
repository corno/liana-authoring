
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/_p_change_context'

import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'

import _p_variables from 'pareto-core/dist/_p_variables'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/path/signatures/refiners/astn_parse_tree"

import * as t_out from "../../../../../../interface/generated/liana/schemas/path/data"

import * as v_unmarshalled_from_parse_tree from "liana-core/dist/implementation/manual/refiners/unmarshalled/astn_parse_tree"

import * as v_parse_tree_to_location from "astn-core/dist/implementation/manual/transformers/parse_tree/start_token_range"

export const Node_Path: t_signatures.Node_Path = ($, abort) => _p_change_context(
    v_unmarshalled_from_parse_tree.Verbose_Group(
        $,
        ($) => abort(
            $,
        ),
        {
            'expected properties': _p.dictionary.literal(
                {
                    "context": null,
                    "node": null,
                },
            ),
        },
    ),
    ($) => _p_variables(
        () => {
            
            const var_verbose_group_range = v_parse_tree_to_location.Value(
                $['value'],
            )
            return {
                'context': _p_change_context(
                    v_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(
                            $,
                        ),
                        {
                            'id': 'context',
                        },
                    ),
                    ($) => Context_Path(
                        $,
                        ($) => abort(
                            $,
                        ),
                    ),
                ),
                'node': _p_change_context(
                    v_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(
                            $,
                        ),
                        {
                            'id': 'node',
                        },
                    ),
                    ($) => v_unmarshalled_from_parse_tree.Text(
                        $,
                        ($) => abort(
                            $,
                        ),
                    ),
                ),
            }
        },
    ),
)

export const Context_Path: t_signatures.Context_Path = ($, abort) => _p_change_context(
    v_unmarshalled_from_parse_tree.Verbose_Group(
        $,
        ($) => abort(
            $,
        ),
        {
            'expected properties': _p.dictionary.literal(
                {
                    "start": null,
                    "subpath": null,
                },
            ),
        },
    ),
    ($) => _p_variables(
        () => {
            
            const var_verbose_group_range = v_parse_tree_to_location.Value(
                $['value'],
            )
            return {
                'start': _p_change_context(
                    v_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(
                            $,
                        ),
                        {
                            'id': 'start',
                        },
                    ),
                    ($) => Start(
                        $,
                        ($) => abort(
                            $,
                        ),
                    ),
                ),
                'subpath': _p_change_context(
                    v_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(
                            $,
                        ),
                        {
                            'id': 'subpath',
                        },
                    ),
                    ($) => Context_Subpath(
                        $,
                        ($) => abort(
                            $,
                        ),
                    ),
                ),
            }
        },
    ),
)

export const Context_Subpath: t_signatures.Context_Subpath = ($, abort) => _p.list.from.list(
    v_unmarshalled_from_parse_tree.List(
        $,
        ($) => abort(
            $,
        ),
    )['items'],
).map(
    ($) => _p_change_context(
        $['value'],
        ($) => v_unmarshalled_from_parse_tree.Text(
            $,
            ($) => abort(
                $,
            ),
        ),
    ),
)

export const Start: t_signatures.Start = ($, abort) => _p_change_context(
    v_unmarshalled_from_parse_tree.State(
        $,
        ($) => abort(
            $,
        ),
    ),
    ($) => _p.decide.text(
        $['option']['value'],
        ($t): t_out.Start => {
            switch ($t) {
                case 'absolute':
                    return _p_change_context(
                        $['value'],
                        ($) => ['absolute', v_unmarshalled_from_parse_tree.Nothing(
                            $,
                            ($) => abort(
                                $,
                            ),
                        )],
                    )
                case 'relative':
                    return _p_change_context(
                        $['value'],
                        ($) => ['relative', _p_change_context(
                            v_unmarshalled_from_parse_tree.Verbose_Group(
                                $,
                                ($) => abort(
                                    $,
                                ),
                                {
                                    'expected properties': _p.dictionary.literal(
                                        {
                                            "up steps": null,
                                        },
                                    ),
                                },
                            ),
                            ($) => _p_variables(
                                () => {
                                    
                                    const var_verbose_group_range = v_parse_tree_to_location.Value(
                                        $['value'],
                                    )
                                    return {
                                        'up steps': _p_change_context(
                                            v_unmarshalled_from_parse_tree.Property(
                                                $,
                                                ($) => abort(
                                                    $,
                                                ),
                                                {
                                                    'id': 'up steps',
                                                },
                                            ),
                                            ($) => Up_Steps(
                                                $,
                                                ($) => abort(
                                                    $,
                                                ),
                                            ),
                                        ),
                                    }
                                },
                            ),
                        )],
                    )
                default:
                    return abort(
                        ['liana', {
                            'type': ['state', ['unknown option', $['option']['value']]],
                            'range': v_parse_tree_to_location.Value(
                                $['value'],
                            ),
                        }],
                    )
            }
        },
    ),
)

export const Up_Steps: t_signatures.Up_Steps = ($, abort) => v_unmarshalled_from_parse_tree.Number(
    $,
    ($) => abort(
        $,
    ),
    {
        'type': ['decimal', null],
    },
)

export const Non_Normalized_Path: t_signatures.Non_Normalized_Path = ($, abort) => _p_change_context(
    v_unmarshalled_from_parse_tree.Verbose_Group(
        $,
        ($) => abort(
            $,
        ),
        {
            'expected properties': _p.dictionary.literal(
                {
                    "leading slash": null,
                    "segments": null,
                    "trailing slash": null,
                },
            ),
        },
    ),
    ($) => _p_variables(
        () => {
            
            const var_verbose_group_range = v_parse_tree_to_location.Value(
                $['value'],
            )
            return {
                'leading slash': _p_change_context(
                    v_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(
                            $,
                        ),
                        {
                            'id': 'leading slash',
                        },
                    ),
                    ($) => v_unmarshalled_from_parse_tree.Boolean(
                        $,
                        ($) => abort(
                            $,
                        ),
                        {
                            'type': ['true/false', null],
                        },
                    ),
                ),
                'segments': _p_change_context(
                    v_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(
                            $,
                        ),
                        {
                            'id': 'segments',
                        },
                    ),
                    ($) => _p.list.from.list(
                        v_unmarshalled_from_parse_tree.List(
                            $,
                            ($) => abort(
                                $,
                            ),
                        )['items'],
                    ).map(
                        ($) => _p_change_context(
                            $['value'],
                            ($) => _p_change_context(
                                v_unmarshalled_from_parse_tree.State(
                                    $,
                                    ($) => abort(
                                        $,
                                    ),
                                ),
                                ($) => _p.decide.text(
                                    $['option']['value'],
                                    ($t): t_out.Non_Normalized_Path.segments.L => {
                                        switch ($t) {
                                            case 'parent':
                                                return _p_change_context(
                                                    $['value'],
                                                    ($) => ['parent', v_unmarshalled_from_parse_tree.Nothing(
                                                        $,
                                                        ($) => abort(
                                                            $,
                                                        ),
                                                    )],
                                                )
                                            case 'child':
                                                return _p_change_context(
                                                    $['value'],
                                                    ($) => ['child', v_unmarshalled_from_parse_tree.Text(
                                                        $,
                                                        ($) => abort(
                                                            $,
                                                        ),
                                                    )],
                                                )
                                            case 'current':
                                                return _p_change_context(
                                                    $['value'],
                                                    ($) => ['current', v_unmarshalled_from_parse_tree.Nothing(
                                                        $,
                                                        ($) => abort(
                                                            $,
                                                        ),
                                                    )],
                                                )
                                            case 'nothing':
                                                return _p_change_context(
                                                    $['value'],
                                                    ($) => ['nothing', v_unmarshalled_from_parse_tree.Nothing(
                                                        $,
                                                        ($) => abort(
                                                            $,
                                                        ),
                                                    )],
                                                )
                                            default:
                                                return abort(
                                                    ['liana', {
                                                        'type': ['state', ['unknown option', $['option']['value']]],
                                                        'range': v_parse_tree_to_location.Value(
                                                            $['value'],
                                                        ),
                                                    }],
                                                )
                                        }
                                    },
                                ),
                            ),
                        ),
                    ),
                ),
                'trailing slash': _p_change_context(
                    v_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(
                            $,
                        ),
                        {
                            'id': 'trailing slash',
                        },
                    ),
                    ($) => v_unmarshalled_from_parse_tree.Boolean(
                        $,
                        ($) => abort(
                            $,
                        ),
                        {
                            'type': ['true/false', null],
                        },
                    ),
                ),
            }
        },
    ),
)
