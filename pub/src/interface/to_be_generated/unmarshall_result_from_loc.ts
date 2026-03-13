import * as d_parse_result from "astn-core/dist/interface/generated/liana/schemas/deserialize_parse_tree/data"
import * as d_deserialize_schema from "liana-core/dist/interface/to_be_generated/deserialize_resolved"
import * as d_loc from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"

export type Parameters = {
    'tab size': number
    'schema': {
        'content': d_loc.List_of_Characters
    }
}

export type Error =
    | ['schema', {
        'error': d_deserialize_schema.Error,
    }]
    | ['deserialize', d_parse_result.Error]
    // | ['unmarshall', null]