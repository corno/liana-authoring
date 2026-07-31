import type * as s_path from "pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/path/schema"
import type * as s_stat from "pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/stat_possible_node/schema"

export type Result = s_path.Node_Path

export type Error =
    | ['not found', null]
    | ['stat error', s_stat.Error]

export type Parameters = {
    'context path': s_path.Context_Path,
}