import * as pt from 'pareto-core/dist/assign'
import * as pi from 'pareto-core/dist/interface'
import p_implement_me from 'pareto-core-dev/dist/implement_me'

import * as d_in from "../../../../interface/to_be_generated/unmarshall_result"
import * as d_in_definition from "pareto-liana/dist/interface/generated/liana/schemas/schema/data/resolved"
import * as d_function from "../../../../interface/to_be_generated/resolve_result_from_unmarshall_result"
import * as d_out from "../../../../interface/to_be_generated/resolve_result"

import p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'
import p_variables from 'pareto-core/dist/_p_variables'

export const Document = (
    $: d_in.Document,
    $p: {
        'definition': d_in_definition.Resolver_Modules.D,
        'resolvers': d_in_definition.Resolver
    }
): d_out.Document => ({
    'unmarshalled': $,
    'content': Value(
        $.content,
        {
            'definition': $p.definition['root value resolver'],
            // 'module parameters': pt.optional.literal.not_set(),
            // 'lookup parameters': pt.optional.literal.not_set(),
            'resolver': $p.resolvers,
            // 'acyclic siblings': pt.optional.literal.not_set(),
            // 'cyclic siblings': pt.optional.literal.not_set(),
        }
    )
})

// export const Get_Entry = (
//     $: d_function.Lookup,
//     $p: {
//         'id': string
//     }
// ) => pt.decide.state($, ($) => {
//     switch ($[0]) {
//         case 'acyclic siblings': return pt.ss($, ($) => p_implement_me("!!!!!!!"))
//         case 'cyclic siblings': return pt.ss($, ($) => p_implement_me("!!!!!!!"))
//         case 'parameter': return pt.ss($, ($) => p_implement_me("!!!!!!!"))
//         default: return pt.au($[0])
//     }
// })

// export const Resolver_Lookup_Selection = (
//     $: null,
//     $p: {
//         definition: d_in_definition.Resolver_Lookup_Selection
//         'acyclic siblings': pi.Optional_Value<d_function.Acyclic_Siblings>
//         'cyclic siblings': pi.Optional_Value<d_function.Cyclic_Siblings>
//         'lookup parameters': pi.Optional_Value<d_function.Lookup_Parameters>
//     }
// ): d_function.Lookup => {
//     return p_implement_me("!!!!!!!")
//     // return pt.decide.state($p.definition.type, ($): d_function.Lookup => {
//     //     switch ($[0]) {
//     //         case 'acyclic': return pt.ss($, ($) => pt.decide.state($, ($) => {
//     //             switch ($[0]) {
//     //                 case 'siblings': return pt.ss($, ($) => $p['acyclic siblings'].__decide(
//     //                     ($) => ['acyclic siblings', $],
//     //                     () => p_unreachable_code_path("acyclic siblings should have been provided for this definition")
//     //                 ))
//     //                 case 'resolved dictionary': return pt.ss($, ($) => p_implement_me("!!!!!!!"))
//     //                 default: return pt.au($[0])
//     //             }
//     //         }))
//     //         case 'cyclic': return pt.ss($, ($) => pt.decide.state($, ($) => {
//     //             switch ($[0]) {
//     //                 case 'siblings': return pt.ss($, ($) => $p['cyclic siblings'].__decide(
//     //                     ($) => ['cyclic siblings', $],
//     //                     () => p_unreachable_code_path("cyclic siblings should have been provided for this definition")
//     //                 ))
//     //                 default: return pt.au($[0])
//     //             }
//     //         }))
//     //         case 'parameter': return pt.ss($, ($) => $p['module parameters'].__decide(
//     //             ($) => ['parameter', $p['module parameters']],
//     //             () => p_unreachable_code_path("module parameters should have been provided for this definition")
//     //         ))
//     //         default: return pt.au($[0])
//     //     }
//     // })
// }


export const Value = (
    $: d_in.Value,
    $p: {
        'definition': d_in_definition.Resolver_Value,
        'resolver': d_in_definition.Resolver
        // 'module parameters': pi.Optional_Value<d_function.Module_Parameters>
        // 'lookup parameters': pi.Optional_Value<d_function.Lookup_Parameters>
        // 'acyclic siblings': pi.Optional_Value<d_function.Acyclic_Siblings>
        // 'cyclic siblings': pi.Optional_Value<d_function.Cyclic_Siblings>
    }
): d_out.Value => {
    return {
        'definition': $p.definition,
        'unmarshalled': $,
        'unmarshall result': pt.decide.state($['unmarshall result'], ($): d_out.Value_Unmarshall_Result => {
            switch ($[0]) {
                case 'error': return pt.ss($, ($) => ['error', $])
                case 'success': return pt.ss($, ($) => {
                    const unmarshalled_value = $
                    return ['success', pt.decide.state($p.definition, ($): d_out.Resolved_Value_Type => {
                        switch ($[0]) {
                            case 'component': return pt.ss($, ($) => {
                                const def = $
                                return ['component', pt.decide.state(unmarshalled_value, ($) => {
                                    switch ($[0]) {
                                        case 'component': return pt.ss($, ($) => ({
                                            'unmarshalled': $,
                                            'value': Value(
                                                $.value,
                                                {
                                                    'definition': pt.decide.state(def.location, ($) => {
                                                        switch ($[0]) {
                                                            case 'external': return pt.ss($, ($) => p_implement_me("external component"))
                                                            case 'internal': return pt.ss($, ($) => $p.resolver.modules.__get_entry_deprecated(
                                                                $['l id'],
                                                                {
                                                                    'no_such_entry': () => p_unreachable_code_path("for every signature, there must be a resolver implemented")
                                                                }
                                                            )['root value resolver'])
                                                            default: return pt.au($[0])
                                                        }
                                                    }),
                                                    'resolver': $p.resolver,
                                                    // 'module parameters': pt.optional.literal.not_set(), //FIXME 
                                                    // 'lookup parameters': pt.optional.literal.not_set(), //FIXME
                                                    // 'module parameters': pt.optional.from.optional(def.arguments).map(
                                                    //     ($) => ({
                                                    //         'lookups': pt.optional.from.optional($.lookups).map(
                                                    //             ($) => $.__d_map(($) => pt.decide.state($, ($) => {
                                                    //                 switch ($[0]) {
                                                    //                     case 'stack': return pt.ss($, ($) => pt.decide.state($, ($) => {
                                                    //                         switch ($[0]) {
                                                    //                             case 'empty': return pt.ss($, ($) => null)
                                                    //                             case 'push': return pt.ss($, ($) => {
                                                    //                                 Resolver_Lookup_Selection(
                                                    //                                     null,
                                                    //                                     {
                                                    //                                         'definition': $.item,
                                                    //                                         'acyclic siblings': $p['acyclic siblings'],
                                                    //                                         'cyclic siblings': $p['cyclic siblings'],
                                                    //                                         'lookup parameters': $p['lookup parameters'],
                                                    //                                     }
                                                    //                                 )
                                                    //                                 Resolver_Lookup_Selection(
                                                    //                                     null,
                                                    //                                     {
                                                    //                                         'definition': $.stack,
                                                    //                                         'acyclic siblings': $p['acyclic siblings'],
                                                    //                                         'cyclic siblings': $p['cyclic siblings'],
                                                    //                                         'lookup parameters': $p['lookup parameters'],
                                                    //                                     }
                                                    //                                 )
                                                    //                                 return null
                                                    //                             })
                                                    //                             default: return pt.au($[0])
                                                    //                         }
                                                    //                     }))
                                                    //                     case 'acyclic': return pt.ss($, ($) => p_implement_me("!!!!!!!"))
                                                    //                     case 'cyclic': return pt.ss($, ($) => p_implement_me("!!!!!!!"))
                                                    //                     case 'selection': return pt.ss($, ($) => p_implement_me("!!!!!!!"))
                                                    //                     default: return pt.au($[0])
                                                    //                 }
                                                    //             }))

                                                    //         ),
                                                    //         'modules': pt.optional.from.optional($.modules).map(
                                                    //             ($) => $.__d_map(($) => pt.decide.state($, ($) => {
                                                    //                 switch ($[0]) {
                                                    //                     case 'optional': return pt.ss($, ($) => p_implement_me("!!!!!!!"))
                                                    //                     case 'required': return pt.ss($, ($) => p_implement_me("!!!!!!!"))
                                                    //                     case 'parameter': return pt.ss($, ($) => p_implement_me("!!!!!!!"))
                                                    //                     default: return pt.au($[0])
                                                    //                 }
                                                    //             }))
                                                    //         )
                                                    //     })
                                                    // ),
                                                    // 'acyclic siblings': pt.optional.literal.not_set(),
                                                    // 'cyclic siblings': pt.optional.literal.not_set(),
                                                }
                                            )
                                        }))
                                        default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                    }
                                })]
                            })
                            case 'dictionary': return pt.ss($, ($) => {
                                const def = $
                                return ['dictionary', pt.decide.state(unmarshalled_value, ($): d_out.Dictionary => {
                                    switch ($[0]) {
                                        case 'dictionary': return pt.ss($, ($): d_out.Dictionary => ({
                                            'unmarshalled': $,
                                            'entries': pt.dictionary.from.dictionary(
                                                $.derived.entries,
                                            ).resolve_dynamic(($, id, $al, $cl): d_out.Entry => ({
                                                'unmarshall result': pt.decide.state($.result, ($): d_out.Entry['unmarshall result'] => {
                                                    switch ($[0]) {
                                                        case 'success': return pt.ss($, ($) => pt.decide.state($.value, ($) => {
                                                            switch ($[0]) {
                                                                case 'set': return pt.ss($, ($) => ['success', {
                                                                    'value': ['set', Value(
                                                                        $,
                                                                        {
                                                                            'definition': def.resolver,
                                                                            'resolver': $p.resolver,
                                                                            // 'module parameters': $p['module parameters'],
                                                                            // 'lookup parameters': $p['lookup parameters'],
                                                                            // 'acyclic siblings': pt.optional.literal.set($al),
                                                                            // 'cyclic siblings': pt.optional.literal.set($cl),
                                                                        }
                                                                    )]
                                                                }])
                                                                case 'not set': return pt.ss($, ($) => ['success', {
                                                                    'value': ['not set', null]
                                                                }])
                                                                default: return pt.au($[0])
                                                            }
                                                        }))
                                                        case 'error': return pt.ss($, ($) => ['error', null])
                                                        default: return pt.au($[0])
                                                    }
                                                })
                                            }))
                                        }))
                                        default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                    }
                                })]
                            })
                            case 'group': return pt.ss($, ($) => {
                                const def = $
                                return ['group', pt.decide.state(unmarshalled_value, ($): d_out.Group => {
                                    switch ($[0]) {
                                        case 'group': return pt.ss($, ($): d_out.Group => ({
                                            'unmarshalled': $,
                                            'properties': p_variables(() => {
                                                return pt.dictionary.from.dictionary(
                                                    pt.dictionary.from.dictionary(
                                                        def
                                                    ).join(
                                                        $.derived.properties,
                                                        ($, $o, id) => {
                                                            return {
                                                                'definition': $.resolver,
                                                                'unmarshalled': $o,
                                                            }
                                                        }
                                                    )
                                                ).resolve_dynamic(($, id, $al, $cl) => {
                                                    const resolver = $.definition
                                                    return $.unmarshalled.__decide(
                                                        ($) => pt.decide.state($.result, ($): d_out.Property => {
                                                            switch ($[0]) {
                                                                case 'success': return pt.ss($, ($): d_out.Property => ({
                                                                    'unmarshall result': ['success', {
                                                                        'definition': resolver,
                                                                        'resolved': Value(
                                                                            $,
                                                                            {
                                                                                'definition': resolver,
                                                                                'resolver': $p.resolver,
                                                                                // 'module parameters': $p['module parameters'],
                                                                                // 'lookup parameters': $p['lookup parameters'],
                                                                                // 'acyclic siblings': $p['acyclic siblings'],
                                                                                // 'cyclic siblings': $p['cyclic siblings'],
                                                                            }
                                                                        )
                                                                    }]
                                                                }))
                                                                case 'error': return pt.ss($, ($): d_out.Property => ({
                                                                    'unmarshall result': ['error', $]
                                                                }))
                                                                default: return pt.au($[0])
                                                            }
                                                        }),
                                                        () => p_unreachable_code_path("both dictionaries are driven by the definitions in the schema")
                                                    )
                                                })
                                            }),

                                        }))
                                        default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                    }
                                })]
                            })
                            case 'list': return pt.ss($, ($) => {
                                const def = $
                                return ['list', pt.decide.state(unmarshalled_value, ($): d_out.List => {
                                    switch ($[0]) {
                                        case 'list': return pt.ss($, ($): d_out.List => ({
                                            'unmarshalled': $,
                                            'items': $.derived.items.__l_map(($) => Value(
                                                $,
                                                {
                                                    'definition': def.resolver,
                                                    'resolver': $p.resolver,
                                                    // 'module parameters': $p['module parameters'],
                                                    // 'lookup parameters': $p['lookup parameters'],
                                                    // 'acyclic siblings': $p['acyclic siblings'],
                                                    // 'cyclic siblings': $p['cyclic siblings'],
                                                }
                                            ))
                                        }))
                                        default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                    }
                                })]
                            })
                            case 'nothing': return pt.ss($, ($) => ['nothing', pt.decide.state(unmarshalled_value, ($) => {
                                switch ($[0]) {
                                    case 'nothing': return pt.ss($, ($) => $)
                                    default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                }
                            })])
                            case 'simple': return pt.ss($, ($) => ['simple', pt.decide.state(unmarshalled_value, ($) => {
                                switch ($[0]) {
                                    case 'simple': return pt.ss($, ($) => $)
                                    default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                }
                            })])
                            case 'optional': return pt.ss($, ($) => {
                                const def = $
                                return ['optional', pt.decide.state(unmarshalled_value, ($): d_out.Optional => {
                                    switch ($[0]) {
                                        case 'optional': return pt.ss($, ($): d_out.Optional => ({
                                            'unmarshalled': $,
                                            'status': pt.decide.state($.derived.status, ($) => {
                                                switch ($[0]) {
                                                    case 'set': return pt.ss($, ($) => ['set', {
                                                        'child value': Value(
                                                            $['child value'],
                                                            {
                                                                'definition': def.resolver,
                                                                'resolver': $p.resolver,
                                                                // 'module parameters': $p['module parameters'],
                                                                // 'lookup parameters': $p['lookup parameters'],
                                                                // 'acyclic siblings': $p['acyclic siblings'],
                                                                // 'cyclic siblings': $p['cyclic siblings'],
                                                            }
                                                        )
                                                    }])
                                                    case 'not set': return pt.ss($, ($) => ['not set', null])
                                                    default: return pt.au($[0])
                                                }

                                            }),
                                        }))
                                        default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                    }
                                })]
                            })
                            case 'reference': return pt.ss($, ($) => {
                                const def = $
                                return ['reference', pt.decide.state(def.type, ($): d_out.Reference => {
                                    switch ($[0]) {
                                        case 'derived': return pt.ss($, ($) => ['derived', null])
                                        case 'selected': return pt.ss($, ($) => {
                                            const unmarshalled = pt.decide.state(unmarshalled_value, ($) => {
                                                switch ($[0]) {
                                                    case 'reference': return pt.ss($, ($) => pt.decide.state($.type, ($) => {
                                                        switch ($[0]) {
                                                            case 'selected': return pt.ss($, ($) => $)
                                                            default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                                        }
                                                    }))
                                                    default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                                }
                                            })
                                            // const lookup = Resolver_Lookup_Selection(
                                            //     null,
                                            //     {
                                            //         'definition': $.lookup,
                                            //         'acyclic siblings': $p['acyclic siblings'],
                                            //         'cyclic siblings': $p['cyclic siblings'],
                                            //         'lookup parameters': $p['lookup parameters'],
                                            //     }
                                            // )
                                            // Get_Entry(
                                            //     lookup,
                                            //     {
                                            //         'id': unmarshalled.intermediate.instance.token.value
                                            //     }
                                            // )
                                            return ['selected', {
                                                'unmarshalled': unmarshalled,
                                                'resolve status': ['to be implemented', null]
                                            }]
                                        })
                                        default: return pt.au($[0])
                                    }
                                })]
                            })
                            case 'state': return pt.ss($, ($) => {
                                const def = $
                                return ['state', pt.decide.state(unmarshalled_value, ($) => {
                                    switch ($[0]) {
                                        case 'state': return pt.ss($, ($) => ({
                                            'unmarshalled': $,
                                            'option': pt.decide.state($.derived['option status'], ($) => {
                                                switch ($[0]) {
                                                    case 'set': return pt.ss($, ($) => pt.optional.literal.set(Value(
                                                        $.value,
                                                        {
                                                            'definition': def.options.__get_entry_deprecated(
                                                                $.option,
                                                                {
                                                                    'no_such_entry': () => p_unreachable_code_path("the definition is resolved")
                                                                }
                                                            ).resolver,
                                                            'resolver': $p.resolver,
                                                            // 'module parameters': $p['module parameters'],
                                                            // 'lookup parameters': $p['lookup parameters'],
                                                            // 'acyclic siblings': $p['acyclic siblings'],
                                                            // 'cyclic siblings': $p['cyclic siblings'],
                                                        }
                                                    )))
                                                    case 'missing data': return pt.ss($, ($) => pt.optional.literal.not_set())
                                                    default: return pt.au($[0])
                                                }
                                            })
                                        }))
                                        default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                    }
                                })]
                            })
                            case 'text': return pt.ss($, ($) => ['text', pt.decide.state(unmarshalled_value, ($) => {
                                switch ($[0]) {
                                    case 'text': return pt.ss($, ($) => $)
                                    default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                }
                            })])
                            default: return pt.au($[0])
                        }
                    })]
                })
                default: return pt.au($[0])
            }
        })
    }
}