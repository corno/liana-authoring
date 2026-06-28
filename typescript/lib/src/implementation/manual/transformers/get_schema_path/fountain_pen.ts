import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/get_schema_path"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//dependencies
import * as t_stat_to_fountain_pen from "pareto-resources/dist/implementation/manual/transformers/stat_possible_node/fountain_pen"

export namespace signatures {
    export type Error = p_i.Transformer<
d_in.Error, d_out.Phrase
>
}

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose/deprecated"

export const Error: signatures.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'not found': return p_.ss($, ($) => sh.ph.literal("schema not found"))
            case 'stat error': return p_.ss($, ($) => t_stat_to_fountain_pen.Error($))
            default: return p_.au($[0])
        }
    })