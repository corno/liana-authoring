import * as pt from 'pareto-core/dist/transformer/implementation'
import * as p_i from 'pareto-core/dist/transformer/interface'

//data types
import * as d_in from "../../../../interface/to_be_generated/unmarshall_result"
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
        $.__l_map(($) => pt.decide.state($, ($) => {
            switch ($[0]) {
                case 'group': return pt.ss($, ($) => sh.ph.literal($))
                case 'optional': return pt.ss($, ($) => sh.ph.literal("O"))
                case 'state': return pt.ss($, ($) => sh.ph.literal($))
                default: return pt.au($[0])
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
    return pt.decide.state(
        t_to_unmarshall_result_value_at_position.Document($, $p),
        ($) => {
            switch ($[0]) {
                case 'value': return pt.ss($, ($) => {
                    const def = $.definition
                    return pt.literal.nested_list([
                        [
                            Property_Path($['property path']),
                            pt.decide.state($['unmarshall result'], ($): string => {
                                switch ($[0]) {
                                    case 'error': return pt.ss($, ($) => pt.decide.state($, ($) => {
                                        switch ($[0]) {
                                            case 'incorrect': return pt.ss($, ($) => pt.decide.state(def, ($) => {
                                                switch ($[0]) {
                                                    case 'component': return pt.ss($, ($) => "component")
                                                    case 'dictionary': return pt.ss($, ($) => "dictionary")
                                                    case 'group': return pt.ss($, ($) => "group")
                                                    case 'list': return pt.ss($, ($) => "list")
                                                    case 'nothing': return pt.ss($, ($) => "nothing")
                                                    case 'simple': return pt.ss($, ($) => "simple")
                                                    case 'optional': return pt.ss($, ($) => "optional")
                                                    case 'reference': return pt.ss($, ($) => "reference")
                                                    case 'state': return pt.ss($, ($) => "state")
                                                    case 'text': return pt.ss($, ($) => "text")
                                                    default: return pt.au($[0])
                                                }
                                            }))
                                            case 'missing': return pt.ss($, ($) => "use ctrl+d to get suggestions")
                                            default: return pt.au($[0])
                                        }
                                    }))
                                    case 'success': return pt.ss($, ($) => pt.decide.state($, ($) => {
                                        switch ($[0]) {
                                            case 'simple': return pt.ss($, ($) => "simple value")
                                            case 'component': return pt.ss($, ($) => "component")
                                            case 'dictionary': return pt.ss($, ($) => "dictionary")
                                            case 'group': return pt.ss($, ($) => "group")
                                            case 'list': return pt.ss($, ($) => "list")
                                            case 'nothing': return pt.ss($, ($) => "nothing")
                                            case 'optional': return pt.ss($, ($) => pt.decide.state($.derived.status, ($) => {
                                                switch ($[0]) {
                                                    case 'set': return pt.ss($, ($) => "optional")
                                                    case 'not set': return pt.ss($, ($) => "not set optional")
                                                    default: return pt.au($[0])
                                                }
                                            }))
                                            case 'reference': return pt.ss($, ($) => "reference")
                                            case 'state': return pt.ss($, ($) => "state")
                                            case 'text': return pt.ss($, ($) => "text")
                                            default: return pt.au($[0])
                                        }
                                    }))
                                    default: return pt.au($[0])
                                }
                            }),
                        ],
                    ])
                })
                case 'entry': return pt.ss($, ($) => pt.literal.list([
                    Property_Path($['property path']),
                ]))
                case 'property': return pt.ss($, ($) => pt.decide.state($.style, ($) => {
                    switch ($[0]) {
                        case 'verbose': return pt.ss($, ($) => pt.literal.list([
                            $.id,
                            pt.decide.state($['definition found'], ($) => {
                                switch ($[0]) {
                                    case 'yes': return pt.ss($, ($) => $.definition.description.__decide(
                                        ($) => $,
                                        () => ""
                                    ))
                                    case 'no': return pt.ss($, ($) => "")
                                    default: return pt.au($[0])
                                }
                            }),
                        ]))
                        case 'unknown concise': return pt.ss($, ($) => pt.literal.list([
                            "unknown property",
                        ]))

                        default: return pt.au($[0])
                    }
                }))
                case 'state': return pt.ss($, ($) => {
                    const def = $.definition
                    const prop_path = Property_Path($['property pathx'])
                    return pt.decide.state($.derived['option status'], ($) => {
                        switch ($[0]) {
                            case 'set': return pt.ss($, ($) => pt.literal.list([
                                prop_path,
                                $.definition.description.__decide(
                                    ($) => $,
                                    () => "no description"
                                ),
                            ]))
                            case 'missing data': return pt.ss($, ($) => pt.literal.list([
                                "property: " + prop_path,
                                "use ctrl+d to get suggestions for options",
                            ]))
                            default: return pt.au($[0])
                        }
                    })
                })
                default: return pt.au($[0])
            }
        }
    )
}