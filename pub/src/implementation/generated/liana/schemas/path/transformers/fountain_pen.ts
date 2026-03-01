
import * as _p from 'pareto-core/dist/assign'

import * as t_signatures from "../../../../../../interface/generated/liana/schemas/path/signatures/transformers/fountain_pen"

import * as v_serialize from "astn-core/dist/implementation/manual/transformers/sealed_target/fountain_pen"

import * as v_marshall from "./astn_sealed_target"

export const Node_Path: t_signatures.Node_Path = ($) => v_serialize.Document(
    v_marshall.Node_Path(
        $,
    ),
)

export const Context_Path: t_signatures.Context_Path = ($) => v_serialize.Document(
    v_marshall.Context_Path(
        $,
    ),
)

export const Context_Subpath: t_signatures.Context_Subpath = ($) => v_serialize.Document(
    v_marshall.Context_Subpath(
        $,
    ),
)

export const Start: t_signatures.Start = ($) => v_serialize.Document(
    v_marshall.Start(
        $,
    ),
)

export const Up_Steps: t_signatures.Up_Steps = ($) => v_serialize.Document(
    v_marshall.Up_Steps(
        $,
    ),
)

export const Non_Normalized_Path: t_signatures.Non_Normalized_Path = ($) => v_serialize.Document(
    v_marshall.Non_Normalized_Path(
        $,
    ),
)
