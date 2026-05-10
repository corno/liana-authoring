import * as _pi from 'pareto-core/dist/interface'

import * as d_out from "../../interface/to_be_generated/unmashall_result"
import * as d_astn_parse_tree from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"

export type Found =
    | ['value', d_out.Value]
    | ['entry', d_out.Entry_Data]
    | ['verbose property', d_out.Verbose_Property]
    | ['unknown concise property', d_out.Concise_Property]
    | ['valid state', d_out.Valid_State]

export type Possibly_Found = _pi.Optional_Value<Found>