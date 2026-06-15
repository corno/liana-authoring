import * as p_di from 'pareto-core/dist/data/interface'

import * as d_location from "astn-core/dist/interface/generated/liana/schemas/location/data"

export type Error = {
    'range': d_location.Range
    'type':
    | ['to be implemented', null]
    'severity':
    | ['error', null]
    | ['warning', null]
    | ['hint', null]
}

export type Errors = p_di.List<Error>