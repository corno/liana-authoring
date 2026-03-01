
import * as _pi from 'pareto-core/dist/interface'

import * as i_generic from "liana-core/dist/interface/to_be_generated/deserialize"

import * as i_in from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"

import * as i_out from "../../data"

export namespace Sort_Parameters_ {
    
    export type I = i_in.List_of_Characters
    
    export type O = i_out.Sort_Parameters
    
    export type E = i_generic.Error
    
    export namespace P {
        
        export type document_resource_identifier = string
        
        export type tab_size = number
        
    }
    
}

export type Sort_Parameters_ = (
    context: Sort_Parameters_.I,
    abort: _pi.Abort<Sort_Parameters_.E>,
    parameters: {
        readonly 'document resource identifier': Sort_Parameters_.P.document_resource_identifier
        readonly 'tab size': Sort_Parameters_.P.tab_size
    },
) => Sort_Parameters_.O

export { 
    Sort_Parameters_ as Sort_Parameters, 
}
