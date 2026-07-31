
import * as p_i from 'pareto-core/interface/__internal/Abort'

export namespace Parameters_ {
    
    export namespace source {
        
        export type document_resource_identifier = string
        
        export type tab_size = number
        
    }
    
    export type source = {
        readonly 'document resource identifier': source.document_resource_identifier
        readonly 'tab size': source.tab_size
    }
    
    export namespace target {
        
        export type indentation = string
                
    }
    
    export type target = {
        readonly 'indentation': target.indentation
    }
    
}

export type Parameters_ = {
    readonly 'source': Parameters_.source
    readonly 'target': Parameters_.target
}

export type { 
    Parameters_ as Parameters, 
}
