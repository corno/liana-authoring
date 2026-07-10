import type * as d_path from "pareto-resources/interface/data/fs_unrestricted_path"
import type * as d_read_file from "pareto-filesystem-unrestricted-api/interface/data/fs_unrestricted_read_file"
import type * as d_deserialize from "./deserialize.js"

export type Result = d_deserialize.Result

export type Error =
    | ['read file', d_read_file.Error]
    | ['deserialize', d_deserialize.Error]

export type Parameters = {
    'file path': d_path.Node_Path,
    'tab size': number,
}