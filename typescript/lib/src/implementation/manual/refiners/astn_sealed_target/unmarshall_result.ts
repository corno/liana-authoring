import * as p_ from 'pareto-core/dist/implementation/refiner'
import * as p_i from 'pareto-core/dist/interface/refiner'
import * as p_ti from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/unmarshall_result"
import * as d_out from "astn-core/dist/interface/generated/liana/schemas/sealed_target/data"
import * as d_in_astn_parse_tree from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"
import * as d_function from "../../../../interface/data/sealed_target_from_unmarshall_result"

//dependencies
import * as t_astn_parse_tree_to_location from "astn-core/dist/implementation/manual/transformers/parse_tree/start_token_range"
import p_variables from 'pareto-core/dist/implementation/refiner/specials/variables'

//signatures
// export type Document = p_i.Refiner<d_out.Document, d_function.Error, d_in.Document>
export type Value = p_i.Refiner<d_out.Value, d_function.Error, d_in.Value>

export const Found: p_ti.Transformer<d_in_astn_parse_tree.Value, d_function.Found> = ($) => {
    return p_.from.state($.type).decide(($) => {
        switch ($[0]) {
            case 'concrete': return p_.ss($, ($): d_function.Found => p_.from.state($).decide(($) => {
                switch ($[0]) {
                    case 'dictionary': return p_.ss($, ($) => ['dictionary', null])
                    case 'group': return p_.ss($, ($) => ['group', null])
                    case 'list': return p_.ss($, ($) => ['list', null])
                    case 'nothing': return p_.ss($, ($) => ['nothing', null])
                    case 'optional': return p_.ss($, ($) => ['optional', null])
                    case 'state': return p_.ss($, ($) => ['state', null])
                    case 'text': return p_.ss($, ($) => ['text', {
                        'value': $.token.value
                    }])
                    default: return p_.au($[0])
                }
            }))
            case 'include': return p_.ss($, ($) => ['include', null])
            case 'missing': return p_.ss($, ($) => ['missing data', null])
            default: return p_.au($[0])
        }
    })
}

//implementations
// export const Document: Document = ($, abort) => {
//     return Value($.content, abort)
// }

export const Value: Value = ($, abort) => {
    const start_token_range = t_astn_parse_tree_to_location.Value($.instance)
    return p_.from.state($['unmarshall result']).decide(($) => {
        switch ($[0]) {
            case 'error': return p_.ss($, ($) => p_.from.state($).decide(($) => {
                switch ($[0]) {
                    case 'incorrect': return p_.ss($, ($) => p_.from.state($).decide(($) => {
                        switch ($[0]) {
                            case 'wrong type': return p_.ss($, ($) => abort({
                                'type': ['number', ['wrong type', null]], //FIXME!!!
                                'range': start_token_range
                            }))
                            case 'list as state format error': return p_.ss($, ($) => {
                                const start_token = $.list['[']
                                return p_.from.state($.type).decide(($) => {
                                    switch ($[0]) {
                                        case 'missing option item': return p_.ss($, ($) => abort({
                                            'type': ['state', ['missing option item', null]],
                                            'range': start_token.range
                                        }))
                                        case 'option item is not a text': return p_.ss($, ($) => abort({
                                            'type': ['state', ['option item is not a text', null]],
                                            'range': t_astn_parse_tree_to_location.Value($.value)
                                        }))
                                        case 'missing value item': return p_.ss($, ($) => abort({
                                            'type': ['state', ['missing value item', null]],
                                            'range': start_token.range
                                        }))
                                        case 'too many items': return p_.ss($, ($) => abort({
                                            'type': ['state', ['too many items', null]],
                                            'range': start_token.range
                                        }))
                                        default: return p_.au($[0])
                                    }
                                })
                            })
                            case 'unknown option': return p_.ss($, ($) => abort({
                                'type': ['state', ['unknown option', null]],
                                'range': $['option token'].range
                            }))
                            default: return p_.au($[0])
                        }
                    }))
                    case 'missing': return p_.ss($, ($) => abort({
                        'type': ['dictionary', ['foo', null]],
                        'range': start_token_range
                    }))

                    default: return p_.au($[0])
                }
            }))
            case 'success': return p_.ss($, ($) => p_.from.state($).decide(($): d_out.Value => {
                switch ($[0]) {
                    case 'component': return p_.ss($, ($) => Value($.value, abort))
                    case 'dictionary': return p_.ss($, ($) => {

                        const dictionary_range = $.intermediate.instance['{'].range

                        const grouped = $.derived.entries
                        return ['dictionary', grouped.__d_map_deprecated(($, id) => p_.from.state($.result).decide(($) => {
                            switch ($[0]) {
                                case 'success': return p_.ss($, ($) => {
                                    const intermediate = $.intermediate
                                    return p_.from.state($.value).decide(($) => {
                                        switch ($[0]) {
                                            case 'not set': return p_.ss($, ($) =>  abort({
                                                'type': ['dictionary', ['foo', null]],
                                                'range': intermediate['id value pair'].id.range
                                            }))
                                            case 'set': return p_.ss($, ($) => Value($, abort))
                                            default: return p_.au($[0])
                                        }
                                    })
                                })
                                case 'error': return p_.ss($, ($) => p_.from.state($).decide(($) => {
                                    switch ($[0]) {
                                        case 'duplicate': return p_.ss($, ($) => abort({
                                            'type': ['dictionary', ['foo', null]],
                                            'range': dictionary_range
                                        }))
                                        default: return p_.au($[0])
                                    }
                                }))
                                default: return p_.au($[0])
                            }
                        }))]
                    })
                    case 'group': return p_.ss($, ($) => {
                        const def = $
                        return ['group', ['verbose', p_variables((): d_out.Value.group.verbose => {

                            return $.derived.properties.__d_map_deprecated(($, id) => p_.from.state($.result).decide(($) => {
                                switch ($[0]) {
                                    case 'success': return p_.ss($, ($) => Value($, abort))
                                    case 'error': return p_.ss($, ($) => p_.from.state($).decide(($) => {
                                        switch ($[0]) {
                                            case 'missing': return p_.ss($, ($) => abort({
                                                'type': ['group', ['missing property', {
                                                    'name': id
                                                }]],
                                                'range': start_token_range
                                            }))
                                            case 'multiple': return p_.ss($, ($) => abort({
                                                'type': ['group', ['multiple instances for property', {
                                                    'name': id
                                                }]],
                                                'range': start_token_range
                                            }))
                                            default: return p_.au($[0])
                                        }
                                    }))
                                    default: return p_.au($[0])
                                }
                            }))
                        })]]
                    })
                    case 'list': return p_.ss($, ($) => ['list', $.derived.items.__l_map_deprecated(($) => Value($, abort))])
                    case 'nothing': return p_.ss($, ($): d_out.Value => ['nothing', null])
                    case 'simple': return p_.ss($, ($): d_out.Value => ['text', {
                        'value': $.instance.token.value,
                        'delimiter': ['none', null],

                    }])
                    case 'optional': return p_.ss($, ($): d_out.Value => ['optional', p_.from.state($.derived.status).decide(($): d_out.Value.optional => {
                        switch ($[0]) {
                            case 'set': return p_.ss($, ($) => ['set', Value($['child value'], abort)])
                            case 'not set': return p_.ss($, ($) => ['not set', null])
                            default: return p_.au($[0])
                        }
                    })])
                    case 'reference': return p_.ss($, ($): d_out.Value => p_.from.state($.type).decide(($) => {
                        switch ($[0]) {
                            case 'derived': return p_.ss($, ($) => ['nothing', null])
                            case 'selected': return p_.ss($, ($) => ['text', {
                                'value': $.intermediate.instance.token.value,
                                'delimiter': ['apostrophe', null],

                            }])
                            default: return p_.au($[0])
                        }
                    }))
                    case 'state': return p_.ss($, ($): d_out.Value => {
                        return p_.from.state($.derived['option status']).decide(($): d_out.Value => {
                            switch ($[0]) {
                                case 'missing data': return p_.ss($, ($) => abort({
                                    'type': ['state', ['missing data', null]],
                                    'range': $.intermediate.range
                                }))
                                case 'set': return p_.ss($, ($): d_out.Value => ['state', {
                                    'option': $.option,
                                    'value': Value($.value, abort)
                                }])
                                default: return p_.au($[0])
                            }
                        })
                    })
                    case 'text': return p_.ss($, ($): d_out.Value => ['text', {
                        'value': $.instance.token.value,
                        'delimiter': ['quote', null],

                    }])
                    default: return p_.au($[0])
                }
            }))
            default: return p_.au($[0])
        }
    })
}
