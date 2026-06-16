
import * as p_i from 'pareto-core/dist/interface/__internal/Abort'

import * as i_generic from "liana-core/dist/interface/data/unmarshall"

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
    abort: p_i.Abort<Diagnostics_.E>,
) => Diagnostics_.O

export namespace Diagnostic_ {
    
    export type I = i_in.Value
    
    export type O = i_out.Diagnostic
    
    export type E = i_generic.Error
    
    export namespace P {
        
    }
    
}

export type Diagnostic_ = (
    context: Diagnostic_.I,
    abort: p_i.Abort<Diagnostic_.E>,
) => Diagnostic_.O

export namespace Result_ {
    
    export type I = i_in.Value
    
    export type O = i_out.Result
    
    export type E = i_generic.Error
    
    export namespace P {
        
    }
    
}

export type Result_ = (
    context: Result_.I,
    abort: p_i.Abort<Result_.E>,
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
    abort: p_i.Abort<Parameters_.E>,
) => Parameters_.O

export { 
    Diagnostics_ as Diagnostics, 
    Diagnostic_ as Diagnostic, 
    Result_ as Result, 
    Parameters_ as Parameters, 
}
