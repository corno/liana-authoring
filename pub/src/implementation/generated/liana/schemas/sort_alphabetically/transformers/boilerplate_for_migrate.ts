
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/_p_change_context'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/sort_alphabetically/signatures/transformers/boilerplate_for_migrate"

import * as t_out from "../../../../../../interface/generated/liana/schemas/sort_alphabetically/data"

import * as v_location from "../../location/transformers/boilerplate_for_migrate"

export const Sort_Parameters: t_signatures.Sort_Parameters = ($) => ({
    'position': _p_change_context(
        $['position'],
        ($) => v_location.Position(
            $,
        ),
    ),
})
