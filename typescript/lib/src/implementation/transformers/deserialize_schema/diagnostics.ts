import * as p_ from 'pareto-core/implementation/transformer'

import type * as interface_ from "../../../declarations/transformers/deserialize_schema/diagnostics.js"


//data types
import type * as d_loc from "../../../interface/data/location.js"
import type * as d_path from "pareto-resources/interface/generated/liana/schemas/fs_unrestricted_path/data"
import type * as d_out_2 from "../../../interface/data/diagnostics.js"
namespace d_function {
    export type Parameters = {
        'schema path': d_path.Node_Path
    }
}
namespace d_out {

    export type Error = {
        'type':
        | ['schema', null]
        | ['deserialize', null]
        'range': d_loc.Range_FE,
        'message': string,
        'severity':
        | ['error', null]
        | ['warning', null]
        'related information': d_out_2.Diagnostic.related_information
    }
}

//dependencies
import * as t_prose_to_text from "pareto-fountain-pen/implementation/transformers/prose/text"
import * as t_deserialize_resolved_to_location from "liana-core/implementation/transformers/deserialize_resolved/location"
import * as t_deserialize_resolved_to_prose from "liana-core/implementation/transformers/deserialize_resolved/prose"


export const Error: interface_.Error = ($, $p) => ({
    'type': ['deserialize', null],
    'message': t_prose_to_text.Phrase(
        t_deserialize_resolved_to_prose.Error($),
        {
            'indentation': "    ",
            'newline': "\n",
        }
    ),
    'range': ({
        'start': {
            'line': 0,
            'character': 0,
        },
        'end': {
            'line': 0,
            'character': 0,
        }
    }),
    'related information': p_.literal.set(p_.literal.list<d_out_2.Diagnostic.related_information.O.L>([
        {
            'message': "The schema is not valid",
            'location': {
                'file path': $p['schema path'],
                'range': t_deserialize_resolved_to_location.Error($),
            }
        }
    ])),
    'severity': ['error', null],
})