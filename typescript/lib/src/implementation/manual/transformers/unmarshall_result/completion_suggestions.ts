import * as pt from 'pareto-core/dist/transformer/implementation'
import * as p_di from 'pareto-core/dist/data/interface'
import p_change_context from 'pareto-core/dist/specials/change_context'
import * as p_ti from 'pareto-core/dist/transformer/interface'

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

export type Parameters = {
    'position': d_location.Position
    'indent': string
    'style':
    | ['verbose', null]
    | ['concise', null]
}

export type Document = p_ti.Transformer_With_Parameter<
    d_in.Document,
    d_out.Completion_Suggestions,
    Parameters

>

export type Found = p_ti.Transformer_With_Parameter<
    d_outx.Found,
    d_out.Completion_Suggestions,
    Parameters
>

type Minimal_Completion_Suggestion = {
    'label': string,
    'insert value': d_ast_target.Value,
}

type Minimal_Completion_Suggestions = p_di.List<Minimal_Completion_Suggestion>


const d_schema_Value = (
    $: d_schema.Value,
    $p: {
        'style':
        | ['verbose', null]
        | ['concise', null]
    }
): Minimal_Completion_Suggestions => {
    return pt.decide.state($, ($): Minimal_Completion_Suggestions => {
        switch ($[0]) {
            case 'component': return pt.ss($, ($) => d_schema_Value(
                pt.decide.state($.type, ($): d_schema.Value => {
                    switch ($[0]) {
                        case 'external': return pt.ss($, ($) => $.module['l entry']['root value'])
                        case 'internal': return pt.ss($, ($) => $['l entry'].get_circular_dependent()['root value'])
                        case 'internal acyclic': return pt.ss($, ($) => $['l entry']['root value'])
                        default: return pt.au($[0])
                    }
                }),
                $p,
            ))
            case 'reference': return pt.ss($, ($) => pt.literal.list<Minimal_Completion_Suggestion>([
                {
                    'label': "",
                    'insert value': {
                        'data': ['concrete', {
                            'type': ['text', {
                                'delimiter': ['apostrophe', null],
                                'value': "...",
                                'trivia': {
                                    'comments': pt.literal.list([])
                                }
                            }]
                        }]
                    },
                }
            ]))
            case 'group': return pt.ss($, ($) => {
                const group = $
                return pt.literal.list<Minimal_Completion_Suggestion>([
                    pt.decide.state($p.style, ($): Minimal_Completion_Suggestion => {
                        switch ($[0]) {
                            case 'verbose': return pt.ss($, ($) => ({
                                'label': "",
                                'insert value': {
                                    'data': ['concrete', {
                                        'type': ['group', ['verbose', {
                                            '(': {
                                                'comments': pt.literal.list([])
                                            },
                                            'properties': pt.list.from.dictionary(
                                                group
                                            ).convert(
                                                ($, id) => ({
                                                    'id': id,
                                                    'value': pt.literal.set(t_liana_schema_to_authoring_target.Value($.value, { 'style': ['verbose', null] }))
                                                })
                                            ),
                                            ')': {
                                                'comments': pt.literal.list([])
                                            },
                                        }]]
                                    }]
                                },

                            }))
                            case 'concise': return pt.ss($, ($) => ({
                                'label': "",
                                'insert value': {
                                    'data': ['concrete', {
                                        'type': ['group', ['concise', {
                                            '<': {
                                                'comments': pt.literal.list([])
                                            },
                                            'properties': pt.list.from.dictionary(
                                                group
                                            ).convert(
                                                ($, id) => t_liana_schema_to_authoring_target.Value($.value, { 'style': ['concise', null] })
                                            ),
                                            '>': {
                                                'comments': pt.literal.list([])
                                            },
                                        }]]
                                    }]
                                },

                            }))
                            default: return pt.au($[0])
                        }
                    }),

                ])
            })
            default: return pt.literal.list([
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
        case 'value': return pt.ss($, ($): d_out.Completion_Suggestions => {
            const instance = $.instance
            const definition = $.definition

            return pt.decide.state($.instance.type, ($) => {
                switch ($[0]) {
                    case 'concrete': return pt.ss($, ($) => pt.decide.state(definition, ($) => {
                        switch ($[0]) {
                            case 'reference': return pt.ss($, ($) => pt.literal.not_set()) //FIXME
                            default: return pt.literal.not_set()
                        }
                    }))
                    case 'include': return pt.ss($, ($) => pt.literal.not_set())
                    case 'missing': return pt.ss($, ($) => pt.literal.set({
                        'type': ['missing value', null],
                        'suggestions': pt.list.from.list(
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
                    default: return pt.au($[0])
                }
            })

        })
        case 'entry': return pt.ss($, ($) => pt.literal.not_set())
        case 'property': return pt.ss($, ($) => pt.literal.not_set())
        case 'state': return pt.ss($, ($): d_out.Completion_Suggestions => {
            const definition = $.definition
            return pt.decide.state($.intermediate.instance, ($): d_out.Completion_Suggestions => {
                switch ($[0]) {
                    case 'state': return pt.ss($, ($) => pt.decide.state($.xxx.status, ($): d_out.Completion_Suggestions => {
                        switch ($[0]) {
                            case 'missing': return pt.ss($, ($) => {
                                const missing_data_marker = $['#']
                                return pt.literal.set({
                                    'type': ['missing option', null],
                                    'suggestions': pt.list.from.dictionary(
                                        definition.options
                                    ).flatten(($, id) => {
                                        const desc = $.description
                                        return d_schema_Value(
                                            $.value,
                                            $p,
                                        ).__l_map(
                                            ($): d_out.Completion_Suggestions.O.suggestions.L => p_change_context(
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
                                                                        'comments': pt.literal.list([])
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
                                                    'additional text edits': pt.literal.list<d_out_text_edits.Text_Edits.L>([
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
                            case 'set': return pt.ss($, ($) => pt.literal.not_set()) //check if this is in the actual option name, if so, give suggestions
                            default: return pt.au($[0])
                        }
                    }))
                    case 'list': return pt.ss($, ($) => pt.literal.not_set())
                    default: return pt.au($[0])
                }
            })
        })
        default: return pt.au($[0])
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