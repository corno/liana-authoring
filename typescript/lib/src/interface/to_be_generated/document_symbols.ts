import * as p_di from 'pareto-core/dist/interface/data'

import * as d_location from "astn-core/dist/interface/generated/liana/schemas/location/data"

export type Symbol = {
    'name': string
    'detail': string
    'range': d_location.Range
    'selection range': d_location.Range
    'value': Value
}

export type Value = {
    'kind': Kind
    'children': Symbols
}

export type Kind =
    | ['enum member', null]
    | ['object', null]
    | ['struct', null]
    | ['array', null]
    | ['null', null]
    | ['boolean', null]
    | ['number', null]
    | ['string', null]

export type Symbols = p_di.List<Symbol>