
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/_p_change_context'

import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'

import _p_variables from 'pareto-core/dist/_p_variables'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/unmarshall_errors/signatures/refiners/astn_parse_tree"

import * as t_out from "../../../../../../interface/generated/liana/schemas/unmarshall_errors/data"

import * as v_unmarshalled_from_parse_tree from "liana-core/dist/implementation/manual/refiners/unmarshalled/astn_parse_tree"

import * as v_parse_tree_to_location from "astn-core/dist/implementation/manual/transformers/parse_tree/start_token_range"

import * as v_external_location from "../../astn_location/refiners/astn_parse_tree"

export const Errors: t_signatures.Errors = ($, abort) => _p.list.from.list(
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
            v_unmarshalled_from_parse_tree.Verbose_Group(
                $,
                ($) => abort(
                    $,
                ),
                {
                    'expected properties': _p.dictionary.literal(
                        {
                            "range": null,
                            "type": null,
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
                        'range': _p_change_context(
                            v_unmarshalled_from_parse_tree.Property(
                                $,
                                ($) => abort(
                                    $,
                                ),
                                {
                                    'id': 'range',
                                },
                            ),
                            ($) => v_external_location.Range(
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
                                    ($t): t_out.Errors.L.type_ => {
                                        switch ($t) {
                                            case 'error':
                                                return _p_change_context(
                                                    $['value'],
                                                    ($) => ['error', _p_change_context(
                                                        v_unmarshalled_from_parse_tree.State(
                                                            $,
                                                            ($) => abort(
                                                                $,
                                                            ),
                                                        ),
                                                        ($) => _p.decide.text(
                                                            $['option']['token']['value'],
                                                            ($t): t_out.Errors.L.type_.error => {
                                                                switch ($t) {
                                                                    case 'invalid value type':
                                                                        return _p_change_context(
                                                                            $['value'],
                                                                            ($) => ['invalid value type', _p_change_context(
                                                                                v_unmarshalled_from_parse_tree.Verbose_Group(
                                                                                    $,
                                                                                    ($) => abort(
                                                                                        $,
                                                                                    ),
                                                                                    {
                                                                                        'expected properties': _p.dictionary.literal(
                                                                                            {
                                                                                                "expected": null,
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
                                                                                            'expected': _p_change_context(
                                                                                                v_unmarshalled_from_parse_tree.Property(
                                                                                                    $,
                                                                                                    ($) => abort(
                                                                                                        $,
                                                                                                    ),
                                                                                                    {
                                                                                                        'id': 'expected',
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
                                                                                                                $['option']['token']['value'],
                                                                                                                ($t): t_out.Errors.L.type_.error.invalid_value_type.expected.L => {
                                                                                                                    switch ($t) {
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
                                                                                                                        case 'verbose group':
                                                                                                                            return _p_change_context(
                                                                                                                                $['value'],
                                                                                                                                ($) => ['verbose group', v_unmarshalled_from_parse_tree.Nothing(
                                                                                                                                    $,
                                                                                                                                    ($) => abort(
                                                                                                                                        $,
                                                                                                                                    ),
                                                                                                                                )],
                                                                                                                            )
                                                                                                                        case 'concise group':
                                                                                                                            return _p_change_context(
                                                                                                                                $['value'],
                                                                                                                                ($) => ['concise group', v_unmarshalled_from_parse_tree.Nothing(
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
                                                                                                                        case 'not set':
                                                                                                                            return _p_change_context(
                                                                                                                                $['value'],
                                                                                                                                ($) => ['not set', v_unmarshalled_from_parse_tree.Nothing(
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
                                                                                                                        case 'set':
                                                                                                                            return _p_change_context(
                                                                                                                                $['value'],
                                                                                                                                ($) => ['set', v_unmarshalled_from_parse_tree.Nothing(
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
                                                                                                                        default:
                                                                                                                            return abort(
                                                                                                                                ['liana', {
                                                                                                                                    'type': ['state', ['unknown option', $['option']['token']['value']]],
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
                                                                                        }
                                                                                    },
                                                                                ),
                                                                            )],
                                                                        )
                                                                    case 'duplicate property':
                                                                        return _p_change_context(
                                                                            $['value'],
                                                                            ($) => ['duplicate property', _p_change_context(
                                                                                v_unmarshalled_from_parse_tree.Verbose_Group(
                                                                                    $,
                                                                                    ($) => abort(
                                                                                        $,
                                                                                    ),
                                                                                    {
                                                                                        'expected properties': _p.dictionary.literal(
                                                                                            {
                                                                                                "name": null,
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
                                                                                            'name': _p_change_context(
                                                                                                v_unmarshalled_from_parse_tree.Property(
                                                                                                    $,
                                                                                                    ($) => abort(
                                                                                                        $,
                                                                                                    ),
                                                                                                    {
                                                                                                        'id': 'name',
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
                                                                            )],
                                                                        )
                                                                    case 'duplicate entry':
                                                                        return _p_change_context(
                                                                            $['value'],
                                                                            ($) => ['duplicate entry', _p_change_context(
                                                                                v_unmarshalled_from_parse_tree.Verbose_Group(
                                                                                    $,
                                                                                    ($) => abort(
                                                                                        $,
                                                                                    ),
                                                                                    {
                                                                                        'expected properties': _p.dictionary.literal(
                                                                                            {
                                                                                                "name": null,
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
                                                                                            'name': _p_change_context(
                                                                                                v_unmarshalled_from_parse_tree.Property(
                                                                                                    $,
                                                                                                    ($) => abort(
                                                                                                        $,
                                                                                                    ),
                                                                                                    {
                                                                                                        'id': 'name',
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
                                                                            )],
                                                                        )
                                                                    case 'missing property':
                                                                        return _p_change_context(
                                                                            $['value'],
                                                                            ($) => ['missing property', _p_change_context(
                                                                                v_unmarshalled_from_parse_tree.Verbose_Group(
                                                                                    $,
                                                                                    ($) => abort(
                                                                                        $,
                                                                                    ),
                                                                                    {
                                                                                        'expected properties': _p.dictionary.literal(
                                                                                            {
                                                                                                "name": null,
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
                                                                                            'name': _p_change_context(
                                                                                                v_unmarshalled_from_parse_tree.Property(
                                                                                                    $,
                                                                                                    ($) => abort(
                                                                                                        $,
                                                                                                    ),
                                                                                                    {
                                                                                                        'id': 'name',
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
                                                                            )],
                                                                        )
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
                                                                    case 'missing property value':
                                                                        return _p_change_context(
                                                                            $['value'],
                                                                            ($) => ['missing property value', _p_change_context(
                                                                                v_unmarshalled_from_parse_tree.Verbose_Group(
                                                                                    $,
                                                                                    ($) => abort(
                                                                                        $,
                                                                                    ),
                                                                                    {
                                                                                        'expected properties': _p.dictionary.literal(
                                                                                            {
                                                                                                "name": null,
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
                                                                                            'name': _p_change_context(
                                                                                                v_unmarshalled_from_parse_tree.Property(
                                                                                                    $,
                                                                                                    ($) => abort(
                                                                                                        $,
                                                                                                    ),
                                                                                                    {
                                                                                                        'id': 'name',
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
                                                                            )],
                                                                        )
                                                                    case 'superfluous property':
                                                                        return _p_change_context(
                                                                            $['value'],
                                                                            ($) => ['superfluous property', _p_change_context(
                                                                                v_unmarshalled_from_parse_tree.Verbose_Group(
                                                                                    $,
                                                                                    ($) => abort(
                                                                                        $,
                                                                                    ),
                                                                                    {
                                                                                        'expected properties': _p.dictionary.literal(
                                                                                            {
                                                                                                "name": null,
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
                                                                                            'name': _p_change_context(
                                                                                                v_unmarshalled_from_parse_tree.Property(
                                                                                                    $,
                                                                                                    ($) => abort(
                                                                                                        $,
                                                                                                    ),
                                                                                                    {
                                                                                                        'id': 'name',
                                                                                                    },
                                                                                                ),
                                                                                                ($) => _p.optional.from.optional(
                                                                                                    v_unmarshalled_from_parse_tree.Optional(
                                                                                                        $,
                                                                                                        ($) => abort(
                                                                                                            $,
                                                                                                        ),
                                                                                                    )['optional'],
                                                                                                ).map(
                                                                                                    ($) => v_unmarshalled_from_parse_tree.Text(
                                                                                                        $,
                                                                                                        ($) => abort(
                                                                                                            $,
                                                                                                        ),
                                                                                                    ),
                                                                                                ),
                                                                                            ),
                                                                                        }
                                                                                    },
                                                                                ),
                                                                            )],
                                                                        )
                                                                    case 'state':
                                                                        return _p_change_context(
                                                                            $['value'],
                                                                            ($) => ['state', _p_change_context(
                                                                                v_unmarshalled_from_parse_tree.State(
                                                                                    $,
                                                                                    ($) => abort(
                                                                                        $,
                                                                                    ),
                                                                                ),
                                                                                ($) => _p.decide.text(
                                                                                    $['option']['token']['value'],
                                                                                    ($t): t_out.Errors.L.type_.error.state => {
                                                                                        switch ($t) {
                                                                                            case 'more than 2 items':
                                                                                                return _p_change_context(
                                                                                                    $['value'],
                                                                                                    ($) => ['more than 2 items', v_unmarshalled_from_parse_tree.Nothing(
                                                                                                        $,
                                                                                                        ($) => abort(
                                                                                                            $,
                                                                                                        ),
                                                                                                    )],
                                                                                                )
                                                                                            case 'missing option name':
                                                                                                return _p_change_context(
                                                                                                    $['value'],
                                                                                                    ($) => ['missing option name', v_unmarshalled_from_parse_tree.Nothing(
                                                                                                        $,
                                                                                                        ($) => abort(
                                                                                                            $,
                                                                                                        ),
                                                                                                    )],
                                                                                                )
                                                                                            case 'option name is not a text':
                                                                                                return _p_change_context(
                                                                                                    $['value'],
                                                                                                    ($) => ['option name is not a text', v_unmarshalled_from_parse_tree.Nothing(
                                                                                                        $,
                                                                                                        ($) => abort(
                                                                                                            $,
                                                                                                        ),
                                                                                                    )],
                                                                                                )
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
                                                                                            case 'unknown option':
                                                                                                return _p_change_context(
                                                                                                    $['value'],
                                                                                                    ($) => ['unknown option', _p_change_context(
                                                                                                        v_unmarshalled_from_parse_tree.Verbose_Group(
                                                                                                            $,
                                                                                                            ($) => abort(
                                                                                                                $,
                                                                                                            ),
                                                                                                            {
                                                                                                                'expected properties': _p.dictionary.literal(
                                                                                                                    {
                                                                                                                        "found": null,
                                                                                                                        "expected": null,
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
                                                                                                                    'found': _p_change_context(
                                                                                                                        v_unmarshalled_from_parse_tree.Property(
                                                                                                                            $,
                                                                                                                            ($) => abort(
                                                                                                                                $,
                                                                                                                            ),
                                                                                                                            {
                                                                                                                                'id': 'found',
                                                                                                                            },
                                                                                                                        ),
                                                                                                                        ($) => v_unmarshalled_from_parse_tree.Text(
                                                                                                                            $,
                                                                                                                            ($) => abort(
                                                                                                                                $,
                                                                                                                            ),
                                                                                                                        ),
                                                                                                                    ),
                                                                                                                    'expected': _p_change_context(
                                                                                                                        v_unmarshalled_from_parse_tree.Property(
                                                                                                                            $,
                                                                                                                            ($) => abort(
                                                                                                                                $,
                                                                                                                            ),
                                                                                                                            {
                                                                                                                                'id': 'expected',
                                                                                                                            },
                                                                                                                        ),
                                                                                                                        ($) => _p_change_context(
                                                                                                                            v_unmarshalled_from_parse_tree.Dictionary(
                                                                                                                                $,
                                                                                                                                ($) => abort(
                                                                                                                                    $,
                                                                                                                                ),
                                                                                                                            ),
                                                                                                                            ($) => _p.dictionary.from.dictionary(
                                                                                                                                $['entries'],
                                                                                                                            ).map(
                                                                                                                                ($, id) => v_unmarshalled_from_parse_tree.Nothing(
                                                                                                                                    $,
                                                                                                                                    ($) => abort(
                                                                                                                                        $,
                                                                                                                                    ),
                                                                                                                                ),
                                                                                                                            ),
                                                                                                                        ),
                                                                                                                    ),
                                                                                                                }
                                                                                                            },
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
                                                                                            default:
                                                                                                return abort(
                                                                                                    ['liana', {
                                                                                                        'type': ['state', ['unknown option', $['option']['token']['value']]],
                                                                                                        'range': v_parse_tree_to_location.Value(
                                                                                                            $['value'],
                                                                                                        ),
                                                                                                    }],
                                                                                                )
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
                                                                                ),
                                                                            }],
                                                                        )
                                                                }
                                                            },
                                                        ),
                                                    )],
                                                )
                                            case 'warning':
                                                return _p_change_context(
                                                    $['value'],
                                                    ($) => ['warning', _p_change_context(
                                                        v_unmarshalled_from_parse_tree.State(
                                                            $,
                                                            ($) => abort(
                                                                $,
                                                            ),
                                                        ),
                                                        ($) => _p.decide.text(
                                                            $['option']['token']['value'],
                                                            ($t): t_out.Errors.L.type_.warning => {
                                                                switch ($t) {
                                                                    case 'expected apostrophed text':
                                                                        return _p_change_context(
                                                                            $['value'],
                                                                            ($) => ['expected apostrophed text', v_unmarshalled_from_parse_tree.Nothing(
                                                                                $,
                                                                                ($) => abort(
                                                                                    $,
                                                                                ),
                                                                            )],
                                                                        )
                                                                    case 'expected quoted text':
                                                                        return _p_change_context(
                                                                            $['value'],
                                                                            ($) => ['expected quoted text', v_unmarshalled_from_parse_tree.Nothing(
                                                                                $,
                                                                                ($) => abort(
                                                                                    $,
                                                                                ),
                                                                            )],
                                                                        )
                                                                    case 'expected backticked text':
                                                                        return _p_change_context(
                                                                            $['value'],
                                                                            ($) => ['expected backticked text', v_unmarshalled_from_parse_tree.Nothing(
                                                                                $,
                                                                                ($) => abort(
                                                                                    $,
                                                                                ),
                                                                            )],
                                                                        )
                                                                    case 'expected undelimited text':
                                                                        return _p_change_context(
                                                                            $['value'],
                                                                            ($) => ['expected undelimited text', v_unmarshalled_from_parse_tree.Nothing(
                                                                                $,
                                                                                ($) => abort(
                                                                                    $,
                                                                                ),
                                                                            )],
                                                                        )
                                                                    case 'expected a group':
                                                                        return _p_change_context(
                                                                            $['value'],
                                                                            ($) => ['expected a group', v_unmarshalled_from_parse_tree.Nothing(
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
                                                                                ),
                                                                            }],
                                                                        )
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
