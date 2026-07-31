
import * as p_i from 'pareto-core/interface/__internal/Abort'

export namespace Position_ {
    
    export type line = number
    
    export type character = number
    
}

export type Position_ = {
    readonly 'line': Position_.line
    readonly 'character': Position_.character
}

export namespace Range_FE_ {
    
    export type start = Position_
    
    export type end = Position_
    
}

export type Range_FE_ = {
    readonly 'start': Range_FE_.start
    readonly 'end': Range_FE_.end
}

export type { 
    Position_ as Position, 
    Range_FE_ as Range_FE, 
}
