import * as _pi from 'pareto-core/dist/interface'

import * as d_resolve_result from "./resolve_result"


export type Parameters = {
    'lookups': Lookup_Parameters
    'modules': Module_Parameters
}

export type Lookup_Parameters = _pi.Optional_Value<_pi.Dictionary<Lookup>>

export type Module_Parameters = _pi.Optional_Value<_pi.Dictionary<Module>>

export type Lookup = 
| ['acyclic siblings', Acyclic_Siblings]
| ['cyclic siblings', Cyclic_Siblings]
| ['parameter', Lookup]

export type Module = null

export type Acyclic_Siblings = _pi.dynamic_lookup.Acyclic<d_resolve_result.Entry>

export type Cyclic_Siblings = _pi.dynamic_lookup.Cyclic<d_resolve_result.Entry>