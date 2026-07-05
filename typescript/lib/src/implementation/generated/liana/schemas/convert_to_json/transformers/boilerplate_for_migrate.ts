
import * as p_ from 'pareto-core/implementation/transformer'

import p_change_context from 'pareto-core/implementation/refiner/specials/change_context'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/convert_to_json/signatures/transformers/boilerplate_for_migrate.js"

import * as t_out from "../../../../../../interface/generated/liana/schemas/convert_to_json/data.js"

export const Parameters: t_signatures.Parameters = ($) => ({
    'source': p_change_context(
        $['source'],
        ($) => ({
            'document resource identifier': p_change_context(
                $['document resource identifier'],
                ($) => $,
            ),
            'tab size': p_change_context(
                $['tab size'],
                ($) => $,
            ),
        }),
    ),
    'target': p_change_context(
        $['target'],
        ($) => ({
            'indentation': p_change_context(
                $['indentation'],
                ($) => $,
            ),
            'newline': p_change_context(
                $['newline'],
                ($) => $,
            ),
        }),
    ),
})
