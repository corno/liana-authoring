
import * as p_i from 'pareto-core/dist/interface'

import * as i_generic from "liana-core/dist/interface/to_be_generated/unmarshall"

import * as i_out from "../../data"

import * as i_in from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"

export namespace Position_ {
    
    export type I = i_in.Value
    
    export type O = i_out.Position
    
    export type E = i_generic.Error
    
    export namespace P {
        
    }
    
}

export type Position_ = (
    context: Position_.I,
    abort: p_i.Abort<Position_.E>,
) => Position_.O

export namespace Range_FE_ {
    
    export type I = i_in.Value
    
    export type O = i_out.Range_FE
    
    export type E = i_generic.Error
    
    export namespace P {
        
    }
    
}

export type Range_FE_ = (
    context: Range_FE_.I,
    abort: p_i.Abort<Range_FE_.E>,
) => Range_FE_.O

export { 
    Position_ as Position, 
    Range_FE_ as Range_FE, 
}
