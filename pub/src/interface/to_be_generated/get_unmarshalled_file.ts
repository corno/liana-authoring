import * as d_lpd from "./get_unmarshalled_document"
import * as d_path from "pareto-resources/dist/interface/generated/liana/schemas/path/data"
import * as d_unmarshall_result from "./unmashall_result"
import * as d_read_file from "pareto-resources/dist/interface/generated/liana/schemas/read_file/data"

export type Result = d_unmarshall_result.Document

export type Error =
    | ['read file', d_read_file.Error]
    | ['document', d_lpd.Error]

export type Parameters = {
    'file path': d_path.Node_Path,
    'tab size': number,
}