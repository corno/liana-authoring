import * as p_ from 'pareto-core/interface/data'

import type * as s_location from "astn-core/modules/deserialization/schemas/location/schema"

export type Error = {
    'range': s_location.Range
    'type':
    | ['to be implemented', null]
    'severity':
    | ['error', null]
    | ['warning', null]
    | ['hint', null]
}

export type Errors = p_.List<Error>