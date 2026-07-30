import * as p_ from 'pareto-core/implementation/transformer'


//schemas
import type * as s_in from "../../../interface/schemas/resolve_errors.js"
import type * as s_out from "pareto-fountain-pen/modules/rich_phrase/schemas/rich_phrase"

export type Error = p_.Transformer<
    s_in.Error,
    s_out.Phrase
>

//shorthands
import * as sh from "pareto-fountain-pen/modules/rich_phrase/shorthands/deprecated"

export const Error: Error = ($) => p_.from.state($.type).decide(
    ($) => {
        switch ($[0]) {
            case 'to be implemented': return p_.option($, ($) => sh.ph.composed([
                sh.ph.text("this error type is not yet implemented, please report it to the developers")
            ]))
            default: return p_.exhaustive($[0])
        }
    })