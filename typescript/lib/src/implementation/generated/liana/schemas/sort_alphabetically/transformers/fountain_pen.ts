
import * as p_ from 'pareto-core/implementation/transformer'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/sort_alphabetically/signatures/transformers/fountain_pen.js"

import * as v_serialize from "astn-core/implementation/manual/transformers/sealed_target/prose"

import * as v_marshall from "./astn_sealed_target.js"

export const Sort_Parameters: t_signatures.Sort_Parameters = ($) => v_serialize.Document(
    v_marshall.Sort_Parameters(
        $,
    ),
)
