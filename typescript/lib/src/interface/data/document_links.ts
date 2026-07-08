import * as p_ from 'pareto-core/interface/data'

import type * as d_location from "astn-core/interface/generated/liana/schemas/location/data"

export type Link = {
    'range': d_location.Range
    'target': string
    'tooltip': p_.Optional_Value<string>
}

export type Links = p_.List<Link>