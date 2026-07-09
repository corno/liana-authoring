import * as p_ from 'pareto-core/interface/query_implementation'

//query interfaces
import type * as query_interfaces_pareto_common from "pareto-common/interface/queries"
import type * as query_interfaces_pareto_filesystem_unrestricted_api from "pareto-filesystem-unrestricted-api/interface/queries"
import * as query_interfaces from "../interface/queries.js"

//data types
import type * as d_serialize_prose from "pareto-fountain-pen/interface/data/prose_serialize"
import type * as d_get_unmarshalled_file from "../interface/data/get_unmarshalled_file.js"



export type get_schema = p_.Query_Implementation<
    query_interfaces.get_schema,
    null,
    {
        'read file': query_interfaces_pareto_filesystem_unrestricted_api.read_file
    }
>

export type get_schema_path = p_.Query_Implementation<
    query_interfaces.get_schema_path,
    null,
    {
        'stat': query_interfaces_pareto_filesystem_unrestricted_api.stat_possible_node
    }
>


export type deserialize = p_.Query_Implementation<
    query_interfaces.deserialize,
    null,
    {
        'get schema': query_interfaces.get_schema
        'get schema path': query_interfaces.get_schema_path
    }
>

export type load_unmarshalled_file = p_.Query_Implementation<
    p_.Query_Interface<
        d_get_unmarshalled_file.Result,
        d_get_unmarshalled_file.Error,
        d_get_unmarshalled_file.Parameters
    >,
    null,
    {
        'read file': query_interfaces_pareto_filesystem_unrestricted_api.read_file
        'stat': query_interfaces_pareto_filesystem_unrestricted_api.stat_possible_node

    }
>

export type seal = p_.Query_Implementation<
    query_interfaces_pareto_common.process_file_data,
    {
        'tab size': number,
        'serialization parameters': d_serialize_prose.Parameters,
    },
    {
        'read file': query_interfaces_pareto_filesystem_unrestricted_api.read_file
        'stat': query_interfaces_pareto_filesystem_unrestricted_api.stat_possible_node //this one makes it different from what pareto-common provides
    }
>