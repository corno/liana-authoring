
import * as _pi from 'pareto-core/dist/interface'

import * as i_in from "../../data"

import * as i_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

export namespace Hover_Texts_ {
    
    export type I = i_in.Hover_Texts
    
    export type O = i_out.Paragraph
    
    export namespace P {
        
    }
    
}

export type Hover_Texts_ = (
    context: Hover_Texts_.I,
) => Hover_Texts_.O

export { 
    Hover_Texts_ as Hover_Texts, 
}
