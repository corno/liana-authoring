import * as pt from 'pareto-core/dist/assign'
import * as pi from 'pareto-core/dist/interface'

import * as d_out from "../../../../interface/generated/liana/schemas/diagnostics/data"
import * as d_in from "liana-core/dist/interface/to_be_generated/deserialize_resolved"

//data types
import * as d_loc from "../../../../interface/generated/liana/schemas/location/data"
import * as d_path from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_path/data"

//dependencies
import * as t_fp_to_text from "pareto-fountain-pen/dist/implementation/manual/transformers/prose/text"
import * as t_deserialize_resolved_to_location from "liana-core/dist/implementation/manual/transformers/deserialize_resolved/location"
import * as t_deserialize_resolved_to_fp from "liana-core/dist/implementation/manual/transformers/deserialize_resolved/fountain_pen"


export type Temp_Error = {
    'type':
    | ['schema', null]
    | ['deserialize', null]
    'range': d_loc.Range_FE,
    'message': string,
    'severity':
    | ['error', null]
    | ['warning', null]
    'related information': d_out.Diagnostic.related_information
}

export const Error = ($: d_in.Error, $p: { 'schema path': d_path.Node_Path }): Temp_Error => ({
    'type': ['deserialize', null],
    'message': t_fp_to_text.Phrase(
        t_deserialize_resolved_to_fp.Error($),
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
    'related information': pt.optional.literal.set(pt.list.literal<d_out.Diagnostic.related_information.O.L>([
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