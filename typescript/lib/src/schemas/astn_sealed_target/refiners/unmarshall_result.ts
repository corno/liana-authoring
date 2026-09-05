
import * as p_ from 'pareto-core/refiner'
import type * as p_ti from 'pareto-core/transformer'

//schemas
import type * as s_in from "../../../schemas/unmarshall_result/schema.js"
import type * as s_out from "../schema.js"
import type * as s_in_astn_parse_tree from "astn-core/modules/deserialization/schemas/parse_tree/schema"
import type * as s_function from "../../../schemas/sealed_target_from_unmarshall_result/schema.js"

namespace declarations_ {

    export type Value = p_.Refiner<
        s_out.Value,
        s_function.Error,
        s_in.Value
    >
    export type Found = p_ti.Transformer< //FIXME; this one shouldn't be here
        s_in_astn_parse_tree.Value,
        s_function.Found
    >
}

//dependencies
import * as t_astn_parse_tree_to_start_token_location from "astn-core/modules/deserialization/schemas/parse_tree/transformers/start_token_range"


export const Found: declarations_.Found = ($) => {
    return p_.from.state($.type).decide(
        ($) => {
            switch ($[0]) {
                case 'concrete': return p_.option($, ($): s_function.Found => p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'dictionary': return p_.option($, ($) => ['dictionary', null])
                            case 'group': return p_.option($, ($) => ['group', null])
                            case 'list': return p_.option($, ($) => ['list', null])
                            case 'nothing': return p_.option($, ($) => ['nothing', null])
                            case 'optional': return p_.option($, ($) => ['optional', null])
                            case 'state': return p_.option($, ($) => ['state', null])
                            case 'text': return p_.option($, ($) => ['text', {
                                'value': $.token.value
                            }])
                            default: return p_.exhaustive($[0])
                        }
                    }))
                case 'include': return p_.option($, ($) => ['include', null])
                case 'missing': return p_.option($, ($) => ['missing data', null])
                default: return p_.exhaustive($[0])
            }
        })
}

//implementations
// export const Document: Document = ($, abort) => {
//     return Value($.content, abort)
// }

export const Value: declarations_.Value = ($, abort) => {
    const start_token_range = t_astn_parse_tree_to_start_token_location.Value($.instance)
    return p_.from.state($['unmarshall result']).decide(
        ($) => {
            switch ($[0]) {
                case 'error': return p_.option($, ($) => p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'incorrect': return p_.option($, ($) => p_.from.state($).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'wrong type': return p_.option($, ($) => abort({
                                            'type': ['number', ['wrong type', null]], //FIXME!!!
                                            'range': start_token_range
                                        }))
                                        case 'list as state format error': return p_.option($, ($) => {
                                            const start_token = $.list['[']
                                            return p_.from.state($.type).decide(
                                                ($) => {
                                                    switch ($[0]) {
                                                        case 'missing option item': return p_.option($, ($) => abort({
                                                            'type': ['state', ['missing option item', null]],
                                                            'range': start_token.range
                                                        }))
                                                        case 'option item is not a text': return p_.option($, ($) => abort({
                                                            'type': ['state', ['option item is not a text', null]],
                                                            'range': t_astn_parse_tree_to_start_token_location.Value($.value)
                                                        }))
                                                        case 'missing value item': return p_.option($, ($) => abort({
                                                            'type': ['state', ['missing value item', null]],
                                                            'range': start_token.range
                                                        }))
                                                        case 'too many items': return p_.option($, ($) => abort({
                                                            'type': ['state', ['too many items', null]],
                                                            'range': start_token.range
                                                        }))
                                                        default: return p_.exhaustive($[0])
                                                    }
                                                })
                                        })
                                        case 'unknown option': return p_.option($, ($) => abort({
                                            'type': ['state', ['unknown option', null]],
                                            'range': $['option token'].range
                                        }))
                                        default: return p_.exhaustive($[0])
                                    }
                                }))
                            case 'missing': return p_.option($, ($) => abort({
                                'type': ['dictionary', ['foo', null]],
                                'range': start_token_range
                            }))

                            default: return p_.exhaustive($[0])
                        }
                    }))
                case 'success': return p_.option($, ($) => p_.from.state($).decide(
                    ($): s_out.Value => {
                        switch ($[0]) {
                            case 'component': return p_.option($, ($) => Value($.value, abort))
                            case 'dictionary': return p_.option($, ($) => {

                                const dictionary_range = $.intermediate.instance['{'].range

                                const grouped = $.derived.entries
                                return ['dictionary', p_.from.dictionary(grouped).map(
                                    ($, id): s_out.Value => p_.from.state($.result).decide(
                                        ($) => {
                                            switch ($[0]) {
                                                case 'success': return p_.option($, ($) => {
                                                    const intermediate = $.intermediate
                                                    return p_.from.state($.value).decide(
                                                        ($) => {
                                                            switch ($[0]) {
                                                                case 'not set': return p_.option($, ($) => abort({
                                                                    'type': ['dictionary', ['foo', null]],
                                                                    'range': intermediate['id value pair'].id.range
                                                                }))
                                                                case 'set': return p_.option($, ($) => Value($, abort))
                                                                default: return p_.exhaustive($[0])
                                                            }
                                                        })
                                                })
                                                case 'error': return p_.option($, ($) => p_.from.state($).decide(
                                                    ($) => {
                                                        switch ($[0]) {
                                                            case 'duplicate': return p_.option($, ($) => abort({
                                                                'type': ['dictionary', ['foo', null]],
                                                                'range': dictionary_range
                                                            }))
                                                            default: return p_.exhaustive($[0])
                                                        }
                                                    }))
                                                default: return p_.exhaustive($[0])
                                            }
                                        }))]
                            })
                            case 'group': return p_.option($, ($) => {
                                return ['group', ['verbose', p_.from.dictionary($.derived.properties).map(
                                    ($, id) => p_.from.state($.result).decide(
                                        ($) => {
                                            switch ($[0]) {
                                                case 'success': return p_.option($, ($) => Value($, abort))
                                                case 'error': return p_.option($, ($) => p_.from.state($).decide(
                                                    ($) => {
                                                        switch ($[0]) {
                                                            case 'missing': return p_.option($, ($) => abort({
                                                                'type': ['group', ['missing property', {
                                                                    'name': id
                                                                }]],
                                                                'range': start_token_range
                                                            }))
                                                            case 'multiple': return p_.option($, ($) => abort({
                                                                'type': ['group', ['multiple instances for property', {
                                                                    'name': id
                                                                }]],
                                                                'range': start_token_range
                                                            }))
                                                            default: return p_.exhaustive($[0])
                                                        }
                                                    }))
                                                default: return p_.exhaustive($[0])
                                            }
                                        })
                                )]]
                            })
                            case 'list': return p_.option($, ($) => ['list', p_.from.list($.derived.items).map(
                                ($) => Value($, abort))])
                            case 'nothing': return p_.option($, ($): s_out.Value => ['nothing', null])
                            case 'simple': return p_.option($, ($): s_out.Value => ['text', {
                                'value': $.instance.token.value,
                                'delimiter': ['none', null],

                            }])
                            case 'optional': return p_.option($, ($): s_out.Value => ['optional', p_.from.state($.derived.status).decide(
                                ($): s_out.Value.optional => {
                                    switch ($[0]) {
                                        case 'set': return p_.option($, ($) => ['set', Value($['child value'], abort)])
                                        case 'not set': return p_.option($, ($) => ['not set', null])
                                        default: return p_.exhaustive($[0])
                                    }
                                })])
                            case 'reference': return p_.option($, ($): s_out.Value => p_.from.state($.type).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'derived': return p_.option($, ($) => ['nothing', null])
                                        case 'selected': return p_.option($, ($) => ['reference', {
                                            'value': $.intermediate.instance.token.value,
                                            'delimiter': ['apostrophe', null],

                                        }])
                                        default: return p_.exhaustive($[0])
                                    }
                                }))
                            case 'state': return p_.option($, ($): s_out.Value => {
                                return p_.from.state($.derived['option status']).decide(
                                    ($): s_out.Value => {
                                        switch ($[0]) {
                                            case 'missing data': return p_.option($, ($) => abort({
                                                'type': ['state', ['missing data', null]],
                                                'range': $.intermediate.range
                                            }))
                                            case 'set': return p_.option($, ($): s_out.Value => ['state', {
                                                'option': $.option,
                                                'value': Value($.value, abort)
                                            }])
                                            default: return p_.exhaustive($[0])
                                        }
                                    })
                            })
                            case 'text': return p_.option($, ($): s_out.Value => ['text', {
                                'value': $.instance.token.value,
                                'delimiter': ['quote', null],

                            }])
                            default: return p_.exhaustive($[0])
                        }
                    }))
                default: return p_.exhaustive($[0])
            }
        })
}
