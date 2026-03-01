import * as _pi from 'pareto-core/dist/interface'

import * as d_out from "../../../../interface/generated/liana/schemas/location/data"
import * as d_in from "astn-core/dist/interface/generated/liana/schemas/location/data"

export type Relative_Location = _pi.Transformer<d_in.Relative_Location, d_out.Position>
export type Range = _pi.Transformer<d_in.Range, d_out.Range>

export const Range: Range = ($) => ({
    'start': Relative_Location($.start.relative),
    'end': Relative_Location($.end.relative),
})

export const Relative_Location: Relative_Location = ($) => ({
    'line': $.line,
    'character': $.column,
})
