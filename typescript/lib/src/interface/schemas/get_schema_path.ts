import type * as s_path from "./fs_unrestricted_path.js"
import type * as s_stat from "./fs_unrestricted_stat_possible_node.js"

export type Result = s_path.Node_Path

export type Error =
    | ['not found', null]
    | ['stat error', s_stat.Error]

export type Parameters = {
    'context path': s_path.Context_Path,
}