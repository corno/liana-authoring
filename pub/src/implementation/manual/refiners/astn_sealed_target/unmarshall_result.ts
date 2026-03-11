import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'

//data types
import * as d_in from "../../../../interface/to_be_generated/unmashall_result"
import * as d_out from "astn-core/dist/interface/generated/liana/schemas/sealed_target/data"
import * as d_in_astn_parse_tree from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"
import * as d_function from "../../../../interface/to_be_generated/sealed_target_from_unmarshall_result"

//dependencies
import * as t_astn_parse_tree_to_location from "astn-core/dist/implementation/manual/transformers/parse_tree/start_token_range"
import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'

//signatures
export type Document = _pi.Refiner<d_out.Document, d_function.Error, d_in.Document>
export type Value = _pi.Refiner<d_out.Value, d_function.Error, d_in.Value>

export const Found = ($: d_in_astn_parse_tree.Value): d_function.Found => {
    return _p.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'concrete': return _p.ss($, ($): d_function.Found => _p.decide.state($, ($) => {
                switch ($[0]) {
                    case 'dictionary': return _p.ss($, ($) => ['dictionary', null])
                    case 'group': return _p.ss($, ($) => ['group', null])
                    case 'list': return _p.ss($, ($) => ['list', null])
                    case 'nothing': return _p.ss($, ($) => ['nothing', null])
                    case 'optional': return _p.ss($, ($) => ['optional', null])
                    case 'state': return _p.ss($, ($) => ['state', null])
                    case 'text': return _p.ss($, ($) => ['text', {
                        'value': $.value
                    }])
                    default: return _p.au($[0])
                }
            }))
            case 'include': return _p.ss($, ($) => ['include', null])
            case 'missing': return _p.ss($, ($) => ['missing data', null])
            default: return _p.au($[0])
        }
    })
}

//implementations
export const Document: Document = ($, abort) => {
    return Value($.content, abort)
}

export const Value: Value = ($, abort) => {
    const definition_path = $['definition path']
    const instance = $.instance
    return _p.decide.state($.unmarshalled, ($): d_out.Value => {
        switch ($[0]) {
            case 'missing': return _p.ss($, ($) => abort({
                'definition path': definition_path,
                'type': ['dictionary', ['foo', null]],
                'range': t_astn_parse_tree_to_location.Value(instance)
            }))
            case 'boolean': return _p.ss($, ($): d_out.Value => ['text', {
                'value': _p.decide.state($['found value type'], ($) => {
                    switch ($[0]) {
                        case 'valid': return _p.ss($, ($) => $.instance.value)
                        default: return _p.ss($, ($) => abort({
                            'definition path': definition_path,
                            'type': ['boolean', ['wrong type', null]],
                            'range': t_astn_parse_tree_to_location.Value($)
                        }))
                    }
                }),
                'delimiter': ['none', null],

            }])
            case 'component': return _p.ss($, ($) => Value($.value, abort))
            case 'dictionary': return _p.ss($, ($) => ['dictionary', _p.decide.state($['found value type'], ($): d_out.Value.dictionary => {
                switch ($[0]) {
                    case 'valid': return _p.ss($, ($) => {
                        const dictionary_range = $.instance['{'].range

                        const grouped = _p.dictionary.from.list(
                            $.entries
                        ).group(
                            ($) => $['id value pair'].id.value
                        )
                        return grouped.__d_map(($, id) => _p.decide.list($).has_single_item(
                            ($) => {
                                const id = $['id value pair'].id
                                return $.value.__decide(
                                    ($) => Value($, abort),
                                    () => abort({
                                        'definition path': definition_path,
                                        'type': ['dictionary', ['foo', null]],
                                        'range': id.range
                                    }),
                                )
                            },
                            () => abort({
                                'definition path': definition_path,
                                'type': ['dictionary', ['foo', null]],
                                'range': dictionary_range
                            }),
                            () => abort({
                                'definition path': definition_path,
                                'type': ['dictionary', ['foo', null]],
                                'range': dictionary_range
                            })
                        ))
                    })
                    case 'invalid': return _p.ss($, ($) => abort({
                        'definition path': definition_path,
                        'type': ['dictionary', ['wrong type', Found($)]],
                        'range': t_astn_parse_tree_to_location.Value($)
                    }))
                    default: return _p.au($[0])
                }
            })])
            case 'group': return _p.ss($, ($) => {
                const def = $
                return ['group', ['verbose', _p.decide.state($['found value type'], ($): d_out.Value.group.verbose => {
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
                                    case 'verbose': return _p.ss($, ($): d_out.Value.group.verbose => _p.dictionary.from.dictionary(
                                        def.definition
                                    ).join(
                                        _p.dictionary.from.list(
                                            $.properties
                                        ).group(
                                            ($) => $['id value pair'].id.value
                                        ),
                                        ($, $o, id): d_out.Value.group.verbose.D => $o.__decide(
                                            ($) => _p.decide.list(
                                                $
                                            ).has_single_item(
                                                ($) => {
                                                    const id_value_pair = $['id value pair']
                                                    return _p.decide.state($['definition found'], ($) => {
                                                        switch ($[0]) {
                                                            case 'yes': return _p.ss($, ($) => $.value.__decide(
                                                                ($) => Value($, abort),
                                                                () => abort({
                                                                    'definition path': definition_path,
                                                                    'type': ['group', ['missing property value', {
                                                                        'name': id
                                                                    }]],
                                                                    'range': id_value_pair.id.range
                                                                }),
                                                            ))
                                                            case 'no': return _p.ss($, ($) => _p_unreachable_code_path("the definition should be there, as we start this logic by iterating over the properties in the definition"))
                                                            default: return _p.au($[0])
                                                        }
                                                    })
                                                },
                                                ($) => abort({
                                                    'definition path': definition_path,
                                                    'type': ['group', ['multiple instances for property', {
                                                        'name': id
                                                    }]],
                                                    'range': group_start_token.range
                                                }),
                                                () => _p_unreachable_code_path("the list is the result of a group operation, it could never have been created if there was not at least one item")
                                            ),
                                            () => abort({
                                                'definition path': definition_path,
                                                'type': ['group', ['missing property', {
                                                    'name': id
                                                }]],
                                                'range': group_start_token.range
                                            })
                                        )
                                    ))
                                    case 'concise': return _p.ss($, ($): d_out.Value.group.verbose => {
                                        return _p.dictionary.from.dictionary(
                                            def.definition
                                        ).join(
                                            _p.dictionary.from.list(
                                                _p.list.from.list(
                                                    $.properties
                                                ).filter(
                                                    ($) => _p.decide.state($['definition found'], ($): _pi.Optional_Value<d_in.Concise_Property_Definition_Found__yes> => {
                                                        switch ($[0]) {
                                                            case 'yes': return _p.ss($, ($) => _p.optional.literal.set($))
                                                            case 'no': return _p.ss($, ($) => _p.optional.literal.not_set())
                                                            default: return _p.au($[0])
                                                        }
                                                    })
                                                )
                                            ).group(
                                                ($) => $.id
                                            ),
                                            ($, $o, id) => $o.__decide(
                                                ($) => _p.decide.list(
                                                    $
                                                ).has_single_item(
                                                    ($) => Value($.value, abort),
                                                    () => _p_unreachable_code_path("this is the concise notation, there cannot be multiple instances of the same property"),
                                                    () => _p_unreachable_code_path("the list is the result of a group operation, it could never have been created if there was not at least one item")
                                                ),
                                                () => abort({
                                                    'definition path': definition_path,
                                                    'type': ['group', ['missing property', {
                                                        'name': id
                                                    }]],
                                                    'range': group_start_token.range
                                                })
                                            )
                                        )
                                    })
                                    default: return _p.au($[0])
                                }
                            })
                        })
                        case 'invalid': return _p.ss($, ($) => abort({
                            'definition path': definition_path,
                            'type': ['group', ['wrong type', null]],
                            'range': t_astn_parse_tree_to_location.Value($)
                        }))
                        default: return _p.au($[0])
                    }
                })]]
            })
            case 'list': return _p.ss($, ($) => ['list', _p.decide.state($['found value type'], ($): d_out.Value.list => {
                switch ($[0]) {
                    case 'valid': return _p.ss($, ($) => $.items.__l_map(($) => Value($, abort)))
                    case 'invalid': return _p.ss($, ($) => abort({
                        'definition path': definition_path,
                        'type': ['list', ['wrong type', null]],
                        'range': t_astn_parse_tree_to_location.Value($)
                    }))
                    default: return _p.au($[0])
                }
            })])
            case 'nothing': return _p.ss($, ($): d_out.Value => ['nothing', null])
            case 'number': return _p.ss($, ($): d_out.Value => ['text', {
                'value': _p.decide.state($['found value type'], ($) => {
                    switch ($[0]) {
                        case 'valid': return _p.ss($, ($) => $.instance.value)
                        default: return _p.ss($, ($) => abort({
                            'definition path': definition_path,
                            'type': ['number', ['wrong type', null]],
                            'range': t_astn_parse_tree_to_location.Value($)
                        }))
                    }
                }),
                'delimiter': ['none', null],

            }])
            case 'optional': return _p.ss($, ($): d_out.Value => ['optional', _p.decide.state($['found value type'], ($): d_out.Value.optional => {
                switch ($[0]) {
                    case 'valid': return _p.ss($, ($) => _p.decide.state($, ($): d_out.Value.optional => {
                        switch ($[0]) {
                            case 'set': return _p.ss($, ($) => ['set', Value($['child value'], abort)])
                            case 'not set': return _p.ss($, ($) => ['not set', null])
                            default: return _p.au($[0])
                        }
                    }))
                    case 'invalid': return _p.ss($, ($) => abort({
                        'definition path': definition_path,
                        'type': ['optional', ['wrong type', null]],
                        'range': t_astn_parse_tree_to_location.Value($)
                    }))
                    default: return _p.au($[0])
                }
            })])
            case 'reference': return _p.ss($, ($): d_out.Value => ['text', {
                'value': _p.decide.state($['found value type'], ($) => {
                    switch ($[0]) {
                        case 'valid': return _p.ss($, ($) => $.instance.value)
                        default: return _p.ss($, ($) => abort({
                            'definition path': definition_path,
                            'type': ['reference', ['wrong type', null]],
                            'range': t_astn_parse_tree_to_location.Value($)
                        }))
                    }
                }),
                'delimiter': ['backtick', null],

            }])
            case 'state': return _p.ss($, ($): d_out.Value => ['state', _p.decide.state($['found value type'], ($): d_out.Value.state => {
                switch ($[0]) {
                    case 'valid': return _p.ss($, ($) => {
                        const start_token = _p.decide.state($.instance, ($): d_in_astn_parse_tree.Structural_Token => {
                            switch ($[0]) {
                                case 'list': return _p.ss($, ($) => $['['])
                                case 'state': return _p.ss($, ($) => $['|'])
                                default: return _p.au($[0])
                            }
                        })
                        return _p.decide.state($['option'], ($) => {
                            switch ($[0]) {
                                case 'missing data': return _p.ss($, ($) => abort({
                                    'definition path': definition_path,
                                    'type': ['state', ['missing data', null]],
                                    'range': $.range
                                }))
                                case 'set': return _p.ss($, ($) => {
                                    const option_token = $['option token']
                                    return _p.decide.state($.option, ($) => {
                                        switch ($[0]) {
                                            case 'known': return _p.ss($, ($) => ({
                                                'option': option_token.value,
                                                'value': Value($.value, abort)
                                            }))
                                            case 'unknown': return _p.ss($, ($) => abort({
                                                'definition path': definition_path,
                                                'type': ['state', ['unknown option', null]],
                                                'range': option_token.range
                                            }))

                                            default: return _p.au($[0])
                                        }
                                    })
                                })
                                default: return _p.au($[0])
                            }
                        })
                    })
                    case 'invalid': return _p.ss($, ($): d_out.Value.state => abort({
                        'definition path': definition_path,
                        'type': ['state', ['wrong type', Found($)]],
                        'range': t_astn_parse_tree_to_location.Value($)
                    }))
                    case 'list format error': return _p.ss($, ($) => {
                        const start_token = $.list['[']
                        return _p.decide.state($.type, ($) => {
                            switch ($[0]) {
                                case 'missing option item': return _p.ss($, ($) => abort({
                                    'definition path': definition_path,
                                    'type': ['state', ['missing option item', null]],
                                    'range': start_token.range
                                }))
                                case 'option item is not a text': return _p.ss($, ($) => abort({
                                    'definition path': definition_path,
                                    'type': ['state', ['option item is not a text', null]],
                                    'range': t_astn_parse_tree_to_location.Value($.value)
                                }))
                                case 'missing value item': return _p.ss($, ($) => abort({
                                    'definition path': definition_path,
                                    'type': ['state', ['missing value item', null]],
                                    'range': start_token.range
                                }))
                                case 'too many items': return _p.ss($, ($) => abort({
                                    'definition path': definition_path,
                                    'type': ['state', ['too many items', null]],
                                    'range': start_token.range
                                }))
                                default: return _p.au($[0])
                            }
                        })
                    })

                    default: return _p.au($[0])
                }
            })])
            case 'text': return _p.ss($, ($): d_out.Value => ['text', {
                'value': _p.decide.state($['found value type'], ($) => {
                    switch ($[0]) {
                        case 'valid': return _p.ss($, ($) => $.instance.value)
                        default: return _p.ss($, ($) => abort({
                            'definition path': definition_path,
                            'type': ['text', ['wrong type', null]],
                            'range': t_astn_parse_tree_to_location.Value($)
                        }))
                    }
                }),
                'delimiter': ['quote', null],

            }])
            default: return _p.au($[0])
        }
    })
}
