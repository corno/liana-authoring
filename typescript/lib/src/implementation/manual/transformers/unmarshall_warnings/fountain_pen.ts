import * as pt from 'pareto-core/dist/transformer/implementation'
import * as p_di from 'pareto-core/dist/data/interface'

//data types
import * as d_in from "../../../../interface/generated/liana/schemas/unmarshall_errors/data"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//dependencies

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"


export const Warning = (
    $: d_in.Warnings.L,
): d_out.Phrase => pt.decide.state($.type, ($) => {
    switch ($[0]) {
        case 'expected apostrophed text': return pt.ss($, ($) => sh.ph.literal("Expected a text with apostrophes (')"))
        case 'expected backticked text': return pt.ss($, ($) => sh.ph.literal("Expected a text with backticks (`)"))
        case 'expected quoted text': return pt.ss($, ($) => sh.ph.literal("Expected a text with quotes (\")"))
        case 'expected undelimited text': return pt.ss($, ($) => sh.ph.literal("Expected a text without delimiters"))
        case 'expected a group': return pt.ss($, ($) => sh.ph.literal("Expected a group"))
        default: return pt.au($[0])
    }
})