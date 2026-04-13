
import * as _pi from 'pareto-core/dist/interface'

import * as i_generic from "liana-core/dist/interface/to_be_generated/unmarshall"

import * as i_out from "../../data"

import * as i_in from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"

export namespace Node_Path_ {
    
    export type I = i_in.Value
    
    export type O = i_out.Node_Path
    
    export type E = i_generic.Error
    
    export namespace P {
        
    }
    
}

export type Node_Path_ = (
    context: Node_Path_.I,
    abort: _pi.Abort<Node_Path_.E>,
) => Node_Path_.O

export namespace Context_Path_ {
    
    export type I = i_in.Value
    
    export type O = i_out.Context_Path
    
    export type E = i_generic.Error
    
    export namespace P {
        
    }
    
}

export type Context_Path_ = (
    context: Context_Path_.I,
    abort: _pi.Abort<Context_Path_.E>,
) => Context_Path_.O

export namespace Context_Subpath_ {
    
    export type I = i_in.Value
    
    export type O = i_out.Context_Subpath
    
    export type E = i_generic.Error
    
    export namespace P {
        
    }
    
}

export type Context_Subpath_ = (
    context: Context_Subpath_.I,
    abort: _pi.Abort<Context_Subpath_.E>,
) => Context_Subpath_.O

export namespace Start_ {
    
    export type I = i_in.Value
    
    export type O = i_out.Start
    
    export type E = i_generic.Error
    
    export namespace P {
        
    }
    
}

export type Start_ = (
    context: Start_.I,
    abort: _pi.Abort<Start_.E>,
) => Start_.O

export namespace Up_Steps_ {
    
    export type I = i_in.Value
    
    export type O = i_out.Up_Steps
    
    export type E = i_generic.Error
    
    export namespace P {
        
    }
    
}

export type Up_Steps_ = (
    context: Up_Steps_.I,
    abort: _pi.Abort<Up_Steps_.E>,
) => Up_Steps_.O

export namespace Non_Normalized_Path_ {
    
    export type I = i_in.Value
    
    export type O = i_out.Non_Normalized_Path
    
    export type E = i_generic.Error
    
    export namespace P {
        
    }
    
}

export type Non_Normalized_Path_ = (
    context: Non_Normalized_Path_.I,
    abort: _pi.Abort<Non_Normalized_Path_.E>,
) => Non_Normalized_Path_.O

export { 
    Node_Path_ as Node_Path, 
    Context_Path_ as Context_Path, 
    Context_Subpath_ as Context_Subpath, 
    Start_ as Start, 
    Up_Steps_ as Up_Steps, 
    Non_Normalized_Path_ as Non_Normalized_Path, 
}
