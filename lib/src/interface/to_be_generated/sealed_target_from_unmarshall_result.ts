import * as d_location from "astn-core/dist/interface/generated/liana/schemas/location/data"

export type Error = {
    'definition path': string
    'type': Error_Type
    'range': d_location.Range
}

export type Error_Type =
    | ['boolean', Boolean]
    | ['dictionary', Dictionary]
    | ['group', Group]
    | ['list', List]
    | ['number', Number]
    | ['optional', Optional]
    | ['reference', Reference]
    | ['state', State]
    | ['text', Text]



export type Found =
    | ['dictionary', null]
    | ['group', null]
    | ['list', null]
    | ['nothing', null]
    | ['optional', null]
    | ['state', null]
    | ['text', {
        'value': string
    }]
    | ['include', null]
    | ['missing data', null]

export type Boolean =
| ['wrong type', null]

export type Dictionary =
| ['wrong type', Found]
| ['foo', null]

export type Group =
| ['wrong type', null]
| ['missing property', {
    'name': string
}]
| ['missing property value', {
    'name': string
}]
| ['unknown property', {
    'name': string
}]
| ['multiple instances for property', {
    'name': string
}]

export type List =
| ['wrong type', null]

export type Number =
| ['wrong type', null]

export type Optional =
| ['wrong type', null]
| ['foo', null]

export type Reference =
| ['wrong type', null]

export type State =
| ['wrong type', Found]
| ['missing data', null]
| ['unknown option', null]
| ['too many items', null]
| ['missing option item', null]
| ['option item is not a text', null]
| ['missing value item', null]


export type Text =
| ['wrong type', null]
