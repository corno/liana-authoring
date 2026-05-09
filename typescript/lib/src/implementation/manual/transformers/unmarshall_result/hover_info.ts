import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'
import _p_text_from_list from 'pareto-core/dist/_p_text_from_list'

//data types
import * as d_in from "../../../../interface/to_be_generated/unmashall_result"
import * as d_location from "../../../../interface/generated/liana/schemas/location/data"
import * as d_out from "../../../../interface/generated/liana/schemas/hover_info/data"

//dependencies
import * as t_to_unmarshall_result_value_at_position from "./found"
import * as t_fp_to_text from "pareto-fountain-pen/dist/implementation/manual/transformers/prose/text"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

export type Document = _pi.Transformer_With_Parameter<
    d_in.Document,
    d_out.Hover_Texts,
    {
        'position': d_location.Position_
    }
>

const Property_Path = ($: d_in.Property_Path): string => t_fp_to_text.Phrase(
    sh.ph.rich(
        $.__l_map(($) => _p.decide.state($, ($) => {
            switch ($[0]) {
                case 'group': return _p.ss($, ($) => sh.ph.literal($))
                case 'optional': return _p.ss($, ($) => sh.ph.literal("O"))
                case 'state': return _p.ss($, ($) => sh.ph.literal($))
                default: return _p.au($[0])
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
    return _p.decide.state(
        t_to_unmarshall_result_value_at_position.Document($, $p),
        ($) => {
            switch ($[0]) {
                case 'value': return _p.ss($, ($) => {
                    const def = $.definition
                    return _p.list.nested_literal_old([
                        [
                            Property_Path($['property path']),
                        ],
                        _p.decide.state($.unmarshalled, ($) => {
                            switch ($[0]) {
                                case 'incorrect': return _p.ss($, ($) => _p.decide.state(def, ($) => {
                                    switch ($[0]) {
                                        case 'component': return _p.ss($, ($) => ["component"])
                                        case 'dictionary': return _p.ss($, ($) => ["dictionary"])
                                        case 'group': return _p.ss($, ($) => ["group"])
                                        case 'list': return _p.ss($, ($) => ["list"])
                                        case 'nothing': return _p.ss($, ($) => ["nothing"])
                                        case 'simple': return _p.ss($, ($) => ["simple"])
                                        case 'optional': return _p.ss($, ($) => ["optional"])
                                        case 'reference': return _p.ss($, ($) => ["reference"])
                                        case 'state': return _p.ss($, ($) => ["state"])
                                        case 'text': return _p.ss($, ($) => ["text"])
                                        default: return _p.au($[0])
                                    }
                                }))
                                case 'correct': return _p.ss($, ($) => _p.decide.state($, ($) => {
                                    switch ($[0]) {
                                        case 'simple': return _p.ss($, ($) => ["simple value"])
                                        case 'component': return _p.ss($, ($) => ["component"])
                                        case 'dictionary': return _p.ss($, ($) => ["dictionary"])
                                        case 'group': return _p.ss($, ($) => ["group"])
                                        case 'list': return _p.ss($, ($) => ["list"])
                                        case 'nothing': return _p.ss($, ($) => ["nothing"])
                                        case 'optional': return _p.ss($, ($) => _p.decide.state($.status, ($) => {
                                            switch ($[0]) {
                                                case 'set': return _p.ss($, ($) => ["optional"])
                                                case 'not set': return _p.ss($, ($) => ["not set optional", "replace by '*' to set the value"])
                                                default: return _p.au($[0])
                                            }
                                        }))
                                        case 'reference': return _p.ss($, ($) => ["reference"])
                                        case 'state': return _p.ss($, ($) => ["state"])
                                        case 'text': return _p.ss($, ($) => ["text"])
                                        default: return _p.au($[0])
                                    }
                                }))
                                case 'missing': return _p.ss($, ($) => ["use ctrl+d to get suggestions"])
                                default: return _p.au($[0])
                            }
                        }),
                    ])
                })
                case 'entry': return _p.ss($, ($) => _p.list.literal([
                    Property_Path($['property path']),
                ]))
                case 'verbose property': return _p.ss($, ($) => _p.list.literal([
                    $['id value pair'].id.token.value,
                    _p.decide.state($['definition found'], ($) => {
                        switch ($[0]) {
                            case 'yes': return _p.ss($, ($) => $.definition.description.__decide(
                                ($) => $,
                                () => ""
                            ))
                            case 'no': return _p.ss($, ($) => "")
                            default: return _p.au($[0])
                        }
                    }),
                ]))
                case 'unknown concise property': return _p.ss($, ($) => _p.list.literal([
                    "unknown property",
                ]))
                case 'valid state': return _p.ss($, ($) => {
                    const def = $.definition
                    const prop_path = Property_Path($['property path'])
                    return _p.decide.state($.option, ($) => {
                        switch ($[0]) {
                            case 'set': return _p.ss($, ($) => _p.list.literal([
                                prop_path,
                                _p.decide.state($.option, ($): string => {
                                    switch ($[0]) {
                                        case 'known': return _p.ss($, ($) => $.definition.description.__decide(
                                            ($) => $,
                                            () => "no description"
                                        ))
                                        case 'unknown': return _p.ss($, ($) => "unknown option")
                                        default: return _p.au($[0])
                                    }
                                }),
                            ]))
                            case 'missing data': return _p.ss($, ($) => _p.list.literal([
                                "property: " + prop_path,
                                "use ctrl+d to get suggestions for options",
                            ]))
                            default: return _p.au($[0])
                        }
                    })
                })
                default: return _p.au($[0])
            }
        }
    )
}