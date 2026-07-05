
import * as p_i from 'pareto-core/interface/__internal/Abort'

import * as i_out from "astn-core/interface/generated/liana/schemas/sealed_target/data"

import * as i_in from "../../data.js"

export namespace Sort_Parameters_ {
    
    export type I = i_in.Sort_Parameters
    
    export type O = i_out.Value
    
    export namespace P {
        
    }
    
}

export type Sort_Parameters_ = (
    context: Sort_Parameters_.I,
) => Sort_Parameters_.O

export type { 
    Sort_Parameters_ as Sort_Parameters, 
}
