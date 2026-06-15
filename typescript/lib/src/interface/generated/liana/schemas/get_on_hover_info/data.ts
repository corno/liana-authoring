
import * as p_i from 'pareto-core/dist/interface/__internal/Abort'

import * as i_imports_hover_info from "../hover_info/data"

import * as i_imports_location from "../location/data"

import * as i_imports_path_unrestricted from "../path_unrestricted/data"

export namespace Result_ {
    
    export namespace contents {
        
        export type hover_texts = i_imports_hover_info.Hover_Texts
        
    }
    
    export type contents = {
        readonly 'hover texts': contents.hover_texts
    }
    
}

export type Result_ = {
    readonly 'contents': Result_.contents
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
    
}

export type Parameters_ = {
    readonly 'content': Parameters_.content
    readonly 'source': Parameters_.source
    readonly 'position': Parameters_.position
}

export { 
    Result_ as Result, 
    Parameters_ as Parameters, 
}
