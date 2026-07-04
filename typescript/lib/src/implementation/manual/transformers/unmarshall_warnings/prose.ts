import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/generated/liana/schemas/unmarshall_errors/data"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//dependencies

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose/deprecated"


export const Warning: p_i.Transformer<
    d_in.Warnings.L,
    d_out.Phrase.composed
> = ($) => p_.from.state($.type).decide(
    ($) => {
        switch ($[0]) {
            case 'expected apostrophed text': return p_.option($, ($) => p_.literal.list([
                sh.ph.literal("Expected a text with apostrophes (')")
            ]))
            case 'expected backticked text': return p_.option($, ($) => p_.literal.list([
                sh.ph.literal("Expected a text with backticks (`)")
            ]))
            case 'expected quoted text': return p_.option($, ($) => p_.literal.list([
                sh.ph.literal("Expected a text with quotes (\")")
            ]))
            case 'expected undelimited text': return p_.option($, ($) => p_.literal.list([
                sh.ph.literal("Expected a text without delimiters")
            ]))
            case 'expected a group': return p_.option($, ($) => p_.literal.list([
                sh.ph.literal("Expected a group")
            ]))
            default: return p_.au($[0])
        }
    })