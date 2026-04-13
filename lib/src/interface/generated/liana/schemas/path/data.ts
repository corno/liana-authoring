
import * as _pi from 'pareto-core/dist/interface'

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

export type Context_Subpath_ = _pi.List<Context_Subpath_.L>

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

export namespace Non_Normalized_Path_ {
    
    export type leading_slash = boolean
    
    export namespace segments {
        
        export namespace L {
            
            export type parent = null
            
            export type child = string
            
            export type current = null
            
            export type nothing = null
            
        }
        
        export type L = 
            | readonly ['parent', L.parent]
            | readonly ['child', L.child]
            | readonly ['current', L.current]
            | readonly ['nothing', L.nothing]
        
    }
    
    export type segments = _pi.List<segments.L>
    
    export type trailing_slash = boolean
    
}

export type Non_Normalized_Path_ = {
    readonly 'leading slash': Non_Normalized_Path_.leading_slash
    readonly 'segments': Non_Normalized_Path_.segments
    readonly 'trailing slash': Non_Normalized_Path_.trailing_slash
}

export { 
    Node_Path_ as Node_Path, 
    Context_Path_ as Context_Path, 
    Context_Subpath_ as Context_Subpath, 
    Start_ as Start, 
    Up_Steps_ as Up_Steps, 
    Non_Normalized_Path_ as Non_Normalized_Path, 
}
