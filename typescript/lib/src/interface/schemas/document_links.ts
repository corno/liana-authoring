import * as p_ from 'pareto-core/interface/schema'

import type * as s_location from "./location.js"

export type Link = {
    'range': s_location.Range
    'target': string
    'tooltip': p_.Optional_Value<string>
}

export type Links = p_.List<Link>