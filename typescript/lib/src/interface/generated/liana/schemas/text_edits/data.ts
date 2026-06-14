
import * as p_i from 'pareto-core/dist/interface'
import * as p_di from 'pareto-core/dist/data/interface'

import * as i_imports_location from "../astn_location/data"

export namespace Text_Edits_ {
    
    export namespace L {
        
        export namespace replace {
            
            export type range = i_imports_location.Range
            
            export type text = string
            
        }
        
        export type replace = {
            readonly 'range': replace.range
            readonly 'text': replace.text
        }
        
        export namespace delete_ {
            
            export type range = i_imports_location.Range
            
        }
        
        export type delete_ = {
            readonly 'range': delete_.range
        }
        
        export namespace insert {
            
            export type location = i_imports_location.Location
            
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

export type Text_Edits_ = p_di.List<Text_Edits_.L>

export { 
    Text_Edits_ as Text_Edits, 
}
