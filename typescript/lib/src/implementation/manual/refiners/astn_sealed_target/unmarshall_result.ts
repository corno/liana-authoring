import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'

//data types
import * as d_in from "../../../../interface/to_be_generated/unmarshall_result"
import * as d_out from "astn-core/dist/interface/generated/liana/schemas/sealed_target/data"
import * as d_in_astn_parse_tree from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"
import * as d_function from "../../../../interface/to_be_generated/sealed_target_from_unmarshall_result"

//dependencies
import * as t_astn_parse_tree_to_location from "astn-core/dist/implementation/manual/transformers/parse_tree/start_token_range"
import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'
import _p_variables from 'pareto-core/dist/_p_variables'

//signatures
// export type Document = _pi.Refiner<d_out.Document, d_function.Error, d_in.Document>
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
                        'value': $.token.value
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
// export const Document: Document = ($, abort) => {
//     return Value($.content, abort)
// }

export const Value: Value = ($, abort) => {
    const start_token_range = t_astn_parse_tree_to_location.Value($.instance)
    return _p.decide.state($['unmarshall result'], ($) => {
        switch ($[0]) {
            case 'error': return _p.ss($, ($) => _p.decide.state($, ($) => {
                switch ($[0]) {
                    case 'incorrect': return _p.ss($, ($) => _p.decide.state($, ($) => {
                        switch ($[0]) {
                            case 'wrong type': return _p.ss($, ($) => abort({
                                'type': ['number', ['wrong type', null]], //FIXME!!!
                                'range': start_token_range
                            }))
                            case 'list as state format error': return _p.ss($, ($) => {
                                const start_token = $.list['[']
                                return _p.decide.state($.type, ($) => {
                                    switch ($[0]) {
                                        case 'missing option item': return _p.ss($, ($) => abort({
                                            'type': ['state', ['missing option item', null]],
                                            'range': start_token.range
                                        }))
                                        case 'option item is not a text': return _p.ss($, ($) => abort({
                                            'type': ['state', ['option item is not a text', null]],
                                            'range': t_astn_parse_tree_to_location.Value($.value)
                                        }))
                                        case 'missing value item': return _p.ss($, ($) => abort({
                                            'type': ['state', ['missing value item', null]],
                                            'range': start_token.range
                                        }))
                                        case 'too many items': return _p.ss($, ($) => abort({
                                            'type': ['state', ['too many items', null]],
                                            'range': start_token.range
                                        }))
                                        default: return _p.au($[0])
                                    }
                                })
                            })
                            case 'unknown option': return _p.ss($, ($) => abort({
                                'type': ['state', ['unknown option', null]],
                                'range': $['option token'].range
                            }))
                            default: return _p.au($[0])
                        }
                    }))
                    case 'missing': return _p.ss($, ($) => abort({
                        'type': ['dictionary', ['foo', null]],
                        'range': start_token_range
                    }))

                    default: return _p.au($[0])
                }
            }))
            case 'success': return _p.ss($, ($) => _p.decide.state($, ($): d_out.Value => {
                switch ($[0]) {
                    case 'component': return _p.ss($, ($) => Value($.value, abort))
                    case 'dictionary': return _p.ss($, ($) => {

                        const dictionary_range = $.intermediate.instance['{'].range

                        const grouped = $.entries
                        return ['dictionary', grouped.__d_map(($, id) => _p.decide.state($.result, ($) => {
                            switch ($[0]) {
                                case 'success': return _p.ss($, ($) => $.value.__decide(
                                    ($) => Value($, abort),
                                    () => abort({
                                        'type': ['dictionary', ['foo', null]],
                                        'range': $.intermediate['id value pair'].id.range
                                    }),
                                ))
                                case 'error': return _p.ss($, ($) => _p.decide.state($, ($) => {
                                    switch ($[0]) {
                                        case 'duplicate': return _p.ss($, ($) => abort({
                                            'type': ['dictionary', ['foo', null]],
                                            'range': dictionary_range
                                        }))
                                        default: return _p.au($[0])
                                    }
                                }))
                                default: return _p.au($[0])
                            }
                        }))]
                    })
                    case 'group': return _p.ss($, ($) => {
                        const def = $
                        return ['group', ['verbose', _p_variables((): d_out.Value.group.verbose => {

                            return $.properties.__d_map(($, id) => _p.decide.state($.result, ($) => {
                                switch ($[0]) {
                                    case 'success': return _p.ss($, ($) => Value($, abort))
                                    case 'error': return _p.ss($, ($) => _p.decide.state($, ($) => {
                                        switch ($[0]) {
                                            case 'missing': return _p.ss($, ($) => abort({
                                                'type': ['group', ['missing property', {
                                                    'name': id
                                                }]],
                                                'range': start_token_range
                                            }))
                                            case 'multiple': return _p.ss($, ($) => abort({
                                                'type': ['group', ['multiple instances for property', {
                                                    'name': id
                                                }]],
                                                'range': start_token_range
                                            }))
                                            default: return _p.au($[0])
                                        }
                                    }))
                                    default: return _p.au($[0])
                                }
                            }))
                        })]]
                    })
                    case 'list': return _p.ss($, ($) => ['list', $.items.__l_map(($) => Value($, abort))])
                    case 'nothing': return _p.ss($, ($): d_out.Value => ['nothing', null])
                    case 'simple': return _p.ss($, ($): d_out.Value => ['text', {
                        'value': $.value,
                        'delimiter': ['none', null],

                    }])
                    case 'optional': return _p.ss($, ($): d_out.Value => ['optional', _p.decide.state($.status, ($): d_out.Value.optional => {
                        switch ($[0]) {
                            case 'set': return _p.ss($, ($) => ['set', Value($['child value'], abort)])
                            case 'not set': return _p.ss($, ($) => ['not set', null])
                            default: return _p.au($[0])
                        }
                    })])
                    case 'reference': return _p.ss($, ($): d_out.Value => _p.decide.state($.type, ($) => {
                        switch ($[0]) {
                            case 'derived': return _p.ss($, ($) => ['nothing', null])
                            case 'selected': return _p.ss($, ($) => ['text', {
                                'value': $.value,
                                'delimiter': ['apostrophe', null],

                            }])
                            default: return _p.au($[0])
                        }
                    }))
                    case 'state': return _p.ss($, ($): d_out.Value => {
                        return _p.decide.state($['option status'], ($): d_out.Value => {
                            switch ($[0]) {
                                case 'missing data': return _p.ss($, ($) => abort({
                                    'type': ['state', ['missing data', null]],
                                    'range': $.intermediate.range
                                }))
                                case 'set': return _p.ss($, ($): d_out.Value => ['state', {
                                    'option': $.option,
                                    'value': Value($.value, abort)
                                }])
                                default: return _p.au($[0])
                            }
                        })
                    })
                    case 'text': return _p.ss($, ($): d_out.Value => ['text', {
                        'value': $.value,
                        'delimiter': ['quote', null],

                    }])
                    default: return _p.au($[0])
                }
            }))
            default: return _p.au($[0])
        }
    })
}
