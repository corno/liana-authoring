import * as _pi from 'pareto-core/dist/interface'

import * as d_path from "pareto-resources/dist/interface/generated/liana/schemas/path/data"
import * as d_unmarshall_result from "./unmarshall_result"
import * as d_loc from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"
import * as d_deserialize_resolved from "liana-core/dist/interface/to_be_generated/deserialize_resolved"
import * as d_parse_result from "astn-core/dist/interface/generated/liana/schemas/deserialize_parse_tree/data"

export type Result = d_unmarshall_result.Document

export type Error =
    | ['no schema file', {
        'file location': string
    }]
    | ['deserialize', d_parse_result.Error]
    | ['schema', {
        'error': d_deserialize_resolved.Error,
    }]

export type Parameters = {
    'content': d_loc.List_of_Characters,
    'file path': d_path.Node_Path,
    'tab size': number,
}