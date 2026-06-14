import * as pi from 'pareto-core/dist/interface'

//data types
import * as d_location from "astn-core/dist/interface/generated/liana/schemas/location/data"

export type Selection_Range = {
    'range': d_location.Range
    'parent range': pi.Optional_Value<d_location.Range>
}

export type Selection_Ranges = pi.List<Selection_Range>