
import * as p_i from 'pareto-core/interface/__internal/Abort'

import * as i_generic from "liana-core/interface/data/deserialize"

import * as i_in from "pareto-fountain-pen/interface/generated/liana/schemas/list_of_characters/data"

import * as i_out from "../../data.js"

export namespace Hover_Texts_ {
    
    export type I = i_in.List_of_Characters
    
    export type O = i_out.Hover_Texts
    
    export type E = i_generic.Error
    
    export namespace P {
        
        export type tab_size = number
        
    }
    
}

export type Hover_Texts_ = (
    context: Hover_Texts_.I,
    abort: p_i.Abort<Hover_Texts_.E>,
    parameters: {
        readonly 'tab size': Hover_Texts_.P.tab_size
    },
) => Hover_Texts_.O

export type { 
    Hover_Texts_ as Hover_Texts, 
}
