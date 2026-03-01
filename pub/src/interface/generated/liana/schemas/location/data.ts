
import * as _pi from 'pareto-core/dist/interface'

export namespace Position_ {
    
    export type line = number
    
    export type character = number
    
}

export type Position_ = {
    readonly 'line': Position_.line
    readonly 'character': Position_.character
}

export namespace Range_ {
    
    export type start = Position_
    
    export type end = Position_
    
}

export type Range_ = {
    readonly 'start': Range_.start
    readonly 'end': Range_.end
}

export { 
    Position_ as Position, 
    Range_ as Range, 
}
