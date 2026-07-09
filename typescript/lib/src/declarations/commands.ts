import * as p_ from 'pareto-core/interface/command_implementation'

import type * as command_interfaces_pareto_stream_api from "pareto-stream-api/interface/commands"
import type * as command_interfaces_pareto_application_api from "pareto-application-api/interface/commands"
import type * as command_interfaces_pareto_filesystem_unrestricted_api from "pareto-filesystem-unrestricted-api/interface/commands"
import type * as query_interfaces_pareto_filesystem_unrestricted_api from "pareto-filesystem-unrestricted-api/interface/queries"

import type * as d_serialize_prose from "pareto-fountain-pen/interface/data/prose_serialize"


export type seal = p_.Command_Implementation<
    command_interfaces_pareto_application_api.main,
    {
        'tab size': number
        'serialization parameters': d_serialize_prose.Parameters
    },
    {
        'read file': query_interfaces_pareto_filesystem_unrestricted_api.read_file
        'stat': query_interfaces_pareto_filesystem_unrestricted_api.stat_possible_node
    },
    {
        'write file': command_interfaces_pareto_filesystem_unrestricted_api.write_file
        'log error': command_interfaces_pareto_stream_api.log_error
    }
>