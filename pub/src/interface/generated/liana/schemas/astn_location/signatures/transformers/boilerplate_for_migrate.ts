
import * as _pi from 'pareto-core/dist/interface'

import * as i_out from "../../data"

import * as i_in from "../../data"

export namespace Range_ {
    
    export type I = i_in.Range
    
    export type O = i_out.Range
    
    export namespace P {
        
    }
    
}

export type Range_ = (
    context: Range_.I,
) => Range_.O

export namespace Possible_Range_ {
    
    export type I = i_in.Possible_Range
    
    export type O = i_out.Possible_Range
    
    export namespace P {
        
    }
    
}

export type Possible_Range_ = (
    context: Possible_Range_.I,
) => Possible_Range_.O

export namespace Location_ {
    
    export type I = i_in.Location
    
    export type O = i_out.Location
    
    export namespace P {
        
    }
    
}

export type Location_ = (
    context: Location_.I,
) => Location_.O

export namespace Relative_Location_ {
    
    export type I = i_in.Relative_Location
    
    export type O = i_out.Relative_Location
    
    export namespace P {
        
    }
    
}

export type Relative_Location_ = (
    context: Relative_Location_.I,
) => Relative_Location_.O

export { 
    Range_ as Range, 
    Possible_Range_ as Possible_Range, 
    Location_ as Location, 
    Relative_Location_ as Relative_Location, 
}
