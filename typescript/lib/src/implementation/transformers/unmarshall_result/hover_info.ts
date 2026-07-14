import * as p_ from 'pareto-core/implementation/transformer'

import type * as s_location from "../../../interface/schemas/location.js"
namespace declarations {
    export type Document = p_.Transformer_With_Parameter<
        s_in.Document,
        s_out.Hover_Texts,
        {
        'position': s_location.Position_
    }
    >
}

//schemas
import type * as s_in from "../../../interface/schemas/unmarshall_result.js"

//dependencies
import * as t_to_unmarshall_result_value_at_position from "./found.js"
import * as t_prose_to_text from "pareto-fountain-pen/implementation/transformers/prose/text"

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"

const Property_Path = ($: s_in.Property_Path): string => t_prose_to_text.Phrase(
    sh.ph.rich_phrase(
        p_.from.list($).map(
            ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'group': return p_.option($, ($) => sh.ph.literal($))
                        case 'optional': return p_.option($, ($) => sh.ph.literal("O"))
                        case 'state': return p_.option($, ($) => sh.ph.literal($))
                        default: return p_.exhaustive($[0])
                    }
                })),
        sh.ph.nothing(),
        sh.ph.nothing(),
        sh.ph.literal(" > "),
        sh.ph.nothing(),
    ),
    {
        'indentation': "",
        'newline': "",
    }
)

export const Document: declarations.Document = ($, $p) => {
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