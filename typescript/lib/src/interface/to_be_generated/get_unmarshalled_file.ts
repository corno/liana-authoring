import * as d_path from "pareto-resources/dist/interface/generated/liana/schemas/path/data"
import * as d_read_file from "pareto-resources/dist/interface/generated/liana/schemas/read_file/data"
import * as d_deserialize from "./deserialize"

export type Result = d_deserialize.Result

export type Error =
    | ['read file', d_read_file.Error]
    | ['deserialize', d_deserialize.Error]

export type Parameters = {
    'file path': d_path.Node_Path,
    'tab size': number,
}