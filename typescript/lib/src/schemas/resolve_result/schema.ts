import * as p_ from 'pareto-core/schema'

import type * as s_unmarshall_result from "../unmarshall_result/schema.js"

import type * as s_schema from "pareto-liana/modules/schema.generated/schemas/resolved/schema"

export type Document = {
    'unmarshalled': s_unmarshall_result.Document
    'content': Value
}

export type Value = {
    'definition': s_schema.Resolver_Value
    'unmarshalled': s_unmarshall_result.Value
    'unmarshall result': Value_Unmarshall_Result
    'reference identifiers'?: p_.Circular_Dependency<p_.List<string>>
    'constraints'?: p_.Circular_Dependency<p_.Dictionary<Value_Selection_Status>>
}

export type Value_Unmarshall_Result =
    | ['success', Resolved_Value_Type]
    | ['error', s_unmarshall_result.Value_Unmarshall_Error]

export type Resolved_Value_Type =
    | ['component', Component]
    | ['dictionary', Dictionary]
    | ['group', Group]
    | ['list', List]
    | ['nothing', s_unmarshall_result.Nothing]
    | ['simple', s_unmarshall_result.Simple]
    | ['optional', Optional]
    | ['reference', Reference]
    | ['state', State]
    | ['text', s_unmarshall_result.Text]

export type Component = {
    'unmarshalled': s_unmarshall_result.Component
    'value': Value
}

export type Dictionary = {
    'unmarshalled': s_unmarshall_result.Dictionary
    'entries': p_.Dictionary<Entry>
}

export type Entry = {
    'unmarshall result': Entry.Unmarshall_Result
}

export namespace Entry {
    export type Unmarshall_Result =
        | ['success', {
            'value':
            | ['set', Value]
            | ['not set', null]
        }]
        | ['error', null]
}

export type Group = {
    'unmarshalled': s_unmarshall_result.Group
    'properties': p_.Dictionary<Property>
}

export type Property = {
    'unmarshall result':
    | ['success', Property_Unmarshalled]
    | ['error', s_unmarshall_result.Property_Unmarshall_Error]
}

export type Property_Unmarshalled = {
    'definition': s_schema.Resolver_Value
    'resolved': Value
}

export type List = {
    'unmarshalled': s_unmarshall_result.List
    'items': p_.List<Value>
}

export type Optional = {
    'unmarshalled': s_unmarshall_result.Optional
    'constraints'?: p_.Dictionary<Value_Selection_Status>
    'status':
    | ['set', {
        'child value': Value
    }]
    | ['not set', null]
}

export type Reference =
    | ['derived', {
        'unmarshalled': s_unmarshall_result.Reference_Derived,
        'resolve status': Value_Selection_Status,
    }]
    | ['selected', {
        'unmarshalled': s_unmarshall_result.Reference_Selected
        'resolve status': Reference_Resolve_Status
    }]

export type Final_Reference_Resolve_Status =
    | ['unexpected state', { 'expected': string, 'actual': string }]
    | ['resolved', Entry]
    | ['resolved stack', { 'entry': Entry, 'depth': number }]
    | ['premature cyclic access', null]
    | ['no such entry', string]
    | ['no context lookup', null]
    | ['cycle detected', p_.List<string>]
    | ['entry unavailable', string]
    | ['to be implemented', null]

export type Reference_Resolve_Status =
    | Final_Reference_Resolve_Status
    | ['cyclic', p_.Circular_Dependency<Final_Reference_Resolve_Status>]

export type Value_Selection_Status =
    | ['resolved', Value]
    | ['not set', null]
    | ['selection unavailable', null]
    | ['cycle detected', p_.List<string>]
    | ['not found because of root', null]
    | ['to be implemented', null]
    | ['reference error', Final_Reference_Resolve_Status]
    | ['unexpected state', { 'expected': string, 'actual': string }]

export type State = {
    'unmarshalled': s_unmarshall_result.State
    'option': p_.Optional_Value<Value>
    'constraints'?: p_.Dictionary<Value_Selection_Status>
}