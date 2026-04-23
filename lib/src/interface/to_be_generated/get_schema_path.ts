import * as d_path from "pareto-resources/dist/interface/generated/liana/schemas/path/data"

export type Result = d_path.Node_Path

export type Error =
    | ['not found', null]

export type Parameters = {
    'instance path': d_path.Node_Path,
}