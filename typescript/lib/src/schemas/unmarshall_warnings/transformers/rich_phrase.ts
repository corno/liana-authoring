import * as p_ from 'pareto-core/implementation/transformer'

//schemas
import type * as s_in from "../../../schemas/unmarshall_errors/schema.js"
import type * as s_out from "pareto-fountain-pen/modules/rich_phrase/schemas/rich_phrase/schema"


export type Warning = p_.Transformer<
    s_in.Warnings.L,
    s_out.Phrase
>


//shorthands
import * as sh from "pareto-fountain-pen/modules/rich_phrase/schemas/rich_phrase/shorthands/deprecated"


export const Warning: Warning = ($) => sh.ph.composed(
    p_.from.state($.type).decide(
        ($) => {
            switch ($[0]) {
                case 'expected apostrophed text': return p_.option($, ($) => p_.literal.list([
                    sh.ph.text("Expected a text with apostrophes (')")
                ]))
                case 'expected backticked text': return p_.option($, ($) => p_.literal.list([
                    sh.ph.text("Expected a text with backticks (`)")
                ]))
                case 'expected quoted text': return p_.option($, ($) => p_.literal.list([
                    sh.ph.text("Expected a text with quotes (\")")
                ]))
                case 'expected undelimited text': return p_.option($, ($) => p_.literal.list([
                    sh.ph.text("Expected a text without delimiters")
                ]))
                case 'expected a group': return p_.option($, ($) => p_.literal.list([
                    sh.ph.text("Expected a group")
                ]))
                default: return p_.exhaustive($[0])
            }
        }
    )
)