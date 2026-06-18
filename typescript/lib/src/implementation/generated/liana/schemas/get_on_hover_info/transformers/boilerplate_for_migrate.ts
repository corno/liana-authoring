
import * as p_ from 'pareto-core/dist/implementation/transformer'

import p_change_context from 'pareto-core/dist/implementation/specials/change_context'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/get_on_hover_info/signatures/transformers/boilerplate_for_migrate"

import * as t_out from "../../../../../../interface/generated/liana/schemas/get_on_hover_info/data"

import * as v_hover_info from "../../hover_info/transformers/boilerplate_for_migrate"

import * as v_location from "../../location/transformers/boilerplate_for_migrate"

import * as v_path_unrestricted from "../../path_unrestricted/transformers/boilerplate_for_migrate"

export const Result: t_signatures.Result = ($) => ({
    'contents': p_change_context(
        $['contents'],
        ($) => ({
            'hover texts': p_change_context(
                $['hover texts'],
                ($) => v_hover_info.Hover_Texts(
                    $,
                ),
            ),
        }),
    ),
})

export const Parameters: t_signatures.Parameters = ($) => ({
    'content': p_change_context(
        $['content'],
        ($) => $,
    ),
    'source': p_change_context(
        $['source'],
        ($) => ({
            'file path': p_change_context(
                $['file path'],
                ($) => v_path_unrestricted.Node_Path(
                    $,
                ),
            ),
            'tab size': p_change_context(
                $['tab size'],
                ($) => $,
            ),
        }),
    ),
    'position': p_change_context(
        $['position'],
        ($) => v_location.Position(
            $,
        ),
    ),
})
