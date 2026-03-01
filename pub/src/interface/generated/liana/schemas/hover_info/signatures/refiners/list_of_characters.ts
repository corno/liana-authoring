
import * as _pi from 'pareto-core/dist/interface'

import * as i_generic from "liana-core/dist/interface/to_be_generated/deserialize"

import * as i_in from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"

import * as i_out from "../../data"

export namespace Hover_Texts_ {
    
    export type I = i_in.List_of_Characters
    
    export type O = i_out.Hover_Texts
    
    export type E = i_generic.Error
    
    export namespace P {
        
        export type document_resource_identifier = string
        
        export type tab_size = number
        
    }
    
}

export type Hover_Texts_ = (
    context: Hover_Texts_.I,
    abort: _pi.Abort<Hover_Texts_.E>,
    parameters: {
        readonly 'document resource identifier': Hover_Texts_.P.document_resource_identifier
        readonly 'tab size': Hover_Texts_.P.tab_size
    },
) => Hover_Texts_.O

export { 
    Hover_Texts_ as Hover_Texts, 
}
