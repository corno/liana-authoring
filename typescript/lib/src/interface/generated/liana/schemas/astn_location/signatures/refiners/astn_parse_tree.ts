
import * as _pi from 'pareto-core/dist/interface'

import * as i_generic from "liana-core/dist/interface/to_be_generated/unmarshall"

import * as i_out from "../../data"

import * as i_in from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"

export namespace Range_ {
    
    export type I = i_in.Value
    
    export type O = i_out.Range
    
    export type E = i_generic.Error
    
    export namespace P {
        
    }
    
}

export type Range_ = (
    context: Range_.I,
    abort: _pi.Abort<Range_.E>,
) => Range_.O

export namespace Possible_Range_ {
    
    export type I = i_in.Value
    
    export type O = i_out.Possible_Range
    
    export type E = i_generic.Error
    
    export namespace P {
        
    }
    
}

export type Possible_Range_ = (
    context: Possible_Range_.I,
    abort: _pi.Abort<Possible_Range_.E>,
) => Possible_Range_.O

export namespace Location_ {
    
    export type I = i_in.Value
    
    export type O = i_out.Location
    
    export type E = i_generic.Error
    
    export namespace P {
        
    }
    
}

export type Location_ = (
    context: Location_.I,
    abort: _pi.Abort<Location_.E>,
) => Location_.O

export namespace Relative_Location_ {
    
    export type I = i_in.Value
    
    export type O = i_out.Relative_Location
    
    export type E = i_generic.Error
    
    export namespace P {
        
    }
    
}

export type Relative_Location_ = (
    context: Relative_Location_.I,
    abort: _pi.Abort<Relative_Location_.E>,
) => Relative_Location_.O

export { 
    Range_ as Range, 
    Possible_Range_ as Possible_Range, 
    Location_ as Location, 
    Relative_Location_ as Relative_Location, 
}
