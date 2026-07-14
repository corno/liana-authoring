import * as p_ from 'pareto-core/implementation/transformer'

import type * as s_in from "../../../interface/schemas/get_schema_path.js"
namespace declarations {
    export type Error = p_.Transformer<
        s_in.Error,
        s_out.Phrase
    >
}

//dependencies
import * as t_stat_to_prose from "pareto-filesystem-unrestricted-api/implementation/transformers/stat_possible_node/prose"

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"

export const Error: declarations.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'not found': return p_.option($, ($) => sh.ph.literal("schema not found"))
            case 'stat error': return p_.option($, ($) => t_stat_to_prose.Error($))
            default: return p_.exhaustive($[0])
        }
    })