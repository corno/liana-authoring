
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/_p_change_context'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/get_on_hover_info/signatures/transformers/boilerplate_for_migrate"

import * as t_out from "../../../../../../interface/generated/liana/schemas/get_on_hover_info/data"

import * as v_hover_info from "../../hover_info/transformers/boilerplate_for_migrate"

import * as v_location from "../../location/transformers/boilerplate_for_migrate"

import * as v_path from "../../path/transformers/boilerplate_for_migrate"

export const Result: t_signatures.Result = ($) => ({
    'contents': _p_change_context(
        $['contents'],
        ($) => ({
            'hover texts': _p_change_context(
                $['hover texts'],
                ($) => v_hover_info.Hover_Texts(
                    $,
                ),
            ),
        }),
    ),
})

export const Parameters: t_signatures.Parameters = ($) => ({
    'content': _p_change_context(
        $['content'],
        ($) => $,
    ),
    'source': _p_change_context(
        $['source'],
        ($) => ({
            'file path': _p_change_context(
                $['file path'],
                ($) => v_path.Node_Path(
                    $,
                ),
            ),
            'tab size': _p_change_context(
                $['tab size'],
                ($) => $,
            ),
        }),
    ),
    'position': _p_change_context(
        $['position'],
        ($) => v_location.Position(
            $,
        ),
    ),
})
