
import * as _pi from 'pareto-core/dist/interface'

import * as i_generic from "liana-core/dist/interface/to_be_generated/unmarshall"

import * as i_out from "../../data"

import * as i_in from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"

export namespace Text_Edits_ {
    
    export type I = i_in.Value
    
    export type O = i_out.Text_Edits
    
    export type E = i_generic.Error
    
    export namespace P {
        
    }
    
}

export type Text_Edits_ = (
    context: Text_Edits_.I,
    abort: _pi.Abort<Text_Edits_.E>,
) => Text_Edits_.O

export { 
    Text_Edits_ as Text_Edits, 
}
