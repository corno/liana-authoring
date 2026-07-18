import type * as s_path from "pareto-resources/interface/data/fs_unrestricted_path"
import type * as s_read_file from "pareto-filesystem-unrestricted-api/interface/data/fs_unrestricted_read_file"
import type * as s_deserialize from "./deserialize.js"

export type Result = s_deserialize.Result

export type Error =
    | ['read file', s_read_file.Error]
    | ['deserialize', s_deserialize.Error]

export type Parameters = {
    'file path': s_path.Node_Path,
    'tab size': number,
}