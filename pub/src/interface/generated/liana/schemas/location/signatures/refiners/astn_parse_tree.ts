
import * as _pi from 'pareto-core/dist/interface'

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
    abort: _pi.Abort<Position_.E>,
) => Position_.O

export namespace Range_ {
    
    export type I = i_in.Value
    
    export type O = i_out.Range
    
    export type E = i_generic.Error
    
    export namespace P {
        
    }
    
}

export type Range_ = (
    context: Range_.I,
    abort: _pi.Abort<Range_.E>,
) => Range_.O

export { 
    Position_ as Position, 
    Range_ as Range, 
}
