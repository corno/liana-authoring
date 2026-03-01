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
                    $p['full path'],
                    $p['id path']
                ])))
                case 'entry': return _p.ss($, ($) => _p.optional.literal.set(_p.list.literal(["entry"])))
                case 'verbose property': return _p.ss($, ($) => _p.optional.literal.set(_p.list.literal(["verbose property"])))
                case 'concise property': return _p.ss($, ($) => _p.optional.literal.set(_p.list.literal(["concise property"])))
                case 'valid state': return _p.ss($, ($) => _p.optional.literal.set(_p.list.literal(["valid state"])))
                default: return _p.au($[0])
            }
        }
    )
}