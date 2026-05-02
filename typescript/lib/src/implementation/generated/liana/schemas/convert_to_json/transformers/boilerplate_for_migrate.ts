
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/_p_change_context'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/convert_to_json/signatures/transformers/boilerplate_for_migrate"

import * as t_out from "../../../../../../interface/generated/liana/schemas/convert_to_json/data"

export const Parameters: t_signatures.Parameters = ($) => ({
    'source': _p_change_context(
        $['source'],
        ($) => ({
            'document resource identifier': _p_change_context(
                $['document resource identifier'],
                ($) => $,
            ),
            'tab size': _p_change_context(
                $['tab size'],
                ($) => $,
            ),
        }),
    ),
    'target': _p_change_context(
        $['target'],
        ($) => ({
            'indentation': _p_change_context(
                $['indentation'],
                ($) => $,
            ),
            'newline': _p_change_context(
                $['newline'],
                ($) => $,
            ),
        }),
    ),
})
