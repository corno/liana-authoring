import * as p_ from 'pareto-core/interface/data'

import type * as d_location from "astn-core/interface/data/location"

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

export type Symbols = p_.List<Symbol>