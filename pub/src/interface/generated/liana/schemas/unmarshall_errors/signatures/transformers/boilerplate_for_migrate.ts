
import * as _pi from 'pareto-core/dist/interface'

import * as i_out from "../../data"

import * as i_in from "../../data"

export namespace Errors_ {
    
    export type I = i_in.Errors
    
    export type O = i_out.Errors
    
    export namespace P {
        
    }
    
}

export type Errors_ = (
    context: Errors_.I,
) => Errors_.O

export { 
    Errors_ as Errors, 
}
