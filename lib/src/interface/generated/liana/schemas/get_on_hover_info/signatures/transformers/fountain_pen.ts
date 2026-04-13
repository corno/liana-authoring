
import * as _pi from 'pareto-core/dist/interface'

import * as i_in from "../../data"

import * as i_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

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

export { 
    Result_ as Result, 
    Parameters_ as Parameters, 
}
