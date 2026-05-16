import * as _pi from 'pareto-core/dist/interface'

import * as d_out from "./unmarshall_result"
import * as d_astn_parse_tree from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"

export type Found =
    | ['value', d_out.Value]
    | ['entry', d_out.Entry]
    | ['state', d_out.State]
    | ['property', {
        'style':
        | ['verbose', d_out.Verbose_Property]
        | ['unknown concise', d_out.Concise_Property]
    }]

export type Possibly_Found = _pi.Optional_Value<Found>