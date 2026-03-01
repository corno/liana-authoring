
import * as _pi from 'pareto-core/dist/interface'

import * as i__imports_completion_suggestions from "../completion_suggestions/data"

import * as i__imports_location from "../location/data"

import * as i__imports_path from "../path/data"

export namespace Result_ {
    
    export type completion_suggestions = i__imports_completion_suggestions.Completion_Suggestions
    
}

export type Result_ = {
    readonly 'completion suggestions': Result_.completion_suggestions
}

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
    
    export type position = i__imports_location.Position
    
    export type indent = string
    
}

export type Parameters_ = {
    readonly 'content': Parameters_.content
    readonly 'source': Parameters_.source
    readonly 'position': Parameters_.position
    readonly 'indent': Parameters_.indent
}

export { 
    Result_ as Result, 
    Parameters_ as Parameters, 
}
