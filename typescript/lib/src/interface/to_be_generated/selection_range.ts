import * as p_di from 'pareto-core/dist/data/interface'

//data types
import * as d_location from "astn-core/dist/interface/generated/liana/schemas/location/data"

export type Selection_Range = {
    'range': d_location.Range
    'parent range': p_di.Optional_Value<d_location.Range>
}

export type Selection_Ranges = p_di.List<Selection_Range>