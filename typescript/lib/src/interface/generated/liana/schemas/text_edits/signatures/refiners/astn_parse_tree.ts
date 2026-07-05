
import * as p_i from 'pareto-core/interface/__internal/Abort'

import * as i_generic from "liana-core/interface/data/unmarshall"

import * as i_out from "../../data.js"

import * as i_in from "astn-core/interface/generated/liana/schemas/parse_tree/data"

export namespace Text_Edits_ {
    
    export type I = i_in.Value
    
    export type O = i_out.Text_Edits
    
    export type E = i_generic.Error
    
    export namespace P {
        
    }
    
}

export type Text_Edits_ = (
    context: Text_Edits_.I,
    abort: p_i.Abort<Text_Edits_.E>,
) => Text_Edits_.O

export type { 
    Text_Edits_ as Text_Edits, 
}
