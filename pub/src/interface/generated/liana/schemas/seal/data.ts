
import * as _pi from 'pareto-core/dist/interface'

import * as i__imports_path from "../path/data"

export type Result_ = string

export namespace Parameters_ {
    
    export type content = string
    
    export namespace source {
        
        export type file_path = i__imports_path.Node_Path
        
        export type tab_size = number
        
    }
    
    export type source = {
        readonly 'file path': source.file_path
        readonly 'tab size': source.tab_size
    }
    
    export namespace target {
        
        export type indentation = string
        
        export type newline = string
        
    }
    
    export type target = {
        readonly 'indentation': target.indentation
        readonly 'newline': target.newline
    }
    
}

export type Parameters_ = {
    readonly 'content': Parameters_.content
    readonly 'source': Parameters_.source
    readonly 'target': Parameters_.target
}

export { 
    Result_ as Result, 
    Parameters_ as Parameters, 
}
