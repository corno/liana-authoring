import * as p_ from 'pareto-core/interface/data'

//data types
import type * as s_location from "astn-core/interface/data/location"

export type Selection_Range = {
    'range': s_location.Range
    'parent range': p_.Optional_Value<s_location.Range>
}

export type Selection_Ranges = p_.List<Selection_Range>