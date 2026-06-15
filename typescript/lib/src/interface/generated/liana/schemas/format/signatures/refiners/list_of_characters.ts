
import * as p_i from 'pareto-core/dist/__internals/Abort'

import * as i_generic from "liana-core/dist/interface/to_be_generated/deserialize"

import * as i_in from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"

import * as i_out from "../../data"

export namespace Result_ {
    
    export type I = i_in.List_of_Characters
    
    export type O = i_out.Result
    
    export type E = i_generic.Error
    
    export namespace P {
        
        export type tab_size = number
        
    }
    
}

export type Result_ = (
    context: Result_.I,
    abort: p_i.Abort<Result_.E>,
    parameters: {
        readonly 'tab size': Result_.P.tab_size
    },
) => Result_.O

export namespace Error_ {
    
    export type I = i_in.List_of_Characters
    
    export type O = i_out.Error
    
    export type E = i_generic.Error
    
    export namespace P {
        
        export type tab_size = number
        
    }
    
}

export type Error_ = (
    context: Error_.I,
    abort: p_i.Abort<Error_.E>,
    parameters: {
        readonly 'tab size': Error_.P.tab_size
    },
) => Error_.O

export namespace Parameters_ {
    
    export type I = i_in.List_of_Characters
    
    export type O = i_out.Parameters
    
    export type E = i_generic.Error
    
    export namespace P {
        
        export type tab_size = number
        
    }
    
}

export type Parameters_ = (
    context: Parameters_.I,
    abort: p_i.Abort<Parameters_.E>,
    parameters: {
        readonly 'tab size': Parameters_.P.tab_size
    },
) => Parameters_.O

export { 
    Result_ as Result, 
    Error_ as Error, 
    Parameters_ as Parameters, 
}
