
import * as p_i from 'pareto-core/interface/__internal/Abort'
import * as p_di from 'pareto-core/interface/data'

import * as i_imports_location from "./location.js"

import * as i_imports_text_edits from "./text_edits.js"

export namespace Completion_Suggestions_ {
    
    export namespace O {
        
        export namespace type_ {
            
            export type missing_value = null
            
            export type missing_option = null
            
            export type reference = null
            
            export type property_name = null
            
            export type option_name = null
            
        }
        
        export type type_ = 
            | readonly ['missing value', type_.missing_value]
            | readonly ['missing option', type_.missing_option]
            | readonly ['reference', type_.reference]
            | readonly ['property name', type_.property_name]
            | readonly ['option name', type_.option_name]
        
        export namespace suggestions {
            
            export namespace L {
                
                export type label = string
                
                export type insert_lines = p_di.List<string>
                
                export type documentation = string
                
            }
            
            export type L = {
                readonly 'label': L.label
                readonly 'insert lines': L.insert_lines
                readonly 'documentation': L.documentation
            }
            
        }
        
        export type suggestions = p_di.List<suggestions.L>
        
    }
    
    export type O = {
        readonly 'type': O.type_
        readonly 'suggestions': O.suggestions
    }
    
}

export type Completion_Suggestions_ = p_di.Optional_Value<Completion_Suggestions_.O>

export type { 
    Completion_Suggestions_ as Completion_Suggestions, 
}
