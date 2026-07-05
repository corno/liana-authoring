
import * as p_i from 'pareto-core/interface/__internal/Abort'

import * as i_in from "../../data.js"

import * as i_out from "pareto-fountain-pen/interface/generated/liana/schemas/prose/data"

export namespace Text_Edits_ {
    
    export type I = i_in.Text_Edits
    
    export type O = i_out.Paragraph
    
    export namespace P {
        
    }
    
}

export type Text_Edits_ = (
    context: Text_Edits_.I,
) => Text_Edits_.O

export type { 
    Text_Edits_ as Text_Edits, 
}
