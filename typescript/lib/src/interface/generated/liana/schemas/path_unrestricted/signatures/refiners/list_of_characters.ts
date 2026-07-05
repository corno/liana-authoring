
import * as p_i from 'pareto-core/interface/__internal/Abort'

import * as i_generic from "liana-core/interface/data/deserialize"

import * as i_in from "pareto-fountain-pen/interface/generated/liana/schemas/list_of_characters/data"

import * as i_out from "../../data.js"

export namespace Node_Path_ {
    
    export type I = i_in.List_of_Characters
    
    export type O = i_out.Node_Path
    
    export type E = i_generic.Error
    
    export namespace P {
        
        export type tab_size = number
        
    }
    
}

export type Node_Path_ = (
    context: Node_Path_.I,
    abort: p_i.Abort<Node_Path_.E>,
    parameters: {
        readonly 'tab size': Node_Path_.P.tab_size
    },
) => Node_Path_.O

export namespace Context_Path_ {
    
    export type I = i_in.List_of_Characters
    
    export type O = i_out.Context_Path
    
    export type E = i_generic.Error
    
    export namespace P {
        
        export type tab_size = number
        
    }
    
}

export type Context_Path_ = (
    context: Context_Path_.I,
    abort: p_i.Abort<Context_Path_.E>,
    parameters: {
        readonly 'tab size': Context_Path_.P.tab_size
    },
) => Context_Path_.O

export namespace Context_Subpath_ {
    
    export type I = i_in.List_of_Characters
    
    export type O = i_out.Context_Subpath
    
    export type E = i_generic.Error
    
    export namespace P {
        
        export type tab_size = number
        
    }
    
}

export type Context_Subpath_ = (
    context: Context_Subpath_.I,
    abort: p_i.Abort<Context_Subpath_.E>,
    parameters: {
        readonly 'tab size': Context_Subpath_.P.tab_size
    },
) => Context_Subpath_.O

export namespace Start_ {
    
    export type I = i_in.List_of_Characters
    
    export type O = i_out.Start
    
    export type E = i_generic.Error
    
    export namespace P {
        
        export type tab_size = number
        
    }
    
}

export type Start_ = (
    context: Start_.I,
    abort: p_i.Abort<Start_.E>,
    parameters: {
        readonly 'tab size': Start_.P.tab_size
    },
) => Start_.O

export namespace Up_Steps_ {
    
    export type I = i_in.List_of_Characters
    
    export type O = i_out.Up_Steps
    
    export type E = i_generic.Error
    
    export namespace P {
        
        export type tab_size = number
        
    }
    
}

export type Up_Steps_ = (
    context: Up_Steps_.I,
    abort: p_i.Abort<Up_Steps_.E>,
    parameters: {
        readonly 'tab size': Up_Steps_.P.tab_size
    },
) => Up_Steps_.O

export type { 
    Node_Path_ as Node_Path, 
    Context_Path_ as Context_Path, 
    Context_Subpath_ as Context_Subpath, 
    Start_ as Start, 
    Up_Steps_ as Up_Steps, 
}
