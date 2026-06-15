import * as d_path from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_path/data"
import * as d_stat from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_stat_possible_node/data"

export type Result = d_path.Node_Path

export type Error =
    | ['not found', null]
    | ['stat error', d_stat.Error]

export type Parameters = {
    'context path': d_path.Context_Path,
}