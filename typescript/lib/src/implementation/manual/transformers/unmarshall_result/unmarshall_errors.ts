import * as p_ from 'pareto-core/implementation/transformer'
import type * as p_i from 'pareto-core/interface/transformer'
import p_unreachable_code_path from 'pareto-core/implementation/transformer/specials/unreachable_code_path'

//data types
import type * as d_in from "../../../../interface/data/unmarshall_result.js"
import type * as d_out from "../../../../interface/generated/liana/schemas/unmarshall_errors/data.js"

export namespace interface_ {
    export type Document = p_i.Transformer<
        d_in.Document,
        d_out.Errors
    >

    export type Value = p_i.Transformer<
        d_in.Value,
        d_out.Errors
    >
}

//dependencies
import * as t_astn_parse_tree_to_location from "astn-core/implementation/manual/transformers/parse_tree/start_token_range"


export const Document: interface_.Document = ($) => {
    return Value(
        $.content
    )
}

export const Value: interface_.Value = ($) => {
    const start_token_range = t_astn_parse_tree_to_location.Value($.instance)
    const $v_def = $.definition
    return p_.from.state($['unmarshall result']).decide(
        ($): d_out.Errors => {
            switch ($[0]) {
                case 'error': return p_.option($, ($) => p_.from.state($).decide(
                    ($): d_out.Errors => {
                        switch ($[0]) {
                            case 'incorrect': return p_.option($, ($) => p_.from.state($).decide(
                                ($): d_out.Errors => {
                                    switch ($[0]) {
                                        case 'wrong type': return p_.option($, ($) => p_.literal.list([
                                            {
                                                'range': start_token_range,
                                                'type': ['value', ['invalid type', {
                                                    'expected': p_.from.state($v_def).decide(
                                                        ($): d_out.Errors.L.type_.value.invalid_type.expected => {
                                                            switch ($[0]) {
                                                                case 'state': return p_.option($, ($) => p_.literal.list([['state', null]]))
                                                                case 'component': return p_.option($, ($) => p_unreachable_code_path("a component cannot be incorrect by itself"))
                                                                case 'dictionary': return p_.option($, ($) => p_.literal.list([['dictionary', null]]))
                                                                case 'group': return p_.option($, ($) => p_.literal.list([['group', null]]))
                                                                case 'list': return p_.option($, ($) => p_.literal.list([['list', null]]))
                                                                case 'nothing': return p_.option($, ($) => p_.literal.list([['nothing', null]]))
                                                                case 'simple': return p_.option($, ($) => p_.literal.list([['text', null]]))
                                                                case 'optional': return p_.option($, ($) => p_.literal.list([['optional', null]]))
                                                                case 'reference': return p_.option($, ($) => p_.from.state($.type).decide(
                                                                    ($) => {
                                                                        switch ($[0]) {
                                                                            case 'derived': return p_.option($, ($) => p_.literal.list([['nothing', null]]))
                                                                            case 'selected': return p_.option($, ($) => p_.literal.list([['text', null]]))
                                                                            default: return p_.exhaustive($[0])
                                                                        }
                                                                    }))
                                                                case 'text': return p_.option($, ($) => p_.literal.list([['text', null]]))
                                                                default: return p_.exhaustive($[0])
                                                            }
                                                        })
                                                }]]
                                            }
                                        ]))
                                        case 'list as state format error': return p_.option($, ($) => {
                                            const start_token = $.list['[']
                                            return p_.from.state($.type).decide(
                                                ($): d_out.Errors => {
                                                    switch ($[0]) {
                                                        case 'missing option item': return p_.option($, ($): d_out.Errors => p_.literal.list([
                                                            {
                                                                'range': start_token.range,
                                                                'type': ['state', ['missing option name', null]] //FIXME wrong error
                                                            }
                                                        ]))
                                                        case 'option item is not a text': return p_.option($, ($) => p_.literal.list([
                                                            {
                                                                'range': start_token.range,
                                                                'type': ['state', ['option name is not a text', null]] //FIXME wrong error
                                                            }
                                                        ]))
                                                        case 'missing value item': return p_.option($, ($) => p_.literal.list([
                                                            {
                                                                'range': start_token.range,
                                                                'type': ['state', ['missing value', null]] //FIXME wrong error
                                                            }
                                                        ]))
                                                        case 'too many items': return p_.option($, ($) => p_.literal.list<d_out.Errors.L>([
                                                            {
                                                                'range': start_token.range,
                                                                'type': ['state', ['more than 2 items in list', null]] //FIXME wrong error
                                                            }
                                                        ]))
                                                        default: return p_.exhaustive($[0])
                                                    }
                                                })
                                        })
                                        case 'unknown option': return p_.option($, ($) => p_.literal.list([
                                            {
                                                'range': $['option token'].range,
                                                'type': ['state', ['unknown option', {
                                                    'found': $['option token'].token.value,
                                                    'expected': p_.from.dictionary($.definition.options).map(
                                                        ($) => null)
                                                }]]
                                            }
                                        ]))
                                        default: return p_.exhaustive($[0])
                                    }
                                }))
                            case 'missing': return p_.option($, ($): d_out.Errors => p_.literal.list([
                                {
                                    'range': start_token_range,
                                    'type': ['value', ['missing', null]],
                                    // 'type': ['error', ['missing value', null]]
                                }
                            ]))

                            default: return p_.exhaustive($[0])
                        }
                    }))
                case 'success': return p_.option($, ($) => p_.from.state($).decide(
                    ($): d_out.Errors => {
                        switch ($[0]) {
                            case 'dictionary': return p_.option($, ($) => {

                                return p_.literal.segmented_list([
                                    //duplicate id's
                                    p_.from.dictionary($.derived.entries).flatten_to_list(
                                        ($, id): d_out.Errors => {
                                            return p_.from.state($.result).decide(
                                                ($): d_out.Errors => {
                                                    switch ($[0]) {
                                                        case 'success': return p_.option($, ($) => p_.literal.list([]))
                                                        case 'error': return p_.option($, ($) => p_.from.state($).decide(
                                                            ($) => {
                                                                switch ($[0]) {
                                                                    case 'duplicate': return p_.option($, ($) => p_.from.list($.instances).map(
                                                                        ($): d_out.Errors.L => ({
                                                                            'range': $.intermediate['id value pair'].id.range,
                                                                            'type': ['dictionary', ['duplicate entry', {
                                                                                name: id
                                                                            }]]
                                                                        })))
                                                                    default: return p_.exhaustive($[0])
                                                                }
                                                            }))
                                                        default: return p_.exhaustive($[0])
                                                    }
                                                })
                                        }
                                    ),
                                    //diagnostics for each entry
                                    p_.from.list($.intermediate['entries as list'],).flatten(
                                        ($) => {
                                            const intermediate = $.intermediate
                                            return p_.from.state($.value).decide(
                                                ($) => {
                                                    switch ($[0]) {
                                                        case 'set': return p_.option($, ($) => Value($))
                                                        case 'not set': return p_.option($, ($) => p_.literal.list<d_out.Errors.L>([
                                                            {
                                                                'range': intermediate['id value pair'].id.range,
                                                                'type': ['group', ['missing property value', { //missing property value
                                                                    name: intermediate['id value pair'].id.token.value
                                                                }]]
                                                            }
                                                        ]))
                                                        default: return p_.exhaustive($[0])
                                                    }
                                                })
                                        }
                                    )
                                ])
                            })
                            case 'group': return p_.option($, ($) => {

                                return p_.literal.segmented_list([
                                    p_.from.state($.derived.style).decide(
                                        ($) => {
                                            switch ($[0]) {
                                                case 'concise': return p_.option($, ($) => p_.from.list($.properties).flatten(
                                                    ($) => {
                                                        const item = $.item
                                                        return p_.from.state($['definition found']).decide(
                                                            ($): d_out.Errors => {
                                                                switch ($[0]) {
                                                                    case 'no': return p_.option($, ($) => p_.literal.list([
                                                                        {
                                                                            'range': t_astn_parse_tree_to_location.Value(item.value),
                                                                            'type': ['group', ['superfluous property', {
                                                                                'name': p_.literal.not_set()
                                                                            }]]
                                                                        }
                                                                    ]))
                                                                    case 'yes': return p_.option($, ($) => Value($['value']))
                                                                    default: return p_.exhaustive($[0])
                                                                }
                                                            })
                                                    }
                                                ))
                                                case 'verbose': return p_.option($, ($) => p_.from.list($.properties,).flatten<d_out.Errors.L>(
                                                    ($) => {
                                                        const id_value_pair = $.intermediate['id value pair']

                                                        return p_.from.state($['definition found']).decide(
                                                            ($): d_out.Errors => {
                                                                switch ($[0]) {
                                                                    case 'yes': return p_.option($, ($) => p_.from.optional($['value']).decide(
                                                                        ($) => Value($),
                                                                        (): d_out.Errors => p_.literal.list([
                                                                            //the property is missing, it is reported at another place (where the concise and verbose properties are merged)
                                                                        ])
                                                                    ))
                                                                    case 'no': return p_.option($, ($) => p_.literal.list([
                                                                        {
                                                                            'range': id_value_pair.id.range,
                                                                            'type': ['group', ['superfluous property', {
                                                                                'name': p_.literal.set(id_value_pair.id.token.value)
                                                                            }]]
                                                                        }
                                                                    ]))
                                                                    default: return p_.exhaustive($[0])
                                                                }
                                                            })
                                                    }
                                                ))
                                                default: return p_.exhaustive($[0])
                                            }
                                        }),
                                    p_.from.dictionary($.derived.properties).flatten_to_list(
                                        ($, id): d_out.Errors => {
                                            return p_.from.state($.result).decide(
                                                ($) => {
                                                    switch ($[0]) {
                                                        case 'success': return p_.option($, ($) => p_.literal.list([]))
                                                        case 'error': return p_.option($, ($): d_out.Errors => p_.from.state($).decide(
                                                            ($): d_out.Errors => {
                                                                switch ($[0]) {
                                                                    case 'missing': return p_.option($, ($): d_out.Errors => p_.literal.list<d_out.Errors.L>([
                                                                        {
                                                                            'range': $['start token range'],
                                                                            'type': ['group', ['missing property', {
                                                                                'name': id
                                                                            }]]
                                                                        }
                                                                    ]))
                                                                    case 'multiple': return p_.option($, ($) => p_.from.list($.instances).map(
                                                                        ($): d_out.Errors.L => ({
                                                                            'range': $.intermediate['id value pair'].id.range,
                                                                            'type': ['group', ['duplicate property', {
                                                                                'name': $.intermediate['id value pair'].id.token.value
                                                                            }]]
                                                                        })))
                                                                    default: return p_.exhaustive($[0])
                                                                }
                                                            }))
                                                        default: return p_.exhaustive($[0])
                                                    }
                                                })
                                        }
                                    )
                                ])
                            })
                            case 'simple': return p_.option($, ($) => p_.literal.list([]))
                            case 'list': return p_.option($, ($) => p_.from.list($.derived.items).flatten(
                                ($) => Value($)
                            ))
                            case 'nothing': return p_.option($, ($) => p_.literal.list([]))
                            case 'reference': return p_.option($, ($) => p_.from.state($.type).decide(
                                ($): d_out.Errors => {
                                    switch ($[0]) {
                                        case 'derived': return p_.option($, ($) => p_.literal.list([
                                        ]))
                                        case 'selected': return p_.option($, ($) => p_.literal.list([
                                        ]))
                                        default: return p_.exhaustive($[0])
                                    }
                                }))
                            case 'component': return p_.option($, ($) => {
                                return Value($.value)
                            })
                            case 'optional': return p_.option($, ($) => p_.from.state($.derived.status).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'set': return p_.option($, ($) => Value($['child value']))
                                        case 'not set': return p_.option($, ($) => p_.literal.list([]))
                                        default: return p_.exhaustive($[0])
                                    }
                                }))
                            case 'state': return p_.option($, ($): d_out.Errors => {
                                return p_.from.state($.derived['option status']).decide(
                                    ($): d_out.Errors => {
                                        switch ($[0]) {
                                            case 'missing data': return p_.option($, ($) => p_.literal.list([
                                                {
                                                    'range': $.intermediate.range,
                                                    'type': ['state', ['missing option', null]]
                                                }
                                            ]))
                                            case 'set': return p_.option($, ($) => Value($.value))
                                            default: return p_.exhaustive($[0])
                                        }
                                    })
                            })
                            case 'text': return p_.option($, ($) => p_.literal.list([]))
                            default: return p_.exhaustive($[0])
                        }
                    }))
                default: return p_.exhaustive($[0])
            }
        })
}