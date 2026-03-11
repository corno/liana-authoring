import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'

//data types
import * as d_in from "../../../../interface/to_be_generated/unmashall_result"
import * as d_out from "pareto-liana/dist/interface/generated/liana/schemas/unmarshall_errors/data"
import * as d_in_astn_parse_tree from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"

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
    return Value($.content)
}

export const Value: Value = ($) => {
    const instance = $.instance
    return _p.decide.state($.unmarshalled, ($): d_out.Errors => {
        switch ($[0]) {
            case 'missing': return _p.ss($, ($): d_out.Errors => _p.list.literal([

                {
                    'range': t_astn_parse_tree_to_location.Value(instance),
                    'type': ['error', ['missing property', {
                        name: "MISSING VALUE, FIX ERROR"
                    }]],
                    // 'type': ['error', ['missing value', null]]
                }
            ]))
            case 'group': return _p.ss($, ($) => {
                const group_def = $.definition
                return _p.decide.state($['found value type'], ($): d_out.Errors => {
                    switch ($[0]) {
                        case 'valid': return _p.ss($, ($) => {
                            const group_start_token = _p.decide.state($.instance, ($): d_in_astn_parse_tree.Structural_Token => {
                                switch ($[0]) {
                                    case 'dictionary': return _p.ss($, ($) => $['{'])
                                    case 'group': return _p.ss($, ($) => _p.decide.state($, ($) => {
                                        switch ($[0]) {
                                            case 'verbose': return _p.ss($, ($) => $['('])
                                            case 'concise': return _p.ss($, ($) => $['<'])
                                            default: return _p.au($[0])
                                        }
                                    }))
                                    case 'list': return _p.ss($, ($) => $['['])
                                    default: return _p.au($[0])
                                }
                            })
                            return _p.decide.state($.type, ($) => {
                                switch ($[0]) {
                                    case 'concise': return _p.ss($, ($) => _p.list.nested_literal_old([
                                        _p.list.from.list(
                                            _p.list.from.list(
                                                _p.list.from.dictionary(group_def).convert(($, id) => ({ 'id': id, 'definition': $ }))
                                            ).join(
                                                $.properties,
                                                ($, $o) => ({
                                                    'implementation': $o,
                                                    'id': $.id,
                                                })
                                            ),
                                        ).flatten(
                                            ($): d_out.Errors => {
                                                return $.implementation.__decide(
                                                    ($) => _p.list.literal([]),
                                                    () => _p.list.literal([
                                                        {
                                                            'range': group_start_token.range,
                                                            'type': ['error', ['missing property', {
                                                                name: $.id
                                                            }]]
                                                        }
                                                    ])
                                                )
                                            }
                                        ),
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
                                                                'type': ['error', ['superfluous property', {
                                                                    'name': _p.optional.literal.not_set()
                                                                }]]
                                                            }
                                                        ]))
                                                        case 'yes': return _p.ss($, ($) => Value($.value,))
                                                        default: return _p.au($[0])
                                                    }
                                                })
                                            }
                                        ),
                                    ]))
                                    case 'verbose': return _p.ss($, ($) => _p.list.nested_literal_old([
                                        _p.list.from.dictionary(
                                            _p.dictionary.from.dictionary(
                                                group_def
                                            ).join(
                                                _p.dictionary.from.list(
                                                    $.properties,
                                                ).group(
                                                    ($) => $['id value pair'].id.value
                                                ),
                                                ($, $o, id) => $o
                                            ),
                                        ).flatten(
                                            ($, id): d_out.Errors => {
                                                return $.__decide(
                                                    ($) => _p.decide.list($).has_single_item(
                                                        ($) => _p.list.literal([]),
                                                        ($) => $.__l_map(($): d_out.Errors.L => ({
                                                            'range': $['id value pair'].id.range,
                                                            'type': ['error', ['duplicate property', {
                                                                name: id
                                                            }]]
                                                        })),
                                                        () => _p_unreachable_code_path("the list is the result of a group operation, it could never have been created if there was not at least one item")
                                                    ),
                                                    () => _p.list.literal([
                                                        {
                                                            'range': group_start_token.range,
                                                            'type': ['error', ['missing property', {
                                                                name: id
                                                            }]]
                                                        }
                                                    ])
                                                )
                                            }
                                        ),
                                        _p.list.from.list(
                                            $.properties,
                                        ).flatten<d_out.Errors.L>(
                                            ($) => {
                                                const id_value_pair = $['id value pair']
                                                return _p.decide.state($['definition found'], ($) => {
                                                    switch ($[0]) {
                                                        case 'yes': return _p.ss($, ($) => $.value.__decide(
                                                            ($) => Value($),
                                                            (): d_out.Errors => _p.list.literal([
                                                                {
                                                                    'range': id_value_pair.id.range,
                                                                    'type': ['error', ['missing property', { //'missing property value'
                                                                        'name': id_value_pair.id.value
                                                                    }]]
                                                                }
                                                            ])
                                                        ))
                                                        case 'no': return _p.ss($, ($) => _p.list.literal([
                                                            {
                                                                'range': id_value_pair.id.range,
                                                                'type': ['error', ['superfluous property', {
                                                                    'name': _p.optional.literal.set(id_value_pair.id.value)
                                                                }]]
                                                            }
                                                        ]))
                                                        default: return _p.au($[0])
                                                    }
                                                })
                                            }
                                        )
                                    ]))
                                    default: return _p.au($[0])
                                }
                            })
                        })
                        case 'invalid': return _p.ss($, ($) => _p.list.literal([
                            {
                                'range': t_astn_parse_tree_to_location.Value($),
                                'type': ['error', ['invalid value type', {
                                    'expected': _p.list.literal([['verbose group', null]]),
                                }]]
                            }
                        ]))
                        default: return _p.au($[0])
                    }
                })
            })
            case 'dictionary': return _p.ss($, ($) => _p.decide.state($['found value type'], ($): d_out.Errors => {
                switch ($[0]) {
                    case 'valid': return _p.ss($, ($) => {
                        return _p.list.nested_literal_old([
                            _p.list.from.dictionary(
                                _p.dictionary.from.list(
                                    $.entries
                                ).group(
                                    ($) => $['id value pair'].id.value
                                )
                            ).flatten(
                                ($, id): d_out.Errors => {
                                    return _p.decide.list($).has_single_item(
                                        ($) => _p.list.literal([]),
                                        ($) => $.__l_map(($): d_out.Errors.L => ({
                                            'range': $['id value pair'].id.range,
                                            'type': ['error', ['duplicate entry', {
                                                name: id
                                            }]]
                                        })),
                                        () => _p_unreachable_code_path("the list is the result of a group operation, it could never have been created if there was not at least one item")
                                    )
                                }
                            ),
                            _p.list.from.list(
                                $.entries,
                            ).flatten(
                                ($) => $.value.__decide(
                                    ($) => Value($),

                                    () => _p.list.literal<d_out.Errors.L>([
                                        {
                                            'range': $['id value pair'].id.range,
                                            'type': ['error', ['missing property value', { //missing property value
                                                name: $['id value pair'].id.value
                                            }]]
                                        }
                                    ]), //FIXME! optional node not set is often an error
                                )
                            )
                        ])
                    })
                    case 'invalid': return _p.ss($, ($) => _p.list.literal([
                        {
                            'range': t_astn_parse_tree_to_location.Value($),
                            'type': ['error', ['invalid value type', {
                                'expected': _p.list.literal([['dictionary', null]]),
                            }]]
                        }
                    ]))
                    default: return _p.au($[0])
                }
            }))
            case 'number': return _p.ss($, ($) => _p.decide.state($['found value type'], ($) => {
                switch ($[0]) {
                    case 'valid': return _p.ss($, ($): d_out.Errors => $['correct string type']
                        ? _p.list.literal([])
                        : _p.list.literal<d_out.Errors.L>([{
                            'range': $.instance.range,
                            'type': ['warning', ['expected undelimited string', null]]
                        }]))
                    case 'invalid': return _p.ss($, ($) => _p.list.literal([
                        {
                            'range': t_astn_parse_tree_to_location.Value($),
                            'type': ['error', ['invalid value type', {
                                'expected': _p.list.literal([['text', null]]),
                            }]]
                        }
                    ]))
                    default: return _p.au($[0])
                }
            }))
            case 'boolean': return _p.ss($, ($) => _p.decide.state($['found value type'], ($) => {
                switch ($[0]) {
                    case 'valid': return _p.ss($, ($): d_out.Errors => $['correct string type']
                        ? _p.list.literal([])
                        : _p.list.literal<d_out.Errors.L>([{
                            'range': $.instance.range,
                            'type': ['warning', ['expected undelimited string', null]]
                        }]))
                    case 'invalid': return _p.ss($, ($) => _p.list.literal([
                        {
                            'range': t_astn_parse_tree_to_location.Value($),
                            'type': ['error', ['invalid value type', {
                                'expected': _p.list.literal([['text', null]]),
                            }]]
                        }
                    ]))
                    default: return _p.au($[0])
                }
            }))
            case 'list': return _p.ss($, ($) => _p.decide.state($['found value type'], ($) => {
                switch ($[0]) {
                    case 'valid': return _p.ss($, ($): d_out.Errors => _p.list.from.list(
                        $.items
                    ).flatten(
                        ($) => Value($)
                    ))
                    case 'invalid': return _p.ss($, ($) => _p.list.literal([
                        {
                            'range': t_astn_parse_tree_to_location.Value($),
                            'type': ['error', ['invalid value type', {
                                'expected': _p.list.literal([['list', null]]),
                            }]]
                        }
                    ]))
                    default: return _p.au($[0])
                }
            }))
            case 'nothing': return _p.ss($, ($) => _p.decide.state($['found value type'], ($) => {
                switch ($[0]) {
                    case 'valid': return _p.ss($, ($): d_out.Errors => _p.list.literal([]))
                    case 'invalid': return _p.ss($, ($) => _p.list.literal([
                        {
                            'range': t_astn_parse_tree_to_location.Value($),
                            'type': ['error', ['invalid value type', {
                                'expected': _p.list.literal([['not set', null]]),
                            }]]
                        }
                    ]))
                    default: return _p.au($[0])
                }
            }))
            case 'reference': return _p.ss($, ($) => _p.decide.state($['found value type'], ($) => {
                switch ($[0]) {
                    case 'valid': return _p.ss($, ($): d_out.Errors => _p.list.literal([]))
                    case 'invalid': return _p.ss($, ($) => _p.list.literal([
                        {
                            'range': t_astn_parse_tree_to_location.Value($),
                            'type': ['error', ['invalid value type', {
                                'expected': _p.list.literal([['text', null]]),
                            }]]
                        }
                    ]))
                    default: return _p.au($[0])
                }
            }))
            case 'component': return _p.ss($, ($) => {
                return Value($.value)
            })
            case 'optional': return _p.ss($, ($) => _p.decide.state($['found value type'], ($) => {
                switch ($[0]) {
                    case 'valid': return _p.ss($, ($): d_out.Errors => _p.decide.state($, ($) => {
                        switch ($[0]) {
                            case 'set': return _p.ss($, ($) => Value($['child value']))
                            case 'not set': return _p.ss($, ($) => _p.list.literal([]))
                            default: return _p.au($[0])
                        }
                    }))
                    case 'invalid': return _p.ss($, ($) => _p.list.literal([
                        {
                            'range': t_astn_parse_tree_to_location.Value($),
                            'type': ['error', ['invalid value type', {
                                'expected': _p.list.literal([['set', null], ['not set', null]]),
                            }]]
                        }
                    ]))
                    default: return _p.au($[0])
                }
            }))
            case 'state': return _p.ss($, ($) => {
                const sg_def = $.definition
                return _p.decide.state($['found value type'], ($): d_out.Errors => {
                    switch ($[0]) {
                        case 'valid': return _p.ss($, ($): d_out.Errors => {
                            return _p.decide.state($['option'], ($): d_out.Errors => {
                                switch ($[0]) {
                                    case 'missing data': return _p.ss($, ($) => _p.list.literal([
                                        {
                                            'range': $.range,
                                            'type': ['error', ['state', ['missing option', null]]]
                                        }
                                    ]))
                                    case 'set': return _p.ss($, ($) => {
                                        const option_token = $['option token']
                                        return _p.decide.state($.option, ($) => {
                                            switch ($[0]) {
                                                case 'known': return _p.ss($, ($) => Value($.value))
                                                case 'unknown': return _p.ss($, ($) => _p.list.literal([
                                                    {
                                                        'range': option_token.range,
                                                        'type': ['error', ['state', ['unknown option', {
                                                            'found': option_token.value,
                                                            'expected': sg_def.options.__d_map(($) => null)
                                                        }]]]
                                                    }
                                                ]))

                                                default: return _p.au($[0])
                                            }
                                        })
                                    })
                                    default: return _p.au($[0])
                                }
                            })
                        })
                        case 'invalid': return _p.ss($, ($) => _p.list.literal([
                            {
                                'range': t_astn_parse_tree_to_location.Value($),
                                'type': ['error', ['invalid value type', {
                                    'expected': _p.list.literal([['state', null]]),
                                }]]
                            }
                        ]))
                        case 'list format error': return _p.ss($, ($) => {
                            const start_token = $.list['[']
                            return _p.decide.state($.type, ($): d_out.Errors => {
                                switch ($[0]) {
                                    case 'missing option item': return _p.ss($, ($): d_out.Errors => _p.list.literal([
                                        {
                                            'range': start_token.range,
                                            'type': ['error', ['state', ['missing option name', null]]] //FIXME wrong error
                                        }
                                    ]))
                                    case 'option item is not a text': return _p.ss($, ($) => _p.list.literal([
                                        {
                                            'range': start_token.range,
                                            'type': ['error', ['state', ['option name is not a text', null]]] //FIXME wrong error
                                        }
                                    ]))
                                    case 'missing value item': return _p.ss($, ($) => _p.list.literal([
                                        {
                                            'range': start_token.range,
                                            'type': ['error', ['state', ['missing value', null]]] //FIXME wrong error
                                        }
                                    ]))
                                    case 'too many items': return _p.ss($, ($) => _p.list.literal([
                                        {
                                            'range': start_token.range,
                                            'type': ['error', ['state', ['more than 2 items', null]]] //FIXME wrong error
                                        }
                                    ]))
                                    default: return _p.au($[0])
                                }
                            })
                        })
                        // case 'more than 2 elements': return _p.ss($, ($) => _p.list.literal([{
                        //     'range': $,
                        //     'type': ['error', ['state', ['more than 2 elements', null]]]
                        // }]))
                        // case 'missing state name': return _p.ss($, ($) => _p.list.literal([{
                        //     'range': $,
                        //     'type': ['error', ['state', ['missing state name', null]]]
                        // }]))
                        // case 'state is not a string': return _p.ss($, ($) => _p.list.literal([{
                        //     'range': $,
                        //     'type': ['error', ['state', ['state is not a string', null]]]
                        // }]))
                        // case 'missing value': return _p.ss($, ($) => _p.list.literal([{
                        //     'range': $,
                        //     'type': ['error', ['state', ['missing value', null]]]
                        // }]))
                        // case 'unknown state': return _p.ss($, ($) => _p.list.literal([{
                        //     'range': $.range,
                        //     'type': ['error', ['state', ['unknown state', {
                        //         'found': $.found,
                        //         'expected': $.expected
                        //     }]]]
                        // }]))
                        default: return _p.au($[0])
                    }
                })
            })
            case 'text': return _p.ss($, ($) => _p.decide.state($['found value type'], ($) => {
                switch ($[0]) {
                    case 'valid': return _p.list.literal([])
                    case 'invalid': return _p.ss($, ($) => _p.list.literal([
                        {
                            'range': t_astn_parse_tree_to_location.Value($),
                            'type': ['error', ['invalid value type', {
                                'expected': _p.list.literal([['text', null]]),
                            }]]
                        }
                    ]))
                    default: return _p.au($[0])
                }
            }))
            default: return _p.au($[0])
        }
    })
}