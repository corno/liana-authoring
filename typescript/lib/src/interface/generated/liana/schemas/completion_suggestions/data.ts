
import * as p_i from 'pareto-core/dist/interface'
import * as p_di from 'pareto-core/dist/data/interface'

import * as i_imports_location from "../location/data"

import * as i_imports_text_edits from "../text_edits/data"

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
                
                export type insert_text = string
                
                export type documentation = string
                
            }
            
            export type L = {
                readonly 'label': L.label
                readonly 'insert text': L.insert_text
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

export { 
    Completion_Suggestions_ as Completion_Suggestions, 
}
