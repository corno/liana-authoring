import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'
import _p_text_from_list from 'pareto-core/dist/_p_text_from_list'

//data types
import * as d_in from "../../../../interface/to_be_generated/unmashall_result"
import * as d_location from "../../../../interface/generated/liana/schemas/location/data"
import * as d_out from "../../../../interface/to_be_generated/selection_range"

//dependencies
import * as t_to_unmarshall_result_value_at_position from "./found"
import * as t_fp_to_text from "pareto-fountain-pen/dist/implementation/manual/transformers/prose/text"
import * as t_parse_tree_to_location from "astn-core/dist/implementation/manual/transformers/parse_tree/full_value_range"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

export type Document = _pi.Transformer_With_Parameter<
    d_in.Document,
    d_out.Selection_Ranges,
    {
        'positions': _pi.List<d_location.Position_>
    }
>

export const Document: Document = ($, $p) => {
    const doc = $
    return $p.positions.__l_map(($): d_out.Selection_Range => _p.decide.state(
        t_to_unmarshall_result_value_at_position.Document(
            doc,
            {
                'position': $,
            }
        ),
        ($): d_out.Selection_Range => {
            switch ($[0]) {
                case 'value': return _p.ss($, ($) => {
                    return {
                        'range': t_parse_tree_to_location.Value($.instance),
                        'parent range': $['optional parent range']
                    }
                })
                case 'entry': return _p.ss($, ($) => ({
                    'range': t_parse_tree_to_location.ID_Value_Pair($['id value pair']),
                    'parent range': _p.optional.literal.set($['parent range'])
                }))
                case 'verbose property': return _p.ss($, ($) => ({
                    'range': t_parse_tree_to_location.ID_Value_Pair($['id value pair']),
                    'parent range': _p.optional.literal.set($['parent range'])
                }))
                case 'unknown concise property': return _p.ss($, ($) => ({
                    'range': t_parse_tree_to_location.Value($.item.value),
                    'parent range': _p.optional.literal.set($['parent range'])
                }))
                case 'valid state': return _p.ss($, ($) => ({
                    'range': _p.decide.state($.instance, ($) => {
                        switch ($[0]) {
                            case 'state': return _p.ss($, ($) => t_parse_tree_to_location.State($))
                            case 'list': return _p.ss($, ($) => t_parse_tree_to_location.List($))
                            default: return _p.au($[0])
                        }
                    }),
                    'parent range': _p.optional.literal.set($['parent range'])
                }))
                default: return _p.au($[0])
            }
        }
    ))
}