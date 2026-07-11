import * as p_ from 'pareto-core/interface/data'

import type * as s_unmarshall_result from "./unmarshall_result.js"

import type * as s_schema from "pareto-liana/modules/schema/interface/data/resolved"

export type Document = {
    'unmarshalled': s_unmarshall_result.Document
    'content': Value
}

export type Value = {
    'definition': s_schema.Resolver_Value
    'unmarshalled': s_unmarshall_result.Value
    'unmarshall result': Value_Unmarshall_Result
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
    'unmarshall result':
    | ['success',{
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
    'status':
    | ['set', {
        'child value': Value
    }]
    | ['not set', null]
}

export type Reference =
    | ['derived', null]
    | ['selected', {
        'unmarshalled': s_unmarshall_result.Reference_Selected
        'resolve status':
        | ['to be implemented', null]
    }]

export type State = {
    'unmarshalled': s_unmarshall_result.State
    'option': p_.Optional_Value<Value>
}