
import * as _pi from 'pareto-core/dist/interface'

import * as i__imports_location from "../location/data"

import * as i__imports_path from "../path/data"

export namespace Result_ {
    
    export namespace diagnostics {
        
        export namespace L {
            
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
            
            export type range = i__imports_location.Range
            
            export type message = string
            
            export namespace related_information {
                
                export namespace O {
                    
                    export namespace L {
                        
                        export namespace location {
                            
                            export type file_path = i__imports_path.Node_Path
                            
                            export type range = i__imports_location.Range
                            
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
                
                export type O = _pi.List<O.L>
                
            }
            
            export type related_information = _pi.Optional_Value<related_information.O>
            
        }
        
        export type L = {
            readonly 'severity': L.severity
            readonly 'range': L.range
            readonly 'message': L.message
            readonly 'related information': L.related_information
        }
        
    }
    
    export type diagnostics = _pi.List<diagnostics.L>
    
}

export type Result_ = {
    readonly 'diagnostics': Result_.diagnostics
}

export namespace Parameters_ {
    
    export type content = string
    
    export type file_path = i__imports_path.Node_Path
    
    export type tab_size = number
    
}

export type Parameters_ = {
    readonly 'content': Parameters_.content
    readonly 'file path': Parameters_.file_path
    readonly 'tab size': Parameters_.tab_size
}

export { 
    Result_ as Result, 
    Parameters_ as Parameters, 
}
