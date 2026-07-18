import * as p_ from 'pareto-core/implementation/transformer'


//schemas
import type * as s_in from "../../../interface/schemas/deserialization.js"
import type * as s_out from "pareto-fountain-pen/interface/schemas/rich_phrase"

export type Error = p_.Transformer<
    s_in.Error,
    s_out.Phrase
>


//dependencies
import * as ser_parse_tree_deserialization from "astn-core/modules/deserialization/implementation/serializers/parse_tree_deserialization"
import * as t_get_schema_to_rich_phrase from "../get_schema/rich_phrase.js"
import * as t_get_schema_path_to_rich_phrase from "../get_schema_path/rich_phrase.js"

import * as sh from "pareto-fountain-pen/shorthands/rich_phrase/deprecated"

export const Error: Error = ($) => p_.from.state($).decide(
    ($) => {   
        switch ($[0]) {
            case 'deserialize parse tree': return p_.option($, ($) => sh.ph.text(ser_parse_tree_deserialization.Error($)))
            case 'schema': return p_.option($, ($) => t_get_schema_to_rich_phrase.Error($.error))
            case 'schema path': return p_.option($, ($) => t_get_schema_path_to_rich_phrase.Error($))
            default: return p_.exhaustive($[0])
        }
    }
)