import * as p_ from 'pareto-core/interface/query'

//query interfaces
import * as queries_pareto from "pareto-resources/interface/resources"
import * as queries_common from "pareto-common/interface/queries"

//data types
import * as d_serialize_prose from "pareto-fountain-pen/interface/data/prose_serialize"
import * as d_get_unmarshalled_file from "./data/get_unmarshalled_file.js"
import * as d_deserialize from "./data/deserialize.js"
import * as d_get_schema_path from "./data/get_schema_path.js"
import * as d_get_schema from "./data/get_schema.js"


export namespace queries {

    export type get_schema_path = p_.Query<d_get_schema_path.Result, d_get_schema_path.Error, d_get_schema_path.Parameters>
    export type get_schema = p_.Query<d_get_schema.Result, d_get_schema.Error, d_get_schema.Parameters>
    export type deserialize = p_.Query<d_deserialize.Result, d_deserialize.Error, d_deserialize.Parameters>
    export type load_unmarshalled_file = p_.Query<d_get_unmarshalled_file.Result, d_get_unmarshalled_file.Error, d_get_unmarshalled_file.Parameters>

}

export namespace query_functions {

    export type get_schema = p_.Query_Function<
        queries.get_schema,
        null,
        {
            'read file': queries_pareto.filesystem_unrestricted.queries.read_file
        }
    >

    export type get_schema_path = p_.Query_Function<
        queries.get_schema_path,
        null,
        {
            'stat': queries_pareto.filesystem_unrestricted.queries.stat_possible_node
        }
    >


    export type deserialize = p_.Query_Function<
        queries.deserialize,
        null,
        {
            'get schema': queries.get_schema
            'get schema path': queries.get_schema_path
        }
    >

    export type load_unmarshalled_file = p_.Query_Function<
        queries.load_unmarshalled_file,
        null,
        {
            'read file': queries_pareto.filesystem_unrestricted.queries.read_file
            'stat': queries_pareto.filesystem_unrestricted.queries.stat_possible_node

        }
    >

    export type seal = p_.Query_Function<
        queries_common.queries.process_file_data,
        {
            'tab size': number,
            'serialization parameters': d_serialize_prose.Parameters,
        },
        {
            'read file': queries_pareto.filesystem_unrestricted.queries.read_file
            'stat': queries_pareto.filesystem_unrestricted.queries.stat_possible_node
        }
    >

}
