
import * as _p from 'pareto-core/dist/assign'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/text_edits/signatures/transformers/fountain_pen"

import * as v_serialize from "astn-core/dist/implementation/manual/transformers/sealed_target/fountain_pen"

import * as v_marshall from "./astn_sealed_target"

export const Text_Edits: t_signatures.Text_Edits = ($) => v_serialize.Document(
    v_marshall.Text_Edits(
        $,
    ),
)
