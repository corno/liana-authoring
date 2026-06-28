import * as p_ from 'pareto-core/dist/interface/data'

import * as d_out from "./unmarshall_result"

export type Found =
    | ['value', d_out.Value]
    | ['entry', d_out.Entry]
    | ['state', d_out.State]
    | ['property', {
        'style':
        | ['verbose', d_out.Verbose_Property]
        | ['unknown concise', d_out.Concise_Property]
    }]

export type Possibly_Found = p_.Optional_Value<Found>