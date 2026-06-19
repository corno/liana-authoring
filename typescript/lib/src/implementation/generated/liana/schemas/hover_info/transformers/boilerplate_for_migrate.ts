
import * as p_ from 'pareto-core/dist/implementation/transformer'

import p_change_context from 'pareto-core/dist/implementation/refiner/specials/change_context'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/hover_info/signatures/transformers/boilerplate_for_migrate"

import * as t_out from "../../../../../../interface/generated/liana/schemas/hover_info/data"

export const Hover_Texts: t_signatures.Hover_Texts = ($) => p_.from.list(
    $,
).map(
    ($) => $,
)
