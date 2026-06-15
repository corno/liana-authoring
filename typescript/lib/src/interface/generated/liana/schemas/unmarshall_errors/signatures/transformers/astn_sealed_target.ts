
import * as p_i from 'pareto-core/dist/interface/__internal/Abort'

import * as i_out from "astn-core/dist/interface/generated/liana/schemas/sealed_target/data"

import * as i_in from "../../data"

export namespace Errors_ {
    
    export type I = i_in.Errors
    
    export type O = i_out.Value
    
    export namespace P {
        
    }
    
}

export type Errors_ = (
    context: Errors_.I,
) => Errors_.O

export namespace Warnings_ {
    
    export type I = i_in.Warnings
    
    export type O = i_out.Value
    
    export namespace P {
        
    }
    
}

export type Warnings_ = (
    context: Warnings_.I,
) => Warnings_.O

export { 
    Errors_ as Errors, 
    Warnings_ as Warnings, 
}
