
import * as _pi from 'pareto-core/dist/interface'

import * as i_out from "../../data"

import * as i_in from "../../data"

export namespace Text_Edits_ {
    
    export type I = i_in.Text_Edits
    
    export type O = i_out.Text_Edits
    
    export namespace P {
        
    }
    
}

export type Text_Edits_ = (
    context: Text_Edits_.I,
) => Text_Edits_.O

export { 
    Text_Edits_ as Text_Edits, 
}
