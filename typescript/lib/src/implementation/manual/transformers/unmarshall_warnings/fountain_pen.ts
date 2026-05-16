import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'

//data types
import * as d_in from "../../../../interface/generated/liana/schemas/unmarshall_errors/data"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//dependencies

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"


export const Warning = (
    $: d_in.Warnings.L,
): d_out.Phrase => _p.decide.state($.type, ($) => {
    switch ($[0]) {
        case 'expected apostrophed text': return _p.ss($, ($) => sh.ph.literal("Expected a text with apostrophes (')"))
        case 'expected backticked text': return _p.ss($, ($) => sh.ph.literal("Expected a text with backticks (`)"))
        case 'expected quoted text': return _p.ss($, ($) => sh.ph.literal("Expected a text with quotes (\")"))
        case 'expected undelimited text': return _p.ss($, ($) => sh.ph.literal("Expected a text without delimiters"))
        case 'expected a group': return _p.ss($, ($) => sh.ph.literal("Expected a group"))
        default: return _p.au($[0])
    }
})