import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'

//data types
import * as d_in from "../../../../interface/to_be_generated/unmashall_result"
import * as d_location from "../../../../interface/generated/liana/schemas/location/data"
import * as d_out from "../../../../interface/generated/liana/schemas/hover_info/data"

//dependencies
import * as t_to_unmarshall_result_value_at_position from "./found"


export type Document = _pi.Transformer_With_Parameter<
    d_in.Document,
    d_out.Hover_Texts,
    {
        'position': d_location.Position
        'full path': string
        'id path': string
    }
>

export const Document: Document = ($, $p) => {
    return _p.decide.state(
        t_to_unmarshall_result_value_at_position.Document($, $p),
        ($) => {
            switch ($[0]) {
                case 'value': return _p.ss($, ($) => {
                    const def = $.definition
                    return _p.optional.literal.set(_p.list.nested_literal_old([
                        [
                            $['property path'],
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
                    ]))
                })
                case 'entry': return _p.ss($, ($) => _p.optional.literal.set(_p.list.literal([
                    $['property path'],
                ])))
                case 'verbose property': return _p.ss($, ($) => _p.optional.literal.set(_p.list.literal([
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
                ])))
                case 'concise property': return _p.ss($, ($) => _p.optional.literal.set(_p.decide.state($['definition found'], ($) => {
                    switch ($[0]) {
                        case 'yes': return _p.ss($, ($) => _p.list.literal([
                            $.id,
                            $.definition.description.__decide(
                                ($) => $,
                                () => ""
                            ),
                        ]))
                        case 'no': return _p.ss($, ($) => _p.list.literal([
                            "",
                        ]))
                        default: return _p.au($[0])
                    }
                })))
                case 'valid state': return _p.ss($, ($) => {
                    const def = $.definition
                    const prop_path = $['property path']
                    return _p.optional.literal.set(_p.decide.state($.option, ($) => {
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
                    }))
                })
                default: return _p.au($[0])
            }
        }
    )
}