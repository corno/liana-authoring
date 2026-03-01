import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import * as _pdev from 'pareto-core-dev'
import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'

//data types
import * as d_schema from "pareto-liana/dist/interface/generated/liana/schemas/schema/data/resolved"
import * as d_in from "pareto-liana/dist/interface/to_be_generated/unmashall_result"
import * as d_token from "astn-core/dist/interface/generated/liana/schemas/token/data"
import * as d_ast_target from "astn/dist/interface/generated/liana/schemas/authoring_target/data"
import * as d_fpblock from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"
import * as d_out from "../../../../interface/generated/liana/schemas/completion_suggestions/data"
import * as d_location from "../../../../interface/generated/liana/schemas/location/data"

//dependencies
import * as t_to_unmarshall_result_value_at_position from "./found"

// import * as t_astn_target_to_fp from "astn/dist/implementation/manual/schemas/authoring_target/transformers/fountain_pen_block"
// import * as t_default_initialize from "../liana_schema/authoring_target"
// import * as t_ast_to_range from "astn/dist/implementation/manual/schemas/parse_tree/transformers/token"
// import * as s_fp from "pareto-fountain-pen/dist/implementation/manual/schemas/block/serializers"

// import { $$ as op_expect_1_element } from "pareto-standard-operations/dist/implementation/operations/impure/list/expect_exactly_one_element"



// const create_default_value_string = (node: d_schema.Type_Node, write_delimiters: boolean) => {
//     const default_initialized_value: d_ast_target.Value = t_default_initialize.Value(node)
//     const fp_group: d_fpblock.Group = _p.list.literal([
//         ['nested block', _p.list.literal<d_fpblock.Block_Part>([
//             t_astn_target_to_fp.Value(default_initialized_value, {
//                 'in concise group': false,
//                 'write delimiters': write_delimiters,
//             })
//         ])]
//     ])
//     return s_fp.Group(fp_group, {

//         'indentation': $p.indent,
//         'newline': '\n',
//     })

// }


export type Document = _pi.Transformer_With_Parameter<
    d_in.Document,
    _pi.Optional_Value<d_out.Completion_Suggestions>,
    {
        'position': d_location.Position
        'indent': string
        // 'full path': string
        // 'id path': string
    }
>

export const Document: Document = ($, $p) => {
    return _p.decide.state(
        t_to_unmarshall_result_value_at_position.Document($, $p),
        ($) => {
            switch ($[0]) {
                case 'value': return _p.ss($, ($): _pi.Optional_Value<d_out.Completion_Suggestions> => _p.optional.literal.set(_p.list.literal([
                    {
                        'documentation': "DFSFSF",
                        'insert text': "SDFSFDF",
                        'label': "value"
                    }
                ])))
                case 'entry': return _p.ss($, ($) => _p.optional.literal.set(_p.list.literal([
                    {
                        'documentation': "DFSFSF",
                        'insert text': "SDFSFDF",
                        'label': "entry"
                    }

                ])))
                case 'verbose property': return _p.ss($, ($) => _p.optional.literal.set(_p.list.literal([
                    {
                        'documentation': "DFSFSF",
                        'insert text': "SDFSFDF",
                        'label': "verbose property"
                    }

                ])))
                case 'concise property': return _p.ss($, ($) => _p.optional.literal.set(_p.list.literal([
                    {
                        'documentation': "DFSFSF",
                        'insert text': "SDFSFDF",
                        'label': "concise property"
                    }

                ])))
                case 'valid state': return _p.ss($, ($) => _p.optional.literal.set(_p.list.literal([
                    {
                        'documentation': "DFSFSF",
                        'insert text': "SDFSFDF",
                        'label': "state"
                    }

                ])))
                default: return _p.au($[0])
            }
        }
    )
}