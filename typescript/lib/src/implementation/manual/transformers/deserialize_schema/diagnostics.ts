import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

import * as d_out_2 from "../../../../interface/generated/liana/schemas/diagnostics/data"
import * as d_in from "liana-core/dist/interface/data/deserialize_resolved"

//data types
import * as d_loc from "../../../../interface/generated/liana/schemas/location/data"
import * as d_path from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_path/data"

export namespace d_function {
    export type Parameters = {
        'schema path': d_path.Node_Path
    }
}

export namespace d_out {

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

export namespace interface_ {
    export type Error = p_i.Transformer_With_Parameter<
        d_in.Error,
        d_out.Error,
        d_function.Parameters
    >
}

//dependencies
import * as t_prose_to_text from "pareto-fountain-pen/dist/implementation/manual/transformers/prose/text"
import * as t_deserialize_resolved_to_location from "liana-core/dist/implementation/manual/transformers/deserialize_resolved/location"
import * as t_deserialize_resolved_to_prose from "liana-core/dist/implementation/manual/transformers/deserialize_resolved/fountain_pen"


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