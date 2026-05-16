import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'
import _p_cc from 'pareto-core/dist/_p_change_context'

//data types
import * as d_in from "../../../../interface/to_be_generated/unmarshall_result"
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

export type Parameters = {
    'position': d_location.Position
    'indent': string
    'style':
    | ['verbose', null]
    | ['concise', null]
}

export type Document = _pi.Transformer_With_Parameter<
    d_in.Document,
    d_out.Completion_Suggestions,
    Parameters

>

export type Found = _pi.Transformer_With_Parameter<
    d_outx.Found,
    d_out.Completion_Suggestions,
    Parameters
>

type Minimal_Completion_Suggestion = {
    'label': string,
    'insert value': d_ast_target.Value,
}

type Minimal_Completion_Suggestions = _pi.List<Minimal_Completion_Suggestion>


const d_schema_Value = (
    $: d_schema.Value,
    $p: {
        'style':
        | ['verbose', null]
        | ['concise', null]
    }
): Minimal_Completion_Suggestions => {
    return _p.decide.state($, ($): Minimal_Completion_Suggestions => {
        switch ($[0]) {
            case 'component': return _p.ss($, ($) => d_schema_Value(
                _p.decide.state($.type, ($): d_schema.Value => {
                    switch ($[0]) {
                        case 'external': return _p.ss($, ($) => $.module['l entry']['root value'])
                        case 'internal': return _p.ss($, ($) => $['l entry'].get_circular_dependent()['root value'])
                        case 'internal acyclic': return _p.ss($, ($) => $['l entry']['root value'])
                        default: return _p.au($[0])
                    }
                }),
                $p,
            ))
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
                }
            ]))
            case 'group': return _p.ss($, ($) => {
                const group = $
                return _p.list.literal<Minimal_Completion_Suggestion>([
                    _p.decide.state($p.style, ($): Minimal_Completion_Suggestion => {
                        switch ($[0]) {
                            case 'verbose': return _p.ss($, ($) => ({
                                'label': "",
                                'insert value': {
                                    'data': ['concrete', {
                                        'type': ['group', ['verbose', {
                                            '(': {
                                                'comments': _p.list.literal([])
                                            },
                                            'properties': _p.list.from.dictionary(
                                                group
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

                            }))
                            case 'concise': return _p.ss($, ($) => ({
                                'label': "",
                                'insert value': {
                                    'data': ['concrete', {
                                        'type': ['group', ['concise', {
                                            '<': {
                                                'comments': _p.list.literal([])
                                            },
                                            'properties': _p.list.from.dictionary(
                                                group
                                            ).convert(
                                                ($, id) => t_liana_schema_to_authoring_target.Value($.value, { 'style': ['concise', null] })
                                            ),
                                            '>': {
                                                'comments': _p.list.literal([])
                                            },
                                        }]]
                                    }]
                                },

                            }))
                            default: return _p.au($[0])
                        }
                    }),

                ])
            })
            default: return _p.list.literal([
                {
                    'label': "",
                    'insert value': t_liana_schema_to_authoring_target.Value(
                        $,
                        { 'style': ['verbose', null] }
                    ),


                }
            ])
        }
    })

}

export const Found: Found = ($, $p) => {
    switch ($[0]) {
        case 'value': return _p.ss($, ($): d_out.Completion_Suggestions => {
            const instance = $.instance
            const definition = $.definition

            return _p.decide.state($.instance.type, ($) => {
                switch ($[0]) {
                    case 'concrete': return _p.ss($, ($) => _p.decide.state(definition, ($) => {
                        switch ($[0]) {
                            case 'reference': return _p.ss($, ($) => _p.optional.literal.not_set()) //FIXME
                            default: return _p.optional.literal.not_set()
                        }
                    }))
                    case 'include': return _p.ss($, ($) => _p.optional.literal.not_set())
                    case 'missing': return _p.ss($, ($) => _p.optional.literal.set({
                        'type': ['missing value', null],
                        'suggestions': _p.list.from.list(
                            d_schema_Value(
                                definition,
                                $p,
                            ),
                        ).map(
                            ($): d_out.Completion_Suggestions.O.suggestions.L => ({
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
                            })
                        )

                    }))
                    default: return _p.au($[0])
                }
            })

        })
        case 'entry': return _p.ss($, ($) => _p.optional.literal.not_set())
        case 'property': return _p.ss($, ($) => _p.optional.literal.not_set())
        case 'state': return _p.ss($, ($): d_out.Completion_Suggestions => {
            const definition = $.definition
            return _p.decide.state($.intermediate.instance, ($): d_out.Completion_Suggestions => {
                switch ($[0]) {
                    case 'state': return _p.ss($, ($) => _p.decide.state($.status, ($): d_out.Completion_Suggestions => {
                        switch ($[0]) {
                            case 'missing': return _p.ss($, ($) => {
                                const missing_data_marker = $['#']
                                return _p.optional.literal.set({
                                    'type': ['missing option', null],
                                    'suggestions': _p.list.from.dictionary(
                                        definition.options
                                    ).flatten(($, id) => {
                                        const desc = $.description
                                        return d_schema_Value(
                                            $.value,
                                            $p,
                                        ).__l_map(
                                            ($): d_out.Completion_Suggestions.O.suggestions.L => _p_cc(
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
                                                            'write delimiters': false, //skip the pipe
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
                                    })
                                })
                            })
                            case 'set': return _p.ss($, ($) => _p.optional.literal.not_set()) //check if this is in the actual option name, if so, give suggestions
                            default: return _p.au($[0])
                        }
                    }))
                    case 'list': return _p.ss($, ($) => _p.optional.literal.not_set())
                    default: return _p.au($[0])
                }
            })
        })
        default: return _p.au($[0])
    }
}

export const Document: Document = ($, $p) => {
    return Found(
        t_to_unmarshall_result_value_at_position.Document(
            $,
            {
                'position': $p.position,
            }
        ),
        $p
    )
}