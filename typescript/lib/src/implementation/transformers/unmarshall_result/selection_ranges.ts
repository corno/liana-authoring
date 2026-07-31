import type * as p_di from 'pareto-core/interface/data'

import * as p_ from 'pareto-core/implementation/transformer'

//schemas
import type * as s_in from "../../../schemas/unmarshall_result/schema.js"
import type * as s_out from "../../../schemas/unmarshall_result/schema.js"
import type * as s_location from "../../../schemas/location/schema.js"


namespace interface_ {

    export type Document = p_.Transformer_With_Parameter<
        s_in.Document,
        p_di.List<s_out.Range_Stack>,
        {
            'positions': p_di.List<s_location.Position_>
        }
    >
}

//dependencies
import * as t_to_unmarshall_result_value_at_position from "./found.js"
import * as t_parse_tree_to_full_value_location from "astn-core/modules/deserialization/schemas/parse_tree/transformers/full_value_range"


export const Document: interface_.Document = ($, $p) => {
    const doc = $
    return p_.from.list($p.positions).map(
        ($): s_in.Range_Stack => p_.from.state(t_to_unmarshall_result_value_at_position.Document(
            doc,
            {
                'position': $,
            }
        ),
        ).decide(
            ($): s_in.Range_Stack => {
                switch ($[0]) {
                    case 'value': return p_.option($, ($): s_in.Range_Stack => {
                        return {
                            'range': t_parse_tree_to_full_value_location.Value($.instance),
                            'parent': $['optional parent range stack']
                        }
                    })
                    case 'entry': return p_.option($, ($) => ({
                        'range': t_parse_tree_to_full_value_location.ID_Value_Pair($.intermediate['id value pair']),
                        'parent': p_.literal.set($['parent range stack'])
                    }))
                    case 'property': return p_.option($, ($) => p_.from.state($.style).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'verbose': return p_.option($, ($) => ({
                                    'range': t_parse_tree_to_full_value_location.ID_Value_Pair($.intermediate['id value pair']),
                                    'parent': p_.literal.set($['parent range stack'])
                                }))
                                case 'unknown concise': return p_.option($, ($) => ({
                                    'range': t_parse_tree_to_full_value_location.Value($.item.value),
                                    'parent': p_.literal.set($['parent range stack'])
                                }))

                                default: return p_.exhaustive($[0])
                            }
                        }))
                    case 'state': return p_.option($, ($) => ({
                        'range': p_.from.state($.intermediate.instance).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'state': return p_.option($, ($) => t_parse_tree_to_full_value_location.State($.xxx))
                                    case 'list': return p_.option($, ($) => t_parse_tree_to_full_value_location.List($.xxx))
                                    default: return p_.exhaustive($[0])
                                }
                            }),
                        'parent': p_.literal.set($['parent range stack'])
                    }))
                    default: return p_.exhaustive($[0])
                }
            }
        ))
}
