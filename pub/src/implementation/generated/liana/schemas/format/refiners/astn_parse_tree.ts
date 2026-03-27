
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/_p_change_context'

import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'

import _p_variables from 'pareto-core/dist/_p_variables'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/format/signatures/refiners/astn_parse_tree"

import * as t_out from "../../../../../../interface/generated/liana/schemas/format/data"

import * as v_unmarshalled_from_parse_tree from "liana-core/dist/implementation/manual/refiners/unmarshalled/astn_parse_tree"

import * as v_parse_tree_to_location from "liana-core/dist/implementation/manual/transformers/parse_tree/start_token_range"

import * as v_external_location from "../../location/refiners/astn_parse_tree"

import * as v_external_text_edits from "../../text_edits/refiners/astn_parse_tree"

export const Result: t_signatures.Result = ($, abort) => v_external_text_edits.Text_Edits(
    $,
    ($) => abort(
        $,
    ),
)

export const Error: t_signatures.Error = ($, abort) => _p_change_context(
    v_unmarshalled_from_parse_tree.Verbose_Group(
        $,
        ($) => abort(
            $,
        ),
        {
            'expected properties': _p.dictionary.literal(
                {
                    "message": null,
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
                'message': _p_change_context(
                    v_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(
                            $,
                        ),
                        {
                            'id': 'message',
                            'document resource identifier': "dummy dri",
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

export const Parameters: t_signatures.Parameters = ($, abort) => _p_change_context(
    v_unmarshalled_from_parse_tree.Verbose_Group(
        $,
        ($) => abort(
            $,
        ),
        {
            'expected properties': _p.dictionary.literal(
                {
                    "options": null,
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
                'options': _p_change_context(
                    v_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(
                            $,
                        ),
                        {
                            'id': 'options',
                            'document resource identifier': "dummy dri",
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
                                        "insert spaces": null,
                                        "preserve delimiters": null,
                                        "preserve final newline state": null,
                                        "preserve commas": null,
                                        "indent string": null,
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
                                    'insert spaces': _p_change_context(
                                        v_unmarshalled_from_parse_tree.Property(
                                            $,
                                            ($) => abort(
                                                $,
                                            ),
                                            {
                                                'id': 'insert spaces',
                                                'document resource identifier': "dummy dri",
                                            },
                                        ),
                                        ($) => v_unmarshalled_from_parse_tree.Boolean(
                                            $,
                                            ($) => abort(
                                                $,
                                            ),
                                            {
                                                'type': ['true/false', null],
                                                'document resource identifier': "dummy dri",
                                            },
                                        ),
                                    ),
                                    'preserve delimiters': _p_change_context(
                                        v_unmarshalled_from_parse_tree.Property(
                                            $,
                                            ($) => abort(
                                                $,
                                            ),
                                            {
                                                'id': 'preserve delimiters',
                                                'document resource identifier': "dummy dri",
                                            },
                                        ),
                                        ($) => v_unmarshalled_from_parse_tree.Boolean(
                                            $,
                                            ($) => abort(
                                                $,
                                            ),
                                            {
                                                'type': ['true/false', null],
                                                'document resource identifier': "dummy dri",
                                            },
                                        ),
                                    ),
                                    'preserve final newline state': _p_change_context(
                                        v_unmarshalled_from_parse_tree.Property(
                                            $,
                                            ($) => abort(
                                                $,
                                            ),
                                            {
                                                'id': 'preserve final newline state',
                                                'document resource identifier': "dummy dri",
                                            },
                                        ),
                                        ($) => v_unmarshalled_from_parse_tree.Boolean(
                                            $,
                                            ($) => abort(
                                                $,
                                            ),
                                            {
                                                'type': ['true/false', null],
                                                'document resource identifier': "dummy dri",
                                            },
                                        ),
                                    ),
                                    'preserve commas': _p_change_context(
                                        v_unmarshalled_from_parse_tree.Property(
                                            $,
                                            ($) => abort(
                                                $,
                                            ),
                                            {
                                                'id': 'preserve commas',
                                                'document resource identifier': "dummy dri",
                                            },
                                        ),
                                        ($) => v_unmarshalled_from_parse_tree.Boolean(
                                            $,
                                            ($) => abort(
                                                $,
                                            ),
                                            {
                                                'type': ['true/false', null],
                                                'document resource identifier': "dummy dri",
                                            },
                                        ),
                                    ),
                                    'indent string': _p_change_context(
                                        v_unmarshalled_from_parse_tree.Property(
                                            $,
                                            ($) => abort(
                                                $,
                                            ),
                                            {
                                                'id': 'indent string',
                                                'document resource identifier': "dummy dri",
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
                    ),
                ),
            }
        },
    ),
)
