
import * as _pi from 'pareto-core/dist/interface'

import * as i__imports_location from "../location/data"

export namespace Completion_Suggestions_ {
    
    export namespace L {
        
        export type label = string
        
        export type insert_text = string
        
        export type documentation = string
        
    }
    
    export type L = {
        readonly 'label': L.label
        readonly 'insert text': L.insert_text
        readonly 'documentation': L.documentation
    }
    
}

export type Completion_Suggestions_ = _pi.List<Completion_Suggestions_.L>

export { 
    Completion_Suggestions_ as Completion_Suggestions, 
}
