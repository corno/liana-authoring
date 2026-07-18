import * as p_ from 'pareto-core/implementation/command'

import type * as command_interfaces_pareto_application_api from "pareto-application-api/interface/commands"
import type * as command_interfaces_pareto_filesystem_unrestricted_api from "pareto-filesystem-unrestricted-api/interface/commands"
import type * as query_interfaces_pareto_filesystem_unrestricted_api from "pareto-filesystem-unrestricted-api/modules/unrestricted/interface/queries"
import type * as command_interfaces_pareto_stream_api from "pareto-stream-api/interface/commands"
import type * as s_serialize_prose from "../../../interface/schemas/prose_serialize.js"

//dependencies
import * as c_file_to_file from "pareto-common/implementation/commands/file_in_file_out"
import * as q_seal from "../queries/seal.js"

export const $$: p_.Command_Implementation<
    command_interfaces_pareto_application_api.main,
    {
        'tab size': number
        'serialization parameters': s_serialize_prose.Parameters
    },
    {
        'read file': query_interfaces_pareto_filesystem_unrestricted_api.read_file
        'stat': query_interfaces_pareto_filesystem_unrestricted_api.stat_possible_node
    },
    {
        'write file': command_interfaces_pareto_filesystem_unrestricted_api.write_file
        'log error': command_interfaces_pareto_stream_api.log_error
    }
> = p_.command(
    ($d, $s, $q, $c) => [
        c_file_to_file.$$(
            null,
            {
                'read file': $q['read file'],
                'process data': q_seal.$$(
                    $s,
                    {
                        'read file': $q['read file'],
                        'stat': $q['stat'],
                    },
                )
            },
            {
                'log error': $c['log error'],
                'write file': $c['write file'],
            },
        ).execute(
            {
                'arguments': $d.arguments
            },
            ($) => $
        ),
    ]
)
