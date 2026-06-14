import * as p_di from 'pareto-core/dist/data/interface'

import * as d_location from "astn-core/dist/interface/generated/liana/schemas/location/data"

export type Link = {
    'range': d_location.Range
    'target': string
    'tooltip': p_di.Optional_Value<string>
}

export type Links = p_di.List<Link>