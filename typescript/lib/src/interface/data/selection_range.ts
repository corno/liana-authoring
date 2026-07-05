import * as p_ from 'pareto-core/interface/data'

//data types
import * as d_location from "astn-core/interface/generated/liana/schemas/location/data"

export type Selection_Range = {
    'range': d_location.Range
    'parent range': p_.Optional_Value<d_location.Range>
}

export type Selection_Ranges = p_.List<Selection_Range>