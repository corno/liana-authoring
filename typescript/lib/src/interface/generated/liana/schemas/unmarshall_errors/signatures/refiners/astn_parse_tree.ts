
import * as p_i from 'pareto-core/dist/interface/__internal/Abort'

import * as i_generic from "liana-core/dist/interface/to_be_generated/unmarshall"

import * as i_out from "../../data"

import * as i_in from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"

export namespace Errors_ {
    
    export type I = i_in.Value
    
    export type O = i_out.Errors
    
    export type E = i_generic.Error
    
    export namespace P {
        
    }
    
}

export type Errors_ = (
    context: Errors_.I,
    abort: p_i.Abort<Errors_.E>,
) => Errors_.O

export namespace Warnings_ {
    
    export type I = i_in.Value
    
    export type O = i_out.Warnings
    
    export type E = i_generic.Error
    
    export namespace P {
        
    }
    
}

export type Warnings_ = (
    context: Warnings_.I,
    abort: p_i.Abort<Warnings_.E>,
) => Warnings_.O

export { 
    Errors_ as Errors, 
    Warnings_ as Warnings, 
}
