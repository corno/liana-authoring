
import * as p_ from 'pareto-core/dist/implementation/refiner'
import * as p_di from 'pareto-core/dist/interface/data'
const p_decide_state = <State, B>($: State,  assign: ($: State) => B) => assign($)
const p_decide_optional = <OV extends p_di.Value, B extends p_di.Value>($: p_di.Optional_Value<OV>,  assign: ($: OV) => B,  otherwise: () => B) => p_.from.optional($).decide(assign, otherwise)
const p_decide_text = <B>($: string,  assign: ($: string) => B) => assign($)

import p_change_context from 'pareto-core/dist/implementation/refiner/specials/change_context'

import p_list_from_text from 'pareto-core/dist/implementation/refiner/specials/list_from_text'

import p_variables from 'pareto-core/dist/implementation/refiner/specials/variables'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/unmarshall_errors/signatures/refiners/astn_parse_tree"

import * as t_out from "../../../../../../interface/generated/liana/schemas/unmarshall_errors/data"

import * as v_unmarshalled_from_parse_tree from "liana-core/dist/implementation/manual/refiners/unmarshalled/astn_parse_tree"

import * as v_parse_tree_to_location from "liana-core/dist/implementation/manual/transformers/parse_tree/start_token_range"

import * as v_external_location from "../../astn_location/refiners/astn_parse_tree"

export const Errors: t_signatures.Errors = ($, abort) => p_.from.list(
    v_unmarshalled_from_parse_tree.List(
        $,
        ($) => abort(
            $,
        ),
        {
            'subdocument context': p_.literal.not_set(),
        },
    )['items'],
).map(
    ($) => p_change_context(
        $['value'],
        ($) => p_change_context(
            v_unmarshalled_from_parse_tree.Verbose_Group(
                $,
                ($) => abort(
                    $,
                ),
                {
                    'expected properties': p_.literal.dictionary(
                        {
                            "range": null,
                            "type": null,
                        },
                    ),
                    'subdocument context': p_.literal.not_set(),
                },
            ),
            ($) => p_variables(
                () => {
                    
                    const var_verbose_group_range = v_parse_tree_to_location.Value(
                        $['value'],
                        {
                            'subdocument context': p_.literal.not_set(),
                        },
                    )
                    return {
                        'range': p_change_context(
                            v_unmarshalled_from_parse_tree.Property(
                                $,
                                ($) => abort(
                                    $,
                                ),
                                {
                                    'id': 'range',
                                    'subdocument context': p_.literal.not_set(),
                                },
                            ),
                            ($) => v_external_location.Range(
                                $,
                                ($) => abort(
                                    $,
                                ),
                            ),
                        ),
                        'type': p_change_context(
                            v_unmarshalled_from_parse_tree.Property(
                                $,
                                ($) => abort(
                                    $,
                                ),
                                {
                                    'id': 'type',
                                    'subdocument context': p_.literal.not_set(),
                                },
                            ),
                            ($) => p_change_context(
                                v_unmarshalled_from_parse_tree.State(
                                    $,
                                    ($) => abort(
                                        $,
                                    ),
                                ),
                                ($) => p_decide_text(
                                    $['option']['token']['value'],
                                    ($t): t_out.Errors.L.type_ => {
                                        switch ($t) {
                                            case 'value':
                                                return p_change_context(
                                                    $['value'],
                                                    ($) => ['value', p_change_context(
                                                        v_unmarshalled_from_parse_tree.State(
                                                            $,
                                                            ($) => abort(
                                                                $,
                                                            ),
                                                        ),
                                                        ($) => p_decide_text(
                                                            $['option']['token']['value'],
                                                            ($t): t_out.Errors.L.type_.value => {
                                                                switch ($t) {
                                                                    case 'invalid type':
                                                                        return p_change_context(
                                                                            $['value'],
                                                                            ($) => ['invalid type', p_change_context(
                                                                                v_unmarshalled_from_parse_tree.Verbose_Group(
                                                                                    $,
                                                                                    ($) => abort(
                                                                                        $,
                                                                                    ),
                                                                                    {
                                                                                        'expected properties': p_.literal.dictionary(
                                                                                            {
                                                                                                "expected": null,
                                                                                            },
                                                                                        ),
                                                                                        'subdocument context': p_.literal.not_set(),
                                                                                    },
                                                                                ),
                                                                                ($) => p_variables(
                                                                                    () => {
                                                                                        
                                                                                        const var_verbose_group_range = v_parse_tree_to_location.Value(
                                                                                            $['value'],
                                                                                            {
                                                                                                'subdocument context': p_.literal.not_set(),
                                                                                            },
                                                                                        )
                                                                                        return {
                                                                                            'expected': p_change_context(
                                                                                                v_unmarshalled_from_parse_tree.Property(
                                                                                                    $,
                                                                                                    ($) => abort(
                                                                                                        $,
                                                                                                    ),
                                                                                                    {
                                                                                                        'id': 'expected',
                                                                                                        'subdocument context': p_.literal.not_set(),
                                                                                                    },
                                                                                                ),
                                                                                                ($) => p_.from.list(
                                                                                                    v_unmarshalled_from_parse_tree.List(
                                                                                                        $,
                                                                                                        ($) => abort(
                                                                                                            $,
                                                                                                        ),
                                                                                                        {
                                                                                                            'subdocument context': p_.literal.not_set(),
                                                                                                        },
                                                                                                    )['items'],
                                                                                                ).map(
                                                                                                    ($) => p_change_context(
                                                                                                        $['value'],
                                                                                                        ($) => p_change_context(
                                                                                                            v_unmarshalled_from_parse_tree.State(
                                                                                                                $,
                                                                                                                ($) => abort(
                                                                                                                    $,
                                                                                                                ),
                                                                                                            ),
                                                                                                            ($) => p_decide_text(
                                                                                                                $['option']['token']['value'],
                                                                                                                ($t): t_out.Errors.L.type_.value.invalid_type.expected.L => {
                                                                                                                    switch ($t) {
                                                                                                                        case 'dictionary':
                                                                                                                            return p_change_context(
                                                                                                                                $['value'],
                                                                                                                                ($) => ['dictionary', v_unmarshalled_from_parse_tree.Nothing(
                                                                                                                                    $,
                                                                                                                                    ($) => abort(
                                                                                                                                        $,
                                                                                                                                    ),
                                                                                                                                )],
                                                                                                                            )
                                                                                                                        case 'group':
                                                                                                                            return p_change_context(
                                                                                                                                $['value'],
                                                                                                                                ($) => ['group', v_unmarshalled_from_parse_tree.Nothing(
                                                                                                                                    $,
                                                                                                                                    ($) => abort(
                                                                                                                                        $,
                                                                                                                                    ),
                                                                                                                                )],
                                                                                                                            )
                                                                                                                        case 'list':
                                                                                                                            return p_change_context(
                                                                                                                                $['value'],
                                                                                                                                ($) => ['list', v_unmarshalled_from_parse_tree.Nothing(
                                                                                                                                    $,
                                                                                                                                    ($) => abort(
                                                                                                                                        $,
                                                                                                                                    ),
                                                                                                                                )],
                                                                                                                            )
                                                                                                                        case 'nothing':
                                                                                                                            return p_change_context(
                                                                                                                                $['value'],
                                                                                                                                ($) => ['nothing', v_unmarshalled_from_parse_tree.Nothing(
                                                                                                                                    $,
                                                                                                                                    ($) => abort(
                                                                                                                                        $,
                                                                                                                                    ),
                                                                                                                                )],
                                                                                                                            )
                                                                                                                        case 'optional':
                                                                                                                            return p_change_context(
                                                                                                                                $['value'],
                                                                                                                                ($) => ['optional', v_unmarshalled_from_parse_tree.Nothing(
                                                                                                                                    $,
                                                                                                                                    ($) => abort(
                                                                                                                                        $,
                                                                                                                                    ),
                                                                                                                                )],
                                                                                                                            )
                                                                                                                        case 'state':
                                                                                                                            return p_change_context(
                                                                                                                                $['value'],
                                                                                                                                ($) => ['state', v_unmarshalled_from_parse_tree.Nothing(
                                                                                                                                    $,
                                                                                                                                    ($) => abort(
                                                                                                                                        $,
                                                                                                                                    ),
                                                                                                                                )],
                                                                                                                            )
                                                                                                                        case 'text':
                                                                                                                            return p_change_context(
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
                                                                                                                                            'subdocument context': p_.literal.not_set(),
                                                                                                                                        },
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
                                                                    case 'missing':
                                                                        return p_change_context(
                                                                            $['value'],
                                                                            ($) => ['missing', v_unmarshalled_from_parse_tree.Nothing(
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
                                                                                        'subdocument context': p_.literal.not_set(),
                                                                                    },
                                                                                ),
                                                                            }],
                                                                        )
                                                                }
                                                            },
                                                        ),
                                                    )],
                                                )
                                            case 'dictionary':
                                                return p_change_context(
                                                    $['value'],
                                                    ($) => ['dictionary', p_change_context(
                                                        v_unmarshalled_from_parse_tree.State(
                                                            $,
                                                            ($) => abort(
                                                                $,
                                                            ),
                                                        ),
                                                        ($) => p_decide_text(
                                                            $['option']['token']['value'],
                                                            ($t): t_out.Errors.L.type_.dictionary => {
                                                                switch ($t) {
                                                                    case 'duplicate entry':
                                                                        return p_change_context(
                                                                            $['value'],
                                                                            ($) => ['duplicate entry', p_change_context(
                                                                                v_unmarshalled_from_parse_tree.Verbose_Group(
                                                                                    $,
                                                                                    ($) => abort(
                                                                                        $,
                                                                                    ),
                                                                                    {
                                                                                        'expected properties': p_.literal.dictionary(
                                                                                            {
                                                                                                "name": null,
                                                                                            },
                                                                                        ),
                                                                                        'subdocument context': p_.literal.not_set(),
                                                                                    },
                                                                                ),
                                                                                ($) => p_variables(
                                                                                    () => {
                                                                                        
                                                                                        const var_verbose_group_range = v_parse_tree_to_location.Value(
                                                                                            $['value'],
                                                                                            {
                                                                                                'subdocument context': p_.literal.not_set(),
                                                                                            },
                                                                                        )
                                                                                        return {
                                                                                            'name': p_change_context(
                                                                                                v_unmarshalled_from_parse_tree.Property(
                                                                                                    $,
                                                                                                    ($) => abort(
                                                                                                        $,
                                                                                                    ),
                                                                                                    {
                                                                                                        'id': 'name',
                                                                                                        'subdocument context': p_.literal.not_set(),
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
                                                                    default:
                                                                        return abort(
                                                                            ['liana', {
                                                                                'type': ['state', ['unknown option', $['option']['token']['value']]],
                                                                                'range': v_parse_tree_to_location.Value(
                                                                                    $['value'],
                                                                                    {
                                                                                        'subdocument context': p_.literal.not_set(),
                                                                                    },
                                                                                ),
                                                                            }],
                                                                        )
                                                                }
                                                            },
                                                        ),
                                                    )],
                                                )
                                            case 'group':
                                                return p_change_context(
                                                    $['value'],
                                                    ($) => ['group', p_change_context(
                                                        v_unmarshalled_from_parse_tree.State(
                                                            $,
                                                            ($) => abort(
                                                                $,
                                                            ),
                                                        ),
                                                        ($) => p_decide_text(
                                                            $['option']['token']['value'],
                                                            ($t): t_out.Errors.L.type_.group => {
                                                                switch ($t) {
                                                                    case 'duplicate property':
                                                                        return p_change_context(
                                                                            $['value'],
                                                                            ($) => ['duplicate property', p_change_context(
                                                                                v_unmarshalled_from_parse_tree.Verbose_Group(
                                                                                    $,
                                                                                    ($) => abort(
                                                                                        $,
                                                                                    ),
                                                                                    {
                                                                                        'expected properties': p_.literal.dictionary(
                                                                                            {
                                                                                                "name": null,
                                                                                            },
                                                                                        ),
                                                                                        'subdocument context': p_.literal.not_set(),
                                                                                    },
                                                                                ),
                                                                                ($) => p_variables(
                                                                                    () => {
                                                                                        
                                                                                        const var_verbose_group_range = v_parse_tree_to_location.Value(
                                                                                            $['value'],
                                                                                            {
                                                                                                'subdocument context': p_.literal.not_set(),
                                                                                            },
                                                                                        )
                                                                                        return {
                                                                                            'name': p_change_context(
                                                                                                v_unmarshalled_from_parse_tree.Property(
                                                                                                    $,
                                                                                                    ($) => abort(
                                                                                                        $,
                                                                                                    ),
                                                                                                    {
                                                                                                        'id': 'name',
                                                                                                        'subdocument context': p_.literal.not_set(),
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
                                                                        return p_change_context(
                                                                            $['value'],
                                                                            ($) => ['missing property', p_change_context(
                                                                                v_unmarshalled_from_parse_tree.Verbose_Group(
                                                                                    $,
                                                                                    ($) => abort(
                                                                                        $,
                                                                                    ),
                                                                                    {
                                                                                        'expected properties': p_.literal.dictionary(
                                                                                            {
                                                                                                "name": null,
                                                                                            },
                                                                                        ),
                                                                                        'subdocument context': p_.literal.not_set(),
                                                                                    },
                                                                                ),
                                                                                ($) => p_variables(
                                                                                    () => {
                                                                                        
                                                                                        const var_verbose_group_range = v_parse_tree_to_location.Value(
                                                                                            $['value'],
                                                                                            {
                                                                                                'subdocument context': p_.literal.not_set(),
                                                                                            },
                                                                                        )
                                                                                        return {
                                                                                            'name': p_change_context(
                                                                                                v_unmarshalled_from_parse_tree.Property(
                                                                                                    $,
                                                                                                    ($) => abort(
                                                                                                        $,
                                                                                                    ),
                                                                                                    {
                                                                                                        'id': 'name',
                                                                                                        'subdocument context': p_.literal.not_set(),
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
                                                                    case 'missing property value':
                                                                        return p_change_context(
                                                                            $['value'],
                                                                            ($) => ['missing property value', p_change_context(
                                                                                v_unmarshalled_from_parse_tree.Verbose_Group(
                                                                                    $,
                                                                                    ($) => abort(
                                                                                        $,
                                                                                    ),
                                                                                    {
                                                                                        'expected properties': p_.literal.dictionary(
                                                                                            {
                                                                                                "name": null,
                                                                                            },
                                                                                        ),
                                                                                        'subdocument context': p_.literal.not_set(),
                                                                                    },
                                                                                ),
                                                                                ($) => p_variables(
                                                                                    () => {
                                                                                        
                                                                                        const var_verbose_group_range = v_parse_tree_to_location.Value(
                                                                                            $['value'],
                                                                                            {
                                                                                                'subdocument context': p_.literal.not_set(),
                                                                                            },
                                                                                        )
                                                                                        return {
                                                                                            'name': p_change_context(
                                                                                                v_unmarshalled_from_parse_tree.Property(
                                                                                                    $,
                                                                                                    ($) => abort(
                                                                                                        $,
                                                                                                    ),
                                                                                                    {
                                                                                                        'id': 'name',
                                                                                                        'subdocument context': p_.literal.not_set(),
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
                                                                        return p_change_context(
                                                                            $['value'],
                                                                            ($) => ['superfluous property', p_change_context(
                                                                                v_unmarshalled_from_parse_tree.Verbose_Group(
                                                                                    $,
                                                                                    ($) => abort(
                                                                                        $,
                                                                                    ),
                                                                                    {
                                                                                        'expected properties': p_.literal.dictionary(
                                                                                            {
                                                                                                "name": null,
                                                                                            },
                                                                                        ),
                                                                                        'subdocument context': p_.literal.not_set(),
                                                                                    },
                                                                                ),
                                                                                ($) => p_variables(
                                                                                    () => {
                                                                                        
                                                                                        const var_verbose_group_range = v_parse_tree_to_location.Value(
                                                                                            $['value'],
                                                                                            {
                                                                                                'subdocument context': p_.literal.not_set(),
                                                                                            },
                                                                                        )
                                                                                        return {
                                                                                            'name': p_change_context(
                                                                                                v_unmarshalled_from_parse_tree.Property(
                                                                                                    $,
                                                                                                    ($) => abort(
                                                                                                        $,
                                                                                                    ),
                                                                                                    {
                                                                                                        'id': 'name',
                                                                                                        'subdocument context': p_.literal.not_set(),
                                                                                                    },
                                                                                                ),
                                                                                                ($) => p_.from.optional(
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
                                                                    default:
                                                                        return abort(
                                                                            ['liana', {
                                                                                'type': ['state', ['unknown option', $['option']['token']['value']]],
                                                                                'range': v_parse_tree_to_location.Value(
                                                                                    $['value'],
                                                                                    {
                                                                                        'subdocument context': p_.literal.not_set(),
                                                                                    },
                                                                                ),
                                                                            }],
                                                                        )
                                                                }
                                                            },
                                                        ),
                                                    )],
                                                )
                                            case 'state':
                                                return p_change_context(
                                                    $['value'],
                                                    ($) => ['state', p_change_context(
                                                        v_unmarshalled_from_parse_tree.State(
                                                            $,
                                                            ($) => abort(
                                                                $,
                                                            ),
                                                        ),
                                                        ($) => p_decide_text(
                                                            $['option']['token']['value'],
                                                            ($t): t_out.Errors.L.type_.state => {
                                                                switch ($t) {
                                                                    case 'more than 2 items in list':
                                                                        return p_change_context(
                                                                            $['value'],
                                                                            ($) => ['more than 2 items in list', v_unmarshalled_from_parse_tree.Nothing(
                                                                                $,
                                                                                ($) => abort(
                                                                                    $,
                                                                                ),
                                                                            )],
                                                                        )
                                                                    case 'missing option name':
                                                                        return p_change_context(
                                                                            $['value'],
                                                                            ($) => ['missing option name', v_unmarshalled_from_parse_tree.Nothing(
                                                                                $,
                                                                                ($) => abort(
                                                                                    $,
                                                                                ),
                                                                            )],
                                                                        )
                                                                    case 'option name is not a text':
                                                                        return p_change_context(
                                                                            $['value'],
                                                                            ($) => ['option name is not a text', v_unmarshalled_from_parse_tree.Nothing(
                                                                                $,
                                                                                ($) => abort(
                                                                                    $,
                                                                                ),
                                                                            )],
                                                                        )
                                                                    case 'missing value':
                                                                        return p_change_context(
                                                                            $['value'],
                                                                            ($) => ['missing value', v_unmarshalled_from_parse_tree.Nothing(
                                                                                $,
                                                                                ($) => abort(
                                                                                    $,
                                                                                ),
                                                                            )],
                                                                        )
                                                                    case 'unknown option':
                                                                        return p_change_context(
                                                                            $['value'],
                                                                            ($) => ['unknown option', p_change_context(
                                                                                v_unmarshalled_from_parse_tree.Verbose_Group(
                                                                                    $,
                                                                                    ($) => abort(
                                                                                        $,
                                                                                    ),
                                                                                    {
                                                                                        'expected properties': p_.literal.dictionary(
                                                                                            {
                                                                                                "found": null,
                                                                                                "expected": null,
                                                                                            },
                                                                                        ),
                                                                                        'subdocument context': p_.literal.not_set(),
                                                                                    },
                                                                                ),
                                                                                ($) => p_variables(
                                                                                    () => {
                                                                                        
                                                                                        const var_verbose_group_range = v_parse_tree_to_location.Value(
                                                                                            $['value'],
                                                                                            {
                                                                                                'subdocument context': p_.literal.not_set(),
                                                                                            },
                                                                                        )
                                                                                        return {
                                                                                            'found': p_change_context(
                                                                                                v_unmarshalled_from_parse_tree.Property(
                                                                                                    $,
                                                                                                    ($) => abort(
                                                                                                        $,
                                                                                                    ),
                                                                                                    {
                                                                                                        'id': 'found',
                                                                                                        'subdocument context': p_.literal.not_set(),
                                                                                                    },
                                                                                                ),
                                                                                                ($) => v_unmarshalled_from_parse_tree.Text(
                                                                                                    $,
                                                                                                    ($) => abort(
                                                                                                        $,
                                                                                                    ),
                                                                                                ),
                                                                                            ),
                                                                                            'expected': p_change_context(
                                                                                                v_unmarshalled_from_parse_tree.Property(
                                                                                                    $,
                                                                                                    ($) => abort(
                                                                                                        $,
                                                                                                    ),
                                                                                                    {
                                                                                                        'id': 'expected',
                                                                                                        'subdocument context': p_.literal.not_set(),
                                                                                                    },
                                                                                                ),
                                                                                                ($) => p_change_context(
                                                                                                    v_unmarshalled_from_parse_tree.Dictionary(
                                                                                                        $,
                                                                                                        ($) => abort(
                                                                                                            $,
                                                                                                        ),
                                                                                                        {
                                                                                                            'subdocument context': p_.literal.not_set(),
                                                                                                        },
                                                                                                    ),
                                                                                                    ($) => p_.from.dictionary(
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
                                                                        return p_change_context(
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
                                                                                    {
                                                                                        'subdocument context': p_.literal.not_set(),
                                                                                    },
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
                                                            {
                                                                'subdocument context': p_.literal.not_set(),
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

export const Warnings: t_signatures.Warnings = ($, abort) => p_.from.list(
    v_unmarshalled_from_parse_tree.List(
        $,
        ($) => abort(
            $,
        ),
        {
            'subdocument context': p_.literal.not_set(),
        },
    )['items'],
).map(
    ($) => p_change_context(
        $['value'],
        ($) => p_change_context(
            v_unmarshalled_from_parse_tree.Verbose_Group(
                $,
                ($) => abort(
                    $,
                ),
                {
                    'expected properties': p_.literal.dictionary(
                        {
                            "range": null,
                            "type": null,
                        },
                    ),
                    'subdocument context': p_.literal.not_set(),
                },
            ),
            ($) => p_variables(
                () => {
                    
                    const var_verbose_group_range = v_parse_tree_to_location.Value(
                        $['value'],
                        {
                            'subdocument context': p_.literal.not_set(),
                        },
                    )
                    return {
                        'range': p_change_context(
                            v_unmarshalled_from_parse_tree.Property(
                                $,
                                ($) => abort(
                                    $,
                                ),
                                {
                                    'id': 'range',
                                    'subdocument context': p_.literal.not_set(),
                                },
                            ),
                            ($) => v_external_location.Range(
                                $,
                                ($) => abort(
                                    $,
                                ),
                            ),
                        ),
                        'type': p_change_context(
                            v_unmarshalled_from_parse_tree.Property(
                                $,
                                ($) => abort(
                                    $,
                                ),
                                {
                                    'id': 'type',
                                    'subdocument context': p_.literal.not_set(),
                                },
                            ),
                            ($) => p_change_context(
                                v_unmarshalled_from_parse_tree.State(
                                    $,
                                    ($) => abort(
                                        $,
                                    ),
                                ),
                                ($) => p_decide_text(
                                    $['option']['token']['value'],
                                    ($t): t_out.Warnings.L.type_ => {
                                        switch ($t) {
                                            case 'expected apostrophed text':
                                                return p_change_context(
                                                    $['value'],
                                                    ($) => ['expected apostrophed text', v_unmarshalled_from_parse_tree.Nothing(
                                                        $,
                                                        ($) => abort(
                                                            $,
                                                        ),
                                                    )],
                                                )
                                            case 'expected quoted text':
                                                return p_change_context(
                                                    $['value'],
                                                    ($) => ['expected quoted text', v_unmarshalled_from_parse_tree.Nothing(
                                                        $,
                                                        ($) => abort(
                                                            $,
                                                        ),
                                                    )],
                                                )
                                            case 'expected backticked text':
                                                return p_change_context(
                                                    $['value'],
                                                    ($) => ['expected backticked text', v_unmarshalled_from_parse_tree.Nothing(
                                                        $,
                                                        ($) => abort(
                                                            $,
                                                        ),
                                                    )],
                                                )
                                            case 'expected undelimited text':
                                                return p_change_context(
                                                    $['value'],
                                                    ($) => ['expected undelimited text', v_unmarshalled_from_parse_tree.Nothing(
                                                        $,
                                                        ($) => abort(
                                                            $,
                                                        ),
                                                    )],
                                                )
                                            case 'expected a group':
                                                return p_change_context(
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
                                                            {
                                                                'subdocument context': p_.literal.not_set(),
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
