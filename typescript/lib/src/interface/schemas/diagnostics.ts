
import * as p_i from 'pareto-core/interface/__internal/Abort'
import * as p_di from 'pareto-core/interface/data'

import * as i_imports_location from "./astn_location.js"

import * as i_imports_path_unrestricted from "./path_unrestricted.js"

export namespace Diagnostics_ {
    
    export type L = Diagnostic_
    
}

export type Diagnostics_ = p_di.List<Diagnostics_.L>

export namespace Diagnostic_ {
    
    export namespace severity {
        
        export type error = null
        
        export type warning = null
        
        export type information = null
        
        export type hint = null
        
    }
    
    export type severity = 
        | readonly ['error', severity.error]
        | readonly ['warning', severity.warning]
        | readonly ['information', severity.information]
        | readonly ['hint', severity.hint]
    
    export namespace range {
        
        export type O = i_imports_location.Possible_Range
        
    }
    
    export type range = p_di.Optional_Value<range.O>
    
    export type message = string
    
    export namespace related_information {
        
        export namespace O {
            
            export namespace L {
                
                export namespace location {
                    
                    export type file_path = i_imports_path_unrestricted.Node_Path
                    
                    export type range = i_imports_location.Possible_Range
                    
                }
                
                export type location = {
                    readonly 'file path': location.file_path
                    readonly 'range': location.range
                }
                
                export type message = string
                
            }
            
            export type L = {
                readonly 'location': L.location
                readonly 'message': L.message
            }
            
        }
        
        export type O = p_di.List<O.L>
        
    }
    
    export type related_information = p_di.Optional_Value<related_information.O>
    
    export namespace type_ {
        
        export type semantic = null
        
        export type deserialize = null
        
        export type schema = null
        
    }
    
    export type type_ = 
        | readonly ['semantic', type_.semantic]
        | readonly ['deserialize', type_.deserialize]
        | readonly ['schema', type_.schema]
    
}

export type Diagnostic_ = {
    readonly 'severity': Diagnostic_.severity
    readonly 'range': Diagnostic_.range
    readonly 'message': Diagnostic_.message
    readonly 'related information': Diagnostic_.related_information
    readonly 'type': Diagnostic_.type_
}

export namespace Result_ {
    
    export type diagnostics = Diagnostics_
    
}

export type Result_ = {
    readonly 'diagnostics': Result_.diagnostics
}

export namespace Parameters_ {
    
    export type content = string
    
    export type file_path = i_imports_path_unrestricted.Node_Path
    
    export type tab_size = number
    
}

export type Parameters_ = {
    readonly 'content': Parameters_.content
    readonly 'file path': Parameters_.file_path
    readonly 'tab size': Parameters_.tab_size
}

export type { 
    Diagnostics_ as Diagnostics, 
    Diagnostic_ as Diagnostic, 
    Result_ as Result, 
    Parameters_ as Parameters, 
}
