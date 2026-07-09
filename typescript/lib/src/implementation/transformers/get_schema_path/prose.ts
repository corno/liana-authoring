import * as p_ from 'pareto-core/implementation/transformer'

import type * as interface_ from "../../../declarations/transformers/get_schema_path/prose.js"

//dependencies
import * as t_stat_to_prose from "pareto-filesystem-unrestricted-api/implementation/transformers/stat_possible_node/prose"

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