
import * as p_ from 'pareto-core/implementation/transformer'

import type * as s_out_2 from "../../../schemas/diagnostics/schema.js"
import type * as s_in from "liana-core/modules/resolved_document_deserialization/schemas/resolved_document_deserialization/schema"

//schemas
import type * as s_loc from "../../../schemas/location/schema.js"
import type * as s_path from "pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/path/schema"

export namespace s_function {
    export type Parameters = {
        'schema path': s_path.Node_Path
    }
}

export namespace s_out {

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


namespace interface_ {

    export type Error = p_.Transformer_With_Parameter<
        s_in.Error,
        s_out.Error,
        s_function.Parameters
    >
}

//dependencies
import * as t_resolved_document_deserialization_to_location from "liana-core/modules/resolved_document_deserialization/schemas/resolved_document_deserialization/transformers/location"
import * as ser_resolved_document_deserialization from "liana-core/modules/resolved_document_deserialization/schemas/resolved_document_deserialization/serializers"


export const Error: interface_.Error = ($, $p) => ({
    'type': ['deserialize', null],
    'message': ser_resolved_document_deserialization.Error($),
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
                'range': t_resolved_document_deserialization_to_location.Error($),
            }
        }
    ])),
    'severity': ['error', null],
})
