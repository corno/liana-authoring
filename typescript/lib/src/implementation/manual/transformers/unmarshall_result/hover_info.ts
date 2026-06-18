import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/unmarshall_result"
import * as d_location from "../../../../interface/generated/liana/schemas/location/data"
import * as d_out from "../../../../interface/generated/liana/schemas/hover_info/data"

//dependencies
import * as t_to_unmarshall_result_value_at_position from "./found"
import * as t_fp_to_text from "pareto-fountain-pen/dist/implementation/manual/transformers/prose/text"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

export type Document = p_i.Transformer_With_Parameter<
    d_in.Document,
    d_out.Hover_Texts,
    {
        'position': d_location.Position_
    }
>

const Property_Path = ($: d_in.Property_Path): string => t_fp_to_text.Phrase(
    sh.ph.rich(
        $.__l_map_deprecated(($) => p_.from.state($).decide(($) => {
            switch ($[0]) {
                case 'group': return p_.ss($, ($) => sh.ph.literal($))
                case 'optional': return p_.ss($, ($) => sh.ph.literal("O"))
                case 'state': return p_.ss($, ($) => sh.ph.literal($))
                default: return p_.au($[0])
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

export const Document: Document = ($, $p) => {
    return p_.from.state(
        t_to_unmarshall_result_value_at_position.Document($, $p),
    ).decide(
        ($) => {
            switch ($[0]) {
                case 'value': return p_.ss($, ($) => {
                    const def = $.definition
                    return p_.literal.nested_list([
                        [
                            Property_Path($['property path']),
                            p_.from.state($['unmarshall result']).decide(($): string => {
                                switch ($[0]) {
                                    case 'error': return p_.ss($, ($) => p_.from.state($).decide(($) => {
                                        switch ($[0]) {
                                            case 'incorrect': return p_.ss($, ($) => p_.from.state(def).decide(($) => {
                                                switch ($[0]) {
                                                    case 'component': return p_.ss($, ($) => "component")
                                                    case 'dictionary': return p_.ss($, ($) => "dictionary")
                                                    case 'group': return p_.ss($, ($) => "group")
                                                    case 'list': return p_.ss($, ($) => "list")
                                                    case 'nothing': return p_.ss($, ($) => "nothing")
                                                    case 'simple': return p_.ss($, ($) => "simple")
                                                    case 'optional': return p_.ss($, ($) => "optional")
                                                    case 'reference': return p_.ss($, ($) => "reference")
                                                    case 'state': return p_.ss($, ($) => "state")
                                                    case 'text': return p_.ss($, ($) => "text")
                                                    default: return p_.au($[0])
                                                }
                                            }))
                                            case 'missing': return p_.ss($, ($) => "use ctrl+d to get suggestions")
                                            default: return p_.au($[0])
                                        }
                                    }))
                                    case 'success': return p_.ss($, ($) => p_.from.state($).decide(($) => {
                                        switch ($[0]) {
                                            case 'simple': return p_.ss($, ($) => "simple value")
                                            case 'component': return p_.ss($, ($) => "component")
                                            case 'dictionary': return p_.ss($, ($) => "dictionary")
                                            case 'group': return p_.ss($, ($) => "group")
                                            case 'list': return p_.ss($, ($) => "list")
                                            case 'nothing': return p_.ss($, ($) => "nothing")
                                            case 'optional': return p_.ss($, ($) => p_.from.state($.derived.status).decide(($) => {
                                                switch ($[0]) {
                                                    case 'set': return p_.ss($, ($) => "optional")
                                                    case 'not set': return p_.ss($, ($) => "not set optional")
                                                    default: return p_.au($[0])
                                                }
                                            }))
                                            case 'reference': return p_.ss($, ($) => "reference")
                                            case 'state': return p_.ss($, ($) => "state")
                                            case 'text': return p_.ss($, ($) => "text")
                                            default: return p_.au($[0])
                                        }
                                    }))
                                    default: return p_.au($[0])
                                }
                            }),
                        ],
                    ])
                })
                case 'entry': return p_.ss($, ($) => p_.literal.list([
                    Property_Path($['property path']),
                ]))
                case 'property': return p_.ss($, ($) => p_.from.state($.style).decide(($) => {
                    switch ($[0]) {
                        case 'verbose': return p_.ss($, ($) => p_.literal.list([
                            $.id,
                            p_.from.state($['definition found']).decide(($) => {
                                switch ($[0]) {
                                    case 'yes': return p_.ss($, ($) => $.definition.description.__decide(
                                        ($) => $,
                                        () => ""
                                    ))
                                    case 'no': return p_.ss($, ($) => "")
                                    default: return p_.au($[0])
                                }
                            }),
                        ]))
                        case 'unknown concise': return p_.ss($, ($) => p_.literal.list([
                            "unknown property",
                        ]))

                        default: return p_.au($[0])
                    }
                }))
                case 'state': return p_.ss($, ($) => {
                    const def = $.definition
                    const prop_path = Property_Path($['property pathx'])
                    return p_.from.state($.derived['option status']).decide(($) => {
                        switch ($[0]) {
                            case 'set': return p_.ss($, ($) => p_.literal.list([
                                prop_path,
                                $.definition.description.__decide(
                                    ($) => $,
                                    () => "no description"
                                ),
                            ]))
                            case 'missing data': return p_.ss($, ($) => p_.literal.list([
                                "property: " + prop_path,
                                "use ctrl+d to get suggestions for options",
                            ]))
                            default: return p_.au($[0])
                        }
                    })
                })
                default: return p_.au($[0])
            }
        }
    )
}