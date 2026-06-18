import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'
import * as p_di from 'pareto-core/dist/interface/data'
import * as p_temp from 'pareto-core/dist/assign'
import p_implement_me from 'pareto-core-dev/dist/implement_me'
import p_unreachable_code_path from 'pareto-core/dist/implementation/specials/unreachable_code_path'
import p_variables from 'pareto-core/dist/implementation/specials/variables'

import * as d_in from "../../../../interface/data/unmarshall_result"
import * as d_in_definition from "pareto-liana/dist/interface/generated/liana/schemas/schema/data/resolved"
import * as d_out from "../../../../interface/data/resolve_result"

namespace p_i_temp {

    type Acyclic_Lookup<Acyclic_Entry> = {
        get: (id: string) => Acyclic_Entry
    }
    type Cyclic_Lookup<Cyclic_Entry> = {
        get: (id: string) => Cyclic_Entry
    }

    export type Transformer_With_Lookups_And_Parameter<
        Input extends p_di.Value,
        Result extends p_di.Value,
        Acyclic_Entry,
        Cyclic_Entry,
        Parameter extends p_di.Value,
    > = (
        $: Input,
        $a: { [key:string]: Acyclic_Lookup<Acyclic_Entry>},
        $c: { [key:string]: Cyclic_Lookup<Cyclic_Entry>},
        $p: Parameter
    ) => Result

}

export const Document: p_i_temp.Transformer_With_Lookups_And_Parameter<
    d_in.Document,
    d_out.Document,
    d_out.Value,
    d_out.Value,
    {
        'definition': d_in_definition.Resolver_Modules.D,
        'resolvers': d_in_definition.Resolver
    }
> = ($, $a, $c, $p) => ({
    'unmarshalled': $,
    'content': Value(
        $.content,
        $a,
        $c,
        {
            'definition': $p.definition['root value resolver'],
            // 'module parameters': p_.literal.not_set(),
            // 'lookup parameters': p_.literal.not_set(),
            'resolver': $p.resolvers,
            // 'acyclic siblings': p_.literal.not_set(),
            // 'cyclic siblings': p_.literal.not_set(),
        }
    )
})

// export const Get_Entry = (
//     $: d_function.Lookup,
//     $p: {
//         'id': string
//     }
// ) => p_.decide.state($, ($) => {
//     switch ($[0]) {
//         case 'acyclic siblings': return p_.ss($, ($) => p_implement_me("!!!!!!!"))
//         case 'cyclic siblings': return p_.ss($, ($) => p_implement_me("!!!!!!!"))
//         case 'parameter': return p_.ss($, ($) => p_implement_me("!!!!!!!"))
//         default: return p_.au($[0])
//     }
// })

// export const Resolver_Lookup_Selection = (
//     $: null,
//     $p: {
//         definition: d_in_definition.Resolver_Lookup_Selection
//         'acyclic siblings': p_di.Optional_Value<d_function.Acyclic_Siblings>
//         'cyclic siblings': p_di.Optional_Value<d_function.Cyclic_Siblings>
//         'lookup parameters': p_di.Optional_Value<d_function.Lookup_Parameters>
//     }
// ): d_function.Lookup => {
//     return p_implement_me("!!!!!!!")
//     // return p_.decide.state($p.definition.type, ($): d_function.Lookup => {
//     //     switch ($[0]) {
//     //         case 'acyclic': return p_.ss($, ($) => p_.decide.state($, ($) => {
//     //             switch ($[0]) {
//     //                 case 'siblings': return p_.ss($, ($) => $p['acyclic siblings'].__decide(
//     //                     ($) => ['acyclic siblings', $],
//     //                     () => p_unreachable_code_path("acyclic siblings should have been provided for this definition")
//     //                 ))
//     //                 case 'resolved dictionary': return p_.ss($, ($) => p_implement_me("!!!!!!!"))
//     //                 default: return p_.au($[0])
//     //             }
//     //         }))
//     //         case 'cyclic': return p_.ss($, ($) => p_.decide.state($, ($) => {
//     //             switch ($[0]) {
//     //                 case 'siblings': return p_.ss($, ($) => $p['cyclic siblings'].__decide(
//     //                     ($) => ['cyclic siblings', $],
//     //                     () => p_unreachable_code_path("cyclic siblings should have been provided for this definition")
//     //                 ))
//     //                 default: return p_.au($[0])
//     //             }
//     //         }))
//     //         case 'parameter': return p_.ss($, ($) => $p['module parameters'].__decide(
//     //             ($) => ['parameter', $p['module parameters']],
//     //             () => p_unreachable_code_path("module parameters should have been provided for this definition")
//     //         ))
//     //         default: return p_.au($[0])
//     //     }
//     // })
// }


export const Value: p_i_temp.Transformer_With_Lookups_And_Parameter<
    d_in.Value,
    d_out.Value,
    d_out.Value,
    d_out.Value,
    {
        'definition': d_in_definition.Resolver_Value,
        'resolver': d_in_definition.Resolver
        // 'module parameters': p_di.Optional_Value<d_function.Module_Parameters>
        // 'lookup parameters': p_di.Optional_Value<d_function.Lookup_Parameters>
        // 'acyclic siblings': p_di.Optional_Value<d_function.Acyclic_Siblings>
        // 'cyclic siblings': p_di.Optional_Value<d_function.Cyclic_Siblings>
    }
> = ($, $a, $c, $p) => {
    return {
        'definition': $p.definition,
        'unmarshalled': $,
        'unmarshall result': p_.decide.state($['unmarshall result'], ($): d_out.Value_Unmarshall_Result => {
            switch ($[0]) {
                case 'error': return p_.ss($, ($) => ['error', $])
                case 'success': return p_.ss($, ($) => {
                    const unmarshalled_value = $
                    return ['success', p_.decide.state($p.definition, ($): d_out.Resolved_Value_Type => {
                        switch ($[0]) {
                            case 'component': return p_.ss($, ($) => {
                                const def = $
                                return ['component', p_.decide.state(unmarshalled_value, ($) => {
                                    switch ($[0]) {
                                        case 'component': return p_.ss($, ($) => ({
                                            'unmarshalled': $,
                                            'value': Value(
                                                $.value,
                                                p_implement_me("!!!"),
                                                p_implement_me("!!!"),
                                                {
                                                    'definition': p_.decide.state(def.location, ($) => {
                                                        switch ($[0]) {
                                                            case 'external': return p_.ss($, ($) => p_implement_me("external component"))
                                                            case 'internal': return p_.ss($, ($) => $p.resolver.modules.__get_entry_deprecated(
                                                                $['l id'],
                                                                {
                                                                    'no_such_entry': () => p_unreachable_code_path("for every signature, there must be a resolver implemented")
                                                                }
                                                            )['root value resolver'])
                                                            default: return p_.au($[0])
                                                        }
                                                    }),
                                                    'resolver': $p.resolver,
                                                    // 'module parameters': p_.literal.not_set(), //FIXME 
                                                    // 'lookup parameters': p_.literal.not_set(), //FIXME
                                                    // 'module parameters': p_.optional.from.optional(def.arguments).map(
                                                    //     ($) => ({
                                                    //         'lookups': p_.optional.from.optional($.lookups).map(
                                                    //             ($) => $.__d_map(($) => p_.decide.state($, ($) => {
                                                    //                 switch ($[0]) {
                                                    //                     case 'stack': return p_.ss($, ($) => p_.decide.state($, ($) => {
                                                    //                         switch ($[0]) {
                                                    //                             case 'empty': return p_.ss($, ($) => null)
                                                    //                             case 'push': return p_.ss($, ($) => {
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
                                                    //                             default: return p_.au($[0])
                                                    //                         }
                                                    //                     }))
                                                    //                     case 'acyclic': return p_.ss($, ($) => p_implement_me("!!!!!!!"))
                                                    //                     case 'cyclic': return p_.ss($, ($) => p_implement_me("!!!!!!!"))
                                                    //                     case 'selection': return p_.ss($, ($) => p_implement_me("!!!!!!!"))
                                                    //                     default: return p_.au($[0])
                                                    //                 }
                                                    //             }))

                                                    //         ),
                                                    //         'modules': p_.optional.from.optional($.modules).map(
                                                    //             ($) => $.__d_map(($) => p_.decide.state($, ($) => {
                                                    //                 switch ($[0]) {
                                                    //                     case 'optional': return p_.ss($, ($) => p_implement_me("!!!!!!!"))
                                                    //                     case 'required': return p_.ss($, ($) => p_implement_me("!!!!!!!"))
                                                    //                     case 'parameter': return p_.ss($, ($) => p_implement_me("!!!!!!!"))
                                                    //                     default: return p_.au($[0])
                                                    //                 }
                                                    //             }))
                                                    //         )
                                                    //     })
                                                    // ),
                                                    // 'acyclic siblings': p_.literal.not_set(),
                                                    // 'cyclic siblings': p_.literal.not_set(),
                                                }
                                            )
                                        }))
                                        default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                    }
                                })]
                            })
                            case 'dictionary': return p_.ss($, ($) => {
                                const def = $
                                return ['dictionary', p_.decide.state(unmarshalled_value, ($): d_out.Dictionary => {
                                    switch ($[0]) {
                                        case 'dictionary': return p_.ss($, ($): d_out.Dictionary => ({
                                            'unmarshalled': $,
                                            'entries': p_temp.dictionary.from.dictionary(
                                                $.derived.entries,
                                            ).resolve_transformer(($, id, $al, $cl): d_out.Entry => ({
                                                'unmarshall result': p_.decide.state($.result, ($): d_out.Entry['unmarshall result'] => {
                                                    switch ($[0]) {
                                                        case 'success': return p_.ss($, ($) => p_.decide.state($.value, ($) => {
                                                            switch ($[0]) {
                                                                case 'set': return p_.ss($, ($) => ['success', {
                                                                    'value': ['set', Value(
                                                                        $,
                                                                        $a,
                                                                        $c,
                                                                        {
                                                                            'definition': def.resolver,
                                                                            'resolver': $p.resolver,
                                                                            // 'module parameters': $p['module parameters'],
                                                                            // 'lookup parameters': $p['lookup parameters'],
                                                                            // 'acyclic siblings': p_.literal.set($al),
                                                                            // 'cyclic siblings': p_.literal.set($cl),
                                                                        }
                                                                    )]
                                                                }])
                                                                case 'not set': return p_.ss($, ($) => ['success', {
                                                                    'value': ['not set', null]
                                                                }])
                                                                default: return p_.au($[0])
                                                            }
                                                        }))
                                                        case 'error': return p_.ss($, ($) => ['error', null])
                                                        default: return p_.au($[0])
                                                    }
                                                })
                                            }))
                                        }))
                                        default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                    }
                                })]
                            })
                            case 'group': return p_.ss($, ($) => {
                                const def = $
                                return ['group', p_.decide.state(unmarshalled_value, ($): d_out.Group => {
                                    switch ($[0]) {
                                        case 'group': return p_.ss($, ($): d_out.Group => ({
                                            'unmarshalled': $,
                                            'properties': p_variables(() => {
                                                return p_temp.dictionary.from.dictionary(
                                                    p_temp.dictionary.from.dictionary(
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
                                                ).resolve_transformer(($, id, $al, $cl) => {
                                                    const resolver = $.definition
                                                    return $.unmarshalled.__decide(
                                                        ($) => p_.decide.state($.result, ($): d_out.Property => {
                                                            switch ($[0]) {
                                                                case 'success': return p_.ss($, ($): d_out.Property => ({
                                                                    'unmarshall result': ['success', {
                                                                        'definition': resolver,
                                                                        'resolved': Value(
                                                                            $,
                                                                            $a,
                                                                            $c,
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
                                                                case 'error': return p_.ss($, ($): d_out.Property => ({
                                                                    'unmarshall result': ['error', $]
                                                                }))
                                                                default: return p_.au($[0])
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
                            case 'list': return p_.ss($, ($) => {
                                const def = $
                                return ['list', p_.decide.state(unmarshalled_value, ($): d_out.List => {
                                    switch ($[0]) {
                                        case 'list': return p_.ss($, ($): d_out.List => ({
                                            'unmarshalled': $,
                                            'items': $.derived.items.__l_map(($) => Value(
                                                $,
                                                $a,
                                                $c,
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
                            case 'nothing': return p_.ss($, ($) => ['nothing', p_.decide.state(unmarshalled_value, ($) => {
                                switch ($[0]) {
                                    case 'nothing': return p_.ss($, ($) => $)
                                    default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                }
                            })])
                            case 'simple': return p_.ss($, ($) => ['simple', p_.decide.state(unmarshalled_value, ($) => {
                                switch ($[0]) {
                                    case 'simple': return p_.ss($, ($) => $)
                                    default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                }
                            })])
                            case 'optional': return p_.ss($, ($) => {
                                const def = $
                                return ['optional', p_.decide.state(unmarshalled_value, ($): d_out.Optional => {
                                    switch ($[0]) {
                                        case 'optional': return p_.ss($, ($): d_out.Optional => ({
                                            'unmarshalled': $,
                                            'status': p_.decide.state($.derived.status, ($) => {
                                                switch ($[0]) {
                                                    case 'set': return p_.ss($, ($) => ['set', {
                                                        'child value': Value(
                                                            $['child value'],
                                                            $a,
                                                            $c,
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
                                                    case 'not set': return p_.ss($, ($) => ['not set', null])
                                                    default: return p_.au($[0])
                                                }

                                            }),
                                        }))
                                        default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                    }
                                })]
                            })
                            case 'reference': return p_.ss($, ($) => {
                                const def = $
                                return ['reference', p_.decide.state(def.type, ($): d_out.Reference => {
                                    switch ($[0]) {
                                        case 'derived': return p_.ss($, ($) => ['derived', null])
                                        case 'selected': return p_.ss($, ($) => {
                                            const unmarshalled = p_.decide.state(unmarshalled_value, ($) => {
                                                switch ($[0]) {
                                                    case 'reference': return p_.ss($, ($) => p_.decide.state($.type, ($) => {
                                                        switch ($[0]) {
                                                            case 'selected': return p_.ss($, ($) => $)
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
                                        default: return p_.au($[0])
                                    }
                                })]
                            })
                            case 'state': return p_.ss($, ($) => {
                                const def = $
                                return ['state', p_.decide.state(unmarshalled_value, ($) => {
                                    switch ($[0]) {
                                        case 'state': return p_.ss($, ($) => ({
                                            'unmarshalled': $,
                                            'option': p_.decide.state($.derived['option status'], ($) => {
                                                switch ($[0]) {
                                                    case 'set': return p_.ss($, ($) => p_.literal.set(Value(
                                                        $.value,
                                                        $a,
                                                        $c,
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
                                                    case 'missing data': return p_.ss($, ($) => p_.literal.not_set())
                                                    default: return p_.au($[0])
                                                }
                                            })
                                        }))
                                        default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                    }
                                })]
                            })
                            case 'text': return p_.ss($, ($) => ['text', p_.decide.state(unmarshalled_value, ($) => {
                                switch ($[0]) {
                                    case 'text': return p_.ss($, ($) => $)
                                    default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                }
                            })])
                            default: return p_.au($[0])
                        }
                    })]
                })
                default: return p_.au($[0])
            }
        })
    }
}