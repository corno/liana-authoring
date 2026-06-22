
import * as p_ from 'pareto-core/dist/implementation/refiner'
import * as p_di from 'pareto-core/dist/interface/data'
const p_decide_state = <State, B>($: State,  assign: ($: State) => B) => assign($)
const p_decide_optional = <OV extends p_di.Value, B extends p_di.Value>($: p_di.Optional_Value<OV>,  assign: ($: OV) => B,  otherwise: () => B) => p_.from.optional($).decide(assign, otherwise)
const p_decide_text = <B>($: string,  assign: ($: string) => B) => assign($)

import p_change_context from 'pareto-core/dist/implementation/refiner/specials/change_context'

import p_list_from_text from 'pareto-core/dist/implementation/refiner/specials/list_from_text'

import p_variables from 'pareto-core/dist/implementation/refiner/specials/variables'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/diagnostics/signatures/refiners/astn_parse_tree"

import * as t_out from "../../../../../../interface/generated/liana/schemas/diagnostics/data"

import * as v_unmarshalled_from_parse_tree from "liana-core/dist/implementation/manual/refiners/unmarshalled/astn_parse_tree"

import * as v_parse_tree_to_location from "liana-core/dist/implementation/manual/transformers/parse_tree/start_token_range"

import * as v_external_location from "../../astn_location/refiners/astn_parse_tree"

import * as v_external_path_unrestricted from "../../path_unrestricted/refiners/astn_parse_tree"

export const Diagnostics: t_signatures.Diagnostics = ($, abort) => p_.from.list(v_unmarshalled_from_parse_tree.List(
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
        ($) => Diagnostic(
            $,
            ($) => abort(
                $,
            ),
        ),
    ),
)

export const Diagnostic: t_signatures.Diagnostic = ($, abort) => p_change_context(
    v_unmarshalled_from_parse_tree.Verbose_Group(
        $,
        ($) => abort(
            $,
        ),
        {
            'expected properties': p_.literal.dictionary(
                {
                    "severity": null,
                    "range": null,
                    "message": null,
                    "related information": null,
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
                'severity': p_change_context(
                    v_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(
                            $,
                        ),
                        {
                            'id': 'severity',
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
                            ($t): t_out.Diagnostic.severity => {
                                switch ($t) {
                                    case 'error':
                                        return p_change_context(
                                            $['value'],
                                            ($) => ['error', v_unmarshalled_from_parse_tree.Nothing(
                                                $,
                                                ($) => abort(
                                                    $,
                                                ),
                                            )],
                                        )
                                    case 'warning':
                                        return p_change_context(
                                            $['value'],
                                            ($) => ['warning', v_unmarshalled_from_parse_tree.Nothing(
                                                $,
                                                ($) => abort(
                                                    $,
                                                ),
                                            )],
                                        )
                                    case 'information':
                                        return p_change_context(
                                            $['value'],
                                            ($) => ['information', v_unmarshalled_from_parse_tree.Nothing(
                                                $,
                                                ($) => abort(
                                                    $,
                                                ),
                                            )],
                                        )
                                    case 'hint':
                                        return p_change_context(
                                            $['value'],
                                            ($) => ['hint', v_unmarshalled_from_parse_tree.Nothing(
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
                    ($) => p_.from.optional(v_unmarshalled_from_parse_tree.Optional(
                            $,
                            ($) => abort(
                                $,
                            ),
                        )['optional'],
                    ).map(
                        ($) => v_external_location.Possible_Range(
                            $,
                            ($) => abort(
                                $,
                            ),
                        ),
                    ),
                ),
                'message': p_change_context(
                    v_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(
                            $,
                        ),
                        {
                            'id': 'message',
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
                'related information': p_change_context(
                    v_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(
                            $,
                        ),
                        {
                            'id': 'related information',
                            'subdocument context': p_.literal.not_set(),
                        },
                    ),
                    ($) => p_.from.optional(v_unmarshalled_from_parse_tree.Optional(
                            $,
                            ($) => abort(
                                $,
                            ),
                        )['optional'],
                    ).map(
                        ($) => p_.from.list(v_unmarshalled_from_parse_tree.List(
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
                                                    "location": null,
                                                    "message": null,
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
                                                'location': p_change_context(
                                                    v_unmarshalled_from_parse_tree.Property(
                                                        $,
                                                        ($) => abort(
                                                            $,
                                                        ),
                                                        {
                                                            'id': 'location',
                                                            'subdocument context': p_.literal.not_set(),
                                                        },
                                                    ),
                                                    ($) => p_change_context(
                                                        v_unmarshalled_from_parse_tree.Verbose_Group(
                                                            $,
                                                            ($) => abort(
                                                                $,
                                                            ),
                                                            {
                                                                'expected properties': p_.literal.dictionary(
                                                                    {
                                                                        "file path": null,
                                                                        "range": null,
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
                                                                    'file path': p_change_context(
                                                                        v_unmarshalled_from_parse_tree.Property(
                                                                            $,
                                                                            ($) => abort(
                                                                                $,
                                                                            ),
                                                                            {
                                                                                'id': 'file path',
                                                                                'subdocument context': p_.literal.not_set(),
                                                                            },
                                                                        ),
                                                                        ($) => v_external_path_unrestricted.Node_Path(
                                                                            $,
                                                                            ($) => abort(
                                                                                $,
                                                                            ),
                                                                        ),
                                                                    ),
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
                                                                        ($) => v_external_location.Possible_Range(
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
                                                'message': p_change_context(
                                                    v_unmarshalled_from_parse_tree.Property(
                                                        $,
                                                        ($) => abort(
                                                            $,
                                                        ),
                                                        {
                                                            'id': 'message',
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
                                ),
                            ),
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
                            ($t): t_out.Diagnostic.type_ => {
                                switch ($t) {
                                    case 'semantic':
                                        return p_change_context(
                                            $['value'],
                                            ($) => ['semantic', v_unmarshalled_from_parse_tree.Nothing(
                                                $,
                                                ($) => abort(
                                                    $,
                                                ),
                                            )],
                                        )
                                    case 'deserialize':
                                        return p_change_context(
                                            $['value'],
                                            ($) => ['deserialize', v_unmarshalled_from_parse_tree.Nothing(
                                                $,
                                                ($) => abort(
                                                    $,
                                                ),
                                            )],
                                        )
                                    case 'schema':
                                        return p_change_context(
                                            $['value'],
                                            ($) => ['schema', v_unmarshalled_from_parse_tree.Nothing(
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
)

export const Result: t_signatures.Result = ($, abort) => p_change_context(
    v_unmarshalled_from_parse_tree.Verbose_Group(
        $,
        ($) => abort(
            $,
        ),
        {
            'expected properties': p_.literal.dictionary(
                {
                    "diagnostics": null,
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
                'diagnostics': p_change_context(
                    v_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(
                            $,
                        ),
                        {
                            'id': 'diagnostics',
                            'subdocument context': p_.literal.not_set(),
                        },
                    ),
                    ($) => Diagnostics(
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

export const Parameters: t_signatures.Parameters = ($, abort) => p_change_context(
    v_unmarshalled_from_parse_tree.Verbose_Group(
        $,
        ($) => abort(
            $,
        ),
        {
            'expected properties': p_.literal.dictionary(
                {
                    "content": null,
                    "file path": null,
                    "tab size": null,
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
                'content': p_change_context(
                    v_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(
                            $,
                        ),
                        {
                            'id': 'content',
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
                'file path': p_change_context(
                    v_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(
                            $,
                        ),
                        {
                            'id': 'file path',
                            'subdocument context': p_.literal.not_set(),
                        },
                    ),
                    ($) => v_external_path_unrestricted.Node_Path(
                        $,
                        ($) => abort(
                            $,
                        ),
                    ),
                ),
                'tab size': p_change_context(
                    v_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(
                            $,
                        ),
                        {
                            'id': 'tab size',
                            'subdocument context': p_.literal.not_set(),
                        },
                    ),
                    ($) => v_unmarshalled_from_parse_tree.Number(
                        $,
                        ($) => abort(
                            $,
                        ),
                        {
                            'type': ['decimal', null],
                            'subdocument context': p_.literal.not_set(),
                        },
                    ),
                ),
            }
        },
    ),
)
