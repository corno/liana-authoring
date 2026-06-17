import * as p_ from 'pareto-core/dist/interface/data'

import * as d_resolve_result from "./resolve_result"


// export type Parameters = {
//     'lookups': Lookup_Parameters
//     'modules': Module_Parameters
// }

// export type Lookup_Parameters = p_.Optional_Value<p_.Dictionary<Lookup>>

// export type Module_Parameters = p_.Optional_Value<p_.Dictionary<Module>>

export type Lookup = 
| ['acyclic siblings', Acyclic_Siblings]
| ['cyclic siblings', Cyclic_Siblings]
| ['parameter', Lookup]

export type Module = null

export type Acyclic_Siblings = p_.dynamic_lookup.Acyclic<d_resolve_result.Entry>

export type Cyclic_Siblings = p_.dynamic_lookup.Cyclic<d_resolve_result.Entry>