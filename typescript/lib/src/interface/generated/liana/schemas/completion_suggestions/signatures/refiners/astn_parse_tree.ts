
import * as p_i from 'pareto-core/dist/interface/__internal/Abort'

import * as i_generic from "liana-core/dist/interface/data/unmarshall"

import * as i_out from "../../data"

import * as i_in from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"

export namespace Completion_Suggestions_ {
    
    export type I = i_in.Value
    
    export type O = i_out.Completion_Suggestions
    
    export type E = i_generic.Error
    
    export namespace P {
        
    }
    
}

export type Completion_Suggestions_ = (
    context: Completion_Suggestions_.I,
    abort: p_i.Abort<Completion_Suggestions_.E>,
) => Completion_Suggestions_.O

export { 
    Completion_Suggestions_ as Completion_Suggestions, 
}
