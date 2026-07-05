import * as p_ from 'pareto-core/interface/data'

import * as d_unmarshall_result from "./unmarshall_result.js"

import * as d_schema from "pareto-liana/interface/generated/liana/schemas/schema/data/resolved"

export type Document = {
    'unmarshalled': d_unmarshall_result.Document
    'content': Value
}

export type Value = {
    'definition': d_schema.Resolver_Value
    'unmarshalled': d_unmarshall_result.Value
    'unmarshall result': Value_Unmarshall_Result
}

export type Value_Unmarshall_Result =
    | ['success', Resolved_Value_Type]
    | ['error', d_unmarshall_result.Value_Unmarshall_Error]

export type Resolved_Value_Type =
    | ['component', Component]
    | ['dictionary', Dictionary]
    | ['group', Group]
    | ['list', List]
    | ['nothing', d_unmarshall_result.Nothing]
    | ['simple', d_unmarshall_result.Simple]
    | ['optional', Optional]
    | ['reference', Reference]
    | ['state', State]
    | ['text', d_unmarshall_result.Text]

export type Component = {
    'unmarshalled': d_unmarshall_result.Component
    'value': Value
}

export type Dictionary = {
    'unmarshalled': d_unmarshall_result.Dictionary
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
    'unmarshalled': d_unmarshall_result.Group
    'properties': p_.Dictionary<Property>
}

export type Property = {
    'unmarshall result':
    | ['success', Property_Unmarshalled]
    | ['error', d_unmarshall_result.Property_Unmarshall_Error]
}

export type Property_Unmarshalled = {
    'definition': d_schema.Resolver_Value
    'resolved': Value
}

export type List = {
    'unmarshalled': d_unmarshall_result.List
    'items': p_.List<Value>
}

export type Optional = {
    'unmarshalled': d_unmarshall_result.Optional
    'status':
    | ['set', {
        'child value': Value
    }]
    | ['not set', null]
}

export type Reference =
    | ['derived', null]
    | ['selected', {
        'unmarshalled': d_unmarshall_result.Reference_Selected
        'resolve status':
        | ['to be implemented', null]
    }]

export type State = {
    'unmarshalled': d_unmarshall_result.State
    'option': p_.Optional_Value<Value>
}