import * as pt from 'pareto-core/dist/transformer/implementation'
import * as p_di from 'pareto-core/dist/data/interface'
import * as p_ti from 'pareto-core/dist/transformer/interface'

//data types
import * as d_in from "../../../../interface/to_be_generated/get_schema_path"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"
import * as d_function_loc from "astn-core/dist/interface/to_be_generated/location_to_fountain_pen"

//dependencies
import * as t_deserialize_resolved_to_fp from "liana-core/dist/implementation/manual/transformers/deserialize_resolved/fountain_pen"
import * as t_stat_to_fountain_pen from "pareto-resources/dist/implementation/manual/transformers/stat_possible_node/fountain_pen"

export namespace signatures {
    export type Error = p_ti.Transformer<d_in.Error, d_out.Phrase>
}

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

export const Error: signatures.Error = ($) => pt.decide.state($, ($) => {
    switch ($[0]) {
        case 'not found': return pt.ss($, ($) => sh.ph.literal("schema not found"))
        case 'stat error': return pt.ss($, ($) => t_stat_to_fountain_pen.Error($))
        default: return pt.au($[0])
    }
})