
import * as p_i from 'pareto-core/interface/__internal/Abort'

import * as i_imports_completion_suggestions from "./completion_suggestions.js"

import * as i_imports_location from "./location.js"

import * as i_imports_path_unrestricted from "./path_unrestricted.js"

export namespace Result_ {
    
    export type completion_suggestions = i_imports_completion_suggestions.Completion_Suggestions
    
}

export type Result_ = {
    readonly 'completion suggestions': Result_.completion_suggestions
}

export namespace Parameters_ {
    
    export type content = string
    
    export namespace source {
        
        export type file_path = i_imports_path_unrestricted.Node_Path
        
        export type tab_size = number
        
    }
    
    export type source = {
        readonly 'file path': source.file_path
        readonly 'tab size': source.tab_size
    }
    
    export type position = i_imports_location.Position
    
    export type indent = string
    
}

export type Parameters_ = {
    readonly 'content': Parameters_.content
    readonly 'source': Parameters_.source
    readonly 'position': Parameters_.position
    readonly 'indent': Parameters_.indent
}

export type { 
    Result_ as Result, 
    Parameters_ as Parameters, 
}
