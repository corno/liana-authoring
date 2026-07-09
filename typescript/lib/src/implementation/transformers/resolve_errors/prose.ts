import * as p_ from 'pareto-core/implementation/transformer'

import type * as interface_ from "../../../declarations/transformers/resolve_errors/prose.js"

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"

export const Error: interface_.Error = ($) => p_.from.state($.type).decide(
    ($) => {
        switch ($[0]) {
            case 'to be implemented': return p_.option($, ($) => sh.ph.composed([
                sh.ph.literal("this error type is not yet implemented, please report it to the developers")
            ]))
            default: return p_.exhaustive($[0])
        }
    })