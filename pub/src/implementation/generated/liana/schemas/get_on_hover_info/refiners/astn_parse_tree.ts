
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/_p_change_context'

import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'

import _p_variables from 'pareto-core/dist/_p_variables'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/get_on_hover_info/signatures/refiners/astn_parse_tree"

import * as t_out from "../../../../../../interface/generated/liana/schemas/get_on_hover_info/data"

import * as v_unmarshalled_from_parse_tree from "liana-core/dist/implementation/manual/refiners/unmarshalled/astn_parse_tree"

import * as v_parse_tree_to_location from "astn-core/dist/implementation/manual/transformers/parse_tree/start_token_range"

import * as v_external_hover_info from "../../hover_info/refiners/astn_parse_tree"

import * as v_external_location from "../../location/refiners/astn_parse_tree"

import * as v_external_path from "../../path/refiners/astn_parse_tree"

export const Result: t_signatures.Result = ($, abort) => _p_change_context(
    v_unmarshalled_from_parse_tree.Verbose_Group(
        $,
        ($) => abort(
            $,
        ),
        {
            'expected properties': _p.dictionary.literal(
                {
                    "contents": null,
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
                'contents': _p_change_context(
                    v_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(
                            $,
                        ),
                        {
                            'id': 'contents',
                        },
                    ),
                    ($) => _p_change_context(
                        v_unmarshalled_from_parse_tree.Verbose_Group(
                            $,
                            ($) => abort(
                                $,
                            ),
                            {
                                'expected properties': _p.dictionary.literal(
                                    {
                                        "hover texts": null,
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
                                    'hover texts': _p_change_context(
                                        v_unmarshalled_from_parse_tree.Property(
                                            $,
                                            ($) => abort(
                                                $,
                                            ),
                                            {
                                                'id': 'hover texts',
                                            },
                                        ),
                                        ($) => v_external_hover_info.Hover_Texts(
                                            $,
                                            ($) => abort(
                                                $,
                                            ),
                                        ),
                                    ),
                                }
                            },
                        ),
                    ),
                ),
            }
        },
    ),
)

export const Parameters: t_signatures.Parameters = ($, abort) => _p_change_context(
    v_unmarshalled_from_parse_tree.Verbose_Group(
        $,
        ($) => abort(
            $,
        ),
        {
            'expected properties': _p.dictionary.literal(
                {
                    "content": null,
                    "source": null,
                    "position": null,
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
                'content': _p_change_context(
                    v_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(
                            $,
                        ),
                        {
                            'id': 'content',
                        },
                    ),
                    ($) => v_unmarshalled_from_parse_tree.Text(
                        $,
                        ($) => abort(
                            $,
                        ),
                    ),
                ),
                'source': _p_change_context(
                    v_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(
                            $,
                        ),
                        {
                            'id': 'source',
                        },
                    ),
                    ($) => _p_change_context(
                        v_unmarshalled_from_parse_tree.Verbose_Group(
                            $,
                            ($) => abort(
                                $,
                            ),
                            {
                                'expected properties': _p.dictionary.literal(
                                    {
                                        "file path": null,
                                        "tab size": null,
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
                                    'file path': _p_change_context(
                                        v_unmarshalled_from_parse_tree.Property(
                                            $,
                                            ($) => abort(
                                                $,
                                            ),
                                            {
                                                'id': 'file path',
                                            },
                                        ),
                                        ($) => v_external_path.Node_Path(
                                            $,
                                            ($) => abort(
                                                $,
                                            ),
                                        ),
                                    ),
                                    'tab size': _p_change_context(
                                        v_unmarshalled_from_parse_tree.Property(
                                            $,
                                            ($) => abort(
                                                $,
                                            ),
                                            {
                                                'id': 'tab size',
                                            },
                                        ),
                                        ($) => v_unmarshalled_from_parse_tree.Number(
                                            $,
                                            ($) => abort(
                                                $,
                                            ),
                                            {
                                                'type': ['decimal', null],
                                            },
                                        ),
                                    ),
                                }
                            },
                        ),
                    ),
                ),
                'position': _p_change_context(
                    v_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(
                            $,
                        ),
                        {
                            'id': 'position',
                        },
                    ),
                    ($) => v_external_location.Position(
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
