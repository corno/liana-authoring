
import * as _pi from 'pareto-core/dist/interface'

import * as i_generic from "liana-core/dist/interface/to_be_generated/deserialize"

import * as i_in from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"

import * as i_out from "../../data"

export namespace Position_ {
    
    export type I = i_in.List_of_Characters
    
    export type O = i_out.Position
    
    export type E = i_generic.Error
    
    export namespace P {
        
        export type document_resource_identifier = string
        
        export type tab_size = number
        
    }
    
}

export type Position_ = (
    context: Position_.I,
    abort: _pi.Abort<Position_.E>,
    parameters: {
        readonly 'document resource identifier': Position_.P.document_resource_identifier
        readonly 'tab size': Position_.P.tab_size
    },
) => Position_.O

export namespace Range_ {
    
    export type I = i_in.List_of_Characters
    
    export type O = i_out.Range
    
    export type E = i_generic.Error
    
    export namespace P {
        
        export type document_resource_identifier = string
        
        export type tab_size = number
        
    }
    
}

export type Range_ = (
    context: Range_.I,
    abort: _pi.Abort<Range_.E>,
    parameters: {
        readonly 'document resource identifier': Range_.P.document_resource_identifier
        readonly 'tab size': Range_.P.tab_size
    },
) => Range_.O

export { 
    Position_ as Position, 
    Range_ as Range, 
}
