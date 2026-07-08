import * as p_ from 'pareto-core/implementation/transformer'

import type * as interface_ from "../../../../interface/declarations/transformers/unmarshall_result/formatting_edits.js"

//data types
import type * as d_out from "../../../../interface/data/formatting_edits.js"

//dependencies
import * as t_to_unmarshall_result_value_at_position from "./found.js"
import * as t_authoring_target_to_text from "astn/implementation/manual/transformers/authoring_target/text"
import * as t_parse_tree_to_full_range from "astn-core/implementation/manual/transformers/parse_tree/full_value_range"
import * as t_unmarshall_result_to_authoring_target from "./authoring_target.js"


const Value: interface_.Value = (value, $p) => {
    return p_.literal.set({
        'range': t_parse_tree_to_full_range.Value(value.instance),
        'text': t_authoring_target_to_text.Value(
            t_unmarshall_result_to_authoring_target.Any_Value(value, $p.conversion),
            {
                'indentation': $p.indent,
                'newline': "\n",
                'write delimiters': true,
            }
        )
    })
}

export const Found: interface_.Found = ($, $p): d_out.Optional_Formatting_Edit => {

    switch ($[0]) {
        case 'value': return p_.option($, ($): d_out.Optional_Formatting_Edit => {
            return Value($, $p)
        })
        case 'entry': return p_.option($, ($) => p_.from.state($.value).decide(
            ($) => {
                switch ($[0]) {
                    case 'set': return p_.option($, ($) => Value($, $p))
                    case 'not set': return p_.option($, ($) => p_.literal.not_set())
                    default: return p_.exhaustive($[0])
                }
            }))
        case 'property': return p_.option($, ($) => p_.from.state($.style).decide(
            ($) => {
                switch ($[0]) {
                    case 'verbose': return p_.option($, ($) => p_.from.state($['definition found']).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'yes': return p_.option($, ($) => p_.from.optional($['value']).decide(
                                    ($) => Value($, $p),
                                    () => p_.literal.not_set()
                                ))
                                case 'no': return p_.option($, ($) => p_.literal.not_set())
                                default: return p_.exhaustive($[0])
                            }
                        }))
                    case 'unknown concise': return p_.option($, ($) => {
                        return p_.literal.not_set()
                    })
                    default: return p_.exhaustive($[0])
                }
            }))
        case 'state': return p_.option($, ($): d_out.Optional_Formatting_Edit => p_.from.state($.derived['option status']).decide(
            ($) => {
                switch ($[0]) {
                    case 'set': return p_.option($, ($) => Value($.value, $p))
                    case 'missing data': return p_.option($, ($) => p_.literal.not_set())
                    default: return p_.exhaustive($[0])
                }
            }))
        default: return p_.exhaustive($[0])
    }
}

export const Document: interface_.Document = ($, $p) => {
    return p_.from.state(
        t_to_unmarshall_result_value_at_position.Document($, $p),
    ).decide(
        ($) => Found($, $p)
    )
}