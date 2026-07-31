import type * as s_path from "pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/path/schema"
import type * as s_read_file from "pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/read_file/schema"
import type * as s_deserialize from "./deserialization.js"

export type Result = s_deserialize.Result

export type Error =
    | ['read file', s_read_file.Error]
    | ['deserialize', s_deserialize.Error]

export type Parameters = {
    'file path': s_path.Node_Path,
    'tab size': number,
}