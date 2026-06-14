import * as pqi from 'pareto-core/dist/query_interface'

import * as resources from "./resources"
import * as resources_pareto from "pareto-resources/dist/interface/resources"
import * as resources_common from "../modules/common_tool_signatures/interface/queries"

import * as d_serialize_prose from "pareto-fountain-pen/dist/interface/to_be_generated/prose_serialize"

export namespace queries {

    export type get_schema = pqi.Query_Function<
        resources.queries.get_schema,
        null,
        {
            'read file': resources_pareto.filesystem_unrestricted.queries.read_file
        }
    >

    export type get_schema_path = pqi.Query_Function<
        resources.queries.get_schema_path,
        null,
        {
            'stat': resources_pareto.filesystem_unrestricted.queries.stat_possible_node
        }
    >


    export type deserialize = pqi.Query_Function<
        resources.queries.deserialize,
        null,
        {
            'get schema': resources.queries.get_schema
            'get schema path': resources.queries.get_schema_path
        }
    >

    export type load_unmarshalled_file = pqi.Query_Function<
        resources.queries.load_unmarshalled_file,
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
