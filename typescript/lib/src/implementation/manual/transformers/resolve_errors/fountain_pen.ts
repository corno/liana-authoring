import * as p_ from 'pareto-core/dist/implementation/transformer'

//data types
import * as d_in from "../../../../interface/data/resolve_errors"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//dependencies

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

export const Error = (
    $: d_in.Error,
): d_out.Phrase => p_.decide.state($.type, ($) => {
    switch ($[0]) {
        case 'to be implemented': return p_.ss($, ($) => sh.ph.composed([
            sh.ph.literal("this error type is not yet implemented, please report it to the developers")
        ]))
        default: return p_.au($[0])
    }
})