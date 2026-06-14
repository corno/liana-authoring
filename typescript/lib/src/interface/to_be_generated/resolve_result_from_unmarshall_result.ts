import * as p_di from 'pareto-core/dist/data/interface'

import * as d_resolve_result from "./resolve_result"


// export type Parameters = {
//     'lookups': Lookup_Parameters
//     'modules': Module_Parameters
// }

// export type Lookup_Parameters = p_di.Optional_Value<p_di.Dictionary<Lookup>>

// export type Module_Parameters = p_di.Optional_Value<p_di.Dictionary<Module>>

export type Lookup = 
| ['acyclic siblings', Acyclic_Siblings]
| ['cyclic siblings', Cyclic_Siblings]
| ['parameter', Lookup]

export type Module = null

export type Acyclic_Siblings = p_di.dynamic_lookup.Acyclic<d_resolve_result.Entry>

export type Cyclic_Siblings = p_di.dynamic_lookup.Cyclic<d_resolve_result.Entry>