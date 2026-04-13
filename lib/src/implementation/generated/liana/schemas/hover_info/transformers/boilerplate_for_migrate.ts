
import * as _p from 'pareto-core/dist/assign'

import _p_change_context from 'pareto-core/dist/_p_change_context'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/hover_info/signatures/transformers/boilerplate_for_migrate"

import * as t_out from "../../../../../../interface/generated/liana/schemas/hover_info/data"

export const Hover_Texts: t_signatures.Hover_Texts = ($) => _p.optional.from.optional(
    $,
).map(
    ($) => _p.list.from.list(
        $,
    ).map(
        ($) => $,
    ),
)
