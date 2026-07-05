
import * as p_ from 'pareto-core/implementation/transformer'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/convert_to_json/signatures/transformers/fountain_pen.js"

import * as v_serialize from "astn-core/implementation/manual/transformers/sealed_target/prose"

import * as v_marshall from "./astn_sealed_target.js"

export const Parameters: t_signatures.Parameters = ($) => v_serialize.Document(
    v_marshall.Parameters(
        $,
    ),
)
