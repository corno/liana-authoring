
import * as p_i from 'pareto-core/interface/__internal/Abort'
import * as p_di from 'pareto-core/interface/schema'

export namespace Node_Path_ {
    
    export type context = Context_Path_
    
    export type node = string
    
}

export type Node_Path_ = {
    readonly 'context': Node_Path_.context
    readonly 'node': Node_Path_.node
}

export namespace Context_Path_ {
    
    export type start = Start_
    
    export type subpath = Context_Subpath_
    
}

export type Context_Path_ = {
    readonly 'start': Context_Path_.start
    readonly 'subpath': Context_Path_.subpath
}

export namespace Context_Subpath_ {
    
    export type L = string
    
}

export type Context_Subpath_ = p_di.List<Context_Subpath_.L>

export namespace Start_ {
    
    export type absolute = null
    
    export namespace relative {
        
        export type up_steps = Up_Steps_
        
    }
    
    export type relative = {
        readonly 'up steps': relative.up_steps
    }
    
}

export type Start_ = 
    | readonly ['absolute', Start_.absolute]
    | readonly ['relative', Start_.relative]

export type Up_Steps_ = number

export type { 
    Node_Path_ as Node_Path, 
    Context_Path_ as Context_Path, 
    Context_Subpath_ as Context_Subpath, 
    Start_ as Start, 
    Up_Steps_ as Up_Steps, 
}
