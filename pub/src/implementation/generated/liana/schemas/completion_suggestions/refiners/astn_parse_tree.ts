
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/_p_change_context'

import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'

import _p_variables from 'pareto-core/dist/_p_variables'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/completion_suggestions/signatures/refiners/astn_parse_tree"

import * as t_out from "../../../../../../interface/generated/liana/schemas/completion_suggestions/data"

import * as v_unmarshalled_from_parse_tree from "liana-core/dist/implementation/manual/refiners/unmarshalled/astn_parse_tree"

import * as v_parse_tree_to_location from "liana-core/dist/implementation/manual/transformers/parse_tree/start_token_range"

import * as v_external_location from "../../location/refiners/astn_parse_tree"

import * as v_external_text_edits from "../../text_edits/refiners/astn_parse_tree"

export const Completion_Suggestions: t_signatures.Completion_Suggestions = ($, abort) => _p.list.from.list(
    v_unmarshalled_from_parse_tree.List(
        $,
        ($) => abort(
            $,
        ),
        {
            'document resource identifier': "dummy dri",
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
                    'expected properties': _p.dictionary.literal(
                        {
                            "label": null,
                            "insert text": null,
                            "documentation": null,
                            "additional text edits": null,
                            "type": null,
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
                        'label': _p_change_context(
                            v_unmarshalled_from_parse_tree.Property(
                                $,
                                ($) => abort(
                                    $,
                                ),
                                {
                                    'id': 'label',
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
                        'insert text': _p_change_context(
                            v_unmarshalled_from_parse_tree.Property(
                                $,
                                ($) => abort(
                                    $,
                                ),
                                {
                                    'id': 'insert text',
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
                        'documentation': _p_change_context(
                            v_unmarshalled_from_parse_tree.Property(
                                $,
                                ($) => abort(
                                    $,
                                ),
                                {
                                    'id': 'documentation',
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
                        'additional text edits': _p_change_context(
                            v_unmarshalled_from_parse_tree.Property(
                                $,
                                ($) => abort(
                                    $,
                                ),
                                {
                                    'id': 'additional text edits',
                                    'document resource identifier': "dummy dri",
                                },
                            ),
                            ($) => v_external_text_edits.Text_Edits(
                                $,
                                ($) => abort(
                                    $,
                                ),
                            ),
                        ),
                        'type': _p_change_context(
                            v_unmarshalled_from_parse_tree.Property(
                                $,
                                ($) => abort(
                                    $,
                                ),
                                {
                                    'id': 'type',
                                    'document resource identifier': "dummy dri",
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
                                    ($t): t_out.Completion_Suggestions.L.type_ => {
                                        switch ($t) {
                                            case 'boolean':
                                                return _p_change_context(
                                                    $['value'],
                                                    ($) => ['boolean', v_unmarshalled_from_parse_tree.Nothing(
                                                        $,
                                                        ($) => abort(
                                                            $,
                                                        ),
                                                    )],
                                                )
                                            case 'component':
                                                return _p_change_context(
                                                    $['value'],
                                                    ($) => ['component', v_unmarshalled_from_parse_tree.Nothing(
                                                        $,
                                                        ($) => abort(
                                                            $,
                                                        ),
                                                    )],
                                                )
                                            case 'dictionary':
                                                return _p_change_context(
                                                    $['value'],
                                                    ($) => ['dictionary', v_unmarshalled_from_parse_tree.Nothing(
                                                        $,
                                                        ($) => abort(
                                                            $,
                                                        ),
                                                    )],
                                                )
                                            case 'group':
                                                return _p_change_context(
                                                    $['value'],
                                                    ($) => ['group', v_unmarshalled_from_parse_tree.Nothing(
                                                        $,
                                                        ($) => abort(
                                                            $,
                                                        ),
                                                    )],
                                                )
                                            case 'list':
                                                return _p_change_context(
                                                    $['value'],
                                                    ($) => ['list', v_unmarshalled_from_parse_tree.Nothing(
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
                                            case 'number':
                                                return _p_change_context(
                                                    $['value'],
                                                    ($) => ['number', v_unmarshalled_from_parse_tree.Nothing(
                                                        $,
                                                        ($) => abort(
                                                            $,
                                                        ),
                                                    )],
                                                )
                                            case 'optional':
                                                return _p_change_context(
                                                    $['value'],
                                                    ($) => ['optional', v_unmarshalled_from_parse_tree.Nothing(
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
                                            case 'state':
                                                return _p_change_context(
                                                    $['value'],
                                                    ($) => ['state', v_unmarshalled_from_parse_tree.Nothing(
                                                        $,
                                                        ($) => abort(
                                                            $,
                                                        ),
                                                    )],
                                                )
                                            case 'text':
                                                return _p_change_context(
                                                    $['value'],
                                                    ($) => ['text', v_unmarshalled_from_parse_tree.Nothing(
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
                                                                'document resource identifier': "dummy dri",
                                                            },
                                                        ),
                                                    }],
                                                )
                                        }
                                    },
                                ),
                            ),
                        ),
                    }
                },
            ),
        ),
    ),
)
