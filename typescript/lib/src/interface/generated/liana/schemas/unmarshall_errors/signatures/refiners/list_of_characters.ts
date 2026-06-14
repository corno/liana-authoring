
import * as p_i from 'pareto-core/dist/interface'

import * as i_generic from "liana-core/dist/interface/to_be_generated/deserialize"

import * as i_in from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"

import * as i_out from "../../data"

export namespace Errors_ {
    
    export type I = i_in.List_of_Characters
    
    export type O = i_out.Errors
    
    export type E = i_generic.Error
    
    export namespace P {
        
        export type tab_size = number
        
    }
    
}

export type Errors_ = (
    context: Errors_.I,
    abort: p_i.Abort<Errors_.E>,
    parameters: {
        readonly 'tab size': Errors_.P.tab_size
    },
) => Errors_.O

export namespace Warnings_ {
    
    export type I = i_in.List_of_Characters
    
    export type O = i_out.Warnings
    
    export type E = i_generic.Error
    
    export namespace P {
        
        export type tab_size = number
        
    }
    
}

export type Warnings_ = (
    context: Warnings_.I,
    abort: p_i.Abort<Warnings_.E>,
    parameters: {
        readonly 'tab size': Warnings_.P.tab_size
    },
) => Warnings_.O

export { 
    Errors_ as Errors, 
    Warnings_ as Warnings, 
}
