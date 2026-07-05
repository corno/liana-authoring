
import * as p_i from 'pareto-core/interface/__internal/Abort'

import * as i_in from "../../data.js"

import * as i_out from "pareto-fountain-pen/interface/generated/liana/schemas/prose/data"

export namespace Result_ {
    
    export type I = i_in.Result
    
    export type O = i_out.Paragraph
    
    export namespace P {
        
    }
    
}

export type Result_ = (
    context: Result_.I,
) => Result_.O

export namespace Parameters_ {
    
    export type I = i_in.Parameters
    
    export type O = i_out.Paragraph
    
    export namespace P {
        
    }
    
}

export type Parameters_ = (
    context: Parameters_.I,
) => Parameters_.O

export type { 
    Result_ as Result, 
    Parameters_ as Parameters, 
}
