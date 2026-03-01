
import * as _pi from 'pareto-core/dist/interface'

import * as i_generic from "liana-core/dist/interface/to_be_generated/deserialize"

import * as i_in from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"

import * as i_out from "../../data"

export namespace Result_ {
    
    export type I = i_in.List_of_Characters
    
    export type O = i_out.Result
    
    export type E = i_generic.Error
    
    export namespace P {
        
        export type document_resource_identifier = string
        
        export type tab_size = number
        
    }
    
}

export type Result_ = (
    context: Result_.I,
    abort: _pi.Abort<Result_.E>,
    parameters: {
        readonly 'document resource identifier': Result_.P.document_resource_identifier
        readonly 'tab size': Result_.P.tab_size
    },
) => Result_.O

export namespace Parameters_ {
    
    export type I = i_in.List_of_Characters
    
    export type O = i_out.Parameters
    
    export type E = i_generic.Error
    
    export namespace P {
        
        export type document_resource_identifier = string
        
        export type tab_size = number
        
    }
    
}

export type Parameters_ = (
    context: Parameters_.I,
    abort: _pi.Abort<Parameters_.E>,
    parameters: {
        readonly 'document resource identifier': Parameters_.P.document_resource_identifier
        readonly 'tab size': Parameters_.P.tab_size
    },
) => Parameters_.O

export { 
    Result_ as Result, 
    Parameters_ as Parameters, 
}
