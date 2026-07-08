import * as p_ from 'pareto-core/interface/command'

import * as actions_commands_pareto_stream_api from "pareto-stream-api/interface/command_actions"
import * as actions_commands_pareto_application_api from "pareto-application-api/interface/command_actions"
import * as actions_commands_pareto_filesystem_unrestricted_api from "pareto-filesystem-unrestricted-api/interface/command_actions"
import * as actions_queries_pareto_filesystem_unrestricted_api from "pareto-filesystem-unrestricted-api/interface/query_actions"

import * as d_serialize_prose from "pareto-fountain-pen/interface/data/prose_serialize"


export type seal = p_.Command<
    actions_commands_pareto_application_api.main,
    {
        'tab size': number,
        'serialization parameters': d_serialize_prose.Parameters,
    },
    {
        'read file': actions_queries_pareto_filesystem_unrestricted_api.read_file
        'stat': actions_queries_pareto_filesystem_unrestricted_api.stat_possible_node
    },
    {
        'write file': actions_commands_pareto_filesystem_unrestricted_api.write_file,
        'log error': actions_commands_pareto_stream_api.log_error,
    }
>