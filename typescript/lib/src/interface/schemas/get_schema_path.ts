import type * as s_path from "pareto-resources/interface/data/fs_unrestricted_path"
import type * as s_stat from "pareto-filesystem-unrestricted-api/interface/data/fs_unrestricted_stat_possible_node"

export type Result = s_path.Node_Path

export type Error =
    | ['not found', null]
    | ['stat error', s_stat.Error]

export type Parameters = {
    'context path': s_path.Context_Path,
}