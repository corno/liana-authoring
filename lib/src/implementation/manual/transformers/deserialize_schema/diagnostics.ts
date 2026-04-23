import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'

import * as d_out from "../../../../interface/generated/liana/schemas/diagnostics/data"
import * as d_in from "liana-core/dist/interface/to_be_generated/deserialize_resolved"

//data types
import * as d_loc from "../../../../interface/generated/liana/schemas/location/data"
import * as d_path from "pareto-resources/dist/interface/generated/liana/schemas/path/data"

//dependencies
import * as t_fp_to_text from "pareto-fountain-pen/dist/implementation/manual/transformers/prose/text"
import * as t_astn_location_to_location from "../../transformers/astn_core_location/location"
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
    'related information': d_out.Diagnostics.L.related_information
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
    'related information': _p.optional.literal.set(_p.list.literal<d_out.Diagnostics.L.related_information.O.L>([
        {
            'message': "The schema is not valid",
            'location': {
                'file path': $p['schema path'],
                'range': _p.decide.state(t_deserialize_resolved_to_location.Error($), ($): d_loc.Range_FE => {
                    switch ($[0]) {
                        case 'range': return _p.ss($, ($) => t_astn_location_to_location.Range($))
                        case 'end of document': return _p.ss($, ($) => ({
                            'start': {
                                'line': $.end.relative.line,
                                'character': $.end.relative.column,
                            },
                            'end': {
                                'line': $.end.relative.line,
                                'character': $.end.relative.column,
                            }
                        }))
                        default: return _p.au($[0])
                    }
                })
            }
        }
    ])),
    'severity': ['error', null],
})