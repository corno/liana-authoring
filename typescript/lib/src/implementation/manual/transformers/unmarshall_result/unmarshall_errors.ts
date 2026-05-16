import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'

//data types
import * as d_in from "../../../../interface/to_be_generated/unmarshall_result"
import * as d_out from "../../../../interface/generated/liana/schemas/unmarshall_errors/data"

//dependencies
import * as t_astn_parse_tree_to_location from "astn-core/dist/implementation/manual/transformers/parse_tree/start_token_range"

export type Document = _pi.Transformer<
    d_in.Document,
    d_out.Errors
>

export type Value = _pi.Transformer<
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
    return _p.decide.state($['unmarshall result'], ($): d_out.Errors => {
        switch ($[0]) {
            case 'error': return _p.ss($, ($) => _p.decide.state($, ($): d_out.Errors => {
                switch ($[0]) {
                    case 'incorrect': return _p.ss($, ($) => _p.decide.state($, ($): d_out.Errors => {
                        switch ($[0]) {
                            case 'wrong type': return _p.ss($, ($) => _p.list.literal([
                                {
                                    'range': start_token_range,
                                    'type': ['value', ['invalid type', {
                                        'expected': _p.decide.state(def, ($): d_out.Errors.L.type_.value.invalid_type.expected => {
                                            switch ($[0]) {
                                                case 'state': return _p.ss($, ($) => _p.list.literal([['state', null]]))
                                                case 'component': return _p.ss($, ($) => _p_unreachable_code_path("a component cannot be incorrect by itself"))
                                                case 'dictionary': return _p.ss($, ($) => _p.list.literal([['dictionary', null]]))
                                                case 'group': return _p.ss($, ($) => _p.list.literal([['group', null]]))
                                                case 'list': return _p.ss($, ($) => _p.list.literal([['list', null]]))
                                                case 'nothing': return _p.ss($, ($) => _p.list.literal([['nothing', null]]))
                                                case 'simple': return _p.ss($, ($) => _p.list.literal([['text', null]]))
                                                case 'optional': return _p.ss($, ($) => _p.list.literal([['optional', null]]))
                                                case 'reference': return _p.ss($, ($) => _p.decide.state($.type, ($) => {
                                                    switch ($[0]) {
                                                        case 'derived': return _p.ss($, ($) => _p.list.literal([['nothing', null]]))
                                                        case 'selected': return _p.ss($, ($) => _p.list.literal([['text', null]]))
                                                        default: return _p.au($[0])
                                                    }
                                                }))
                                                case 'text': return _p.ss($, ($) => _p.list.literal([['text', null]]))
                                                default: return _p.au($[0])
                                            }
                                        })
                                    }]]
                                }
                            ]))
                            case 'list as state format error': return _p.ss($, ($) => {
                                const start_token = $.list['[']
                                return _p.decide.state($.type, ($): d_out.Errors => {
                                    switch ($[0]) {
                                        case 'missing option item': return _p.ss($, ($): d_out.Errors => _p.list.literal([
                                            {
                                                'range': start_token.range,
                                                'type': ['state', ['missing option name', null]] //FIXME wrong error
                                            }
                                        ]))
                                        case 'option item is not a text': return _p.ss($, ($) => _p.list.literal([
                                            {
                                                'range': start_token.range,
                                                'type': ['state', ['option name is not a text', null]] //FIXME wrong error
                                            }
                                        ]))
                                        case 'missing value item': return _p.ss($, ($) => _p.list.literal([
                                            {
                                                'range': start_token.range,
                                                'type': ['state', ['missing value', null]] //FIXME wrong error
                                            }
                                        ]))
                                        case 'too many items': return _p.ss($, ($) => _p.list.literal<d_out.Errors.L>([
                                            {
                                                'range': start_token.range,
                                                'type': ['state', ['more than 2 items in list', null]] //FIXME wrong error
                                            }
                                        ]))
                                        default: return _p.au($[0])
                                    }
                                })
                            })
                            case 'unknown option': return _p.ss($, ($) => _p.list.literal([
                                {
                                    'range': $['option token'].range,
                                    'type': ['state', ['unknown option', {
                                        'found': $['option token'].token.value,
                                        'expected': $.definition.options.__d_map(($) => null)
                                    }]]
                                }
                            ]))
                            default: return _p.au($[0])
                        }
                    }))
                    case 'missing': return _p.ss($, ($): d_out.Errors => _p.list.literal([
                        {
                            'range': start_token_range,
                            'type': ['value', ['missing', null]],
                            // 'type': ['error', ['missing value', null]]
                        }
                    ]))

                    default: return _p.au($[0])
                }
            }))
            case 'success': return _p.ss($, ($) => _p.decide.state($, ($): d_out.Errors => {
                switch ($[0]) {
                    case 'dictionary': return _p.ss($, ($) => {

                        return _p.list.nested_literal_old([
                            //duplicate id's
                            _p.list.from.dictionary(
                                $.entries
                            ).flatten(
                                ($, id): d_out.Errors => {
                                    return _p.decide.state($.result, ($): d_out.Errors => {
                                        switch ($[0]) {
                                            case 'success': return _p.ss($, ($) => _p.list.literal([]))
                                            case 'error': return _p.ss($, ($) => _p.decide.state($, ($) => {
                                                switch ($[0]) {
                                                    case 'duplicate': return _p.ss($, ($) => $.instances.__l_map(($): d_out.Errors.L => ({
                                                        'range': $.intermediate['id value pair'].id.range,
                                                        'type': ['dictionary', ['duplicate entry', {
                                                            name: id
                                                        }]]
                                                    })))
                                                    default: return _p.au($[0])
                                                }
                                            }))
                                            default: return _p.au($[0])
                                        }
                                    })
                                }
                            ),
                            //diagnostics for each entry
                            _p.list.from.list(
                                $.intermediate['entries as list'],
                            ).flatten(
                                ($) => {
                                    const is_apostrophed = $.intermediate['id value pair'].id.token.type[0] === 'apostrophed'

                                    return _p.list.nested_literal_old([
                                        $.value.__decide(
                                            ($) => Value($),

                                            () => _p.list.literal<d_out.Errors.L>([
                                                {
                                                    'range': $.intermediate['id value pair'].id.range,
                                                    'type': ['group', ['missing property value', { //missing property value
                                                        name: $.intermediate['id value pair'].id.token.value
                                                    }]]
                                                }
                                            ]), //FIXME! optional node not set is often an error
                                        )
                                    ])
                                }
                            )
                        ])
                    })
                    case 'group': return _p.ss($, ($) => {

                        return _p.list.nested_literal_old([
                            _p.decide.state($.intermediate.type, ($) => {
                                switch ($[0]) {
                                    case 'concise': return _p.ss($, ($) => _p.list.nested_literal_old([
                                        _p.list.from.list(
                                            $.properties
                                        ).flatten(
                                            ($) => {
                                                const item = $.item
                                                return _p.decide.state($['definition found'], ($) => {
                                                    switch ($[0]) {
                                                        case 'no': return _p.ss($, ($) => _p.list.literal([
                                                            {
                                                                'range': t_astn_parse_tree_to_location.Value(item.value),
                                                                'type': ['group', ['superfluous property', {
                                                                    'name': _p.optional.literal.not_set()
                                                                }]]
                                                            }
                                                        ]))
                                                        case 'yes': return _p.ss($, ($) => Value($.value))
                                                        default: return _p.au($[0])
                                                    }
                                                })
                                            }
                                        ),
                                    ]))
                                    case 'verbose': return _p.ss($, ($) => _p.list.nested_literal_old([
                                        //diagnostics for each property
                                        _p.list.from.list(
                                            $.properties,
                                        ).flatten<d_out.Errors.L>(
                                            ($) => {
                                                const id_value_pair = $.intermediate['id value pair']

                                                return _p.list.nested_literal_old([
                                                    _p.decide.state($['definition found'], ($) => {
                                                        switch ($[0]) {
                                                            case 'yes': return _p.ss($, ($) => $.value.__decide(
                                                                ($) => Value($),
                                                                (): d_out.Errors => _p.list.literal([
                                                                    //the property is missing, it is reported at another place (where the concise and verbose properties are merged)
                                                                ])
                                                            ))
                                                            case 'no': return _p.ss($, ($) => _p.list.literal([
                                                                {
                                                                    'range': id_value_pair.id.range,
                                                                    'type': ['group', ['superfluous property', {
                                                                        'name': _p.optional.literal.set(id_value_pair.id.token.value)
                                                                    }]]
                                                                }
                                                            ]))
                                                            default: return _p.au($[0])
                                                        }
                                                    })
                                                ])
                                            }
                                        )
                                    ]))
                                    default: return _p.au($[0])
                                }
                            }),
                            _p.list.from.list(
                                $.properties.__to_list(($, id) => ({
                                    'id': id,
                                    'value': $
                                }))
                            ).flatten(
                                ($): d_out.Errors => {
                                    const id = $.id
                                    return _p.decide.state($.value.result, ($) => {
                                        switch ($[0]) {
                                            case 'success': return _p.ss($, ($) => _p.list.literal([]))
                                            case 'error': return _p.ss($, ($): d_out.Errors => _p.decide.state($, ($): d_out.Errors => {
                                                switch ($[0]) {
                                                    case 'missing': return _p.ss($, ($): d_out.Errors => _p.list.literal<d_out.Errors.L>([
                                                        {
                                                            'range': $['start token range'],
                                                            'type': ['group', ['missing property', {
                                                                'name': id
                                                            }]]
                                                        }
                                                    ]))
                                                    case 'multiple': return _p.ss($, ($) => $.instances.__l_map(($): d_out.Errors.L => ({
                                                        'range': $.intermediate['id value pair'].id.range,
                                                        'type': ['group', ['duplicate property', {
                                                            'name': $.intermediate['id value pair'].id.token.value
                                                        }]]
                                                    })))
                                                    default: return _p.au($[0])
                                                }
                                            }))
                                            default: return _p.au($[0])
                                        }
                                    })
                                }
                            )
                        ])
                    })
                    case 'simple': return _p.ss($, ($) => _p.list.literal([]))
                    case 'list': return _p.ss($, ($) => _p.list.from.list(
                        $.items
                    ).flatten(
                        ($) => Value($)
                    ))
                    case 'nothing': return _p.ss($, ($) => _p.list.literal([]))
                    case 'reference': return _p.ss($, ($) => _p.decide.state($.type, ($): d_out.Errors => {
                        switch ($[0]) {
                            case 'derived': return _p.ss($, ($) => _p.list.nested_literal_old([
                            ]))
                            case 'selected': return _p.ss($, ($) => _p.list.nested_literal_old([
                            ]))
                            default: return _p.au($[0])
                        }
                    }))
                    case 'component': return _p.ss($, ($) => {
                        return Value($.value)
                    })
                    case 'optional': return _p.ss($, ($) => _p.decide.state($.status, ($) => {
                        switch ($[0]) {
                            case 'set': return _p.ss($, ($) => Value($['child value']))
                            case 'not set': return _p.ss($, ($) => _p.list.literal([]))
                            default: return _p.au($[0])
                        }
                    }))
                    case 'state': return _p.ss($, ($): d_out.Errors => {
                        return _p.decide.state($['option status'], ($): d_out.Errors => {
                            switch ($[0]) {
                                case 'missing data': return _p.ss($, ($) => _p.list.literal([
                                    {
                                        'range': $.intermediate.range,
                                        'type': ['state', ['missing option', null]]
                                    }
                                ]))
                                case 'set': return _p.ss($, ($) => Value($.value))
                                default: return _p.au($[0])
                            }
                        })
                    })
                    case 'text': return _p.ss($, ($) => _p.list.literal([]))
                    default: return _p.au($[0])
                }
            }))
            default: return _p.au($[0])
        }
    })
}