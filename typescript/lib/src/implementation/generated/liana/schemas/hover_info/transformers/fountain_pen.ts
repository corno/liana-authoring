
import * as p_ from 'pareto-core/implementation/transformer'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/hover_info/signatures/transformers/fountain_pen.js"

import * as v_serialize from "astn-core/implementation/manual/transformers/sealed_target/prose"

import * as v_marshall from "./astn_sealed_target.js"

export const Hover_Texts: t_signatures.Hover_Texts = ($) => v_serialize.Document(
    v_marshall.Hover_Texts(
        $,
    ),
)
