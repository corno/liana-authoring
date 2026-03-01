
import * as _pi from 'pareto-core/dist/interface'

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

export namespace Range_ {
    
    export type I = i_in.Range
    
    export type O = i_out.Paragraph
    
    export namespace P {
        
    }
    
}

export type Range_ = (
    context: Range_.I,
) => Range_.O

export { 
    Position_ as Position, 
    Range_ as Range, 
}
