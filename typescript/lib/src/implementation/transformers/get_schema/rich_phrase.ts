import * as p_ from 'pareto-core/implementation/transformer'


//schemas
import type * as s_in from "../../../interface/schemas/get_schema.js"
import type * as s_out from "pareto-fountain-pen/interface/schemas/rich_phrase"

export type Error = p_.Transformer<
    s_in.Error,
    s_out.Phrase
>


//dependencies
import * as ser_deserialize_resolved from "liana-core/modules/resolved_document_deserialization/implementation/serializers/resolved_document_deserialization"
import * as ser_read_file from "pareto-filesystem-unrestricted-api/modules/unrestricted/implementation/serializers/read_file"

import * as sh from "pareto-fountain-pen/shorthands/rich_phrase/deprecated"

export const Error: Error = ($) => p_.from.state($.type).decide(
    ($) => {
        switch ($[0]) {
            case 'deserialize': return p_.option($, ($) => sh.ph.text(ser_deserialize_resolved.Error($)))
            case 'read file': return p_.option($, ($) => sh.ph.text(ser_read_file.Error($)))
            default: return p_.exhaustive($[0])
        }
    }
)