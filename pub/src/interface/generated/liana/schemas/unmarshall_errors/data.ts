
import * as _pi from 'pareto-core/dist/interface'

import * as i__imports_location from "../astn_location/data"

export namespace Errors_ {
    
    export namespace L {
        
        export type range = i__imports_location.Range
        
        export namespace type_ {
            
            export namespace error {
                
                export namespace invalid_value_type {
                    
                    export namespace expected {
                        
                        export namespace L {
                            
                            export type text = null
                            
                            export type verbose_group = null
                            
                            export type concise_group = null
                            
                            export type dictionary = null
                            
                            export type not_set = null
                            
                            export type nothing = null
                            
                            export type set_ = null
                            
                            export type list = null
                            
                            export type state = null
                            
                        }
                        
                        export type L = 
                            | readonly ['text', L.text]
                            | readonly ['verbose group', L.verbose_group]
                            | readonly ['concise group', L.concise_group]
                            | readonly ['dictionary', L.dictionary]
                            | readonly ['not set', L.not_set]
                            | readonly ['nothing', L.nothing]
                            | readonly ['set', L.set_]
                            | readonly ['list', L.list]
                            | readonly ['state', L.state]
                        
                    }
                    
                    export type expected = _pi.List<expected.L>
                    
                }
                
                export type invalid_value_type = {
                    readonly 'expected': invalid_value_type.expected
                }
                
                export namespace duplicate_property {
                    
                    export type name = string
                    
                }
                
                export type duplicate_property = {
                    readonly 'name': duplicate_property.name
                }
                
                export namespace duplicate_entry {
                    
                    export type name = string
                    
                }
                
                export type duplicate_entry = {
                    readonly 'name': duplicate_entry.name
                }
                
                export namespace missing_property {
                    
                    export type name = string
                    
                }
                
                export type missing_property = {
                    readonly 'name': missing_property.name
                }
                
                export type missing_value = null
                
                export namespace missing_property_value {
                    
                    export type name = string
                    
                }
                
                export type missing_property_value = {
                    readonly 'name': missing_property_value.name
                }
                
                export namespace superfluous_property {
                    
                    export namespace name {
                        
                        export type O = string
                        
                    }
                    
                    export type name = _pi.Optional_Value<name.O>
                    
                }
                
                export type superfluous_property = {
                    readonly 'name': superfluous_property.name
                }
                
                export namespace state {
                    
                    export type more_than_2_items = null
                    
                    export type missing_option_name = null
                    
                    export type option_name_is_not_a_text = null
                    
                    export type missing_value = null
                    
                    export namespace unknown_option {
                        
                        export type found = string
                        
                        export namespace expected {
                            
                            export type D = null
                            
                        }
                        
                        export type expected = _pi.Dictionary<expected.D>
                        
                    }
                    
                    export type unknown_option = {
                        readonly 'found': unknown_option.found
                        readonly 'expected': unknown_option.expected
                    }
                    
                    export type missing_option = null
                    
                }
                
                export type state = 
                    | readonly ['more than 2 items', state.more_than_2_items]
                    | readonly ['missing option name', state.missing_option_name]
                    | readonly ['option name is not a text', state.option_name_is_not_a_text]
                    | readonly ['missing value', state.missing_value]
                    | readonly ['unknown option', state.unknown_option]
                    | readonly ['missing option', state.missing_option]
                
            }
            
            export type error = 
                | readonly ['invalid value type', error.invalid_value_type]
                | readonly ['duplicate property', error.duplicate_property]
                | readonly ['duplicate entry', error.duplicate_entry]
                | readonly ['missing property', error.missing_property]
                | readonly ['missing value', error.missing_value]
                | readonly ['missing property value', error.missing_property_value]
                | readonly ['superfluous property', error.superfluous_property]
                | readonly ['state', error.state]
            
            export namespace warning {
                
                export type expected_apostrophed_text = null
                
                export type expected_quoted_text = null
                
                export type expected_backticked_text = null
                
                export type expected_undelimited_text = null
                
                export type expected_a_group = null
                
            }
            
            export type warning = 
                | readonly ['expected apostrophed text', warning.expected_apostrophed_text]
                | readonly ['expected quoted text', warning.expected_quoted_text]
                | readonly ['expected backticked text', warning.expected_backticked_text]
                | readonly ['expected undelimited text', warning.expected_undelimited_text]
                | readonly ['expected a group', warning.expected_a_group]
            
        }
        
        export type type_ = 
            | readonly ['error', type_.error]
            | readonly ['warning', type_.warning]
        
    }
    
    export type L = {
        readonly 'range': L.range
        readonly 'type': L.type_
    }
    
}

export type Errors_ = _pi.List<Errors_.L>

export { 
    Errors_ as Errors, 
}
