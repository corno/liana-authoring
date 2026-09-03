import * as p_ from 'pareto-core/implementation/transformer'


//schemas
import type * as s_in from "../../../schemas/retrieval_of_schema/schema.js"
import type * as s_out from "pareto-fountain-pen/modules/rich_phrase/schemas/rich_phrase/schema"

namespace declarations {
export type Error = p_.Transformer<
    s_in.Error,
    s_out.Phrase
>
}

//dependencies
import * as ser_deserialize_resolved from "liana-core/modules/resolved_document_deserialization/schemas/resolved_document_deserialization/serializers"
import * as ser_read_file from "pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/read_file/serializers"

import * as sh from "pareto-fountain-pen/modules/rich_phrase/schemas/rich_phrase/shorthands/deprecated"

export const Error: declarations.Error = ($) => p_.from.state($.type).decide(
    ($) => {
        switch ($[0]) {
            case 'deserialize': return p_.option($, ($) => sh.ph.text(ser_deserialize_resolved.Error($)))
            case 'read file': return p_.option($, ($) => sh.ph.text(ser_read_file.Error($)))
            default: return p_.exhaustive($[0])
        }
    }
)