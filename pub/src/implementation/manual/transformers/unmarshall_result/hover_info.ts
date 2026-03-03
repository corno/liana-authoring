import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'
import * as _pdev from 'pareto-core-dev'

//data types
import * as d_in from "pareto-liana/dist/interface/to_be_generated/unmashall_result"
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
                case 'value': return _p.ss($, ($) => _p.optional.literal.set(_p.list.literal([
                    "value FOO",
                    $['definition path'],
                    $p['full path'],
                    $p['id path'],
                    _p.decide.state($.unmarshalled, ($) => {
                        switch ($[0]) {
                            case 'number': return _p.ss($, ($) => "number")
                            case 'boolean': return _p.ss($, ($) => "boolean")
                            case 'component': return _p.ss($, ($) => "component")
                            case 'dictionary':return _p.ss($, ($) => "dictionary")
                            case 'group': return _p.ss($, ($) => "group")
                            case 'list':return _p.ss($, ($) => "list")
                            case 'nothing': return _p.ss($, ($) => "nothing")
                            case 'optional':return _p.ss($, ($) => "optional")
                            case 'reference':return _p.ss($, ($) => "reference")
                            case 'state':return _p.ss($, ($) => "state")
                            case 'text':return _p.ss($, ($) => "text")
                            default: return _p.au($[0])
                        }
                    }),
                ])))
                case 'entry': return _p.ss($, ($) => _p.optional.literal.set(_p.list.literal([
                    "entry",
                    $['id value pair'].id.value,
                 ])))
                case 'verbose property': return _p.ss($, ($) => _p.optional.literal.set(_p.list.literal([
                    "verbose property",
                    $['id value pair'].id.value,
                ])))
                case 'concise property': return _p.ss($, ($) => _p.optional.literal.set(_p.list.literal([
                    "concise property"
                ])))
                case 'valid state': return _p.ss($, ($) => _p.optional.literal.set(_p.list.literal([
                    "valid state",
                     _p.decide.state($.option, ($) => {
                         switch ($[0]) {
                             case 'set': return _p.ss($, ($) => $['option token'].value)
                             case 'missing data':return _p.ss($, ($) => "missing token")
                             default: return _p.au($[0])
                         }
                     })
                    ])))
                default: return _p.au($[0])
            }
        }
    )
}