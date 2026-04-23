import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'

import * as d_in from "../../../../interface/to_be_generated/unmarshall_result_from_loc"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

export namespace signatures {
    export type Error = _pi.Transformer<d_in.Error, d_out.Phrase>
}

import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

//dependencies
import * as t_deserialize_parse_tree_to_fountain_pen from "astn-core/dist/implementation/manual/transformers/deserialize_parse_tree/fountain_pen"

export const Error: signatures.Error = ($) => t_deserialize_parse_tree_to_fountain_pen.Error($)