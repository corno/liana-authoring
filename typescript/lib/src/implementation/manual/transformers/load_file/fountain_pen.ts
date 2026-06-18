import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/get_unmarshalled_file"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

export namespace signatures {
    export type Error = p_i.Transformer<d_in.Error, d_out.Phrase>
}

//dependencies
import * as t_read_file_to_fountain_pen from "pareto-resources/dist/implementation/manual/transformers/read_file/fountain_pen"
import * as t_deserialize_to_fp from "../deserialize/fountain_pen"

export const Error: signatures.Error = ($) => p_.from.state($).decide(($) => {
    switch ($[0]) {
        case 'deserialize': return p_.ss($, ($) => t_deserialize_to_fp.Error($))
        case 'read file': return p_.ss($, ($) => t_read_file_to_fountain_pen.Error($))
        default: return p_.au($[0])
    }
})