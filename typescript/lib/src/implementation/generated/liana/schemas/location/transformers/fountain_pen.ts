
import * as p_ from 'pareto-core/dist/implementation/transformer'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/location/signatures/transformers/fountain_pen"

import * as v_serialize from "astn-core/dist/implementation/manual/transformers/sealed_target/prose"

import * as v_marshall from "./astn_sealed_target"

export const Position: t_signatures.Position = ($) => v_serialize.Document(
    v_marshall.Position(
        $,
    ),
)

export const Range_FE: t_signatures.Range_FE = ($) => v_serialize.Document(
    v_marshall.Range_FE(
        $,
    ),
)
