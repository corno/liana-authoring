import * as p_ from 'pareto-core/schema'

import type * as s_location from "astn-runtime/modules/deserialization/schemas/location/schema"

export type Link = {
    'range': s_location.Range
    'target': string
    'tooltip': p_.Optional_Value<string>
}

export type Links = p_.List<Link>