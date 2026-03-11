import * as _pi from 'pareto-core/dist/interface'

import * as d_unmarshall_result from "./unmashall_result"

import * as d_schema from "pareto-liana/dist/interface/generated/liana/schemas/schema/data/resolved"

export type Document = {
    'content': Value
}

export type Value = {
    'definition': d_schema.Resolver_Value
    'unmarshalled': d_unmarshall_result.Value
    'resolved': Resolved_Value_Type //the type is determined by the definition
}

export type Resolved_Value_Type =
    | ['boolean', d_unmarshall_result.Boolean]
    | ['component', Component]
    | ['dictionary', Dictionary]
    | ['group', Group]
    | ['list', List]
    | ['nothing', d_unmarshall_result.Nothing]
    | ['number', d_unmarshall_result.Number]
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
    'entries': _pi.Optional_Value<_pi.Dictionary<Optional_Entry>>
}

export type Optional_Entry = _pi.Optional_Value<Value>

export type Group = {
    'unmarshalled': d_unmarshall_result.Group
    'properties': _pi.Dictionary<Property>
}

export type Property = {
    'definition': d_schema.Resolver_Value
    'resolved': _pi.Optional_Value<Value>
}

export type List = {
    'unmarshalled': d_unmarshall_result.List
    'items': _pi.Optional_Value<_pi.List<Value>>
}

export type Optional = {
    'unmarshalled': d_unmarshall_result.Optional
    'optional optional value': _pi.Optional_Value<_pi.Optional_Value<Value>>
}

export type Reference = {
    'unmarshalled': d_unmarshall_result.Reference
}

export type State = {
    'unmarshalled': d_unmarshall_result.State
    'option': _pi.Optional_Value<Value>
}

export type Parameters = _pi.Dictionary<Parameter>

export type Parameter =
    | ['needs implementation', null]