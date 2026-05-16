
import * as _p from 'pareto-core/dist/assign'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/unmarshall_errors/signatures/transformers/fountain_pen"

import * as v_serialize from "astn-core/dist/implementation/manual/transformers/sealed_target/fountain_pen"

import * as v_marshall from "./astn_sealed_target"

export const Errors: t_signatures.Errors = ($) => v_serialize.Document(
    v_marshall.Errors(
        $,
    ),
)

export const Warnings: t_signatures.Warnings = ($) => v_serialize.Document(
    v_marshall.Warnings(
        $,
    ),
)
