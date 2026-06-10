import * as _pi from 'pareto-core/dist/interface'

import * as d_location from "astn-core/dist/interface/generated/liana/schemas/location/data"

export type Symbol = {
    'name': string
    'detail': string
    'range': d_location.Range
    'selection range': d_location.Range
    'value': Value
}

export type Value = {
    'type': Value_Type
}

export type Value_Type =
    | ['composite', Composite]
    | ['primitive', {
        'kind':
        | ['null', null]
        | ['boolean', null]
        | ['number', null]
        | ['string', null]
    }
    ]

export type Composite = {
    'children': Symbols
    'kind':
    | ['enum member', null]
    | ['object', null]
    | ['struct', null]
    | ['array', null]
}

export type Symbols = _pi.List<Symbol>