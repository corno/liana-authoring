import * as p_ from 'pareto-core/interface/data'

import type * as s_out from "./unmarshall_result.js"

export type Found =
    | ['value', s_out.Value]
    | ['entry', s_out.Entry]
    | ['state', s_out.State]
    | ['property', {
        'style':
        | ['verbose', s_out.Verbose_Property]
        | ['unknown concise', s_out.Concise_Property]
    }]

export type Possibly_Found = p_.Optional_Value<Found>