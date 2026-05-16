
import * as _pi from 'pareto-core/dist/interface'

import * as i_imports_location from "../astn_location/data"

export namespace Errors_ {
    
    export namespace L {
        
        export type range = i_imports_location.Range
        
        export namespace type_ {
            
            export namespace value {
                
                export namespace invalid_type {
                    
                    export namespace expected {
                        
                        export namespace L {
                            
                            export type dictionary = null
                            
                            export type group = null
                            
                            export type list = null
                            
                            export type nothing = null
                            
                            export type optional = null
                            
                            export type state = null
                            
                            export type text = null
                            
                        }
                        
                        export type L = 
                            | readonly ['dictionary', L.dictionary]
                            | readonly ['group', L.group]
                            | readonly ['list', L.list]
                            | readonly ['nothing', L.nothing]
                            | readonly ['optional', L.optional]
                            | readonly ['state', L.state]
                            | readonly ['text', L.text]
                        
                    }
                    
                    export type expected = _pi.List<expected.L>
                    
                }
                
                export type invalid_type = {
                    readonly 'expected': invalid_type.expected
                }
                
                export type missing = null
                
            }
            
            export type value = 
                | readonly ['invalid type', value.invalid_type]
                | readonly ['missing', value.missing]
            
            export namespace dictionary {
                
                export namespace duplicate_entry {
                    
                    export type name = string
                    
                }
                
                export type duplicate_entry = {
                    readonly 'name': duplicate_entry.name
                }
                
            }
            
            export type dictionary = 
                | readonly ['duplicate entry', dictionary.duplicate_entry]
            
            export namespace group {
                
                export namespace duplicate_property {
                    
                    export type name = string
                    
                }
                
                export type duplicate_property = {
                    readonly 'name': duplicate_property.name
                }
                
                export namespace missing_property {
                    
                    export type name = string
                    
                }
                
                export type missing_property = {
                    readonly 'name': missing_property.name
                }
                
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
                
            }
            
            export type group = 
                | readonly ['duplicate property', group.duplicate_property]
                | readonly ['missing property', group.missing_property]
                | readonly ['missing property value', group.missing_property_value]
                | readonly ['superfluous property', group.superfluous_property]
            
            export namespace state {
                
                export type more_than_2_items_in_list = null
                
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
                | readonly ['more than 2 items in list', state.more_than_2_items_in_list]
                | readonly ['missing option name', state.missing_option_name]
                | readonly ['option name is not a text', state.option_name_is_not_a_text]
                | readonly ['missing value', state.missing_value]
                | readonly ['unknown option', state.unknown_option]
                | readonly ['missing option', state.missing_option]
            
        }
        
        export type type_ = 
            | readonly ['value', type_.value]
            | readonly ['dictionary', type_.dictionary]
            | readonly ['group', type_.group]
            | readonly ['state', type_.state]
        
    }
    
    export type L = {
        readonly 'range': L.range
        readonly 'type': L.type_
    }
    
}

export type Errors_ = _pi.List<Errors_.L>

export namespace Warnings_ {
    
    export namespace L {
        
        export type range = i_imports_location.Range
        
        export namespace type_ {
            
            export type expected_apostrophed_text = null
            
            export type expected_quoted_text = null
            
            export type expected_backticked_text = null
            
            export type expected_undelimited_text = null
            
            export type expected_a_group = null
            
        }
        
        export type type_ = 
            | readonly ['expected apostrophed text', type_.expected_apostrophed_text]
            | readonly ['expected quoted text', type_.expected_quoted_text]
            | readonly ['expected backticked text', type_.expected_backticked_text]
            | readonly ['expected undelimited text', type_.expected_undelimited_text]
            | readonly ['expected a group', type_.expected_a_group]
        
    }
    
    export type L = {
        readonly 'range': L.range
        readonly 'type': L.type_
    }
    
}

export type Warnings_ = _pi.List<Warnings_.L>

export { 
    Errors_ as Errors, 
    Warnings_ as Warnings, 
}
