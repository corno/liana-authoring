import * as p_di from 'pareto-core/dist/interface/data'

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

export type Possibly_Found = p_di.Optional_Value<Found>