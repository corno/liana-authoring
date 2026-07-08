import * as p_ from 'pareto-core/interface/query'

//query interfaces
import * as actions_queries_pareto_common from "pareto-common/interface/query_actions"
import * as actions_queries_pareto_filesystem_unrestricted_api from "pareto-filesystem-unrestricted-api/interface/query_actions"
import * as query_actions from "../actions/queries.js"
//data types
import type * as d_serialize_prose from "pareto-fountain-pen/interface/data/prose_serialize"



export type get_schema = p_.Query<
    query_actions.get_schema,
    null,
    {
        'read file': actions_queries_pareto_filesystem_unrestricted_api.read_file
    }
>

export type get_schema_path = p_.Query<
    query_actions.get_schema_path,
    null,
    {
        'stat': actions_queries_pareto_filesystem_unrestricted_api.stat_possible_node
    }
>


export type deserialize = p_.Query<
    query_actions.deserialize,
    null,
    {
        'get schema': query_actions.get_schema
        'get schema path': query_actions.get_schema_path
    }
>

export type load_unmarshalled_file = p_.Query<
    query_actions.load_unmarshalled_file,
    null,
    {
        'read file': actions_queries_pareto_filesystem_unrestricted_api.read_file
        'stat': actions_queries_pareto_filesystem_unrestricted_api.stat_possible_node

    }
>

export type seal = p_.Query<
    actions_queries_pareto_common.process_file_data,
    {
        'tab size': number,
        'serialization parameters': d_serialize_prose.Parameters,
    },
    {
        'read file': actions_queries_pareto_filesystem_unrestricted_api.read_file
        'stat': actions_queries_pareto_filesystem_unrestricted_api.stat_possible_node
    }
>