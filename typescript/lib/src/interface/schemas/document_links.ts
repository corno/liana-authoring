import * as p_ from 'pareto-core/interface/data'

import type * as s_location from "astn-core/modules/deserialization/schemas/location"

export type Link = {
    'range': s_location.Range
    'target': string
    'tooltip': p_.Optional_Value<string>
}

export type Links = p_.List<Link>