import * as pt from 'pareto-core/dist/assign'
import * as pi from 'pareto-core/dist/interface'

//data types
import * as d_in from "../../../../interface/to_be_generated/unmarshall_result"
import * as d_out from "astn-core/dist/interface/generated/liana/schemas/sealed_target/data"
import * as d_in_astn_parse_tree from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"
import * as d_function from "../../../../interface/to_be_generated/sealed_target_from_unmarshall_result"

//dependencies
import * as t_astn_parse_tree_to_location from "astn-core/dist/implementation/manual/transformers/parse_tree/start_token_range"
import p_variables from 'pareto-core/dist/_p_variables'

//signatures
// export type Document = pi.Refiner<d_out.Document, d_function.Error, d_in.Document>
export type Value = pi.Refiner<d_out.Value, d_function.Error, d_in.Value>

export const Found = ($: d_in_astn_parse_tree.Value): d_function.Found => {
    return pt.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'concrete': return pt.ss($, ($): d_function.Found => pt.decide.state($, ($) => {
                switch ($[0]) {
                    case 'dictionary': return pt.ss($, ($) => ['dictionary', null])
                    case 'group': return pt.ss($, ($) => ['group', null])
                    case 'list': return pt.ss($, ($) => ['list', null])
                    case 'nothing': return pt.ss($, ($) => ['nothing', null])
                    case 'optional': return pt.ss($, ($) => ['optional', null])
                    case 'state': return pt.ss($, ($) => ['state', null])
                    case 'text': return pt.ss($, ($) => ['text', {
                        'value': $.token.value
                    }])
                    default: return pt.au($[0])
                }
            }))
            case 'include': return pt.ss($, ($) => ['include', null])
            case 'missing': return pt.ss($, ($) => ['missing data', null])
            default: return pt.au($[0])
        }
    })
}

//implementations
// export const Document: Document = ($, abort) => {
//     return Value($.content, abort)
// }

export const Value: Value = ($, abort) => {
    const start_token_range = t_astn_parse_tree_to_location.Value($.instance)
    return pt.decide.state($['unmarshall result'], ($) => {
        switch ($[0]) {
            case 'error': return pt.ss($, ($) => pt.decide.state($, ($) => {
                switch ($[0]) {
                    case 'incorrect': return pt.ss($, ($) => pt.decide.state($, ($) => {
                        switch ($[0]) {
                            case 'wrong type': return pt.ss($, ($) => abort({
                                'type': ['number', ['wrong type', null]], //FIXME!!!
                                'range': start_token_range
                            }))
                            case 'list as state format error': return pt.ss($, ($) => {
                                const start_token = $.list['[']
                                return pt.decide.state($.type, ($) => {
                                    switch ($[0]) {
                                        case 'missing option item': return pt.ss($, ($) => abort({
                                            'type': ['state', ['missing option item', null]],
                                            'range': start_token.range
                                        }))
                                        case 'option item is not a text': return pt.ss($, ($) => abort({
                                            'type': ['state', ['option item is not a text', null]],
                                            'range': t_astn_parse_tree_to_location.Value($.value)
                                        }))
                                        case 'missing value item': return pt.ss($, ($) => abort({
                                            'type': ['state', ['missing value item', null]],
                                            'range': start_token.range
                                        }))
                                        case 'too many items': return pt.ss($, ($) => abort({
                                            'type': ['state', ['too many items', null]],
                                            'range': start_token.range
                                        }))
                                        default: return pt.au($[0])
                                    }
                                })
                            })
                            case 'unknown option': return pt.ss($, ($) => abort({
                                'type': ['state', ['unknown option', null]],
                                'range': $['option token'].range
                            }))
                            default: return pt.au($[0])
                        }
                    }))
                    case 'missing': return pt.ss($, ($) => abort({
                        'type': ['dictionary', ['foo', null]],
                        'range': start_token_range
                    }))

                    default: return pt.au($[0])
                }
            }))
            case 'success': return pt.ss($, ($) => pt.decide.state($, ($): d_out.Value => {
                switch ($[0]) {
                    case 'component': return pt.ss($, ($) => Value($.value, abort))
                    case 'dictionary': return pt.ss($, ($) => {

                        const dictionary_range = $.intermediate.instance['{'].range

                        const grouped = $.derived.entries
                        return ['dictionary', grouped.__d_map(($, id) => pt.decide.state($.result, ($) => {
                            switch ($[0]) {
                                case 'success': return pt.ss($, ($) => {
                                    const intermediate = $.intermediate
                                    return pt.decide.state($.value, ($) => {
                                        switch ($[0]) {
                                            case 'not set': return pt.ss($, ($) =>  abort({
                                                'type': ['dictionary', ['foo', null]],
                                                'range': intermediate['id value pair'].id.range
                                            }))
                                            case 'set': return pt.ss($, ($) => Value($, abort))
                                            default: return pt.au($[0])
                                        }
                                    })
                                })
                                case 'error': return pt.ss($, ($) => pt.decide.state($, ($) => {
                                    switch ($[0]) {
                                        case 'duplicate': return pt.ss($, ($) => abort({
                                            'type': ['dictionary', ['foo', null]],
                                            'range': dictionary_range
                                        }))
                                        default: return pt.au($[0])
                                    }
                                }))
                                default: return pt.au($[0])
                            }
                        }))]
                    })
                    case 'group': return pt.ss($, ($) => {
                        const def = $
                        return ['group', ['verbose', p_variables((): d_out.Value.group.verbose => {

                            return $.derived.properties.__d_map(($, id) => pt.decide.state($.result, ($) => {
                                switch ($[0]) {
                                    case 'success': return pt.ss($, ($) => Value($, abort))
                                    case 'error': return pt.ss($, ($) => pt.decide.state($, ($) => {
                                        switch ($[0]) {
                                            case 'missing': return pt.ss($, ($) => abort({
                                                'type': ['group', ['missing property', {
                                                    'name': id
                                                }]],
                                                'range': start_token_range
                                            }))
                                            case 'multiple': return pt.ss($, ($) => abort({
                                                'type': ['group', ['multiple instances for property', {
                                                    'name': id
                                                }]],
                                                'range': start_token_range
                                            }))
                                            default: return pt.au($[0])
                                        }
                                    }))
                                    default: return pt.au($[0])
                                }
                            }))
                        })]]
                    })
                    case 'list': return pt.ss($, ($) => ['list', $.derived.items.__l_map(($) => Value($, abort))])
                    case 'nothing': return pt.ss($, ($): d_out.Value => ['nothing', null])
                    case 'simple': return pt.ss($, ($): d_out.Value => ['text', {
                        'value': $.instance.token.value,
                        'delimiter': ['none', null],

                    }])
                    case 'optional': return pt.ss($, ($): d_out.Value => ['optional', pt.decide.state($.derived.status, ($): d_out.Value.optional => {
                        switch ($[0]) {
                            case 'set': return pt.ss($, ($) => ['set', Value($['child value'], abort)])
                            case 'not set': return pt.ss($, ($) => ['not set', null])
                            default: return pt.au($[0])
                        }
                    })])
                    case 'reference': return pt.ss($, ($): d_out.Value => pt.decide.state($.type, ($) => {
                        switch ($[0]) {
                            case 'derived': return pt.ss($, ($) => ['nothing', null])
                            case 'selected': return pt.ss($, ($) => ['text', {
                                'value': $.intermediate.instance.token.value,
                                'delimiter': ['apostrophe', null],

                            }])
                            default: return pt.au($[0])
                        }
                    }))
                    case 'state': return pt.ss($, ($): d_out.Value => {
                        return pt.decide.state($.derived['option status'], ($): d_out.Value => {
                            switch ($[0]) {
                                case 'missing data': return pt.ss($, ($) => abort({
                                    'type': ['state', ['missing data', null]],
                                    'range': $.intermediate.range
                                }))
                                case 'set': return pt.ss($, ($): d_out.Value => ['state', {
                                    'option': $.option,
                                    'value': Value($.value, abort)
                                }])
                                default: return pt.au($[0])
                            }
                        })
                    })
                    case 'text': return pt.ss($, ($): d_out.Value => ['text', {
                        'value': $.instance.token.value,
                        'delimiter': ['quote', null],

                    }])
                    default: return pt.au($[0])
                }
            }))
            default: return pt.au($[0])
        }
    })
}
