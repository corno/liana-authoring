
import * as p_ from 'pareto-core/dist/implementation/transformer'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/astn_location/signatures/transformers/fountain_pen"

import * as v_serialize from "astn-core/dist/implementation/manual/transformers/sealed_target/prose"

import * as v_marshall from "./astn_sealed_target"

export const Range: t_signatures.Range = ($) => v_serialize.Document(
    v_marshall.Range(
        $,
    ),
)

export const Possible_Range: t_signatures.Possible_Range = ($) => v_serialize.Document(
    v_marshall.Possible_Range(
        $,
    ),
)

export const Location: t_signatures.Location = ($) => v_serialize.Document(
    v_marshall.Location(
        $,
    ),
)

export const Relative_Location: t_signatures.Relative_Location = ($) => v_serialize.Document(
    v_marshall.Relative_Location(
        $,
    ),
)
