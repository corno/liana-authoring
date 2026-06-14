import * as pt from 'pareto-core/dist/assign'
import * as p_ti from 'pareto-core/dist/transformer/interface'

//data types
import * as d_in from "../../../../interface/to_be_generated/deserialize"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"
import * as d_function_loc from "astn-core/dist/interface/to_be_generated/location_to_fountain_pen"

//dependencies
import * as t_deserialize_to_fp from "astn-core/dist/implementation/manual/transformers/deserialize_parse_tree/fountain_pen"
import * as t_get_schema_to_fp from "../get_schema/fountain_pen"
import * as t_get_schema_path_to_fp from "../get_schema_path/fountain_pen"

export namespace signatures {
    export type Error = p_ti.Transformer<d_in.Error, d_out.Phrase>
}

export const Error: signatures.Error = ($) => pt.decide.state($, ($) => {
    switch ($[0]) {
        case 'deserialize parse tree': return pt.ss($, ($) => t_deserialize_to_fp.Error($))
        case 'schema': return pt.ss($, ($) => t_get_schema_to_fp.Error($.error))
        case 'schema path': return pt.ss($, ($) => t_get_schema_path_to_fp.Error($))
        default: return pt.au($[0])
    }
})