
import * as p_i from 'pareto-core/interface/__internal/Abort'

import * as i_generic from "liana-core/interface/data/unmarshall"

import * as i_out from "../../data.js"

import * as i_in from "astn-core/interface/generated/liana/schemas/parse_tree/data"

export namespace Result_ {
    
    export type I = i_in.Value
    
    export type O = i_out.Result
    
    export type E = i_generic.Error
    
    export namespace P {
        
    }
    
}

export type Result_ = (
    context: Result_.I,
    abort: p_i.Abort<Result_.E>,
) => Result_.O

export namespace Error_ {
    
    export type I = i_in.Value
    
    export type O = i_out.Error
    
    export type E = i_generic.Error
    
    export namespace P {
        
    }
    
}

export type Error_ = (
    context: Error_.I,
    abort: p_i.Abort<Error_.E>,
) => Error_.O

export namespace Parameters_ {
    
    export type I = i_in.Value
    
    export type O = i_out.Parameters
    
    export type E = i_generic.Error
    
    export namespace P {
        
    }
    
}

export type Parameters_ = (
    context: Parameters_.I,
    abort: p_i.Abort<Parameters_.E>,
) => Parameters_.O

export type { 
    Result_ as Result, 
    Error_ as Error, 
    Parameters_ as Parameters, 
}
