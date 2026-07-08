import * as p_ from 'pareto-core/interface/data'

import type * as d_location from "astn-core/interface/generated/liana/schemas/location/data"

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