
import * as _pi from 'pareto-core/dist/interface'

import * as i_in from "../../data"

import * as i_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

export namespace Node_Path_ {
    
    export type I = i_in.Node_Path
    
    export type O = i_out.Paragraph
    
    export namespace P {
        
    }
    
}

export type Node_Path_ = (
    context: Node_Path_.I,
) => Node_Path_.O

export namespace Context_Path_ {
    
    export type I = i_in.Context_Path
    
    export type O = i_out.Paragraph
    
    export namespace P {
        
    }
    
}

export type Context_Path_ = (
    context: Context_Path_.I,
) => Context_Path_.O

export namespace Context_Subpath_ {
    
    export type I = i_in.Context_Subpath
    
    export type O = i_out.Paragraph
    
    export namespace P {
        
    }
    
}

export type Context_Subpath_ = (
    context: Context_Subpath_.I,
) => Context_Subpath_.O

export namespace Start_ {
    
    export type I = i_in.Start
    
    export type O = i_out.Paragraph
    
    export namespace P {
        
    }
    
}

export type Start_ = (
    context: Start_.I,
) => Start_.O

export namespace Up_Steps_ {
    
    export type I = i_in.Up_Steps
    
    export type O = i_out.Paragraph
    
    export namespace P {
        
    }
    
}

export type Up_Steps_ = (
    context: Up_Steps_.I,
) => Up_Steps_.O

export namespace Non_Normalized_Path_ {
    
    export type I = i_in.Non_Normalized_Path
    
    export type O = i_out.Paragraph
    
    export namespace P {
        
    }
    
}

export type Non_Normalized_Path_ = (
    context: Non_Normalized_Path_.I,
) => Non_Normalized_Path_.O

export { 
    Node_Path_ as Node_Path, 
    Context_Path_ as Context_Path, 
    Context_Subpath_ as Context_Subpath, 
    Start_ as Start, 
    Up_Steps_ as Up_Steps, 
    Non_Normalized_Path_ as Non_Normalized_Path, 
}
