
import * as p_ from 'pareto-core/implementation/transformer'

//schemas
import type * as s_in from "../../../schemas/resolve_result/schema.js"
import type * as s_out from "../../../schemas/diagnostics/schema.js"


namespace interface_ {

    export type Document = p_.Transformer<
        s_in.Document,
        s_out.Diagnostics
    >
}

//dependencies
import * as t_to_resolve_result_to_errors from "./resolve_errors.js"
import * as ser_rich_phrase from "pareto-fountain-pen/modules/rich_phrase/schemas/rich_phrase/serializers"
import * as t_resolve_errors_to_prose from "../../resolve_errors/transformers/rich_phrase.js"

export const Document: interface_.Document = ($) => p_.from.list(t_to_resolve_result_to_errors.Document($)).map(
    ($) => ({
        'severity': $.severity,
        'range': p_.literal.set(['range', $.range]),
        'related information': p_.literal.not_set(),
        'message': ser_rich_phrase.Phrase(
            t_resolve_errors_to_prose.Error($),
        ),
        'type': ['semantic', null],
    })
)
