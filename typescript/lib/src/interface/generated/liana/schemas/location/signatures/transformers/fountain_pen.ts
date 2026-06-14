
import * as p_i from 'pareto-core/dist/interface'

import * as i_in from "../../data"

import * as i_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

export namespace Position_ {
    
    export type I = i_in.Position
    
    export type O = i_out.Paragraph
    
    export namespace P {
        
    }
    
}

export type Position_ = (
    context: Position_.I,
) => Position_.O

export namespace Range_FE_ {
    
    export type I = i_in.Range_FE
    
    export type O = i_out.Paragraph
    
    export namespace P {
        
    }
    
}

export type Range_FE_ = (
    context: Range_FE_.I,
) => Range_FE_.O

export { 
    Position_ as Position, 
    Range_FE_ as Range_FE, 
}
