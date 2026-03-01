
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/_p_change_context'

import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'

import _p_variables from 'pareto-core/dist/_p_variables'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/hover_info/signatures/refiners/astn_parse_tree"

import * as t_out from "../../../../../../interface/generated/liana/schemas/hover_info/data"

import * as v_unmarshalled_from_parse_tree from "liana-core/dist/implementation/manual/refiners/unmarshalled/astn_parse_tree"

import * as v_parse_tree_to_location from "astn-core/dist/implementation/manual/transformers/parse_tree/start_token_range"

export const Hover_Texts: t_signatures.Hover_Texts = ($, abort) => _p.optional.from.optional(
    v_unmarshalled_from_parse_tree.Optional(
        $,
        ($) => abort(
            $,
        ),
    )['optional'],
).map(
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
            ($) => v_unmarshalled_from_parse_tree.Text(
                $,
                ($) => abort(
                    $,
                ),
            ),
        ),
    ),
)
