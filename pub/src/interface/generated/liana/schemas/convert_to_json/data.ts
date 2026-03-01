
import * as _pi from 'pareto-core/dist/interface'

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
        
        export type newline = string
        
    }
    
    export type target = {
        readonly 'indentation': target.indentation
        readonly 'newline': target.newline
    }
    
}

export type Parameters_ = {
    readonly 'source': Parameters_.source
    readonly 'target': Parameters_.target
}

export { 
    Parameters_ as Parameters, 
}
