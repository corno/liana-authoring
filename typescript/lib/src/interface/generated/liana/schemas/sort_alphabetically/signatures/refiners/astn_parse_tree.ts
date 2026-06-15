
import * as p_i from 'pareto-core/dist/__internals/Abort'

import * as i_generic from "liana-core/dist/interface/to_be_generated/unmarshall"

import * as i_out from "../../data"

import * as i_in from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"

export namespace Sort_Parameters_ {
    
    export type I = i_in.Value
    
    export type O = i_out.Sort_Parameters
    
    export type E = i_generic.Error
    
    export namespace P {
        
    }
    
}

export type Sort_Parameters_ = (
    context: Sort_Parameters_.I,
    abort: p_i.Abort<Sort_Parameters_.E>,
) => Sort_Parameters_.O

export { 
    Sort_Parameters_ as Sort_Parameters, 
}
