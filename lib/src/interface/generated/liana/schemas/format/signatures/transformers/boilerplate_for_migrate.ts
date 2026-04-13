
import * as _pi from 'pareto-core/dist/interface'

import * as i_out from "../../data"

import * as i_in from "../../data"

export namespace Result_ {
    
    export type I = i_in.Result
    
    export type O = i_out.Result
    
    export namespace P {
        
    }
    
}

export type Result_ = (
    context: Result_.I,
) => Result_.O

export namespace Error_ {
    
    export type I = i_in.Error
    
    export type O = i_out.Error
    
    export namespace P {
        
    }
    
}

export type Error_ = (
    context: Error_.I,
) => Error_.O

export namespace Parameters_ {
    
    export type I = i_in.Parameters
    
    export type O = i_out.Parameters
    
    export namespace P {
        
    }
    
}

export type Parameters_ = (
    context: Parameters_.I,
) => Parameters_.O

export { 
    Result_ as Result, 
    Error_ as Error, 
    Parameters_ as Parameters, 
}
