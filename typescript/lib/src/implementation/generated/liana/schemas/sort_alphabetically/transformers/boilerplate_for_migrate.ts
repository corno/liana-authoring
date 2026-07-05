
import * as p_ from 'pareto-core/implementation/transformer'

import p_change_context from 'pareto-core/implementation/refiner/specials/change_context'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/sort_alphabetically/signatures/transformers/boilerplate_for_migrate.js"

import * as t_out from "../../../../../../interface/generated/liana/schemas/sort_alphabetically/data.js"

import * as v_location from "../../location/transformers/boilerplate_for_migrate.js"

export const Sort_Parameters: t_signatures.Sort_Parameters = ($) => ({
    'position': p_change_context(
        $['position'],
        ($) => v_location.Position(
            $,
        ),
    ),
})
