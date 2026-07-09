import * as p_ from 'pareto-core/implementation/command'

import type * as interface_ from "../../declarations/commands.js"

//dependencies
import * as c_file_to_file from "pareto-common/implementation/manual/commands/file_to_file"
import * as q_seal from "../queries/seal.js"

export const $$: interface_.seal = p_.command(
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
