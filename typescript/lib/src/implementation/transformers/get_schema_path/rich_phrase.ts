import * as p_ from 'pareto-core/implementation/transformer'


//schemas
import type * as s_in from "../../../interface/schemas/retrieval_of_schema_path.js"
import type * as s_out from "pareto-fountain-pen/interface/schemas/rich_phrase"

export type Error = p_.Transformer<
    s_in.Error,
    s_out.Phrase
>


//dependencies
import * as ser_stat_possible_node from "pareto-filesystem-unrestricted-api/modules/unrestricted/implementation/serializers/stat_possible_node"

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/rich_phrase/deprecated"

export const Error: Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'not found': return p_.option($, ($) => sh.ph.text("schema not found"))
            case 'stat error': return p_.option($, ($) => sh.ph.text(ser_stat_possible_node.Error($)))
            default: return p_.exhaustive($[0])
        }
    })