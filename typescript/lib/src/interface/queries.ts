import * as p_ from 'pareto-core/interface/query'

//query interfaces
import * as query_actions_pareto_common from "pareto-common/interface/query_actions"
import * as query_actions_pareto_filesystem_unrestricted_api from "pareto-filesystem-unrestricted-api/interface/query_actions"
import * as query_actions from "./query_actions.js"
//data types
import * as d_serialize_prose from "pareto-fountain-pen/interface/data/prose_serialize"



export type get_schema = p_.Query_Function<
    query_actions.get_schema,
    null,
    {
        'read file': query_actions_pareto_filesystem_unrestricted_api.read_file
    }
>

export type get_schema_path = p_.Query_Function<
    query_actions.get_schema_path,
    null,
    {
        'stat': query_actions_pareto_filesystem_unrestricted_api.stat_possible_node
    }
>


export type deserialize = p_.Query_Function<
    query_actions.deserialize,
    null,
    {
        'get schema': query_actions.get_schema
        'get schema path': query_actions.get_schema_path
    }
>

export type load_unmarshalled_file = p_.Query_Function<
    query_actions.load_unmarshalled_file,
    null,
    {
        'read file': query_actions_pareto_filesystem_unrestricted_api.read_file
        'stat': query_actions_pareto_filesystem_unrestricted_api.stat_possible_node

    }
>

export type seal = p_.Query_Function<
    query_actions_pareto_common.process_file_data,
    {
        'tab size': number,
        'serialization parameters': d_serialize_prose.Parameters,
    },
    {
        'read file': query_actions_pareto_filesystem_unrestricted_api.read_file
        'stat': query_actions_pareto_filesystem_unrestricted_api.stat_possible_node
    }
>