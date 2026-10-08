import * as p_ from 'pareto-core/transformer'

import type * as p_i from 'pareto-core/transformer'
import type * as p_di from 'pareto-core/schema'
import p_implement_me from 'pareto-core-dev/implement_me'
import p_unreachable_code_path from 'pareto-core/transformer/specials/unreachable_code_path'
import * as p_temp_dictionary from 'pareto-core/temp/Generic_Dictionary'
import * as p_lookup from 'pareto-core/transformer/specials/lookup'

import type * as s_in from "../../../schemas/unmarshall_result/schema.js"
import type * as s_in_definition from "pareto-liana/modules/schema.generated/schemas/resolved/schema"
import type * as s_out from "../../../schemas/resolve_result/schema.js"

namespace p_i_temp {

    type Lookup_Type =
        | null
        | undefined
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
        const raw = $.__get_raw()
        return raw === null
            ? not_set()
            : set(raw[0])
    }

}

namespace temp {

    export type Acyclic_Parameter_Resolve_Status =
        | ['to be implemented', null]
        | ['resolved', p_i.lookup.Acyclic<s_out.Entry>]
        | ['not found because of root', null]

    export type Cyclic_Parameter_Resolve_Status =
        | ['to be implemented', null]
        | ['resolved', p_i.lookup.Cyclic<s_out.Entry>]
        | ['not found because of root', null]

    export type Stack_Parameter_Resolve_Status =
        | ['to be implemented', null]
        | ['resolved', p_i.lookup.Stack<s_out.Entry>]
        | ['not found because of root', null]

    type Lookup_Parameters = {
        'acyclic': p_temp_dictionary.Generic_Dictionary<Acyclic_Parameter_Resolve_Status>
        'cyclic': p_temp_dictionary.Generic_Dictionary<Cyclic_Parameter_Resolve_Status>
        'stack': p_temp_dictionary.Generic_Dictionary<Stack_Parameter_Resolve_Status>
    }

    export const Acyclic_Reference = (
        lookup: p_i.lookup.Acyclic<s_out.Entry>,
        id: string,
    ): s_out.Reference_Resolve_Status => {
        const failure: { status: s_out.Final_Reference_Resolve_Status | null } = { status: null }
        const entry = lookup.get_entry(id, {
            no_context_lookup: () => {
                failure.status = ['no context lookup', null]
                return p_.literal.not_set()
            },
            cycle_detected: cycle => {
                failure.status = ['cycle detected', cycle]
                return p_.literal.not_set()
            },
        })
        if (failure.status !== null) return failure.status
        return p_.from.optional(entry).decide<s_out.Reference_Resolve_Status>(
            entry => entry['unmarshall result'][0] === 'success'
                && entry['unmarshall result'][1].value[0] === 'set'
                && entry['unmarshall result'][1].value[1]['unmarshall result'][0] === 'success'
                ? ['resolved', entry]
                : ['entry unavailable', id],
            () => ['no such entry', id],
        )
    }

    export const Cyclic_Reference = (lookup: p_i.lookup.Cyclic<s_out.Entry>, id: string): s_out.Reference_Resolve_Status => {
        const failure: { status: s_out.Final_Reference_Resolve_Status | null } = { status: null }
        const entry = lookup.get_entry(id, {
            no_context_lookup: () => {
                failure.status = ['no context lookup', null]
                return p_.literal.not_set()
            },
            accessing_cyclic_sibling_before_it_is_resolved: () => {
                failure.status = ['premature cyclic access', null]
                return p_.literal.not_set()
            },
        })
        return ['cyclic', {
            get_circular_dependent: () => {
                const value = entry.get_circular_dependent()
                if (failure.status !== null) return failure.status
                return Entry_Status(value, id)
            },
        }]
    }

    const Stack_Reference = (lookup: p_i.lookup.Stack<s_out.Entry>, id: string): s_out.Reference_Resolve_Status => {
        const result = Acyclic_Reference(lookup, id)
        if (result[0] !== 'resolved') return result
        const failure: { status: s_out.Reference_Resolve_Status | null } = { status: null }
        const depth = lookup.get_entry_depth(id, {
            no_context_lookup: () => {
                failure.status = ['no context lookup', null]
                return p_.literal.not_set()
            },
            cycle_detected: cycle => {
                failure.status = ['cycle detected', cycle]
                return p_.literal.not_set()
            },
        })
        if (failure.status !== null) return failure.status
        return p_.from.optional(depth).decide<s_out.Reference_Resolve_Status>(
            depth => ['resolved stack', { entry: result[1], depth }],
            () => ['no such entry', id],
        )
    }

    export const Selected_Reference = (
        definition: s_in_definition.Resolver_Lookup_Selection,
        id: string,
        lookups: temp.Lookups,
        parameters: p_di.Dictionary<Module_Parameter_Resolve_Status>,
    ): s_out.Reference_Resolve_Status => {
        const type = definition.type
        switch (type[0]) {
            case 'acyclic':
                return type[1][0] === 'siblings'
                    ? Acyclic_Reference(lookups.siblings.acyclic, id)
                    : Resolved_Dictionary_Reference(type[1][1].selection, id, lookups, parameters)
            case 'parameter': {
                const parameter = type[1]
                switch (parameter['l entry'].type[0]) {
                    case 'acyclic': {
                        const status = Lookup_Parameter(lookups.parameters.acyclic, parameter['l id'])
                        return status[0] === 'resolved' ? Acyclic_Reference(status[1], id)
                            : status[0] === 'to be implemented' ? status : ['no context lookup', null]
                    }
                    case 'cyclic': {
                        const status = Lookup_Parameter(lookups.parameters.cyclic, parameter['l id'])
                        return status[0] === 'resolved' ? Cyclic_Reference(status[1], id)
                            : status[0] === 'to be implemented' ? status : ['no context lookup', null]
                    }
                    case 'stack': {
                        const status = Lookup_Parameter(lookups.parameters.stack, parameter['l id'])
                        return status[0] === 'resolved' ? Stack_Reference(status[1], id)
                            : status[0] === 'to be implemented' ? status : ['no context lookup', null]
                    }
                    default: return p_.exhaustive(parameter['l entry'].type[0])
                        }
            }
            case 'cyclic': return Cyclic_Reference(lookups.siblings.cyclic, id)
            default: return p_.exhaustive(type[0])
        }
    }

    export const Lookup_Parameter = <T>(dictionary: p_temp_dictionary.Generic_Dictionary<T>, id: string): T | ['not found because of root', null] => {
        for (const entry of dictionary.__get_raw()) if (entry[0] === id) return entry[1]
        return ['not found because of root', null]
    }

    const Entry_Status = (entry: p_di.Optional_Value<s_out.Entry>, id: string): s_out.Final_Reference_Resolve_Status =>
        p_.from.optional(entry).decide<s_out.Final_Reference_Resolve_Status>(
            entry => entry['unmarshall result'][0] === 'success'
                && entry['unmarshall result'][1].value[0] === 'set'
                && entry['unmarshall result'][1].value[1]['unmarshall result'][0] === 'success'
                ? ['resolved', entry] : ['entry unavailable', id],
            () => ['no such entry', id],
        )

    export const Reference_Status = (status: s_out.Reference_Resolve_Status): s_out.Final_Reference_Resolve_Status =>
        status[0] === 'cyclic' ? status[1].get_circular_dependent() : status

    export type Lookups = {
        'group'?: {
            readonly properties: p_i.lookup.Acyclic<s_out.Property>
            readonly parent: Lookups['group'] | null
        }
        'parameters': Lookup_Parameters
        'siblings': {
            'acyclic': p_i.lookup.Acyclic<s_out.Entry>
            'cyclic': p_i.lookup.Cyclic<s_out.Entry>
        }
    }

    export type Module_Parameter_Resolve_Status = s_out.Value_Selection_Status

}

export const Reference_Status = temp.Reference_Status

const resolvedType = (value: s_out.Value): s_out.Resolved_Value_Type | null =>
    value['unmarshall result'][0] === 'success' ? value['unmarshall result'][1] : null

const selectProperty = (lookup: p_i.lookup.Acyclic<s_out.Property>, id: string): temp.Module_Parameter_Resolve_Status => {
    const failure: { cycle: p_di.List<string> | null } = { cycle: null }
    const selected = lookup.get_entry(id, {
        no_context_lookup: () => p_.literal.not_set(),
        cycle_detected: cycle => {
            failure.cycle = cycle
            return p_.literal.not_set()
        },
    })
    if (failure.cycle !== null) return ['cycle detected', failure.cycle]
    return p_.from.optional(selected).decide<temp.Module_Parameter_Resolve_Status>(
        property => property['unmarshall result'][0] === 'success'
            ? ['resolved', property['unmarshall result'][1].resolved] : ['selection unavailable', null],
        () => ['selection unavailable', null],
    )
}

const Resolved_Dictionary_Reference = (
    selection: s_in_definition.Resolver_Guaranteed_Value_Selection, id: string,
    lookups: temp.Lookups, parameters: p_di.Dictionary<temp.Module_Parameter_Resolve_Status>,
): s_out.Reference_Resolve_Status => {
    const selected = Resolver_Guaranteed_Value_Selection(selection, lookups, parameters)
    if (selected[0] !== 'resolved') {
        switch (selected[0]) {
            case 'to be implemented': return ['to be implemented', null]
            case 'cycle detected': return ['cycle detected', selected[1]]
            case 'reference error': return selected[1]
            default: return ['no context lookup', null]
        }
    }
    let value = resolvedType(selected[1])
    // Value parameters select module values; component boundaries are transparent here.
    while (value !== null && value[0] === 'component') value = resolvedType(value[1].value)
    if (value === null || value[0] !== 'dictionary') return ['entry unavailable', id]
    return temp.Acyclic_Reference(p_lookup.acyclic.from_resolved_dictionary(value[1].entries), id)
}

const Acyclic_Lookup = (
    selection: s_in_definition.Resolver_Lookup_Selection, lookups: temp.Lookups,
    parameters: p_di.Dictionary<temp.Module_Parameter_Resolve_Status>,
): temp.Acyclic_Parameter_Resolve_Status => {
    const type = selection.type
    switch (type[0]) {
        case 'parameter': return temp.Lookup_Parameter(lookups.parameters.acyclic, type[1]['l id'])
        case 'acyclic': {
            if (type[1][0] === 'siblings') return ['resolved', lookups.siblings.acyclic]
            const selected = Resolver_Guaranteed_Value_Selection(type[1][1].selection, lookups, parameters)
            if (selected[0] !== 'resolved') return selected[0] === 'to be implemented'
                ? selected : ['not found because of root', null]
            let value = resolvedType(selected[1])
            while (value !== null && value[0] === 'component') value = resolvedType(value[1].value)
            return value !== null && value[0] === 'dictionary'
                ? ['resolved', p_lookup.acyclic.from_resolved_dictionary(value[1].entries)]
                : ['not found because of root', null]
        }
        case 'cyclic': return ['to be implemented', null]
        default: return p_.exhaustive(type[0])
    }
}

const Cyclic_Lookup = (selection: s_in_definition.Resolver_Lookup_Selection, lookups: temp.Lookups): temp.Cyclic_Parameter_Resolve_Status => {
    switch (selection.type[0]) {
        case 'parameter': return temp.Lookup_Parameter(lookups.parameters.cyclic, selection.type[1]['l id'])
        case 'cyclic': return ['resolved', lookups.siblings.cyclic]
        case 'acyclic': return ['to be implemented', null]
        default: return p_.exhaustive(selection.type[0])
    }
}

const Stack_Lookup = (selection: s_in_definition.Resolver_Lookup_Selection, lookups: temp.Lookups): temp.Stack_Parameter_Resolve_Status =>
    selection.type[0] === 'parameter' ? temp.Lookup_Parameter(lookups.parameters.stack, selection.type[1]['l id'])
        : ['to be implemented', null]

const Lookup_Arguments = (
    values: s_in_definition.Resolver_Value.component.arguments_.O.lookups.O,
    lookups: temp.Lookups, parameters: p_di.Dictionary<temp.Module_Parameter_Resolve_Status>,
): temp.Lookups['parameters'] => {
    const kind = (value: s_in_definition.Resolver_Value.component.arguments_.O.lookups.O.D): 'acyclic' | 'cyclic' | 'stack' => {
        if (value[0] !== 'selection') return value[0]
        const type = value[1].type
        return type[0] === 'parameter' ? type[1]['l entry'].type[0] : type[0]
    }
    return {
        acyclic: p_temp_dictionary.map_value_dictionary_to_generic_dictionary(
            p_.from.dictionary(values).filter(value => kind(value) === 'acyclic'),
            (value): temp.Acyclic_Parameter_Resolve_Status => value[0] === 'selection'
                ? Acyclic_Lookup(value[1], lookups, parameters) : ['resolved', p_lookup.acyclic.not_set()],
        ),
        cyclic: p_temp_dictionary.map_value_dictionary_to_generic_dictionary(
            p_.from.dictionary(values).filter(value => kind(value) === 'cyclic'),
            (value): temp.Cyclic_Parameter_Resolve_Status => value[0] === 'selection'
                ? Cyclic_Lookup(value[1], lookups) : ['resolved', p_lookup.cyclic.not_set()],
        ),
        stack: p_temp_dictionary.map_value_dictionary_to_generic_dictionary(
            p_.from.dictionary(values).filter(value => kind(value) === 'stack'),
            (value): temp.Stack_Parameter_Resolve_Status => {
                if (value[0] === 'selection') return Stack_Lookup(value[1], lookups)
                if (value[0] !== 'stack') return ['to be implemented', null]
                if (value[1][0] === 'empty') return ['resolved', p_lookup.stack.empty()]
                const stack = Stack_Lookup(value[1][1].stack, lookups)
                const item = Acyclic_Lookup(value[1][1].item, lookups, parameters)
                if (stack[0] === 'resolved' && item[0] === 'resolved')
                    return ['resolved', p_lookup.stack.push(stack[1], item[1])]
                return stack[0] === 'to be implemented' || item[0] === 'to be implemented'
                    ? ['to be implemented', null] : ['not found because of root', null]
            },
        ),
    }
}

export const Document: p_i_temp.Transformer_With_Lookups_And_Parameter<
    s_in.Document,
    s_out.Document,
    temp.Lookups,
    {
        'definition': s_in_definition.Resolver_Modules.D
        'resolvers': s_in_definition.Resolver
        'module parameters': p_di.Dictionary<temp.Module_Parameter_Resolve_Status>
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
//     $: s_function.Lookup,
//     $p: {
//         'id': string
//     }
// ) => p_.from.state($).decide(
//($) => {
//     switch ($[0]) {
//         case 'acyclic siblings': return p_.option($, ($) => p_implement_me("!!!!!!!"))
//         case 'cyclic siblings': return p_.option($, ($) => p_implement_me("!!!!!!!"))
//         case 'parameter': return p_.option($, ($) => p_implement_me("!!!!!!!"))
//         default: return p_.exhaustive($[0])
//     }
// })

// export const Resolver_Lookup_Selection = (
//     $: null,
//     $p: {
//         definition: s_in_definition.Resolver_Lookup_Selection
//         'acyclic siblings': p_di.Optional_Value<s_function.Acyclic_Siblings>
//         'cyclic siblings': p_di.Optional_Value<s_function.Cyclic_Siblings>
//         'lookup parameters': p_di.Optional_Value<s_function.Lookup_Parameters>
//     }
// ): s_function.Lookup => {
//     return p_implement_me("!!!!!!!")
//     // return p_.decide.state($p.definition.type, ($): s_function.Lookup => {
//     //     switch ($[0]) {
//     //         case 'acyclic': return p_.option($, ($) => p_.from.state($).decide(
//($) => {
//     //             switch ($[0]) {
//     //                 case 'siblings': return p_.option($, ($) => $p['acyclic siblings'].__ decide(
//     //                     ($) => ['acyclic siblings', $],
//     //                     () => p_unreachable_code_path("acyclic siblings should have been provided for this definition")
//     //                 ))
//     //                 case 'resolved dictionary': return p_.option($, ($) => p_implement_me("!!!!!!!"))
//     //                 default: return p_.exhaustive($[0])
//     //             }
//     //         }))
//     //         case 'cyclic': return p_.option($, ($) => p_.from.state($).decide(
//($) => {
//     //             switch ($[0]) {
//     //                 case 'siblings': return p_.option($, ($) => $p['cyclic siblings'].__ decide(
//     //                     ($) => ['cyclic siblings', $],
//     //                     () => p_unreachable_code_path("cyclic siblings should have been provided for this definition")
//     //                 ))
//     //                 default: return p_.exhaustive($[0])
//     //             }
//     //         }))
//     //         case 'parameter': return p_.option($, ($) => $p['module parameters'].__ decide(
//     //             ($) => ['parameter', $p['module parameters']],
//     //             () => p_unreachable_code_path("module parameters should have been provided for this definition")
//     //         ))
//     //         default: return p_.exhaustive($[0])
//     //     }
//     // })
// }

export const Resolver_Optional_Value_Initialization = (
    $: s_in_definition.Resolver_Optional_Value_Initialization,
    lookups: temp.Lookups,
    parameters: p_di.Dictionary<temp.Module_Parameter_Resolve_Status>,
): temp.Module_Parameter_Resolve_Status => {
    switch ($[0]) {
        case 'not set': return ['not set', null]
        case 'set': return Resolver_Guaranteed_Value_Selection($[1], lookups, parameters)
        case 'selection':
            if ($[1][0] !== 'parameter') return ['to be implemented', null]
            return p_.from.dictionary(parameters).get_possible_entry(
                $[1][1]['l id'], value => value, () => ['not found because of root', null],
            )
        default: return p_.exhaustive($[0])
    }
}

export const Resolver_Guaranteed_Value_Selection = (
    $: s_in_definition.Resolver_Guaranteed_Value_Selection,
    lookups: temp.Lookups,
    parameters: p_di.Dictionary<temp.Module_Parameter_Resolve_Status>,
): temp.Module_Parameter_Resolve_Status => {
    let selected: temp.Module_Parameter_Resolve_Status
    const start = $.start
    switch (start[0]) {
        case 'parameter':
            selected = p_.from.dictionary(parameters).get_possible_entry(
                start[1]['l id'], value => value, () => ['not found because of root', null],
            )
            break
        case 'sibling':
        case 'parent sibling': {
            const group = start[0] === 'sibling' ? lookups.group : lookups.group === undefined ? null : lookups.group.parent
            selected = group === null || group === undefined ? ['selection unavailable', null]
                : selectProperty(group.properties, start[1]['l id'])
            break
        }
        default: return ['to be implemented', null]
    }
    for (const item of $.tail.path['l value'].__get_raw()) {
        if (selected[0] !== 'resolved') return selected
        const value = resolvedType(selected[1])
        if (value === null) return ['selection unavailable', null]
        const step = item['l item']
        switch (step[0]) {
            case 'component':
                if (value[0] !== 'component') return ['selection unavailable', null]
                selected = ['resolved', value[1].value]
                break
            case 'group':
                if (value[0] !== 'group') return ['selection unavailable', null]
                selected = selectProperty(p_lookup.acyclic.from_resolved_dictionary(value[1].properties), step[1]['l id'])
                break
            case 'reference': {
                if (value[0] !== 'reference') return ['selection unavailable', null]
                if (value[1][0] === 'derived') {
                    selected = value[1][1]['resolve status']
                    break
                }
                const status = Reference_Status(value[1][1]['resolve status'])
                if (status[0] === 'resolved' || status[0] === 'resolved stack') {
                    const entry = status[0] === 'resolved' ? status[1] : status[1].entry
                    selected = entry['unmarshall result'][0] === 'success' && entry['unmarshall result'][1].value[0] === 'set'
                        ? ['resolved', entry['unmarshall result'][1].value[1]] : ['selection unavailable', null]
                } else selected = ['reference error', status]
                break
            }
            default: return p_.exhaustive(step[0])
        }
    }
    return selected
}


export const Value: p_i_temp.Transformer_With_Lookups_And_Parameter<
    s_in.Value,
    s_out.Value,
    temp.Lookups,
    {
        'definition': s_in_definition.Resolver_Value
        'resolver': s_in_definition.Resolver
        'module parameters': p_di.Dictionary<temp.Module_Parameter_Resolve_Status>
    }
> = ($, $l, $p) => {
    return {
        'definition': $p.definition,
        'unmarshalled': $,
        'unmarshall result': p_.from.state($['unmarshall result']).decide(
            ($): s_out.Value_Unmarshall_Result => {
                switch ($[0]) {
                    case 'error': return p_.option($, ($) => ['error', $])
                    case 'success': return p_.option($, ($) => {
                        const unmarshalled_value = $
                        return ['success', p_.from.state($p.definition).decide(
                            ($): s_out.Resolved_Value_Type => {
                                switch ($[0]) {
                                    case 'component': return p_.option($, ($) => {
                                        const def = $
                                        return ['component', p_.from.state(unmarshalled_value).decide(
                                            ($) => {
                                                switch ($[0]) {
                                                    case 'component': return p_.option($, ($) => {
                                                        const def2 = p_.from.state(def.location).decide(
                                                            ($): s_in_definition.Resolver_Modules_.D => {
                                                                switch ($[0]) {
                                                                    case 'external': return p_.option($, ($) => p_implement_me("external component"))
                                                                    case 'internal': return p_.option($, ($) => p_.from.dictionary($p.resolver.modules).get_possible_entry(
                                                                        $['l id'],
                                                                        ($) => $,
                                                                        () => p_unreachable_code_path("the resolver should have been provided with a module parameter for this definition")
                                                                    ))
                                                                    default: return p_.exhaustive($[0])
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
                                                                            ($) => Lookup_Arguments($, $l, $p['module parameters']),
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
                                                                                ($): temp.Module_Parameter_Resolve_Status => p_.from.state($).decide(
                                                                                    ($) => {
                                                                                        switch ($[0]) {
                                                                                            case 'optional': return p_.option($, ($) => Resolver_Optional_Value_Initialization($, $l, $p['module parameters']))
                                                                                            case 'parameter': return p_.option($, ($) => p_.from.dictionary($p['module parameters']).get_possible_entry(
                                                                                                $['l id'],
                                                                                                ($) => $,
                                                                                                () => p_unreachable_code_path("for every parameter, there must be a module parameter provided")
                                                                                            ))
                                                                                            case 'required': return p_.option($, ($) => Resolver_Guaranteed_Value_Selection($, $l, $p['module parameters']))
                                                                                            default: return p_.exhaustive($[0])
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
                                                                    //             ($) => $.__ s_map_deprecated(
                                                                    // ($) => p_.from.state($).decide(
                                                                    //($) => {
                                                                    //                 switch ($[0]) {
                                                                    //                     case 'stack': return p_.option($, ($) => p_.from.state($).decide(
                                                                    //($) => {
                                                                    //                         switch ($[0]) {
                                                                    //                             case 'empty': return p_.option($, ($) => null)
                                                                    //                             case 'push': return p_.option($, ($) => {
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
                                                                    //                             default: return p_.exhaustive($[0])
                                                                    //                         }
                                                                    //                     }))
                                                                    //                     case 'acyclic': return p_.option($, ($) => p_implement_me("!!!!!!!"))
                                                                    //                     case 'cyclic': return p_.option($, ($) => p_implement_me("!!!!!!!"))
                                                                    //                     case 'selection': return p_.option($, ($) => p_implement_me("!!!!!!!"))
                                                                    //                     default: return p_.exhaustive($[0])
                                                                    //                 }
                                                                    //             }))

                                                                    //         ),
                                                                    //         'modules': p_.from.optional($.modules).map(
                                                                    //             ($) => $.__ s_map_deprecated(
                                                                    // ($) => p_.from.state($).decide(
                                                                    //($) => {
                                                                    //                 switch ($[0]) {
                                                                    //                     case 'optional': return p_.option($, ($) => p_implement_me("!!!!!!!"))
                                                                    //                     case 'required': return p_.option($, ($) => p_implement_me("!!!!!!!"))
                                                                    //                     case 'parameter': return p_.option($, ($) => p_implement_me("!!!!!!!"))
                                                                    //                     default: return p_.exhaustive($[0])
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
                                    case 'dictionary': return p_.option($, ($) => {
                                        const def = $
                                        return ['dictionary', p_.from.state(unmarshalled_value).decide(
                                            ($): s_out.Dictionary => {
                                                switch ($[0]) {
                                                    case 'dictionary': return p_.option($, ($): s_out.Dictionary => ({
                                                        'unmarshalled': $,
                                                        'entries': p_.from.dictionary($.derived.entries).resolve(
                                                            ($, id, $al, $cl): s_out.Entry => ({
                                                                'unmarshall result': p_.from.state($.result).decide(
                                                                    ($): s_out.Entry.Unmarshall_Result => {
                                                                        switch ($[0]) {
                                                                            case 'success': return p_.option($, ($) => p_.from.state($.value).decide(
                                                                                ($) => {
                                                                                    switch ($[0]) {
                                                                                        case 'set': return p_.option($, ($) => ['success', {
                                                                                            'value': ['set', Value(
                                                                                                $,
                                                                                                {
                                                                                                    ...$l,
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
                                                                                        case 'not set': return p_.option($, ($) => ['success', {
                                                                                            'value': ['not set', null]
                                                                                        }])
                                                                                        default: return p_.exhaustive($[0])
                                                                                    }
                                                                                }))
                                                                            case 'error': return p_.option($, ($) => ['error', null])
                                                                            default: return p_.exhaustive($[0])
                                                                        }
                                                                    })
                                                            }))
                                                    }))
                                                    default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                                }
                                            })]
                                    })
                                    case 'group': return p_.option($, ($) => {
                                        const def = $
                                        return ['group', p_.from.state(unmarshalled_value).decide(
                                            ($): s_out.Group => {
                                                switch ($[0]) {
                                                    case 'group': return p_.option($, ($): s_out.Group => ({
                                                        'unmarshalled': $,
                                                        'properties': p_.from.dictionary(
                                                            p_.from.dictionary(def).join(
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
                                                                        ($): s_out.Property => {
                                                                            switch ($[0]) {
                                                                                case 'success': return p_.option($, ($): s_out.Property => ({
                                                                                    'unmarshall result': ['success', {
                                                                                        'definition': resolver,
                                                                                        'resolved': Value(
                                                                                            $,
                                                                                            { ...$l, group: { properties: $al, parent: $l.group === undefined ? null : $l.group } },
                                                                                            {
                                                                                                'definition': resolver,
                                                                                                'resolver': $p.resolver,
                                                                                                'module parameters': $p['module parameters'],
                                                                                            }
                                                                                        )
                                                                                    }]
                                                                                }))
                                                                                case 'error': return p_.option($, ($): s_out.Property => ({
                                                                                    'unmarshall result': ['error', $]
                                                                                }))
                                                                                default: return p_.exhaustive($[0])
                                                                            }
                                                                        }),
                                                                    () => p_unreachable_code_path("both dictionaries are driven by the definitions in the schema")
                                                                )
                                                            }),

                                                    }))
                                                    default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                                }
                                            })]
                                    })
                                    case 'list': return p_.option($, ($) => {
                                        const def = $
                                        return ['list', p_.from.state(unmarshalled_value).decide(
                                            ($): s_out.List => {
                                                switch ($[0]) {
                                                    case 'list': return p_.option($, ($): s_out.List => ({
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
                                    case 'nothing': return p_.option($, ($) => ['nothing', p_.from.state(unmarshalled_value).decide(
                                        ($) => {
                                            switch ($[0]) {
                                                case 'nothing': return p_.option($, ($) => $)
                                                default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                            }
                                        })])
                                    case 'simple': return p_.option($, ($) => ['simple', p_.from.state(unmarshalled_value).decide(
                                        ($) => {
                                            switch ($[0]) {
                                                case 'simple': return p_.option($, ($) => $)
                                                default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                            }
                                        })])
                                    case 'optional': return p_.option($, ($) => {
                                        const def = $
                                        return ['optional', p_.from.state(unmarshalled_value).decide(
                                            ($): s_out.Optional => {
                                                switch ($[0]) {
                                                    case 'optional': return p_.option($, ($): s_out.Optional => ({
                                                        'unmarshalled': $,
                                                        'status': p_.from.state($.derived.status).decide(
                                                            ($) => {
                                                                switch ($[0]) {
                                                                    case 'set': return p_.option($, ($) => ['set', {
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
                                                                    case 'not set': return p_.option($, ($) => ['not set', null])
                                                                    default: return p_.exhaustive($[0])
                                                                }

                                                            }),
                                                    }))
                                                    default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                                }
                                            })]
                                    })
                                    case 'reference': return p_.option($, ($) => {
                                        const def = $
                                        return ['reference', p_.from.state(def.type).decide(
                                            ($): s_out.Reference => {
                                                switch ($[0]) {
                                                    case 'derived': return p_.option($, ($) => ['derived', {
                                                        unmarshalled: unmarshalled_value[0] === 'reference' && unmarshalled_value[1].type[0] === 'derived'
                                                            ? unmarshalled_value[1].type[1] : p_unreachable_code_path('expected a derived reference'),
                                                        'resolve status': Resolver_Guaranteed_Value_Selection($.value, $l, $p['module parameters']),
                                                    }])
                                                    case 'selected': return p_.option($, ($) => {
                                                        const unmarshalled = p_.from.state(unmarshalled_value).decide(
                                                            ($) => {
                                                                switch ($[0]) {
                                                                    case 'reference': return p_.option($, ($) => p_.from.state($.type).decide(
                                                                        ($) => {
                                                                            switch ($[0]) {
                                                                                case 'selected': return p_.option($, ($) => $)
                                                                                default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                                                            }
                                                                        }))
                                                                    default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                                                }
                                                            })
                                                        return ['selected', {
                                                            'unmarshalled': unmarshalled,
                                                            'resolve status': $.constraints.__get_raw().length !== 0
                                                                ? ['to be implemented', null] : temp.Selected_Reference(
                                                                $.lookup,
                                                                unmarshalled.intermediate.instance.token.value,
                                                                $l,
                                                                $p['module parameters'],
                                                            )
                                                        }]
                                                    })
                                                    default: return p_.exhaustive($[0])
                                                }
                                            })]
                                    })
                                    case 'state': return p_.option($, ($) => {
                                        const $v_def = $
                                        return ['state', p_.from.state(unmarshalled_value).decide(
                                            ($) => {
                                                switch ($[0]) {
                                                    case 'state': return p_.option($, ($) => ({
                                                        'unmarshalled': $,
                                                        'option': p_.from.state($.derived['option status']).decide(
                                                            ($) => {
                                                                switch ($[0]) {
                                                                    case 'set': return p_.option($, ($) => p_.literal.set(Value(
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
                                                                    case 'missing data': return p_.option($, ($) => p_.literal.not_set())
                                                                    default: return p_.exhaustive($[0])
                                                                }
                                                            })
                                                    }))
                                                    default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                                }
                                            })]
                                    })
                                    case 'text': return p_.option($, ($) => ['text', p_.from.state(unmarshalled_value).decide(
                                        ($) => {
                                            switch ($[0]) {
                                                case 'text': return p_.option($, ($) => $)
                                                default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                            }
                                        })])
                                    default: return p_.exhaustive($[0])
                                }
                            })]
                    })
                    default: return p_.exhaustive($[0])
                }
            })
    }
}
