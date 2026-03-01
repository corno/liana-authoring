
import * as _p from 'pareto-core/dist/assign'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/convert_to_json/signatures/transformers/fountain_pen"

import * as v_serialize from "astn-core/dist/implementation/manual/transformers/sealed_target/fountain_pen"

import * as v_marshall from "./astn_sealed_target"

export const Parameters: t_signatures.Parameters = ($) => v_serialize.Document(
    v_marshall.Parameters(
        $,
    ),
)
