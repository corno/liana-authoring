
import * as p_i from 'pareto-core/interface/__internal/Abort'

import * as i_imports_location from "./location.js"

import * as i_imports_text_edits from "./text_edits.js"

export type Result_ = i_imports_text_edits.Text_Edits

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

export type { 
    Result_ as Result, 
    Error_ as Error, 
    Parameters_ as Parameters, 
}
