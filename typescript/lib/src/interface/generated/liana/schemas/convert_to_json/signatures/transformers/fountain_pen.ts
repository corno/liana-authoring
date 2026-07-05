
import * as p_i from 'pareto-core/interface/__internal/Abort'

import * as i_in from "../../data.js"

import * as i_out from "pareto-fountain-pen/interface/generated/liana/schemas/prose/data"

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
    Parameters_ as Parameters, 
}
