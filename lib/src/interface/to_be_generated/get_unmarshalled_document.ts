import * as _pi from 'pareto-core/dist/interface'

import * as d_path from "pareto-resources/dist/interface/generated/liana/schemas/path/data"
import * as d_unmarshall_result from "./unmashall_result"
import * as d_deserialize_unmarshall_result from "./unmarshall_result_from_loc"
import * as d_loc from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"

export type Result = d_unmarshall_result.Document

export type Error =
    | ['no schema file', {
        'file location': string
    }]
    | ['deserialize', d_deserialize_unmarshall_result.Error]

export type Parameters = {
    'content': d_loc.List_of_Characters,
    'file path': d_path.Node_Path,
    'tab size': number,
}