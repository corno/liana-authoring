import * as p_ from 'pareto-core/implementation/transformer'
import * as p_i from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../../interface/data/get_schema_path.js"
import type * as d_out from "pareto-fountain-pen/interface/generated/liana/schemas/prose/data"

//dependencies
import * as t_stat_to_prose from "pareto-filesystem-unrestricted-api/implementation/manual/transformers/stat_possible_node/prose"

export namespace interface_ {
    export type Error = p_i.Transformer<
        d_in.Error,
        d_out.Phrase
    >
}

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"

export const Error: interface_.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'not found': return p_.option($, ($) => sh.ph.literal("schema not found"))
            case 'stat error': return p_.option($, ($) => t_stat_to_prose.Error($))
            default: return p_.exhaustive($[0])
        }
    })