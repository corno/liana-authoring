
import * as _pi from 'pareto-core/dist/interface'

import * as i__imports_hover_info from "../hover_info/data"

import * as i__imports_location from "../location/data"

import * as i__imports_path from "../path/data"

export namespace Result_ {
    
    export namespace contents {
        
        export type hover_texts = i__imports_hover_info.Hover_Texts
        
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
        
        export type file_path = i__imports_path.Node_Path
        
        export type tab_size = number
        
    }
    
    export type source = {
        readonly 'file path': source.file_path
        readonly 'tab size': source.tab_size
    }
    
    export type position = i__imports_location.Position
    
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
