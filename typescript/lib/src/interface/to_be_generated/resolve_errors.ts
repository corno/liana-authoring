import _pi from 'pareto-core/dist/interface'

import * as d_location from "astn-core/dist/interface/generated/liana/schemas/location/data"

export type Error = {
    'range': d_location.Range
    'type':
    | ['to be implemented', null]
}

export type Errors = _pi.List<Error>