
import * as _pi from 'pareto-core/dist/interface'

import * as i__imports_location from "../location/data"

export namespace Text_Edits_ {
    
    export namespace L {
        
        export namespace replace {
            
            export type range = i__imports_location.Range
            
            export type text = string
            
        }
        
        export type replace = {
            readonly 'range': replace.range
            readonly 'text': replace.text
        }
        
        export namespace delete_ {
            
            export type range = i__imports_location.Range
            
        }
        
        export type delete_ = {
            readonly 'range': delete_.range
        }
        
        export namespace insert {
            
            export type location = i__imports_location.Position
            
            export type text = string
            
        }
        
        export type insert = {
            readonly 'location': insert.location
            readonly 'text': insert.text
        }
        
    }
    
    export type L = 
        | readonly ['replace', L.replace]
        | readonly ['delete', L.delete_]
        | readonly ['insert', L.insert]
    
}

export type Text_Edits_ = _pi.List<Text_Edits_.L>

export { 
    Text_Edits_ as Text_Edits, 
}
