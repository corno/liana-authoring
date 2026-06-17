import * as p_ from 'pareto-core/dist/interface/data'

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

export type Errors = p_.List<Error>