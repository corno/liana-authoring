import type * as s_parse_result from "./deserialize_parse_tree.js"
import type * as s_schema from "./resolved.js"

export type Parameters = {
    'tab size': number
    'module': s_schema.Module
}

export type Error = s_parse_result.Error