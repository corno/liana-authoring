import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/deserialize"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"
import * as d_function_loc from "astn-core/dist/interface/data/location_to_fountain_pen"

//dependencies
import * as t_deserialize_to_fp from "astn-core/dist/implementation/manual/transformers/deserialize_parse_tree/fountain_pen"
import * as t_get_schema_to_fp from "../get_schema/fountain_pen"
import * as t_get_schema_path_to_fp from "../get_schema_path/fountain_pen"

export namespace signatures {
    export type Error = p_i.Transformer<d_in.Error, d_out.Phrase>
}

export const Error: signatures.Error = ($) => p_.from.state($).decide(($) => {
    switch ($[0]) {
        case 'deserialize parse tree': return p_.ss($, ($) => t_deserialize_to_fp.Error($))
        case 'schema': return p_.ss($, ($) => t_get_schema_to_fp.Error($.error))
        case 'schema path': return p_.ss($, ($) => t_get_schema_path_to_fp.Error($))
        default: return p_.au($[0])
    }
})