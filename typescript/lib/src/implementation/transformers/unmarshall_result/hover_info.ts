import * as p_ from 'pareto-core/implementation/transformer'

import type * as interface_ from "../../../declarations/transformers/unmarshall_result/hover_info.js"

//schemas
import type * as s_in from "../../../schemas/unmarshall_result/schema.js"

//dependencies
import * as t_to_unmarshall_result_value_at_position from "./found.js"
import * as ser_rich_phrase from "pareto-fountain-pen/modules/rich_phrase/schemas/rich_phrase/serializers"

//shorthands
import * as sh from "pareto-fountain-pen/modules/rich_phrase/schemas/rich_phrase/shorthands/deprecated"

const Property_Path = ($: s_in.Property_Path): string => ser_rich_phrase.Phrase(
    sh.ph.rich_phrase(
        p_.from.list($).map(
            ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'group': return p_.option($, ($) => sh.ph.text($))
                        case 'optional': return p_.option($, ($) => sh.ph.text("O"))
                        case 'state': return p_.option($, ($) => sh.ph.text($))
                        default: return p_.exhaustive($[0])
                    }
                })),
        null,
        null,
        sh.ph.text(" > "),
        null,
    ),
)

export const Document: interface_.Document = ($, $p) => {
    return p_.from.state(
        t_to_unmarshall_result_value_at_position.Document($, $p)
    ).decide(
        ($) => {
            switch ($[0]) {
                case 'value': return p_.option($, ($) => {
                    const $v_def = $.definition
                    return p_.literal.list([
                        Property_Path($['property path']),
                        p_.from.state($['unmarshall result']).decide(
                            ($): string => {
                                switch ($[0]) {
                                    case 'error': return p_.option($, ($) => p_.from.state($).decide(
                                        ($) => {
                                            switch ($[0]) {
                                                case 'incorrect': return p_.option($, ($) => p_.from.state($v_def).decide(
                                                    ($) => {
                                                        switch ($[0]) {
                                                            case 'component': return p_.option($, ($) => "component")
                                                            case 'dictionary': return p_.option($, ($) => "dictionary")
                                                            case 'group': return p_.option($, ($) => "group")
                                                            case 'list': return p_.option($, ($) => "list")
                                                            case 'nothing': return p_.option($, ($) => "nothing")
                                                            case 'simple': return p_.option($, ($) => "simple")
                                                            case 'optional': return p_.option($, ($) => "optional")
                                                            case 'reference': return p_.option($, ($) => "reference")
                                                            case 'state': return p_.option($, ($) => "state")
                                                            case 'text': return p_.option($, ($) => "text")
                                                            default: return p_.exhaustive($[0])
                                                        }
                                                    }))
                                                case 'missing': return p_.option($, ($) => "use ctrl+d to get suggestions")
                                                default: return p_.exhaustive($[0])
                                            }
                                        }))
                                    case 'success': return p_.option($, ($) => p_.from.state($).decide(
                                        ($) => {
                                            switch ($[0]) {
                                                case 'simple': return p_.option($, ($) => "simple value")
                                                case 'component': return p_.option($, ($) => "component")
                                                case 'dictionary': return p_.option($, ($) => "dictionary")
                                                case 'group': return p_.option($, ($) => "group")
                                                case 'list': return p_.option($, ($) => "list")
                                                case 'nothing': return p_.option($, ($) => "nothing")
                                                case 'optional': return p_.option($, ($) => p_.from.state($.derived.status).decide(
                                                    ($) => {
                                                        switch ($[0]) {
                                                            case 'set': return p_.option($, ($) => "optional")
                                                            case 'not set': return p_.option($, ($) => "not set optional")
                                                            default: return p_.exhaustive($[0])
                                                        }
                                                    }))
                                                case 'reference': return p_.option($, ($) => "reference")
                                                case 'state': return p_.option($, ($) => "state")
                                                case 'text': return p_.option($, ($) => "text")
                                                default: return p_.exhaustive($[0])
                                            }
                                        }))
                                    default: return p_.exhaustive($[0])
                                }
                            }),
                    ])
                })
                case 'entry': return p_.option($, ($) => p_.literal.list([
                    Property_Path($['property path']),
                ]))
                case 'property': return p_.option($, ($) => p_.from.state($.style).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'verbose': return p_.option($, ($) => p_.literal.list([
                                $.id,
                                p_.from.state($['definition found']).decide(
                                    ($) => {
                                        switch ($[0]) {
                                            case 'yes': return p_.option($, ($) => p_.from.optional($.definition.description).decide(
                                                ($) => $,
                                                () => ""
                                            ))
                                            case 'no': return p_.option($, ($) => "")
                                            default: return p_.exhaustive($[0])
                                        }
                                    }),
                            ]))
                            case 'unknown concise': return p_.option($, ($) => p_.literal.list([
                                "unknown property",
                            ]))

                            default: return p_.exhaustive($[0])
                        }
                    }))
                case 'state': return p_.option($, ($) => {
                    const prop_path = Property_Path($['property pathx'])
                    return p_.from.state($.derived['option status']).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'set': return p_.option($, ($) => p_.literal.list([
                                    prop_path,
                                    p_.from.optional($.definition.description).decide(
                                        ($) => $,
                                        () => "no description"
                                    ),
                                ]))
                                case 'missing data': return p_.option($, ($) => p_.literal.list([
                                    "property: " + prop_path,
                                    "use ctrl+d to get suggestions for options",
                                ]))
                                default: return p_.exhaustive($[0])
                            }
                        })
                })
                default: return p_.exhaustive($[0])
            }
        }
    )
}