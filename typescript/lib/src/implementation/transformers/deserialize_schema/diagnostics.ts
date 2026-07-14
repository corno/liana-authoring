import * as p_ from 'pareto-core/implementation/transformer'

import type * as s_in from "./deserialize_resolved.js"
namespace declarations {
    export type Error = p_.Transformer_With_Parameter<
        s_in.Error,
        s_out.Error,
        s_parameters.Parameters
    >
}


//schemas
import type * as s_loc from "../../../interface/schemas/location.js"
import type * as s_path from "../../../interface/schemas/fs_unrestricted_path"
import type * as s_out_2 from "../../../interface/schemas/diagnostics.js"
namespace s_parameters {
    export type Parameters = {
        'schema path': s_path.Node_Path
    }
}
namespace s_out {

    export type Error = {
        'type':
        | ['schema', null]
        | ['deserialize', null]
        'range': s_loc.Range_FE,
        'message': string,
        'severity':
        | ['error', null]
        | ['warning', null]
        'related information': s_out_2.Diagnostic.related_information
    }
}

//dependencies
import * as t_prose_to_text from "pareto-fountain-pen/implementation/transformers/prose/text"
import * as t_deserialize_resolved_to_location from "liana-core/implementation/transformers/deserialize_resolved/location"
import * as t_deserialize_resolved_to_prose from "liana-core/implementation/transformers/deserialize_resolved/prose"


export const Error: declarations.Error = ($, $p) => ({
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
    'related information': p_.literal.set(p_.literal.list<s_out_2.Diagnostic.related_information.O.L>([
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