import * as p_ from 'pareto-core/implementation/transformer'

import type * as s_in from "../../../interface/schemas/unmarshall_errors.js"
namespace declarations {
    export type Warning = p_.Transformer<
        s_in.Warnings.L,
        s_out.Phrase.composed
    >
}

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"


export const Warning: declarations.Warning = ($) => p_.from.state($.type).decide(
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
            default: return p_.exhaustive($[0])
        }
    })