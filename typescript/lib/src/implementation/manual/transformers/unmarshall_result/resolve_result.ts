import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'
import * as p_di from 'pareto-core/dist/interface/data'
import p_implement_me from 'pareto-core-dev/dist/implement_me'
import p_unreachable_code_path from 'pareto-core/dist/implementation/transformer/specials/unreachable_code_path'
import p_variables from 'pareto-core/dist/implementation/transformer/specials/variables'
import p_temp_dictionary from 'pareto-core/dist/temp/Generic_Dictionary'

import * as d_in from "../../../../interface/data/unmarshall_result"
import * as d_in_definition from "pareto-liana/dist/interface/generated/liana/schemas/schema/data/resolved"
import * as d_out from "../../../../interface/data/resolve_result"

namespace p_i_temp {

    type Lookup_Type =
        | { [key: string]: Lookup_Type }
        | p_temp_dictionary.Generic_Dictionary<any>
        | p_i.lookup.Acyclic<any>
        | p_i.lookup.Cyclic<any>
        | p_i.lookup.Stack<any>

    export type Transformer_With_Lookups_And_Parameter<
        Input extends p_di.Value,
        Result extends p_di.Value,
        My_Lookups extends Lookup_Type,
        Parameter extends p_di.Value,
    > = (
        $: Input,
        $l: My_Lookups,
        $p: Parameter
    ) => Result

    export const from_option_decide = <T extends p_di.Value, R>(
        $: p_di.Optional_Value<T>,
        set: (value: T) => R,
        not_set: () => R
    ): R => {
        let result: R
        $.__extract_data(
            (value) => {
                result = set(value)
            },
            () => {
                result = not_set()
            }
        )
        return result!
    }

}

export type Acyclic_Parameter_Resolve_Status =
    | ['to be implemented', null]
    | ['resolved', p_i.lookup.Acyclic<d_out.Entry>]
    | ['not found because of root', null]

export type Cyclic_Parameter_Resolve_Status =
    | ['to be implemented', null]
    | ['resolved', p_i.lookup.Cyclic<d_out.Entry>]
    | ['not found because of root', null]

export type Stack_Parameter_Resolve_Status =
    | ['to be implemented', null]
    | ['resolved', p_i.lookup.Stack<d_out.Entry>]
    | ['not found because of root', null]

export type Lookup_Parameters = {
    'acyclic': p_temp_dictionary.Generic_Dictionary<Acyclic_Parameter_Resolve_Status>
    'cyclic': p_temp_dictionary.Generic_Dictionary<Cyclic_Parameter_Resolve_Status>
    'stack': p_temp_dictionary.Generic_Dictionary<Stack_Parameter_Resolve_Status>
}

export type Lookups = {
    'parameters': Lookup_Parameters
    'siblings': {
        'acyclic': p_i.lookup.Acyclic<d_out.Entry>
        'cyclic': p_i.lookup.Cyclic<d_out.Entry>
    }
}

export type Module_Parameter_Resolve_Status =
    | ['not found because of root', null]
    | ['to be implemented', null]

export const Document: p_i_temp.Transformer_With_Lookups_And_Parameter<
    d_in.Document,
    d_out.Document,
    Lookups,
    {
        'definition': d_in_definition.Resolver_Modules.D
        'resolvers': d_in_definition.Resolver
        'module parameters': p_di.Dictionary<Module_Parameter_Resolve_Status>
    }
> = ($, $l, $p) => ({
    'unmarshalled': $,
    'content': Value(
        $.content,
        $l,
        {
            'definition': $p.definition['root value resolver'],
            'resolver': $p.resolvers,
            'module parameters': $p['module parameters'],
        }
    )
})

// export const Get_Entry = (
//     $: d_function.Lookup,
//     $p: {
//         'id': string
//     }
// ) => p_.from.state($).decide(
//($) => {
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
//     //         case 'acyclic': return p_.ss($, ($) => p_.from.state($).decide(
//($) => {
//     //             switch ($[0]) {
//     //                 case 'siblings': return p_.ss($, ($) => $p['acyclic siblings'].__ decide(
//     //                     ($) => ['acyclic siblings', $],
//     //                     () => p_unreachable_code_path("acyclic siblings should have been provided for this definition")
//     //                 ))
//     //                 case 'resolved dictionary': return p_.ss($, ($) => p_implement_me("!!!!!!!"))
//     //                 default: return p_.au($[0])
//     //             }
//     //         }))
//     //         case 'cyclic': return p_.ss($, ($) => p_.from.state($).decide(
//($) => {
//     //             switch ($[0]) {
//     //                 case 'siblings': return p_.ss($, ($) => $p['cyclic siblings'].__ decide(
//     //                     ($) => ['cyclic siblings', $],
//     //                     () => p_unreachable_code_path("cyclic siblings should have been provided for this definition")
//     //                 ))
//     //                 default: return p_.au($[0])
//     //             }
//     //         }))
//     //         case 'parameter': return p_.ss($, ($) => $p['module parameters'].__ decide(
//     //             ($) => ['parameter', $p['module parameters']],
//     //             () => p_unreachable_code_path("module parameters should have been provided for this definition")
//     //         ))
//     //         default: return p_.au($[0])
//     //     }
//     // })
// }

export const Resolver_Optional_Value_Initialization = (
    $: d_in_definition.Resolver_Optional_Value_Initialization
): Module_Parameter_Resolve_Status => {
    return ['to be implemented', null]
}

export const Resolver_Guaranteed_Value_Selection = (
    $: d_in_definition.Resolver_Guaranteed_Value_Selection
): Module_Parameter_Resolve_Status => {
    return ['to be implemented', null]
}


export const Value: p_i_temp.Transformer_With_Lookups_And_Parameter<
    d_in.Value,
    d_out.Value,
    Lookups,
    {
        'definition': d_in_definition.Resolver_Value
        'resolver': d_in_definition.Resolver
        'module parameters': p_di.Dictionary<Module_Parameter_Resolve_Status>
    }
> = ($, $l, $p) => {
    return {
        'definition': $p.definition,
        'unmarshalled': $,
        'unmarshall result': p_.from.state($['unmarshall result']).decide(
            ($): d_out.Value_Unmarshall_Result => {
                switch ($[0]) {
                    case 'error': return p_.ss($, ($) => ['error', $])
                    case 'success': return p_.ss($, ($) => {
                        const unmarshalled_value = $
                        return ['success', p_.from.state($p.definition).decide(
                            ($): d_out.Resolved_Value_Type => {
                                switch ($[0]) {
                                    case 'component': return p_.ss($, ($) => {
                                        const def = $
                                        return ['component', p_.from.state(unmarshalled_value).decide(
                                            ($) => {
                                                switch ($[0]) {
                                                    case 'component': return p_.ss($, ($) => {
                                                        const def2 = p_.from.state(def.location).decide(
                                                            ($): d_in_definition.Resolver_Modules_.D => {
                                                                switch ($[0]) {
                                                                    case 'external': return p_.ss($, ($) => p_implement_me("external component"))
                                                                    case 'internal': return p_.ss($, ($) => p_.from.dictionary($p.resolver.modules).get_possible_entry(
                                                                        $['l id'],
                                                                        ($) => $,
                                                                        () => p_unreachable_code_path("the resolver should have been provided with a module parameter for this definition")
                                                                    ))
                                                                    default: return p_.au($[0])
                                                                }
                                                            })
                                                        return {
                                                            'unmarshalled': $,
                                                            'value': Value(
                                                                $.value,
                                                                {
                                                                    'parameters': p_i_temp.from_option_decide(
                                                                        def.arguments,
                                                                        ($) => p_i_temp.from_option_decide(
                                                                            $.lookups,
                                                                            ($) => ({
                                                                                'acyclic': p_temp_dictionary.map_value_dictionary_to_generic_dictionary(
                                                                                    $,
                                                                                    ($): Acyclic_Parameter_Resolve_Status => ['to be implemented', null]
                                                                                ),
                                                                                'cyclic': p_temp_dictionary.map_value_dictionary_to_generic_dictionary(
                                                                                    $,
                                                                                    ($): Cyclic_Parameter_Resolve_Status => ['to be implemented', null]
                                                                                ),
                                                                                'stack': p_temp_dictionary.map_value_dictionary_to_generic_dictionary(
                                                                                    $,
                                                                                    ($): Stack_Parameter_Resolve_Status => ['to be implemented', null]
                                                                                )
                                                                            }),
                                                                            () => $l.parameters
                                                                        ),
                                                                        () => $l.parameters

                                                                    ),
                                                                    'siblings': $l.siblings,
                                                                },
                                                                {
                                                                    'definition': def2['root value resolver'],
                                                                    'resolver': $p.resolver,
                                                                    'module parameters': p_i_temp.from_option_decide(
                                                                        def.arguments,
                                                                        ($) => p_i_temp.from_option_decide(
                                                                            $.modules,
                                                                            ($) => p_.from.dictionary($).map(
                                                                                ($): Module_Parameter_Resolve_Status => p_.from.state($).decide(
                                                                                    ($) => {
                                                                                        switch ($[0]) {
                                                                                            case 'optional': return p_.ss($, ($) => Resolver_Optional_Value_Initialization($))
                                                                                            case 'parameter': return p_.ss($, ($) => p_.from.dictionary($p['module parameters']
                                                                                            ).get_possible_entry(
                                                                                                $['l id'],
                                                                                                ($) => $,
                                                                                                () => p_unreachable_code_path("for every parameter, there must be a module parameter provided")
                                                                                            ))
                                                                                            case 'required': return p_.ss($, ($) => Resolver_Guaranteed_Value_Selection($))
                                                                                            default: return p_.au($[0])
                                                                                        }
                                                                                    })
                                                                            ),
                                                                            () => $p['module parameters']
                                                                        ),
                                                                        () => $p['module parameters']

                                                                    ),
                                                                    // 'module parameters': p_.literal.not_set(), //FIXME 
                                                                    // 'lookup parameters': p_.literal.not_set(), //FIXME
                                                                    // 'module parameters': p_.from.optional(def.arguments).map(
                                                                    //     ($) => ({
                                                                    //         'lookups': p_.from.optional($.lookups).map(
                                                                    //             ($) => $.__ d_map_deprecated(
                                                                    // ($) => p_.from.state($).decide(
                                                                    //($) => {
                                                                    //                 switch ($[0]) {
                                                                    //                     case 'stack': return p_.ss($, ($) => p_.from.state($).decide(
                                                                    //($) => {
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
                                                                    //             ($) => $.__ d_map_deprecated(
                                                                    // ($) => p_.from.state($).decide(
                                                                    //($) => {
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
                                                        }
                                                    })
                                                    default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                                }
                                            })]
                                    })
                                    case 'dictionary': return p_.ss($, ($) => {
                                        const def = $
                                        return ['dictionary', p_.from.state(unmarshalled_value).decide(
                                            ($): d_out.Dictionary => {
                                                switch ($[0]) {
                                                    case 'dictionary': return p_.ss($, ($): d_out.Dictionary => ({
                                                        'unmarshalled': $,
                                                        'entries': p_.from.dictionary($.derived.entries,
                                                        ).resolve(
                                                            ($, id, $al, $cl): d_out.Entry => ({
                                                                'unmarshall result': p_.from.state($.result).decide(
                                                                    ($): d_out.Entry['unmarshall result'] => {
                                                                        switch ($[0]) {
                                                                            case 'success': return p_.ss($, ($) => p_.from.state($.value).decide(
                                                                                ($) => {
                                                                                    switch ($[0]) {
                                                                                        case 'set': return p_.ss($, ($) => ['success', {
                                                                                            'value': ['set', Value(
                                                                                                $,
                                                                                                {
                                                                                                    'parameters': $l.parameters,
                                                                                                    'siblings': {
                                                                                                        'acyclic': $al,
                                                                                                        'cyclic': $cl,
                                                                                                    }
                                                                                                },
                                                                                                {
                                                                                                    'definition': def.resolver,
                                                                                                    'resolver': $p.resolver,
                                                                                                    'module parameters': $p['module parameters'],
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
                                        return ['group', p_.from.state(unmarshalled_value).decide(
                                            ($): d_out.Group => {
                                                switch ($[0]) {
                                                    case 'group': return p_.ss($, ($): d_out.Group => ({
                                                        'unmarshalled': $,
                                                        'properties': p_variables(
                                                            () => {
                                                                return p_.from.dictionary(p_.from.dictionary(def
                                                                    ).join(
                                                                        $.derived.properties,
                                                                        ($, $o, id) => {
                                                                            return {
                                                                                'definition': $.resolver,
                                                                                'unmarshalled': $o,
                                                                            }
                                                                        }
                                                                    )
                                                                ).resolve(
                                                                    ($, id, $al, $cl) => {
                                                                        const resolver = $.definition
                                                                        return p_.from.optional($.unmarshalled).decide(
                                                                            ($) => p_.from.state($.result).decide(
                                                                                ($): d_out.Property => {
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
                                                                                                        'module parameters': $p['module parameters'],
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
                                        return ['list', p_.from.state(unmarshalled_value).decide(
                                            ($): d_out.List => {
                                                switch ($[0]) {
                                                    case 'list': return p_.ss($, ($): d_out.List => ({
                                                        'unmarshalled': $,
                                                        'items': p_.from.list($.derived.items).map(
                                                            ($) => Value(
                                                                $,
                                                                $l,
                                                                {
                                                                    'definition': def.resolver,
                                                                    'resolver': $p.resolver,
                                                                    'module parameters': $p['module parameters'],
                                                                }
                                                            ))
                                                    }))
                                                    default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                                }
                                            })]
                                    })
                                    case 'nothing': return p_.ss($, ($) => ['nothing', p_.from.state(unmarshalled_value).decide(
                                        ($) => {
                                            switch ($[0]) {
                                                case 'nothing': return p_.ss($, ($) => $)
                                                default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                            }
                                        })])
                                    case 'simple': return p_.ss($, ($) => ['simple', p_.from.state(unmarshalled_value).decide(
                                        ($) => {
                                            switch ($[0]) {
                                                case 'simple': return p_.ss($, ($) => $)
                                                default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                            }
                                        })])
                                    case 'optional': return p_.ss($, ($) => {
                                        const def = $
                                        return ['optional', p_.from.state(unmarshalled_value).decide(
                                            ($): d_out.Optional => {
                                                switch ($[0]) {
                                                    case 'optional': return p_.ss($, ($): d_out.Optional => ({
                                                        'unmarshalled': $,
                                                        'status': p_.from.state($.derived.status).decide(
                                                            ($) => {
                                                                switch ($[0]) {
                                                                    case 'set': return p_.ss($, ($) => ['set', {
                                                                        'child value': Value(
                                                                            $['child value'],
                                                                            $l,
                                                                            {
                                                                                'definition': def.resolver,
                                                                                'resolver': $p.resolver,
                                                                                'module parameters': $p['module parameters'],
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
                                        return ['reference', p_.from.state(def.type).decide(
                                            ($): d_out.Reference => {
                                                switch ($[0]) {
                                                    case 'derived': return p_.ss($, ($) => ['derived', null])
                                                    case 'selected': return p_.ss($, ($) => {
                                                        const unmarshalled = p_.from.state(unmarshalled_value).decide(
                                                            ($) => {
                                                                switch ($[0]) {
                                                                    case 'reference': return p_.ss($, ($) => p_.from.state($.type).decide(
                                                                        ($) => {
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
                                        const $v_def = $
                                        return ['state', p_.from.state(unmarshalled_value).decide(
                                            ($) => {
                                                switch ($[0]) {
                                                    case 'state': return p_.ss($, ($) => ({
                                                        'unmarshalled': $,
                                                        'option': p_.from.state($.derived['option status']).decide(
                                                            ($) => {
                                                                switch ($[0]) {
                                                                    case 'set': return p_.ss($, ($) => p_.literal.set(Value(
                                                                        $.value,
                                                                        $l,
                                                                        {
                                                                            'definition': p_.from.dictionary($v_def.options).get_possible_entry(
                                                                                $.option,
                                                                                ($) => $,
                                                                                () => p_unreachable_code_path("the definition is resolved")
                                                                            ).resolver,
                                                                            'resolver': $p.resolver,
                                                                            'module parameters': $p['module parameters'],
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
                                    case 'text': return p_.ss($, ($) => ['text', p_.from.state(unmarshalled_value).decide(
                                        ($) => {
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