import * as p_di from 'pareto-core/dist/interface/data'
import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/unmarshall_result"
import * as d_out from "../../../../interface/data/unmarshall_result"
import * as d_location from "../../../../interface/generated/liana/schemas/location/data"

//dependencies
import * as t_to_unmarshall_result_value_at_position from "./found"
import * as t_parse_tree_to_location from "astn-core/dist/implementation/manual/transformers/parse_tree/full_value_range"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

export type Document = p_i.Transformer_With_Parameter<
    d_in.Document,
    p_di.List<d_out.Range_Stack>,
    {
        'positions': p_di.List<d_location.Position_>
    }
>

export const Document: Document = ($, $p) => {
    const doc = $
    return $p.positions.__l_map_deprecated(($): d_in.Range_Stack => p_.from.state(
        t_to_unmarshall_result_value_at_position.Document(
            doc,
            {
                'position': $,
            }
        ),
    ).decide(
        ($): d_in.Range_Stack => {
            switch ($[0]) {
                case 'value': return p_.ss($, ($): d_in.Range_Stack => {
                    return {
                        'range': t_parse_tree_to_location.Value($.instance),
                        'parent': $['optional parent range stack']
                    }
                })
                case 'entry': return p_.ss($, ($) => ({
                    'range': t_parse_tree_to_location.ID_Value_Pair($.intermediate['id value pair']),
                    'parent': p_.literal.set($['parent range stack'])
                }))
                case 'property': return p_.ss($, ($) => p_.from.state($.style).decide(($) => {
                    switch ($[0]) {
                        case 'verbose': return p_.ss($, ($) => ({
                            'range': t_parse_tree_to_location.ID_Value_Pair($.intermediate['id value pair']),
                            'parent': p_.literal.set($['parent range stack'])
                        }))
                        case 'unknown concise': return p_.ss($, ($) => ({
                            'range': t_parse_tree_to_location.Value($.item.value),
                            'parent': p_.literal.set($['parent range stack'])
                        }))

                        default: return p_.au($[0])
                    }
                }))
                case 'state': return p_.ss($, ($) => ({
                    'range': p_.from.state($.intermediate.instance).decide(($) => {
                        switch ($[0]) {
                            case 'state': return p_.ss($, ($) => t_parse_tree_to_location.State($.xxx))
                            case 'list': return p_.ss($, ($) => t_parse_tree_to_location.List($.xxx))
                            default: return p_.au($[0])
                        }
                    }),
                    'parent': p_.literal.set($['parent range stack'])
                }))
                default: return p_.au($[0])
            }
        }
    ))
}