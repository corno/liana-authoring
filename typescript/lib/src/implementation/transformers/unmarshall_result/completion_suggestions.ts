import * as p_ from 'pareto-core/implementation/transformer'
import type * as p_di from 'pareto-core/interface/data'

import type * as interface_ from "../../../declarations/transformers/unmarshall_result/completion_suggestions.js"

//schemas
import type * as s_out from "../../../interface/schemas/completion_suggestions.js"

import type * as s_schema from "pareto-liana/modules/schema/interface/data/resolved"
import type * as s_ast_target from "astn/interface/data/authoring_target"

//dependencies
import * as t_to_unmarshall_result_value_at_position from "./found.js"
import * as t_liana_schema_to_authoring_target from "../liana_schema/authoring_target.js"
import * as t_authoring_target_to_text from "astn/implementation/transformers/authoring_target/text"


type Minimal_Completion_Suggestion = {
    'label': string,
    'insert value': s_ast_target.Value,
}

type Minimal_Completion_Suggestions = p_di.List<Minimal_Completion_Suggestion>


const s_schema_Value = (
    $: s_schema.Value,
    $p: {
        'style':
        | ['verbose', null]
        | ['concise', null]
    }
): Minimal_Completion_Suggestions => {
    return p_.from.state($).decide(
        ($): Minimal_Completion_Suggestions => {
            switch ($[0]) {
                case 'component': return p_.option($, ($) => s_schema_Value(
                    p_.from.state($.type).decide(
                        ($): s_schema.Value => {
                            switch ($[0]) {
                                case 'external': return p_.option($, ($) => $.module['l entry']['root value'])
                                case 'internal': return p_.option($, ($) => $['l entry'].get_circular_dependent()['root value'])
                                case 'internal acyclic': return p_.option($, ($) => $['l entry']['root value'])
                                default: return p_.exhaustive($[0])
                            }
                        }),
                    $p,
                ))
                case 'reference': return p_.option($, ($) => p_.literal.list<Minimal_Completion_Suggestion>([
                    {
                        'label': "",
                        'insert value': {
                            'data': ['concrete', {
                                'type': ['text', {
                                    'delimiter': ['apostrophe', null],
                                    'value': "...",
                                    'trivia': {
                                        'comments': p_.literal.list([])
                                    }
                                }]
                            }]
                        },
                    }
                ]))
                case 'group': return p_.option($, ($) => {
                    const $v_group = $
                    return p_.literal.list<Minimal_Completion_Suggestion>([
                        p_.from.state($p.style).decide(
                            ($): Minimal_Completion_Suggestion => {
                                switch ($[0]) {
                                    case 'verbose': return p_.option($, ($) => ({
                                        'label': "",
                                        'insert value': {
                                            'data': ['concrete', {
                                                'type': ['group', ['verbose', {
                                                    '(': {
                                                        'comments': p_.literal.list([])
                                                    },
                                                    'properties': p_.from.dictionary($v_group).convert_to_list(
                                                        ($, id) => ({
                                                            'id': id,
                                                            'value': p_.literal.set(t_liana_schema_to_authoring_target.Value($.value, { 'style': ['verbose', null] }))
                                                        })
                                                    ),
                                                    ')': {
                                                        'comments': p_.literal.list([])
                                                    },
                                                }]]
                                            }]
                                        },

                                    }))
                                    case 'concise': return p_.option($, ($) => ({
                                        'label': "",
                                        'insert value': {
                                            'data': ['concrete', {
                                                'type': ['group', ['concise', {
                                                    '<': {
                                                        'comments': p_.literal.list([])
                                                    },
                                                    'properties': p_.from.dictionary($v_group).convert_to_list(
                                                        ($, id) => t_liana_schema_to_authoring_target.Value($.value, { 'style': ['concise', null] })
                                                    ),
                                                    '>': {
                                                        'comments': p_.literal.list([])
                                                    },
                                                }]]
                                            }]
                                        },

                                    }))
                                    default: return p_.exhaustive($[0])
                                }
                            }),

                    ])
                })
                default: return p_.literal.list([
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

export const Found: interface_.Found = ($, $p) => {
    switch ($[0]) {
        case 'value': return p_.option($, ($): s_out.Completion_Suggestions => {
            const definition = $.definition

            return p_.from.state($.instance.type).decide(
                ($) => {
                    switch ($[0]) {
                        case 'concrete': return p_.option($, ($) => p_.from.state(definition).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'reference': return p_.option($, ($) => p_.literal.not_set()) //FIXME
                                    default: return p_.literal.not_set()
                                }
                            }))
                        case 'include': return p_.option($, ($) => p_.literal.not_set())
                        case 'missing': return p_.option($, ($) => p_.literal.set({
                            'type': ['missing value', null],
                            'suggestions': p_.from.list(s_schema_Value(
                                definition,
                                $p,
                            ),
                            ).map(
                                ($): s_out.Completion_Suggestions.O.suggestions.L => ({
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
                        default: return p_.exhaustive($[0])
                    }
                })

        })
        case 'entry': return p_.option($, ($) => p_.literal.not_set())
        case 'property': return p_.option($, ($) => p_.literal.not_set())
        case 'state': return p_.option($, ($): s_out.Completion_Suggestions => {
            const definition = $.definition
            return p_.from.state($.intermediate.instance).decide(
                ($): s_out.Completion_Suggestions => {
                    switch ($[0]) {
                        case 'state': return p_.option($, ($) => p_.from.state($.xxx.status).decide(
                            ($): s_out.Completion_Suggestions => {
                                switch ($[0]) {
                                    case 'missing': return p_.option($, ($) => {
                                        return p_.literal.set({
                                            'type': ['missing option', null],
                                            'suggestions': p_.from.dictionary(definition.options).flatten_to_list(
                                                ($, id) => {
                                                    const desc = $.description
                                                    return p_.from.list(s_schema_Value(
                                                        $.value,
                                                        $p,
                                                    )).map(
                                                        ($): s_out.Completion_Suggestions.O.suggestions.L => ({
                                                            'label': id + $.label,
                                                            'documentation': p_.from.optional(desc).decide<string>(
                                                                ($) => $,
                                                                () => ""
                                                            ),
                                                            'insert text': t_authoring_target_to_text.Value(
                                                                {
                                                                    'data': ['concrete', {
                                                                        'type': ['state', {
                                                                            '|': {
                                                                                'comments': p_.literal.list([])
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
                                                        })
                                                    )
                                                })
                                        })
                                    })
                                    case 'set': return p_.option($, ($) => p_.literal.not_set()) //check if this is in the actual option name, if so, give suggestions
                                    default: return p_.exhaustive($[0])
                                }
                            }))
                        case 'list': return p_.option($, ($) => p_.literal.not_set())
                        default: return p_.exhaustive($[0])
                    }
                })
        })
        default: return p_.exhaustive($[0])
    }
}

export const Document: interface_.Document = ($, $p) => {
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