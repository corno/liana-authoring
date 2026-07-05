
import * as p_i from 'pareto-core/interface/__internal/Abort'

import * as i_generic from "liana-core/interface/data/unmarshall"

import * as i_out from "../../data.js"

import * as i_in from "astn-core/interface/generated/liana/schemas/parse_tree/data"

export namespace Hover_Texts_ {
    
    export type I = i_in.Value
    
    export type O = i_out.Hover_Texts
    
    export type E = i_generic.Error
    
    export namespace P {
        
    }
    
}

export type Hover_Texts_ = (
    context: Hover_Texts_.I,
    abort: p_i.Abort<Hover_Texts_.E>,
) => Hover_Texts_.O

export type { 
    Hover_Texts_ as Hover_Texts, 
}
