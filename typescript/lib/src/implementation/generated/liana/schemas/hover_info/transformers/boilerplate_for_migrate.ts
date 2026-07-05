
import * as p_ from 'pareto-core/implementation/transformer'

import p_change_context from 'pareto-core/implementation/refiner/specials/change_context'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/hover_info/signatures/transformers/boilerplate_for_migrate.js"

import * as t_out from "../../../../../../interface/generated/liana/schemas/hover_info/data.js"

export const Hover_Texts: t_signatures.Hover_Texts = ($) => p_.from.list($,
).map(
    ($) => $,
)
