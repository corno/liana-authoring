
import * as _pi from 'pareto-core/dist/interface'

import * as i_generic from "liana-core/dist/interface/to_be_generated/deserialize"

import * as i_in from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"

import * as i_out from "../../data"

export namespace Completion_Suggestions_ {
    
    export type I = i_in.List_of_Characters
    
    export type O = i_out.Completion_Suggestions
    
    export type E = i_generic.Error
    
    export namespace P {
        
        export type document_resource_identifier = string
        
        export type tab_size = number
        
    }
    
}

export type Completion_Suggestions_ = (
    context: Completion_Suggestions_.I,
    abort: _pi.Abort<Completion_Suggestions_.E>,
    parameters: {
        readonly 'document resource identifier': Completion_Suggestions_.P.document_resource_identifier
        readonly 'tab size': Completion_Suggestions_.P.tab_size
    },
) => Completion_Suggestions_.O

export { 
    Completion_Suggestions_ as Completion_Suggestions, 
}
