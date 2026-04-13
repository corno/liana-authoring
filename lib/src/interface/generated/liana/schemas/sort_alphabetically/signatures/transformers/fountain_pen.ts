
import * as _pi from 'pareto-core/dist/interface'

import * as i_in from "../../data"

import * as i_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

export namespace Sort_Parameters_ {
    
    export type I = i_in.Sort_Parameters
    
    export type O = i_out.Paragraph
    
    export namespace P {
        
    }
    
}

export type Sort_Parameters_ = (
    context: Sort_Parameters_.I,
) => Sort_Parameters_.O

export { 
    Sort_Parameters_ as Sort_Parameters, 
}
