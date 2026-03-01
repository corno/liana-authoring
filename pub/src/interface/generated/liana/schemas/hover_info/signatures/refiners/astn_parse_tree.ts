
import * as _pi from 'pareto-core/dist/interface'

import * as i_generic from "liana-core/dist/interface/to_be_generated/unmarshall"

import * as i_out from "../../data"

import * as i_in from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"

export namespace Hover_Texts_ {
    
    export type I = i_in.Value
    
    export type O = i_out.Hover_Texts
    
    export type E = i_generic.Error
    
    export namespace P {
        
    }
    
}

export type Hover_Texts_ = (
    context: Hover_Texts_.I,
    abort: _pi.Abort<Hover_Texts_.E>,
) => Hover_Texts_.O

export { 
    Hover_Texts_ as Hover_Texts, 
}
