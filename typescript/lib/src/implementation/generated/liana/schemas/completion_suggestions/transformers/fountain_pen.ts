
import * as p_ from 'pareto-core/dist/implementation/transformer'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/completion_suggestions/signatures/transformers/fountain_pen"

import * as v_serialize from "astn-core/dist/implementation/manual/transformers/sealed_target/prose"

import * as v_marshall from "./astn_sealed_target"

export const Completion_Suggestions: t_signatures.Completion_Suggestions = ($) => v_serialize.Document(
    v_marshall.Completion_Suggestions(
        $,
    ),
)
