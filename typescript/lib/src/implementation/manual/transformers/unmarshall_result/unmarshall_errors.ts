import * as pt from 'pareto-core/dist/transformer/implementation'
import * as p_di from 'pareto-core/dist/data/interface'
import * as p_ti from 'pareto-core/dist/transformer/interface'
import p_unreachable_code_path from 'pareto-core/dist/specials/unreachable_code_path'

//data types
import * as d_in from "../../../../interface/to_be_generated/unmarshall_result"
import * as d_out from "../../../../interface/generated/liana/schemas/unmarshall_errors/data"

//dependencies
import * as t_astn_parse_tree_to_location from "astn-core/dist/implementation/manual/transformers/parse_tree/start_token_range"

export type Document = p_ti.Transformer<
    d_in.Document,
    d_out.Errors
>

export type Value = p_ti.Transformer<
    d_in.Value,
    d_out.Errors
>


export const Document: Document = ($) => {
    return Value(
        $.content
    )
}

export const Value: Value = ($) => {
    const start_token_range = t_astn_parse_tree_to_location.Value($.instance)
    const def = $.definition
    return pt.decide.state($['unmarshall result'], ($): d_out.Errors => {
        switch ($[0]) {
            case 'error': return pt.ss($, ($) => pt.decide.state($, ($): d_out.Errors => {
                switch ($[0]) {
                    case 'incorrect': return pt.ss($, ($) => pt.decide.state($, ($): d_out.Errors => {
                        switch ($[0]) {
                            case 'wrong type': return pt.ss($, ($) => pt.list.literal([
                                {
                                    'range': start_token_range,
                                    'type': ['value', ['invalid type', {
                                        'expected': pt.decide.state(def, ($): d_out.Errors.L.type_.value.invalid_type.expected => {
                                            switch ($[0]) {
                                                case 'state': return pt.ss($, ($) => pt.list.literal([['state', null]]))
                                                case 'component': return pt.ss($, ($) => p_unreachable_code_path("a component cannot be incorrect by itself"))
                                                case 'dictionary': return pt.ss($, ($) => pt.list.literal([['dictionary', null]]))
                                                case 'group': return pt.ss($, ($) => pt.list.literal([['group', null]]))
                                                case 'list': return pt.ss($, ($) => pt.list.literal([['list', null]]))
                                                case 'nothing': return pt.ss($, ($) => pt.list.literal([['nothing', null]]))
                                                case 'simple': return pt.ss($, ($) => pt.list.literal([['text', null]]))
                                                case 'optional': return pt.ss($, ($) => pt.list.literal([['optional', null]]))
                                                case 'reference': return pt.ss($, ($) => pt.decide.state($.type, ($) => {
                                                    switch ($[0]) {
                                                        case 'derived': return pt.ss($, ($) => pt.list.literal([['nothing', null]]))
                                                        case 'selected': return pt.ss($, ($) => pt.list.literal([['text', null]]))
                                                        default: return pt.au($[0])
                                                    }
                                                }))
                                                case 'text': return pt.ss($, ($) => pt.list.literal([['text', null]]))
                                                default: return pt.au($[0])
                                            }
                                        })
                                    }]]
                                }
                            ]))
                            case 'list as state format error': return pt.ss($, ($) => {
                                const start_token = $.list['[']
                                return pt.decide.state($.type, ($): d_out.Errors => {
                                    switch ($[0]) {
                                        case 'missing option item': return pt.ss($, ($): d_out.Errors => pt.list.literal([
                                            {
                                                'range': start_token.range,
                                                'type': ['state', ['missing option name', null]] //FIXME wrong error
                                            }
                                        ]))
                                        case 'option item is not a text': return pt.ss($, ($) => pt.list.literal([
                                            {
                                                'range': start_token.range,
                                                'type': ['state', ['option name is not a text', null]] //FIXME wrong error
                                            }
                                        ]))
                                        case 'missing value item': return pt.ss($, ($) => pt.list.literal([
                                            {
                                                'range': start_token.range,
                                                'type': ['state', ['missing value', null]] //FIXME wrong error
                                            }
                                        ]))
                                        case 'too many items': return pt.ss($, ($) => pt.list.literal<d_out.Errors.L>([
                                            {
                                                'range': start_token.range,
                                                'type': ['state', ['more than 2 items in list', null]] //FIXME wrong error
                                            }
                                        ]))
                                        default: return pt.au($[0])
                                    }
                                })
                            })
                            case 'unknown option': return pt.ss($, ($) => pt.list.literal([
                                {
                                    'range': $['option token'].range,
                                    'type': ['state', ['unknown option', {
                                        'found': $['option token'].token.value,
                                        'expected': $.definition.options.__d_map(($) => null)
                                    }]]
                                }
                            ]))
                            default: return pt.au($[0])
                        }
                    }))
                    case 'missing': return pt.ss($, ($): d_out.Errors => pt.list.literal([
                        {
                            'range': start_token_range,
                            'type': ['value', ['missing', null]],
                            // 'type': ['error', ['missing value', null]]
                        }
                    ]))

                    default: return pt.au($[0])
                }
            }))
            case 'success': return pt.ss($, ($) => pt.decide.state($, ($): d_out.Errors => {
                switch ($[0]) {
                    case 'dictionary': return pt.ss($, ($) => {

                        return pt.list.nested_literal_old([
                            //duplicate id's
                            pt.list.from.dictionary(
                                $.derived.entries
                            ).flatten(
                                ($, id): d_out.Errors => {
                                    return pt.decide.state($.result, ($): d_out.Errors => {
                                        switch ($[0]) {
                                            case 'success': return pt.ss($, ($) => pt.list.literal([]))
                                            case 'error': return pt.ss($, ($) => pt.decide.state($, ($) => {
                                                switch ($[0]) {
                                                    case 'duplicate': return pt.ss($, ($) => $.instances.__l_map(($): d_out.Errors.L => ({
                                                        'range': $.intermediate['id value pair'].id.range,
                                                        'type': ['dictionary', ['duplicate entry', {
                                                            name: id
                                                        }]]
                                                    })))
                                                    default: return pt.au($[0])
                                                }
                                            }))
                                            default: return pt.au($[0])
                                        }
                                    })
                                }
                            ),
                            //diagnostics for each entry
                            pt.list.from.list(
                                $.intermediate['entries as list'],
                            ).flatten(
                                ($) => {
                                    const intermediate = $.intermediate
                                    return pt.list.nested_literal_old([
                                        pt.decide.state($.value, ($) => {
                                            switch ($[0]) {
                                                case 'set': return pt.ss($, ($) => Value($))
                                                case 'not set': return pt.ss($, ($) => pt.list.literal<d_out.Errors.L>([
                                                {
                                                    'range': intermediate['id value pair'].id.range,
                                                    'type': ['group', ['missing property value', { //missing property value
                                                        name: intermediate['id value pair'].id.token.value
                                                    }]]
                                                }
                                            ]))
                                                default: return pt.au($[0])
                                            }
                                        })
                                    ])
                                }
                            )
                        ])
                    })
                    case 'group': return pt.ss($, ($) => {

                        return pt.list.nested_literal_old([
                            pt.decide.state($.derived.style, ($) => {
                                switch ($[0]) {
                                    case 'concise': return pt.ss($, ($) => pt.list.nested_literal_old([
                                        pt.list.from.list(
                                            $.properties
                                        ).flatten(
                                            ($) => {
                                                const item = $.item
                                                return pt.decide.state($['definition found'], ($): d_out.Errors => {
                                                    switch ($[0]) {
                                                        case 'no': return pt.ss($, ($) => pt.list.literal([
                                                            {
                                                                'range': t_astn_parse_tree_to_location.Value(item.value),
                                                                'type': ['group', ['superfluous property', {
                                                                    'name': pt.optional.literal.not_set()
                                                                }]]
                                                            }
                                                        ]))
                                                        case 'yes': return pt.ss($, ($) => Value($['value']))
                                                        default: return pt.au($[0])
                                                    }
                                                })
                                            }
                                        ),
                                    ]))
                                    case 'verbose': return pt.ss($, ($) => pt.list.nested_literal_old([
                                        //diagnostics for each property
                                        pt.list.from.list(
                                            $.properties,
                                        ).flatten<d_out.Errors.L>(
                                            ($) => {
                                                const id_value_pair = $.intermediate['id value pair']

                                                return pt.list.nested_literal_old([
                                                    pt.decide.state($['definition found'], ($): d_out.Errors => {
                                                        switch ($[0]) {
                                                            case 'yes': return pt.ss($, ($) => $['value'].__decide(
                                                                ($) => Value($),
                                                                (): d_out.Errors => pt.list.literal([
                                                                    //the property is missing, it is reported at another place (where the concise and verbose properties are merged)
                                                                ])
                                                            ))
                                                            case 'no': return pt.ss($, ($) => pt.list.literal([
                                                                {
                                                                    'range': id_value_pair.id.range,
                                                                    'type': ['group', ['superfluous property', {
                                                                        'name': pt.optional.literal.set(id_value_pair.id.token.value)
                                                                    }]]
                                                                }
                                                            ]))
                                                            default: return pt.au($[0])
                                                        }
                                                    })
                                                ])
                                            }
                                        )
                                    ]))
                                    default: return pt.au($[0])
                                }
                            }),
                            pt.list.from.list(
                                $.derived.properties.__to_list(($, id) => ({
                                    'id': id,
                                    'value': $
                                }))
                            ).flatten(
                                ($): d_out.Errors => {
                                    const id = $.id
                                    return pt.decide.state($.value.result, ($) => {
                                        switch ($[0]) {
                                            case 'success': return pt.ss($, ($) => pt.list.literal([]))
                                            case 'error': return pt.ss($, ($): d_out.Errors => pt.decide.state($, ($): d_out.Errors => {
                                                switch ($[0]) {
                                                    case 'missing': return pt.ss($, ($): d_out.Errors => pt.list.literal<d_out.Errors.L>([
                                                        {
                                                            'range': $['start token range'],
                                                            'type': ['group', ['missing property', {
                                                                'name': id
                                                            }]]
                                                        }
                                                    ]))
                                                    case 'multiple': return pt.ss($, ($) => $.instances.__l_map(($): d_out.Errors.L => ({
                                                        'range': $.intermediate['id value pair'].id.range,
                                                        'type': ['group', ['duplicate property', {
                                                            'name': $.intermediate['id value pair'].id.token.value
                                                        }]]
                                                    })))
                                                    default: return pt.au($[0])
                                                }
                                            }))
                                            default: return pt.au($[0])
                                        }
                                    })
                                }
                            )
                        ])
                    })
                    case 'simple': return pt.ss($, ($) => pt.list.literal([]))
                    case 'list': return pt.ss($, ($) => pt.list.from.list(
                        $.derived.items
                    ).flatten(
                        ($) => Value($)
                    ))
                    case 'nothing': return pt.ss($, ($) => pt.list.literal([]))
                    case 'reference': return pt.ss($, ($) => pt.decide.state($.type, ($): d_out.Errors => {
                        switch ($[0]) {
                            case 'derived': return pt.ss($, ($) => pt.list.nested_literal_old([
                            ]))
                            case 'selected': return pt.ss($, ($) => pt.list.nested_literal_old([
                            ]))
                            default: return pt.au($[0])
                        }
                    }))
                    case 'component': return pt.ss($, ($) => {
                        return Value($.value)
                    })
                    case 'optional': return pt.ss($, ($) => pt.decide.state($.derived.status, ($) => {
                        switch ($[0]) {
                            case 'set': return pt.ss($, ($) => Value($['child value']))
                            case 'not set': return pt.ss($, ($) => pt.list.literal([]))
                            default: return pt.au($[0])
                        }
                    }))
                    case 'state': return pt.ss($, ($): d_out.Errors => {
                        return pt.decide.state($.derived['option status'], ($): d_out.Errors => {
                            switch ($[0]) {
                                case 'missing data': return pt.ss($, ($) => pt.list.literal([
                                    {
                                        'range': $.intermediate.range,
                                        'type': ['state', ['missing option', null]]
                                    }
                                ]))
                                case 'set': return pt.ss($, ($) => Value($.value))
                                default: return pt.au($[0])
                            }
                        })
                    })
                    case 'text': return pt.ss($, ($) => pt.list.literal([]))
                    default: return pt.au($[0])
                }
            }))
            default: return pt.au($[0])
        }
    })
}