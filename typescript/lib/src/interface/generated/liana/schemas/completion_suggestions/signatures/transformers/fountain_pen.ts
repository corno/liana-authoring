
import * as p_i from 'pareto-core/interface/__internal/Abort'

import * as i_in from "../../data.js"

import * as i_out from "pareto-fountain-pen/interface/generated/liana/schemas/prose/data"

export namespace Completion_Suggestions_ {
    
    export type I = i_in.Completion_Suggestions
    
    export type O = i_out.Paragraph
    
    export namespace P {
        
    }
    
}

export type Completion_Suggestions_ = (
    context: Completion_Suggestions_.I,
) => Completion_Suggestions_.O

export type { 
    Completion_Suggestions_ as Completion_Suggestions, 
}
