import * as p_ from 'pareto-core/implementation/transformer'

import type * as s_in from "../../../interface/schemas/resolve_errors.js"
namespace declarations {
    export type Error = p_.Transformer<
        s_in.Error,
        s_out.Phrase
    >
}

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"

export const Error: declarations.Error = ($) => p_.from.state($.type).decide(
    ($) => {
        switch ($[0]) {
            case 'to be implemented': return p_.option($, ($) => sh.ph.composed([
                sh.ph.literal("this error type is not yet implemented, please report it to the developers")
            ]))
            default: return p_.exhaustive($[0])
        }
    })