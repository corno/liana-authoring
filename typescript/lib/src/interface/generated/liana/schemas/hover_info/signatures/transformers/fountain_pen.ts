
import * as p_i from 'pareto-core/interface/__internal/Abort'

import * as i_in from "../../data.js"

import * as i_out from "pareto-fountain-pen/interface/generated/liana/schemas/prose/data"

export namespace Hover_Texts_ {
    
    export type I = i_in.Hover_Texts
    
    export type O = i_out.Paragraph
    
    export namespace P {
        
    }
    
}

export type Hover_Texts_ = (
    context: Hover_Texts_.I,
) => Hover_Texts_.O

export type { 
    Hover_Texts_ as Hover_Texts, 
}
