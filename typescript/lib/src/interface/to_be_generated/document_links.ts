import * as pi from 'pareto-core/dist/interface'

import * as d_location from "astn-core/dist/interface/generated/liana/schemas/location/data"

export type Link = {
    'range': d_location.Range
    'target': string
    'tooltip': pi.Optional_Value<string>
}

export type Links = pi.List<Link>