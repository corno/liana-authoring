import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'

//data types
import * as d_schema from "pareto-liana/dist/interface/generated/liana/schemas/schema/data/resolved"
import * as d_in from "../../../../interface/to_be_generated/unmashall_result"
import * as d_token from "astn-core/dist/interface/generated/liana/schemas/token/data"
import * as d_ast_target from "astn/dist/interface/generated/liana/schemas/authoring_target/data"
import * as d_fpblock from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"
import * as d_out from "../../../../interface/generated/liana/schemas/completion_suggestions/data"
import * as d_location from "../../../../interface/generated/liana/schemas/location/data"
import * as d_out_text_edits from "../../../../interface/generated/liana/schemas/text_edits/data"

//dependencies
import * as t_to_unmarshall_result_value_at_position from "./found"
import * as t_liana_schema_to_authoring_target from "../liana_schema/authoring_target"
import * as t_authoring_target_to_text from "astn/dist/implementation/manual/transformers/authoring_target/text"
import * as t_astn_location_to_location from "../astn_core_location/location"
import * as t_parse_tree_to_full_range from "astn-core/dist/implementation/manual/transformers/parse_tree/full_value_range"

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
                case 'value': return _p.ss($, ($): _pi.Optional_Value<d_out.Completion_Suggestions> => {
                    const instance = $.instance
                    return _p.decide.state($.definition, ($): _pi.Optional_Value<d_out.Completion_Suggestions> => {
                        switch ($[0]) {
                            case 'reference': return _p.ss($, ($) => _p.optional.literal.set(_p.list.literal<d_out.Completion_Suggestions.L>([
                                {
                                    'label': "value",
                                    'documentation': "DFSFSF",
                                    'insert text': t_authoring_target_to_text.Value(
                                        ({
                                            'metadata': {
                                                'comments': _p.list.literal([]),

                                            },
                                            'data': ['concrete', {
                                                'type': ['text', {
                                                    'delimiter': ['backtick', null],
                                                    'value': "..."
                                                }]
                                            }]
                                        }),
                                        {
                                            'indentation': $p.indent,
                                            'newline': "\n",
                                            'write delimiters': true,
                                        }
                                    ),
                                    'additional text edits': _p.list.literal<d_out_text_edits.Text_Edits.L>([
                                        ['delete', {
                                            'range': t_astn_location_to_location.Range(
                                                t_parse_tree_to_full_range.Value(instance)
                                            )
                                        }]
                                    ]),
                                    'type': ['reference', null],
                                }
                            ])))
                            default: return _p.optional.literal.set(_p.list.literal([
                                {
                                    'label': "value",
                                    'documentation': "DFSFSF",
                                    'insert text': t_authoring_target_to_text.Value(
                                        t_liana_schema_to_authoring_target.Value(
                                            $
                                        ),
                                        {
                                            'indentation': $p.indent,
                                            'newline': "\n",
                                            'write delimiters': true,
                                        }
                                    ),
                                    'additional text edits': _p.list.literal<d_out_text_edits.Text_Edits.L>([
                                        ['delete', {
                                            'range': t_astn_location_to_location.Range(
                                                t_parse_tree_to_full_range.Value(instance)
                                            )
                                        }]
                                    ]),
                                    'type': _p.decide.state($, ($): d_out.Completion_Suggestions.L.type_ => {
                                        switch ($[0]) {
                                            case 'boolean': return _p.ss($, ($) => ['boolean', null])
                                            case 'component': return _p.ss($, ($) => ['component', null])
                                            case 'dictionary': return _p.ss($, ($) => ['dictionary', null])
                                            case 'group': return _p.ss($, ($) => ['group', null])
                                            case 'list': return _p.ss($, ($) => ['list', null])
                                            case 'nothing': return _p.ss($, ($) => ['nothing', null])
                                            case 'number': return _p.ss($, ($) => ['number', null])
                                            case 'optional': return _p.ss($, ($) => ['optional', null])
                                            case 'state': return _p.ss($, ($) => ['state', null])
                                            case 'text': return _p.ss($, ($) => ['text', null])
                                            default: return _p.au($[0])
                                        }
                                    })

                                }
                            ]))
                        }
                    })
                })
                case 'entry': return _p.ss($, ($) => _p.optional.literal.set(_p.list.literal([
                    {
                        'label': "entry-completion",
                        'documentation': "DFSFSF",
                        'insert text': "SDFSFDF",
                        'additional text edits': _p.list.literal([]),
                        'type': ['dictionary', null]
                    }

                ])))
                case 'verbose property': return _p.ss($, ($) => _p.optional.literal.set(_p.list.literal([
                    {
                        'label': "verbose property-completion",
                        'documentation': "DFSFSF",
                        'insert text': "SDFSFDF",
                        'additional text edits': _p.list.literal([]),
                        'type': ['group', null]
                    }

                ])))
                case 'concise property': return _p.ss($, ($) => _p.optional.literal.set(_p.list.literal([
                    {
                        'label': "concise property-completion",
                        'documentation': "DFSFSF",
                        'insert text': "SDFSFDF",
                        'additional text edits': _p.list.literal([]),
                        'type': ['group', null]
                    }

                ])))
                case 'valid state': return _p.ss($, ($): _pi.Optional_Value<d_out.Completion_Suggestions> => {
                    const definition = $.definition
                    return _p.decide.state($.instance, ($) => {
                        switch ($[0]) {
                            case 'state': return _p.ss($, ($) => _p.decide.state($.status, ($) => {
                                switch ($[0]) {
                                    case 'missing': return _p.ss($, ($) => {
                                        const missing_data_marker = $['#']
                                        return _p.optional.literal.set(definition.options.__to_list(($, id) => ({
                                            'label': id,
                                            'documentation': "DFSFSF",
                                            //'insert text': "SDFSFDF",
                                            'insert text': t_authoring_target_to_text.Value(
                                                ({
                                                    'metadata': {
                                                        'comments': _p.list.literal([])
                                                    },
                                                    'data': ['concrete', {
                                                        'type': ['state', ['set', {
                                                            'option': id,
                                                            'value': t_liana_schema_to_authoring_target.Value(
                                                                $.value
                                                            )
                                                        }]]
                                                    }]
                                                }),
                                                {
                                                    'indentation': $p.indent,
                                                    'newline': "\n",
                                                    'write delimiters': false,
                                                }
                                            ),
                                            'additional text edits': _p.list.literal<d_out_text_edits.Text_Edits.L>([
                                                ['delete', {
                                                    'range': t_astn_location_to_location.Range(missing_data_marker.range)
                                                }]
                                            ]),
                                            'type': ['state', null]

                                        })))
                                    })
                                    case 'set': return _p.ss($, ($) => _p.optional.literal.set(_p.list.literal([
                                        {
                                            'label': "set state-completion",
                                            'documentation': "DFSFSF",
                                            'insert text': "SDFSFDF",
                                            'additional text edits': _p.list.literal([]),
                                            'type': ['state', null]
                                        }

                                    ])))
                                    default: return _p.au($[0])
                                }
                            }))
                            case 'list': return _p.ss($, ($) => _p.optional.literal.set(_p.list.literal([
                                {
                                    'label': "legacy state-completion",
                                    'documentation': "DFSFSF",
                                    'insert text': "SDFSFDF",
                                    'additional text edits': _p.list.literal([]),
                                    'type': ['state', null]
                                }

                            ])))
                            default: return _p.au($[0])
                        }
                    })
                })
                default: return _p.au($[0])
            }
        }
    )
}