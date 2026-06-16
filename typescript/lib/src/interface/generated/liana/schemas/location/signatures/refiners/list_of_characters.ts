
import * as p_i from 'pareto-core/dist/interface/__internal/Abort'

import * as i_generic from "liana-core/dist/interface/data/deserialize"

import * as i_in from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"

import * as i_out from "../../data"

export namespace Position_ {
    
    export type I = i_in.List_of_Characters
    
    export type O = i_out.Position
    
    export type E = i_generic.Error
    
    export namespace P {
        
        export type tab_size = number
        
    }
    
}

export type Position_ = (
    context: Position_.I,
    abort: p_i.Abort<Position_.E>,
    parameters: {
        readonly 'tab size': Position_.P.tab_size
    },
) => Position_.O

export namespace Range_FE_ {
    
    export type I = i_in.List_of_Characters
    
    export type O = i_out.Range_FE
    
    export type E = i_generic.Error
    
    export namespace P {
        
        export type tab_size = number
        
    }
    
}

export type Range_FE_ = (
    context: Range_FE_.I,
    abort: p_i.Abort<Range_FE_.E>,
    parameters: {
        readonly 'tab size': Range_FE_.P.tab_size
    },
) => Range_FE_.O

export { 
    Position_ as Position, 
    Range_FE_ as Range_FE, 
}
