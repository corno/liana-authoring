import * as p_ from 'pareto-core/implementation/transformer'


//schemas
import type * as s_in from "../../../schemas/retrieval_of_schema_path/schema.js"
import type * as s_out from "pareto-fountain-pen/modules/rich_phrase/schemas/rich_phrase/schema"

export type Error = p_.Transformer<
    s_in.Error,
    s_out.Phrase
>


//dependencies
import * as ser_stat_possible_node from "pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/stat_possible_node/serializers"

//shorthands
import * as sh from "pareto-fountain-pen/modules/rich_phrase/schemas/rich_phrase/shorthands/deprecated"

export const Error: Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'not found': return p_.option($, ($) => sh.ph.text("schema not found"))
            case 'stat error': return p_.option($, ($) => sh.ph.text(ser_stat_possible_node.Error($)))
            default: return p_.exhaustive($[0])
        }
    })