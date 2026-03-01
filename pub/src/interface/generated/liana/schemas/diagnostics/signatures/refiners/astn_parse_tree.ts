
import * as _pi from 'pareto-core/dist/interface'

import * as i_generic from "liana-core/dist/interface/to_be_generated/unmarshall"

import * as i_out from "../../data"

import * as i_in from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"

export namespace Diagnostics_ {
    
    export type I = i_in.Value
    
    export type O = i_out.Diagnostics
    
    export type E = i_generic.Error
    
    export namespace P {
        
    }
    
}

export type Diagnostics_ = (
    context: Diagnostics_.I,
    abort: _pi.Abort<Diagnostics_.E>,
) => Diagnostics_.O

export namespace Result_ {
    
    export type I = i_in.Value
    
    export type O = i_out.Result
    
    export type E = i_generic.Error
    
    export namespace P {
        
    }
    
}

export type Result_ = (
    context: Result_.I,
    abort: _pi.Abort<Result_.E>,
) => Result_.O

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
    Diagnostics_ as Diagnostics, 
    Result_ as Result, 
    Parameters_ as Parameters, 
}
