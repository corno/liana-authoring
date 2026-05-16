import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'

//data types
import * as d_in from "../../../../interface/to_be_generated/resolve_errors"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//dependencies

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

export const Error = (
    $: d_in.Error,
): d_out.Phrase => _p.decide.state($.type, ($) => {
    switch ($[0]) {
        case 'to be implemented': return _p.ss($, ($) => sh.ph.composed([
            sh.ph.literal("this error type is not yet implemented, please report it to the developers")
        ]))
        default: return _p.au($[0])
    }
})