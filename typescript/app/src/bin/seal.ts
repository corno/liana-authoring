#!/usr/bin/env -S node --enable-source-maps

import * as p_h from 'pareto-host-nodejs'

import { $$ as procedure } from "lib/dist/implementation/manual/commands/seal"

p_h.run_main_command(
    ($r) => procedure(
        {
            'serialization parameters': {
                'indentation': "    ",
                'newline': "\n"
            },
            'tab size': 4,
        },
        {
            'read file': $r['filesystem unrestricted'].queries['read file'],
            'stat': $r['filesystem unrestricted'].queries['stat possible node']
        },
        {
            'write file': $r['filesystem unrestricted'].commands['write file'],
            'log error': $r.stream.commands['log error'],
        },
    ),
)
