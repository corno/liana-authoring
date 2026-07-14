import type * as s_path from "./fs_unrestricted_path.js"
import type * as s_read_file from "./fs_unrestricted_read_file.js"
import type * as s_deserialize from "./deserialize.js"

export type Result = s_deserialize.Result

export type Error =
    | ['read file', s_read_file.Error]
    | ['deserialize', s_deserialize.Error]

export type Parameters = {
    'file path': s_path.Node_Path,
    'tab size': number,
}