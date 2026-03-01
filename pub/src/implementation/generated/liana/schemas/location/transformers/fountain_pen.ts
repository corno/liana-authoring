
import * as _p from 'pareto-core/dist/assign'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/location/signatures/transformers/fountain_pen"

import * as v_serialize from "astn-core/dist/implementation/manual/transformers/sealed_target/fountain_pen"

import * as v_marshall from "./astn_sealed_target"

export const Position: t_signatures.Position = ($) => v_serialize.Document(
    v_marshall.Position(
        $,
    ),
)

export const Range: t_signatures.Range = ($) => v_serialize.Document(
    v_marshall.Range(
        $,
    ),
)
