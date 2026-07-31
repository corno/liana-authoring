import * as p_ from 'pareto-core/implementation/transformer'


//schemas
import type * as s_in from "../../../schemas/get_unmarshalled_file.js"
import type * as s_out from "pareto-fountain-pen/modules/rich_phrase/schemas/rich_phrase/schema"


export type Error = p_.Transformer<
    s_in.Error,
    s_out.Phrase
>


//dependencies
import * as ser_read_file from "pareto-filesystem-unrestricted-api/modules/unrestricted/implementation/serializers/read_file"
import * as t_deserialize_to_rich_phrase from "../deserialize/rich_phrase.js"

import * as sh from "pareto-fountain-pen/modules/rich_phrase/schemas/rich_phrase/shorthands/deprecated"

export const Error: Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'deserialize': return p_.option($, ($) => t_deserialize_to_rich_phrase.Error($))
            case 'read file': return p_.option($, ($) => sh.ph.text(ser_read_file.Error($)))
            default: return p_.exhaustive($[0])
        }
    })