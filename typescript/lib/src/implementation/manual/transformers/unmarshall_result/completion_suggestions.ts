import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'
import _p_cc from 'pareto-core/dist/_p_change_context'

//data types
import * as d_in from "../../../../interface/to_be_generated/unmashall_result"
import * as d_out from "../../../../interface/generated/liana/schemas/completion_suggestions/data"

import * as d_schema from "pareto-liana/dist/interface/generated/liana/schemas/schema/data/resolved"
import * as d_ast_target from "astn/dist/interface/generated/liana/schemas/authoring_target/data"
import * as d_location from "../../../../interface/generated/liana/schemas/location/data"
import * as d_out_text_edits from "../../../../interface/generated/liana/schemas/text_edits/data"
import * as d_outx from "../../../../interface/to_be_generated/found"

//dependencies
import * as t_to_unmarshall_result_value_at_position from "./found"
import * as t_liana_schema_to_authoring_target from "../liana_schema/authoring_target"
import * as t_authoring_target_to_text from "astn/dist/implementation/manual/transformers/authoring_target/text"
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

export type Found = _pi.Transformer_With_Parameter<
    d_outx.Found,
    _pi.Optional_Value<d_out.Completion_Suggestions>,
    {
        'position': d_location.Position
        'indent': string
        // 'full path': string
        // 'id path': string
    }
>

type Minimal_Completion_Suggestion = {
    'label': string,
    'insert value': d_ast_target.Value,
    'type': d_out.Completion_Suggestions.L.type_
}

type Minimal_Completion_Suggestions = _pi.List<Minimal_Completion_Suggestion>


const do_def = (
    $: d_schema.Value,
): Minimal_Completion_Suggestions => {

    return _p.decide.state($, ($): Minimal_Completion_Suggestions => {
        switch ($[0]) {
            case 'component': return _p.ss($, ($) => do_def(_p.decide.state($.type, ($): d_schema.Value => {
                switch ($[0]) {
                    case 'external': return _p.ss($, ($) => $.module['l entry']['root value'])
                    case 'internal': return _p.ss($, ($) => $['l entry'].get_circular_dependent()['root value'])
                    case 'internal acyclic': return _p.ss($, ($) => $['l entry']['root value'])
                    default: return _p.au($[0])
                }
            })))
            case 'reference': return _p.ss($, ($) => _p.list.literal<Minimal_Completion_Suggestion>([
                {
                    'label': "",
                    'insert value': {
                        'data': ['concrete', {
                            'type': ['text', {
                                'delimiter': ['apostrophe', null],
                                'value': "...",
                                'trivia': {
                                    'comments': _p.list.literal([])
                                }
                            }]
                        }]
                    },
                    'type': ['reference', null],
                }
            ]))
            case 'group': return _p.ss($, ($) => _p.list.literal<Minimal_Completion_Suggestion>([
                {
                    'label': " (verbose)",
                    'insert value': {
                        'data': ['concrete', {
                            'type': ['group', ['verbose', {
                                '(': {
                                    'comments': _p.list.literal([])
                                },
                                'properties': _p.list.from.dictionary(
                                    $
                                ).convert(
                                    ($, id) => ({
                                        'id': id,
                                        'value': _p.optional.literal.set(t_liana_schema_to_authoring_target.Value($.value, { 'style': ['verbose', null] }))
                                    })
                                ),
                                ')': {
                                    'comments': _p.list.literal([])
                                },
                            }]]
                        }]
                    },
                    'type': ['group', null]

                },
                {
                    'label': " (concise)",
                    'insert value': {
                        'data': ['concrete', {
                            'type': ['group', ['concise', {
                                '<': {
                                    'comments': _p.list.literal([])
                                },
                                'properties': _p.list.from.dictionary(
                                    $
                                ).convert(
                                    ($, id) => t_liana_schema_to_authoring_target.Value($.value, { 'style': ['concise', null] })
                                ),
                                '>': {
                                    'comments': _p.list.literal([])
                                },
                            }]]
                        }]
                    },
                    'type': ['group', null]

                }
            ]))
            default: return _p.list.literal([
                {
                    'label': "",
                    'insert value': t_liana_schema_to_authoring_target.Value(
                        $,
                        { 'style': ['verbose', null] }
                    ),
                    'type': _p.decide.state($, ($): d_out.Completion_Suggestions.L.type_ => {
                        switch ($[0]) {
                            case 'dictionary': return _p.ss($, ($) => ['dictionary', null])
                            case 'list': return _p.ss($, ($) => ['list', null])
                            case 'nothing': return _p.ss($, ($) => ['nothing', null])
                            case 'simple': return _p.ss($, ($) => ['simple', null])
                            case 'optional': return _p.ss($, ($) => ['optional', null])
                            case 'state': return _p.ss($, ($) => ['state', null])
                            case 'text': return _p.ss($, ($) => ['text', null])
                            default: return _p.au($[0])
                        }
                    })

                }
            ])
        }
    })

}

export const Found: Found = ($, $p) => {
    switch ($[0]) {
        case 'value': return _p.ss($, ($): _pi.Optional_Value<d_out.Completion_Suggestions> => {
            const instance = $.instance

            return _p.optional.literal.set(_p.list.from.list(
                do_def(
                    $.definition,
                ),
            ).map(
                ($): d_out.Completion_Suggestions.L => ({
                    'label': "value" + $.label,
                    'documentation': "value completion",
                    'insert text': t_authoring_target_to_text.Value(
                        $['insert value'],
                        {
                            'indentation': $p.indent,
                            'newline': "\n",
                            'write delimiters': true,
                        }
                    ),
                    'additional text edits': _p.list.literal<d_out_text_edits.Text_Edits.L>([
                        ['delete', {
                            'range': t_parse_tree_to_full_range.Value(instance)
                        }]
                    ]),
                    'type': $.type
                })
            ))
        })
        case 'entry': return _p.ss($, ($) => $['id value pair'].assignment.__decide(
            ($) => t_to_unmarshall_result_value_at_position.range_overlaps_position(
                $[':'].range,
                {
                    'position': $p.position
                }
            )
                ? _p.optional.literal.set(_p.list.literal([
                    // {
                    //     'label': "entry",
                    //     'documentation': "DFSFSF",
                    //     'insert text': " #",
                    //     'additional text edits': _p.list.literal([]),
                    //     'type': ['group', null]
                    // }

                ]))
                : _p.optional.literal.set(_p.list.literal([
                    {
                        'label': "entry-completion (is this possible???? no colon)",
                        'documentation': "entry completion",
                        'insert text': "SDFSFDF",
                        'additional text edits': _p.list.literal([]),
                        'type': ['group', null]
                    }

                ])),
            () => _p.optional.literal.set(_p.list.literal([
                // {
                //     'label': "entry-completion (no value)",
                //     'documentation': "entry completion",
                //     'insert text': "SDFSFDF",
                //     'additional text edits': _p.list.literal([]),
                //     'type': ['group', null]
                // }

            ]))
        ))
        case 'verbose property': return _p.ss($, ($) => _p.optional.literal.set(_p.list.literal([
            {
                'label': "verbose property-completion",
                'documentation': "verbose property completion",
                'insert text': "SDFSFDF",
                'additional text edits': _p.list.literal([]),
                'type': ['group', null]
            }

        ])))
        case 'concise property': return _p.ss($, ($) => _p.optional.literal.set(_p.list.literal([
            {
                'label': "concise property-completion",
                'documentation': "concise property completion",
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
                                return _p.optional.literal.set(_p.list.from.dictionary(
                                    definition.options
                                ).flatten(($, id) => {
                                    const desc = $.description
                                    return do_def(
                                        $.value,
                                    ).__l_map(
                                        ($): d_out.Completion_Suggestions.L => _p_cc(
                                            $,
                                            ($) => ({
                                                'label': id + $.label,
                                                'documentation': desc.__decide<string>(
                                                    ($) => $,
                                                    () => ""
                                                ),
                                                'insert text': t_authoring_target_to_text.Value(
                                                    {
                                                        'data': ['concrete', {
                                                            'type': ['state', {
                                                                '|': {
                                                                    'comments': _p.list.literal([])
                                                                },
                                                                'status': ['set', {
                                                                    'option': id,
                                                                    'value': $['insert value']
                                                                }]
                                                            }]
                                                        }]
                                                    },
                                                    {
                                                        'indentation': $p.indent,
                                                        'newline': "\n",
                                                        'write delimiters': false,
                                                    }
                                                ),
                                                'additional text edits': _p.list.literal<d_out_text_edits.Text_Edits.L>([
                                                    ['delete', {
                                                        'range': missing_data_marker.range
                                                    }]
                                                ]),
                                                'type': ['state', null]
                                            })
                                        )
                                    )
                                }))
                            })
                            case 'set': return _p.ss($, ($) => _p.optional.literal.set(_p.list.literal([
                                {
                                    'label': "set state-completion",
                                    'documentation': "set state completion",
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
                            'documentation': "legacy state completion",
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

export const Document: Document = ($, $p) => {
    return _p.decide.state(
        t_to_unmarshall_result_value_at_position.Document($, $p),
        ($) => Found($, $p)
    )
}