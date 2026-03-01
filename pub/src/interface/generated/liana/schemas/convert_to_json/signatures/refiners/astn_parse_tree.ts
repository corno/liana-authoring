
import * as _pi from 'pareto-core/dist/interface'

import * as i_generic from "liana-core/dist/interface/to_be_generated/unmarshall"

import * as i_out from "../../data"

import * as i_in from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"

export namespace Parameters_ {
    
    export type I = i_in.Value
    
    export type O = i_out.Parameters
    
    export type E = i_generic.Error
    
    export namespace P {
        
    }
    
}

export type Parameters_ = (
    context: Parameters_.I,
    abort: _pi.Abort<Parameters_.E>,
) => Parameters_.O

export { 
    Parameters_ as Parameters, 
}
