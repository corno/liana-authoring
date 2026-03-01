
import * as _pi from 'pareto-core/dist/interface'

import * as i__imports_location from "../location/data"

export namespace Result_ {
    
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

export type Result_ = _pi.List<Result_.L>

export namespace Error_ {
    
    export type message = string
    
}

export type Error_ = {
    readonly 'message': Error_.message
}

export namespace Parameters_ {
    
    export namespace options {
        
        export type insert_spaces = boolean
        
        export type preserve_delimiters = boolean
        
        export type preserve_final_newline_state = boolean
        
        export type preserve_commas = boolean
        
        export type indent_string = string
        
    }
    
    export type options = {
        readonly 'insert spaces': options.insert_spaces
        readonly 'preserve delimiters': options.preserve_delimiters
        readonly 'preserve final newline state': options.preserve_final_newline_state
        readonly 'preserve commas': options.preserve_commas
        readonly 'indent string': options.indent_string
    }
    
}

export type Parameters_ = {
    readonly 'options': Parameters_.options
}

export { 
    Result_ as Result, 
    Error_ as Error, 
    Parameters_ as Parameters, 
}
