import * as p_di from 'pareto-core/dist/data/interface'
import * as pt from 'pareto-core/dist/transformer/implementation'
import * as p_ti from 'pareto-core/dist/transformer/interface'

//data types
import * as d_in from "../../../../interface/to_be_generated/unmarshall_result"
import * as d_out from "../../../../interface/to_be_generated/unmarshall_result"
import * as d_location from "../../../../interface/generated/liana/schemas/location/data"

//dependencies
import * as t_to_unmarshall_result_value_at_position from "./found"
import * as t_parse_tree_to_location from "astn-core/dist/implementation/manual/transformers/parse_tree/full_value_range"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

export type Document = p_ti.Transformer_With_Parameter<
    d_in.Document,
    p_di.List<d_out.Range_Stack>,
    {
        'positions': p_di.List<d_location.Position_>
    }
>

export const Document: Document = ($, $p) => {
    const doc = $
    return $p.positions.__l_map(($): d_in.Range_Stack => pt.decide.state(
        t_to_unmarshall_result_value_at_position.Document(
            doc,
            {
                'position': $,
            }
        ),
        ($): d_in.Range_Stack => {
            switch ($[0]) {
                case 'value': return pt.ss($, ($): d_in.Range_Stack => {
                    return {
                        'range': t_parse_tree_to_location.Value($.instance),
                        'parent': $['optional parent range stack']
                    }
                })
                case 'entry': return pt.ss($, ($) => ({
                    'range': t_parse_tree_to_location.ID_Value_Pair($.intermediate['id value pair']),
                    'parent': pt.literal.set($['parent range stack'])
                }))
                case 'property': return pt.ss($, ($) => pt.decide.state($.style, ($) => {
                    switch ($[0]) {
                        case 'verbose': return pt.ss($, ($) => ({
                            'range': t_parse_tree_to_location.ID_Value_Pair($.intermediate['id value pair']),
                            'parent': pt.literal.set($['parent range stack'])
                        }))
                        case 'unknown concise': return pt.ss($, ($) => ({
                            'range': t_parse_tree_to_location.Value($.item.value),
                            'parent': pt.literal.set($['parent range stack'])
                        }))

                        default: return pt.au($[0])
                    }
                }))
                case 'state': return pt.ss($, ($) => ({
                    'range': pt.decide.state($.intermediate.instance, ($) => {
                        switch ($[0]) {
                            case 'state': return pt.ss($, ($) => t_parse_tree_to_location.State($.xxx))
                            case 'list': return pt.ss($, ($) => t_parse_tree_to_location.List($.xxx))
                            default: return pt.au($[0])
                        }
                    }),
                    'parent': pt.literal.set($['parent range stack'])
                }))
                default: return pt.au($[0])
            }
        }
    ))
}