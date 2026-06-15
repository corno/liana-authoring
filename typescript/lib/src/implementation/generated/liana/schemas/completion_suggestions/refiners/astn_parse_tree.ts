
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/implementation/specials/change_context'

import _p_list_from_text from 'pareto-core/dist/implementation/specials/list_from_text'

import _p_variables from 'pareto-core/dist/implementation/specials/variables'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/completion_suggestions/signatures/refiners/astn_parse_tree"

import * as t_out from "../../../../../../interface/generated/liana/schemas/completion_suggestions/data"

import * as v_unmarshalled_from_parse_tree from "liana-core/dist/implementation/manual/refiners/unmarshalled/astn_parse_tree"

import * as v_parse_tree_to_location from "liana-core/dist/implementation/manual/transformers/parse_tree/start_token_range"

import * as v_external_location from "../../location/refiners/astn_parse_tree"

import * as v_external_text_edits from "../../text_edits/refiners/astn_parse_tree"

export const Completion_Suggestions: t_signatures.Completion_Suggestions = ($, abort) => _p.optional.from.optional(
    v_unmarshalled_from_parse_tree.Optional(
        $,
        ($) => abort(
            $,
        ),
    )['optional'],
).map(
    ($) => _p_change_context(
        v_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            ($) => abort(
                $,
            ),
            {
                'expected properties': _p.literal.dictionary(
                    {
                        "type": null,
                        "suggestions": null,
                    },
                ),
                'subdocument context': _p.literal.not_set(),
            },
        ),
        ($) => _p_variables(
            () => {
                
                const var_verbose_group_range = v_parse_tree_to_location.Value(
                    $['value'],
                    {
                        'subdocument context': _p.literal.not_set(),
                    },
                )
                return {
                    'type': _p_change_context(
                        v_unmarshalled_from_parse_tree.Property(
                            $,
                            ($) => abort(
                                $,
                            ),
                            {
                                'id': 'type',
                                'subdocument context': _p.literal.not_set(),
                            },
                        ),
                        ($) => _p_change_context(
                            v_unmarshalled_from_parse_tree.State(
                                $,
                                ($) => abort(
                                    $,
                                ),
                            ),
                            ($) => _p.decide.text(
                                $['option']['token']['value'],
                                ($t): t_out.Completion_Suggestions.O.type_ => {
                                    switch ($t) {
                                        case 'missing value':
                                            return _p_change_context(
                                                $['value'],
                                                ($) => ['missing value', v_unmarshalled_from_parse_tree.Nothing(
                                                    $,
                                                    ($) => abort(
                                                        $,
                                                    ),
                                                )],
                                            )
                                        case 'missing option':
                                            return _p_change_context(
                                                $['value'],
                                                ($) => ['missing option', v_unmarshalled_from_parse_tree.Nothing(
                                                    $,
                                                    ($) => abort(
                                                        $,
                                                    ),
                                                )],
                                            )
                                        case 'reference':
                                            return _p_change_context(
                                                $['value'],
                                                ($) => ['reference', v_unmarshalled_from_parse_tree.Nothing(
                                                    $,
                                                    ($) => abort(
                                                        $,
                                                    ),
                                                )],
                                            )
                                        case 'property name':
                                            return _p_change_context(
                                                $['value'],
                                                ($) => ['property name', v_unmarshalled_from_parse_tree.Nothing(
                                                    $,
                                                    ($) => abort(
                                                        $,
                                                    ),
                                                )],
                                            )
                                        case 'option name':
                                            return _p_change_context(
                                                $['value'],
                                                ($) => ['option name', v_unmarshalled_from_parse_tree.Nothing(
                                                    $,
                                                    ($) => abort(
                                                        $,
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
                                                            'subdocument context': _p.literal.not_set(),
                                                        },
                                                    ),
                                                }],
                                            )
                                    }
                                },
                            ),
                        ),
                    ),
                    'suggestions': _p_change_context(
                        v_unmarshalled_from_parse_tree.Property(
                            $,
                            ($) => abort(
                                $,
                            ),
                            {
                                'id': 'suggestions',
                                'subdocument context': _p.literal.not_set(),
                            },
                        ),
                        ($) => _p.list.from.list(
                            v_unmarshalled_from_parse_tree.List(
                                $,
                                ($) => abort(
                                    $,
                                ),
                                {
                                    'subdocument context': _p.literal.not_set(),
                                },
                            )['items'],
                        ).map(
                            ($) => _p_change_context(
                                $['value'],
                                ($) => _p_change_context(
                                    v_unmarshalled_from_parse_tree.Verbose_Group(
                                        $,
                                        ($) => abort(
                                            $,
                                        ),
                                        {
                                            'expected properties': _p.literal.dictionary(
                                                {
                                                    "label": null,
                                                    "insert text": null,
                                                    "documentation": null,
                                                },
                                            ),
                                            'subdocument context': _p.literal.not_set(),
                                        },
                                    ),
                                    ($) => _p_variables(
                                        () => {
                                            
                                            const var_verbose_group_range = v_parse_tree_to_location.Value(
                                                $['value'],
                                                {
                                                    'subdocument context': _p.literal.not_set(),
                                                },
                                            )
                                            return {
                                                'label': _p_change_context(
                                                    v_unmarshalled_from_parse_tree.Property(
                                                        $,
                                                        ($) => abort(
                                                            $,
                                                        ),
                                                        {
                                                            'id': 'label',
                                                            'subdocument context': _p.literal.not_set(),
                                                        },
                                                    ),
                                                    ($) => v_unmarshalled_from_parse_tree.Text(
                                                        $,
                                                        ($) => abort(
                                                            $,
                                                        ),
                                                    ),
                                                ),
                                                'insert text': _p_change_context(
                                                    v_unmarshalled_from_parse_tree.Property(
                                                        $,
                                                        ($) => abort(
                                                            $,
                                                        ),
                                                        {
                                                            'id': 'insert text',
                                                            'subdocument context': _p.literal.not_set(),
                                                        },
                                                    ),
                                                    ($) => v_unmarshalled_from_parse_tree.Text(
                                                        $,
                                                        ($) => abort(
                                                            $,
                                                        ),
                                                    ),
                                                ),
                                                'documentation': _p_change_context(
                                                    v_unmarshalled_from_parse_tree.Property(
                                                        $,
                                                        ($) => abort(
                                                            $,
                                                        ),
                                                        {
                                                            'id': 'documentation',
                                                            'subdocument context': _p.literal.not_set(),
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
                        ),
                    ),
                }
            },
        ),
    ),
)
