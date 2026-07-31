
import * as p_ from 'pareto-core/implementation/transformer'

//schemas
import type * as s_in from "../../../schemas/unmarshall_result/schema.js"
import type * as s_out from "../../../schemas/diagnostics/schema.js"


namespace interface_ {

    export type Document = p_.Transformer<
        s_in.Document,
        s_out.Diagnostics
    >
}

import * as ser_rich_phrase from "pareto-fountain-pen/modules/rich_phrase/schemas/rich_phrase/serializers"

//dependencies
import * as t_to_unmarshall_result_to_errors from "../unmarshall_result/unmarshall_errors.js"
import * as t_to_unmarshall_result_to_warnings from "../unmarshall_result/unmarshall_warnings.js"
import * as t_unmarshall_errors_to_prose from "../unmarshall_errors/rich_phrase.js"
import * as t_unmarshall_warnings_to_prose from "../unmarshall_warnings/rich_phrase.js"

export const Document: interface_.Document = ($) => p_.literal.segmented_list([
    p_.from.list(t_to_unmarshall_result_to_errors.Document($)).map(
        ($) => {
            return ({
                'severity': ['error', null],
                'range': p_.literal.set(['range', $.range]),
                'related information': p_.literal.not_set(),
                'message': ser_rich_phrase.Phrase(
                    t_unmarshall_errors_to_prose.Error($),
                ),
                'type': ['semantic', null],
            })
        }
    ),
    p_.from.list(t_to_unmarshall_result_to_warnings.Document($)).map(
        ($): s_out.Diagnostics.L => {
            return ({
                'severity': ['warning', null],
                'range': p_.literal.set(['range', $.range]),
                'related information': p_.literal.not_set(),
                'message': ser_rich_phrase.Phrase(
                    t_unmarshall_warnings_to_prose.Warning($),
                ),
                'type': ['semantic', null],
            })
        }
    ),
])
