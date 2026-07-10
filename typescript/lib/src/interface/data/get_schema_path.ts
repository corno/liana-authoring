import type * as d_path from "pareto-resources/interface/data/fs_unrestricted_path"
import type * as d_stat from "pareto-filesystem-unrestricted-api/interface/data/fs_unrestricted_stat_possible_node"

export type Result = d_path.Node_Path

export type Error =
    | ['not found', null]
    | ['stat error', d_stat.Error]

export type Parameters = {
    'context path': d_path.Context_Path,
}