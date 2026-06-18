import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'
import p_unreachable_code_path from 'pareto-core/dist/implementation/specials/unreachable_code_path'

//data types
import * as d_in from "../../../../interface/data/unmarshall_result"
import * as d_out from "../../../../interface/generated/liana/schemas/unmarshall_errors/data"

//dependencies
import * as t_astn_parse_tree_to_location from "astn-core/dist/implementation/manual/transformers/parse_tree/start_token_range"

export type Document = p_i.Transformer<
    d_in.Document,
    d_out.Errors
>

export type Value = p_i.Transformer<
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
    return p_.from.state($['unmarshall result']).decide(($): d_out.Errors => {
        switch ($[0]) {
            case 'error': return p_.ss($, ($) => p_.from.state($).decide(($): d_out.Errors => {
                switch ($[0]) {
                    case 'incorrect': return p_.ss($, ($) => p_.from.state($).decide(($): d_out.Errors => {
                        switch ($[0]) {
                            case 'wrong type': return p_.ss($, ($) => p_.literal.list([
                                {
                                    'range': start_token_range,
                                    'type': ['value', ['invalid type', {
                                        'expected': p_.from.state(def).decide(($): d_out.Errors.L.type_.value.invalid_type.expected => {
                                            switch ($[0]) {
                                                case 'state': return p_.ss($, ($) => p_.literal.list([['state', null]]))
                                                case 'component': return p_.ss($, ($) => p_unreachable_code_path("a component cannot be incorrect by itself"))
                                                case 'dictionary': return p_.ss($, ($) => p_.literal.list([['dictionary', null]]))
                                                case 'group': return p_.ss($, ($) => p_.literal.list([['group', null]]))
                                                case 'list': return p_.ss($, ($) => p_.literal.list([['list', null]]))
                                                case 'nothing': return p_.ss($, ($) => p_.literal.list([['nothing', null]]))
                                                case 'simple': return p_.ss($, ($) => p_.literal.list([['text', null]]))
                                                case 'optional': return p_.ss($, ($) => p_.literal.list([['optional', null]]))
                                                case 'reference': return p_.ss($, ($) => p_.from.state($.type).decide(($) => {
                                                    switch ($[0]) {
                                                        case 'derived': return p_.ss($, ($) => p_.literal.list([['nothing', null]]))
                                                        case 'selected': return p_.ss($, ($) => p_.literal.list([['text', null]]))
                                                        default: return p_.au($[0])
                                                    }
                                                }))
                                                case 'text': return p_.ss($, ($) => p_.literal.list([['text', null]]))
                                                default: return p_.au($[0])
                                            }
                                        })
                                    }]]
                                }
                            ]))
                            case 'list as state format error': return p_.ss($, ($) => {
                                const start_token = $.list['[']
                                return p_.from.state($.type).decide(($): d_out.Errors => {
                                    switch ($[0]) {
                                        case 'missing option item': return p_.ss($, ($): d_out.Errors => p_.literal.list([
                                            {
                                                'range': start_token.range,
                                                'type': ['state', ['missing option name', null]] //FIXME wrong error
                                            }
                                        ]))
                                        case 'option item is not a text': return p_.ss($, ($) => p_.literal.list([
                                            {
                                                'range': start_token.range,
                                                'type': ['state', ['option name is not a text', null]] //FIXME wrong error
                                            }
                                        ]))
                                        case 'missing value item': return p_.ss($, ($) => p_.literal.list([
                                            {
                                                'range': start_token.range,
                                                'type': ['state', ['missing value', null]] //FIXME wrong error
                                            }
                                        ]))
                                        case 'too many items': return p_.ss($, ($) => p_.literal.list<d_out.Errors.L>([
                                            {
                                                'range': start_token.range,
                                                'type': ['state', ['more than 2 items in list', null]] //FIXME wrong error
                                            }
                                        ]))
                                        default: return p_.au($[0])
                                    }
                                })
                            })
                            case 'unknown option': return p_.ss($, ($) => p_.literal.list([
                                {
                                    'range': $['option token'].range,
                                    'type': ['state', ['unknown option', {
                                        'found': $['option token'].token.value,
                                        'expected': $.definition.options.__d_map_deprecated(($) => null)
                                    }]]
                                }
                            ]))
                            default: return p_.au($[0])
                        }
                    }))
                    case 'missing': return p_.ss($, ($): d_out.Errors => p_.literal.list([
                        {
                            'range': start_token_range,
                            'type': ['value', ['missing', null]],
                            // 'type': ['error', ['missing value', null]]
                        }
                    ]))

                    default: return p_.au($[0])
                }
            }))
            case 'success': return p_.ss($, ($) => p_.from.state($).decide(($): d_out.Errors => {
                switch ($[0]) {
                    case 'dictionary': return p_.ss($, ($) => {

                        return p_.literal.nested_list([
                            //duplicate id's
                            p_.from.dictionary(
                                $.derived.entries
                            ).flatten_to_list(
                                ($, id): d_out.Errors => {
                                    return p_.from.state($.result).decide(($): d_out.Errors => {
                                        switch ($[0]) {
                                            case 'success': return p_.ss($, ($) => p_.literal.list([]))
                                            case 'error': return p_.ss($, ($) => p_.from.state($).decide(($) => {
                                                switch ($[0]) {
                                                    case 'duplicate': return p_.ss($, ($) => $.instances.__l_map_deprecated(($): d_out.Errors.L => ({
                                                        'range': $.intermediate['id value pair'].id.range,
                                                        'type': ['dictionary', ['duplicate entry', {
                                                            name: id
                                                        }]]
                                                    })))
                                                    default: return p_.au($[0])
                                                }
                                            }))
                                            default: return p_.au($[0])
                                        }
                                    })
                                }
                            ),
                            //diagnostics for each entry
                            p_.from.list(
                                $.intermediate['entries as list'],
                            ).flatten(
                                ($) => {
                                    const intermediate = $.intermediate
                                    return p_.literal.nested_list([
                                        p_.from.state($.value).decide(($) => {
                                            switch ($[0]) {
                                                case 'set': return p_.ss($, ($) => Value($))
                                                case 'not set': return p_.ss($, ($) => p_.literal.list<d_out.Errors.L>([
                                                {
                                                    'range': intermediate['id value pair'].id.range,
                                                    'type': ['group', ['missing property value', { //missing property value
                                                        name: intermediate['id value pair'].id.token.value
                                                    }]]
                                                }
                                            ]))
                                                default: return p_.au($[0])
                                            }
                                        })
                                    ])
                                }
                            )
                        ])
                    })
                    case 'group': return p_.ss($, ($) => {

                        return p_.literal.nested_list([
                            p_.from.state($.derived.style).decide(($) => {
                                switch ($[0]) {
                                    case 'concise': return p_.ss($, ($) => p_.literal.nested_list([
                                        p_.from.list(
                                            $.properties
                                        ).flatten(
                                            ($) => {
                                                const item = $.item
                                                return p_.from.state($['definition found']).decide(($): d_out.Errors => {
                                                    switch ($[0]) {
                                                        case 'no': return p_.ss($, ($) => p_.literal.list([
                                                            {
                                                                'range': t_astn_parse_tree_to_location.Value(item.value),
                                                                'type': ['group', ['superfluous property', {
                                                                    'name': p_.literal.not_set()
                                                                }]]
                                                            }
                                                        ]))
                                                        case 'yes': return p_.ss($, ($) => Value($['value']))
                                                        default: return p_.au($[0])
                                                    }
                                                })
                                            }
                                        ),
                                    ]))
                                    case 'verbose': return p_.ss($, ($) => p_.literal.nested_list([
                                        //diagnostics for each property
                                        p_.from.list(
                                            $.properties,
                                        ).flatten<d_out.Errors.L>(
                                            ($) => {
                                                const id_value_pair = $.intermediate['id value pair']

                                                return p_.literal.nested_list([
                                                    p_.from.state($['definition found']).decide(($): d_out.Errors => {
                                                        switch ($[0]) {
                                                            case 'yes': return p_.ss($, ($) => $['value'].__decide(
                                                                ($) => Value($),
                                                                (): d_out.Errors => p_.literal.list([
                                                                    //the property is missing, it is reported at another place (where the concise and verbose properties are merged)
                                                                ])
                                                            ))
                                                            case 'no': return p_.ss($, ($) => p_.literal.list([
                                                                {
                                                                    'range': id_value_pair.id.range,
                                                                    'type': ['group', ['superfluous property', {
                                                                        'name': p_.literal.set(id_value_pair.id.token.value)
                                                                    }]]
                                                                }
                                                            ]))
                                                            default: return p_.au($[0])
                                                        }
                                                    })
                                                ])
                                            }
                                        )
                                    ]))
                                    default: return p_.au($[0])
                                }
                            }),
                            p_.from.dictionary(
                                $.derived.properties
                            ).flatten_to_list(
                                ($, id): d_out.Errors => {
                                    return p_.from.state($.result).decide(($) => {
                                        switch ($[0]) {
                                            case 'success': return p_.ss($, ($) => p_.literal.list([]))
                                            case 'error': return p_.ss($, ($): d_out.Errors => p_.from.state($).decide(($): d_out.Errors => {
                                                switch ($[0]) {
                                                    case 'missing': return p_.ss($, ($): d_out.Errors => p_.literal.list<d_out.Errors.L>([
                                                        {
                                                            'range': $['start token range'],
                                                            'type': ['group', ['missing property', {
                                                                'name': id
                                                            }]]
                                                        }
                                                    ]))
                                                    case 'multiple': return p_.ss($, ($) => $.instances.__l_map_deprecated(($): d_out.Errors.L => ({
                                                        'range': $.intermediate['id value pair'].id.range,
                                                        'type': ['group', ['duplicate property', {
                                                            'name': $.intermediate['id value pair'].id.token.value
                                                        }]]
                                                    })))
                                                    default: return p_.au($[0])
                                                }
                                            }))
                                            default: return p_.au($[0])
                                        }
                                    })
                                }
                            )
                        ])
                    })
                    case 'simple': return p_.ss($, ($) => p_.literal.list([]))
                    case 'list': return p_.ss($, ($) => p_.from.list(
                        $.derived.items
                    ).flatten(
                        ($) => Value($)
                    ))
                    case 'nothing': return p_.ss($, ($) => p_.literal.list([]))
                    case 'reference': return p_.ss($, ($) => p_.from.state($.type).decide(($): d_out.Errors => {
                        switch ($[0]) {
                            case 'derived': return p_.ss($, ($) => p_.literal.nested_list([
                            ]))
                            case 'selected': return p_.ss($, ($) => p_.literal.nested_list([
                            ]))
                            default: return p_.au($[0])
                        }
                    }))
                    case 'component': return p_.ss($, ($) => {
                        return Value($.value)
                    })
                    case 'optional': return p_.ss($, ($) => p_.from.state($.derived.status).decide(($) => {
                        switch ($[0]) {
                            case 'set': return p_.ss($, ($) => Value($['child value']))
                            case 'not set': return p_.ss($, ($) => p_.literal.list([]))
                            default: return p_.au($[0])
                        }
                    }))
                    case 'state': return p_.ss($, ($): d_out.Errors => {
                        return p_.from.state($.derived['option status']).decide(($): d_out.Errors => {
                            switch ($[0]) {
                                case 'missing data': return p_.ss($, ($) => p_.literal.list([
                                    {
                                        'range': $.intermediate.range,
                                        'type': ['state', ['missing option', null]]
                                    }
                                ]))
                                case 'set': return p_.ss($, ($) => Value($.value))
                                default: return p_.au($[0])
                            }
                        })
                    })
                    case 'text': return p_.ss($, ($) => p_.literal.list([]))
                    default: return p_.au($[0])
                }
            }))
            default: return p_.au($[0])
        }
    })
}