import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_di from 'pareto-core/dist/interface/data'
import p_implement_me from 'pareto-core-dev/dist/implement_me'
import p_unreachable_code_path from 'pareto-core/dist/implementation/specials/unreachable_code_path'
import p_variables from 'pareto-core/dist/implementation/specials/variables'

import * as d_in from "../../../../interface/data/unmarshall_result"
import * as d_in_definition from "pareto-liana/dist/interface/generated/liana/schemas/schema/data/resolved"
import * as d_out from "../../../../interface/data/resolve_result"

namespace p_i_temp {

    export type Acyclic_Lookup<Acyclic_Entry> = {
        geta: (id: string) => Acyclic_Entry
    }

    type Acyclic_Lookups = {
        [key: string]: Acyclic_Lookup<any>
    }

    export type Cyclic_Lookup<Cyclic_Entry> = {
        getc: (id: string) => Cyclic_Entry
    }

    type Cyclic_Lookups = {
        [key: string]: Cyclic_Lookup<any>
    }

    type Lookups = {
        acyclic: { [key: string]: Acyclic_Lookups },
        cyclic: { [key: string]: Cyclic_Lookups },
    }

    export type Transformer_With_Lookups_And_Parameter<
        Input extends p_di.Value,
        Result extends p_di.Value,
        My_Lookups extends Lookups,
        Parameter extends p_di.Value,
    > = (
        $: Input,
        $l: My_Lookups,
        $p: Parameter
    ) => Result

}

export type Lookups = {
    'acyclic': {
        // 'default': {
        //     'foo': p_i_temp.Acyclic_Lookup<d_out.Value>
        // },
    },
    'cyclic': {
        // 'default': {
        //     'foo': p_i_temp.Cyclic_Lookup<d_out.Value>
        // },
    }
}

export const Document: p_i_temp.Transformer_With_Lookups_And_Parameter<
    d_in.Document,
    d_out.Document,
    Lookups,
    {
        'definition': d_in_definition.Resolver_Modules.D,
        'resolvers': d_in_definition.Resolver
    }
> = ($, $l, $p) => ({
    'unmarshalled': $,
    'content': Value(
        $.content,
        $l,
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
// ) => p_.from.state($).decide(($) => {
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
//     //         case 'acyclic': return p_.ss($, ($) => p_.from.state($).decide(($) => {
//     //             switch ($[0]) {
//     //                 case 'siblings': return p_.ss($, ($) => $p['acyclic siblings'].__decide(
//     //                     ($) => ['acyclic siblings', $],
//     //                     () => p_unreachable_code_path("acyclic siblings should have been provided for this definition")
//     //                 ))
//     //                 case 'resolved dictionary': return p_.ss($, ($) => p_implement_me("!!!!!!!"))
//     //                 default: return p_.au($[0])
//     //             }
//     //         }))
//     //         case 'cyclic': return p_.ss($, ($) => p_.from.state($).decide(($) => {
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
    Lookups,
    {
        'definition': d_in_definition.Resolver_Value,
        'resolver': d_in_definition.Resolver
        // 'module parameters': p_di.Optional_Value<d_function.Module_Parameters>
        // 'lookup parameters': p_di.Optional_Value<d_function.Lookup_Parameters>
        // 'acyclic siblings': p_di.Optional_Value<d_function.Acyclic_Siblings>
        // 'cyclic siblings': p_di.Optional_Value<d_function.Cyclic_Siblings>
    }
> = ($, $l, $p) => {
    return {
        'definition': $p.definition,
        'unmarshalled': $,
        'unmarshall result': p_.from.state($['unmarshall result']).decide(($): d_out.Value_Unmarshall_Result => {
            switch ($[0]) {
                case 'error': return p_.ss($, ($) => ['error', $])
                case 'success': return p_.ss($, ($) => {
                    const unmarshalled_value = $
                    return ['success', p_.from.state($p.definition).decide(($): d_out.Resolved_Value_Type => {
                        switch ($[0]) {
                            case 'component': return p_.ss($, ($) => {
                                const def = $
                                return ['component', p_.from.state(unmarshalled_value).decide(($) => {
                                    switch ($[0]) {
                                        case 'component': return p_.ss($, ($) => ({
                                            'unmarshalled': $,
                                            'value': Value(
                                                $.value,
                                                {
                                                    'acyclic': {},
                                                    'cyclic': {},
                                                },
                                                {
                                                    'definition': p_.from.state(def.location).decide(($) => {
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
                                                    // 'module parameters': p_.from.optional(def.arguments).map(
                                                    //     ($) => ({
                                                    //         'lookups': p_.from.optional($.lookups).map(
                                                    //             ($) => $.__d_map_deprecated(($) => p_.from.state($).decide(($) => {
                                                    //                 switch ($[0]) {
                                                    //                     case 'stack': return p_.ss($, ($) => p_.from.state($).decide(($) => {
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
                                                    //         'modules': p_.from.optional($.modules).map(
                                                    //             ($) => $.__d_map_deprecated(($) => p_.from.state($).decide(($) => {
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
                                return ['dictionary', p_.from.state(unmarshalled_value).decide(($): d_out.Dictionary => {
                                    switch ($[0]) {
                                        case 'dictionary': return p_.ss($, ($): d_out.Dictionary => ({
                                            'unmarshalled': $,
                                            'entries': p_.from.dictionary(
                                                $.derived.entries,
                                            ).resolve(($, id, $al, $cl): d_out.Entry => ({
                                                'unmarshall result': p_.from.state($.result).decide(($): d_out.Entry['unmarshall result'] => {
                                                    switch ($[0]) {
                                                        case 'success': return p_.ss($, ($) => p_.from.state($.value).decide(($) => {
                                                            switch ($[0]) {
                                                                case 'set': return p_.ss($, ($) => ['success', {
                                                                    'value': ['set', Value(
                                                                        $,
                                                                        $l,
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
                                return ['group', p_.from.state(unmarshalled_value).decide(($): d_out.Group => {
                                    switch ($[0]) {
                                        case 'group': return p_.ss($, ($): d_out.Group => ({
                                            'unmarshalled': $,
                                            'properties': p_variables(() => {
                                                return p_.from.dictionary(
                                                    p_.from.dictionary(
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
                                                ).resolve(($, id, $al, $cl) => {
                                                    const resolver = $.definition
                                                    return $.unmarshalled.__decide(
                                                        ($) => p_.from.state($.result).decide(($): d_out.Property => {
                                                            switch ($[0]) {
                                                                case 'success': return p_.ss($, ($): d_out.Property => ({
                                                                    'unmarshall result': ['success', {
                                                                        'definition': resolver,
                                                                        'resolved': Value(
                                                                            $,
                                                                            $l,
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
                                return ['list', p_.from.state(unmarshalled_value).decide(($): d_out.List => {
                                    switch ($[0]) {
                                        case 'list': return p_.ss($, ($): d_out.List => ({
                                            'unmarshalled': $,
                                            'items': $.derived.items.__l_map_deprecated(($) => Value(
                                                $,
                                                $l,
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
                            case 'nothing': return p_.ss($, ($) => ['nothing', p_.from.state(unmarshalled_value).decide(($) => {
                                switch ($[0]) {
                                    case 'nothing': return p_.ss($, ($) => $)
                                    default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                }
                            })])
                            case 'simple': return p_.ss($, ($) => ['simple', p_.from.state(unmarshalled_value).decide(($) => {
                                switch ($[0]) {
                                    case 'simple': return p_.ss($, ($) => $)
                                    default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                }
                            })])
                            case 'optional': return p_.ss($, ($) => {
                                const def = $
                                return ['optional', p_.from.state(unmarshalled_value).decide(($): d_out.Optional => {
                                    switch ($[0]) {
                                        case 'optional': return p_.ss($, ($): d_out.Optional => ({
                                            'unmarshalled': $,
                                            'status': p_.from.state($.derived.status).decide(($) => {
                                                switch ($[0]) {
                                                    case 'set': return p_.ss($, ($) => ['set', {
                                                        'child value': Value(
                                                            $['child value'],
                                                            $l,
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
                                return ['reference', p_.from.state(def.type).decide(($): d_out.Reference => {
                                    switch ($[0]) {
                                        case 'derived': return p_.ss($, ($) => ['derived', null])
                                        case 'selected': return p_.ss($, ($) => {
                                            const unmarshalled = p_.from.state(unmarshalled_value).decide(($) => {
                                                switch ($[0]) {
                                                    case 'reference': return p_.ss($, ($) => p_.from.state($.type).decide(($) => {
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
                                return ['state', p_.from.state(unmarshalled_value).decide(($) => {
                                    switch ($[0]) {
                                        case 'state': return p_.ss($, ($) => ({
                                            'unmarshalled': $,
                                            'option': p_.from.state($.derived['option status']).decide(($) => {
                                                switch ($[0]) {
                                                    case 'set': return p_.ss($, ($) => p_.literal.set(Value(
                                                        $.value,
                                                        $l,
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
                            case 'text': return p_.ss($, ($) => ['text', p_.from.state(unmarshalled_value).decide(($) => {
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