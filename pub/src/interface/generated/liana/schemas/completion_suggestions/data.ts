
import * as _pi from 'pareto-core/dist/interface'

import * as i__imports_location from "../location/data"

import * as i__imports_text_edits from "../text_edits/data"

export namespace Completion_Suggestions_ {
    
    export namespace L {
        
        export type label = string
        
        export type insert_text = string
        
        export type documentation = string
        
        export type additional_text_edits = i__imports_text_edits.Text_Edits
        
        export namespace type_ {
            
            export type boolean_ = null
            
            export type component = null
            
            export type dictionary = null
            
            export type group = null
            
            export type list = null
            
            export type nothing = null
            
            export type number_ = null
            
            export type optional = null
            
            export type reference = null
            
            export type state = null
            
            export type text = null
            
        }
        
        export type type_ = 
            | readonly ['boolean', type_.boolean_]
            | readonly ['component', type_.component]
            | readonly ['dictionary', type_.dictionary]
            | readonly ['group', type_.group]
            | readonly ['list', type_.list]
            | readonly ['nothing', type_.nothing]
            | readonly ['number', type_.number_]
            | readonly ['optional', type_.optional]
            | readonly ['reference', type_.reference]
            | readonly ['state', type_.state]
            | readonly ['text', type_.text]
        
    }
    
    export type L = {
        readonly 'label': L.label
        readonly 'insert text': L.insert_text
        readonly 'documentation': L.documentation
        readonly 'additional text edits': L.additional_text_edits
        readonly 'type': L.type_
    }
    
}

export type Completion_Suggestions_ = _pi.List<Completion_Suggestions_.L>

export { 
    Completion_Suggestions_ as Completion_Suggestions, 
}
