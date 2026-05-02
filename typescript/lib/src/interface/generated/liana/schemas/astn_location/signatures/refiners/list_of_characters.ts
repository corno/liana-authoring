
import * as _pi from 'pareto-core/dist/interface'

import * as i_generic from "liana-core/dist/interface/to_be_generated/deserialize"

import * as i_in from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"

import * as i_out from "../../data"

export namespace Range_ {
    
    export type I = i_in.List_of_Characters
    
    export type O = i_out.Range
    
    export type E = i_generic.Error
    
    export namespace P {
        
        export type tab_size = number
        
    }
    
}

export type Range_ = (
    context: Range_.I,
    abort: _pi.Abort<Range_.E>,
    parameters: {
        readonly 'tab size': Range_.P.tab_size
    },
) => Range_.O

export namespace Possible_Range_ {
    
    export type I = i_in.List_of_Characters
    
    export type O = i_out.Possible_Range
    
    export type E = i_generic.Error
    
    export namespace P {
        
        export type tab_size = number
        
    }
    
}

export type Possible_Range_ = (
    context: Possible_Range_.I,
    abort: _pi.Abort<Possible_Range_.E>,
    parameters: {
        readonly 'tab size': Possible_Range_.P.tab_size
    },
) => Possible_Range_.O

export namespace Location_ {
    
    export type I = i_in.List_of_Characters
    
    export type O = i_out.Location
    
    export type E = i_generic.Error
    
    export namespace P {
        
        export type tab_size = number
        
    }
    
}

export type Location_ = (
    context: Location_.I,
    abort: _pi.Abort<Location_.E>,
    parameters: {
        readonly 'tab size': Location_.P.tab_size
    },
) => Location_.O

export namespace Relative_Location_ {
    
    export type I = i_in.List_of_Characters
    
    export type O = i_out.Relative_Location
    
    export type E = i_generic.Error
    
    export namespace P {
        
        export type tab_size = number
        
    }
    
}

export type Relative_Location_ = (
    context: Relative_Location_.I,
    abort: _pi.Abort<Relative_Location_.E>,
    parameters: {
        readonly 'tab size': Relative_Location_.P.tab_size
    },
) => Relative_Location_.O

export { 
    Range_ as Range, 
    Possible_Range_ as Possible_Range, 
    Location_ as Location, 
    Relative_Location_ as Relative_Location, 
}
