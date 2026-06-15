
import * as p_i from 'pareto-core/dist/__internals/Abort'

import * as i_out from "astn-core/dist/interface/generated/liana/schemas/sealed_target/data"

import * as i_in from "../../data"

export namespace Hover_Texts_ {
    
    export type I = i_in.Hover_Texts
    
    export type O = i_out.Value
    
    export namespace P {
        
    }
    
}

export type Hover_Texts_ = (
    context: Hover_Texts_.I,
) => Hover_Texts_.O

export { 
    Hover_Texts_ as Hover_Texts, 
}
