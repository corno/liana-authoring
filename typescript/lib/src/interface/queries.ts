import * as pqi from 'pareto-core/dist/query_interface'

import * as resources from "./resources"
import * as resources_pareto from "pareto-resources/dist/interface/resources"
import * as resources_common from "../modules/common_tool_signatures/interface/queries"

import * as d_serialize_prose from "pareto-fountain-pen/dist/interface/to_be_generated/prose_serialize"

import * as d_get_unmarshalled_file from "./to_be_generated/get_unmarshalled_file"
import * as d_deserialize from "./to_be_generated/deserialize"
import * as d_get_schema_path from "./to_be_generated/get_schema_path"
import * as d_get_schema from "./to_be_generated/get_schema"


export namespace queries {

    export type get_schema_path = pqi.Query<d_get_schema_path.Result, d_get_schema_path.Error, d_get_schema_path.Parameters>
    export type get_schema = pqi.Query<d_get_schema.Result, d_get_schema.Error, d_get_schema.Parameters>
    export type deserialize = pqi.Query<d_deserialize.Result, d_deserialize.Error, d_deserialize.Parameters>
    export type load_unmarshalled_file = pqi.Query<d_get_unmarshalled_file.Result, d_get_unmarshalled_file.Error, d_get_unmarshalled_file.Parameters>

}

export namespace query_functions {

    export type get_schema = pqi.Query_Function<
        queries.get_schema,
        null,
        {
            'read file': resources_pareto.filesystem_unrestricted.queries.read_file
        }
    >

    export type get_schema_path = pqi.Query_Function<
        queries.get_schema_path,
        null,
        {
            'stat': resources_pareto.filesystem_unrestricted.queries.stat_possible_node
        }
    >


    export type deserialize = pqi.Query_Function<
        queries.deserialize,
        null,
        {
            'get schema': queries.get_schema
            'get schema path': queries.get_schema_path
        }
    >

    export type load_unmarshalled_file = pqi.Query_Function<
        queries.load_unmarshalled_file,
        null,
        {
            'read file': resources_pareto.filesystem_unrestricted.queries.read_file
            'stat': resources_pareto.filesystem_unrestricted.queries.stat_possible_node

        }
    >

    export type seal = pqi.Query_Function<
        resources_common.queries.process_file_data,
        {
            'tab size': number,
            'serialization parameters': d_serialize_prose.Parameters,
        },
        {
            'read file': resources_pareto.filesystem_unrestricted.queries.read_file
            'stat': resources_pareto.filesystem_unrestricted.queries.stat_possible_node
        }
    >

}
