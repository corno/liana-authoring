import * as _pi from 'pareto-core/dist/interface'

import * as d_out from "pareto-liana/dist/interface/to_be_generated/unmashall_result"

export type Found =
    | ['value', d_out.Value]
    | ['entry', d_out.Entry_Data]
    | ['verbose property', d_out.Verbose_Property]
    | ['concise property', d_out.Concise_Property]
    | ['valid state', d_out.Valid_State]

export type Possibly_Found = _pi.Optional_Value<Found>