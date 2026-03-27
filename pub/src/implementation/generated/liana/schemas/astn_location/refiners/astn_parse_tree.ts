
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/_p_change_context'

import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'

import _p_variables from 'pareto-core/dist/_p_variables'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/astn_location/signatures/refiners/astn_parse_tree"

import * as t_out from "../../../../../../interface/generated/liana/schemas/astn_location/data"

import * as v_unmarshalled_from_parse_tree from "liana-core/dist/implementation/manual/refiners/unmarshalled/astn_parse_tree"

import * as v_parse_tree_to_location from "liana-core/dist/implementation/manual/transformers/parse_tree/start_token_range"

export const Range: t_signatures.Range = ($, abort) => _p_change_context(
    v_unmarshalled_from_parse_tree.Verbose_Group(
        $,
        ($) => abort(
            $,
        ),
        {
            'expected properties': _p.dictionary.literal(
                {
                    "start": null,
                    "end": null,
                },
            ),
            'document resource identifier': "dummy dri",
        },
    ),
    ($) => _p_variables(
        () => {
            
            const var_verbose_group_range = v_parse_tree_to_location.Value(
                $['value'],
                {
                    'document resource identifier': "dummy dri",
                },
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
                            'document resource identifier': "dummy dri",
                        },
                    ),
                    ($) => Location(
                        $,
                        ($) => abort(
                            $,
                        ),
                    ),
                ),
                'end': _p_change_context(
                    v_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(
                            $,
                        ),
                        {
                            'id': 'end',
                            'document resource identifier': "dummy dri",
                        },
                    ),
                    ($) => Location(
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

export const Possible_Range: t_signatures.Possible_Range = ($, abort) => _p_change_context(
    v_unmarshalled_from_parse_tree.State(
        $,
        ($) => abort(
            $,
        ),
    ),
    ($) => _p.decide.text(
        $['option']['token']['value'],
        ($t): t_out.Possible_Range => {
            switch ($t) {
                case 'range':
                    return _p_change_context(
                        $['value'],
                        ($) => ['range', Range(
                            $,
                            ($) => abort(
                                $,
                            ),
                        )],
                    )
                case 'end of document':
                    return _p_change_context(
                        $['value'],
                        ($) => ['end of document', _p_change_context(
                            v_unmarshalled_from_parse_tree.Verbose_Group(
                                $,
                                ($) => abort(
                                    $,
                                ),
                                {
                                    'expected properties': _p.dictionary.literal(
                                        {
                                            "end": null,
                                        },
                                    ),
                                    'document resource identifier': "dummy dri",
                                },
                            ),
                            ($) => _p_variables(
                                () => {
                                    
                                    const var_verbose_group_range = v_parse_tree_to_location.Value(
                                        $['value'],
                                        {
                                            'document resource identifier': "dummy dri",
                                        },
                                    )
                                    return {
                                        'end': _p_change_context(
                                            v_unmarshalled_from_parse_tree.Property(
                                                $,
                                                ($) => abort(
                                                    $,
                                                ),
                                                {
                                                    'id': 'end',
                                                    'document resource identifier': "dummy dri",
                                                },
                                            ),
                                            ($) => Location(
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
                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                            'range': v_parse_tree_to_location.Value(
                                $['value'],
                                {
                                    'document resource identifier': "dummy dri",
                                },
                            ),
                        }],
                    )
            }
        },
    ),
)

export const Location: t_signatures.Location = ($, abort) => _p_change_context(
    v_unmarshalled_from_parse_tree.Verbose_Group(
        $,
        ($) => abort(
            $,
        ),
        {
            'expected properties': _p.dictionary.literal(
                {
                    "relative": null,
                    "absolute": null,
                },
            ),
            'document resource identifier': "dummy dri",
        },
    ),
    ($) => _p_variables(
        () => {
            
            const var_verbose_group_range = v_parse_tree_to_location.Value(
                $['value'],
                {
                    'document resource identifier': "dummy dri",
                },
            )
            return {
                'relative': _p_change_context(
                    v_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(
                            $,
                        ),
                        {
                            'id': 'relative',
                            'document resource identifier': "dummy dri",
                        },
                    ),
                    ($) => Relative_Location(
                        $,
                        ($) => abort(
                            $,
                        ),
                    ),
                ),
                'absolute': _p_change_context(
                    v_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(
                            $,
                        ),
                        {
                            'id': 'absolute',
                            'document resource identifier': "dummy dri",
                        },
                    ),
                    ($) => v_unmarshalled_from_parse_tree.Number(
                        $,
                        ($) => abort(
                            $,
                        ),
                        {
                            'type': ['decimal', null],
                            'document resource identifier': "dummy dri",
                        },
                    ),
                ),
            }
        },
    ),
)

export const Relative_Location: t_signatures.Relative_Location = ($, abort) => _p_change_context(
    v_unmarshalled_from_parse_tree.Verbose_Group(
        $,
        ($) => abort(
            $,
        ),
        {
            'expected properties': _p.dictionary.literal(
                {
                    "line": null,
                    "column": null,
                },
            ),
            'document resource identifier': "dummy dri",
        },
    ),
    ($) => _p_variables(
        () => {
            
            const var_verbose_group_range = v_parse_tree_to_location.Value(
                $['value'],
                {
                    'document resource identifier': "dummy dri",
                },
            )
            return {
                'line': _p_change_context(
                    v_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(
                            $,
                        ),
                        {
                            'id': 'line',
                            'document resource identifier': "dummy dri",
                        },
                    ),
                    ($) => v_unmarshalled_from_parse_tree.Number(
                        $,
                        ($) => abort(
                            $,
                        ),
                        {
                            'type': ['decimal', null],
                            'document resource identifier': "dummy dri",
                        },
                    ),
                ),
                'column': _p_change_context(
                    v_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(
                            $,
                        ),
                        {
                            'id': 'column',
                            'document resource identifier': "dummy dri",
                        },
                    ),
                    ($) => v_unmarshalled_from_parse_tree.Number(
                        $,
                        ($) => abort(
                            $,
                        ),
                        {
                            'type': ['decimal', null],
                            'document resource identifier': "dummy dri",
                        },
                    ),
                ),
            }
        },
    ),
)
