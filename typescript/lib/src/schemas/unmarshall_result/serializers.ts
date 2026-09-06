
import * as p_ from 'pareto-core/transformer'

//schemas
import type * as s_in from "./schema.js"



//dependencies
import * as ser_rich_phrase from "pareto-fountain-pen/modules/rich_phrase/schemas/rich_phrase/serializers"

//shorthands
import * as sh from "pareto-fountain-pen/modules/rich_phrase/schemas/rich_phrase/shorthands/deprecated"

export const Property_Path = ($: s_in.Property_Path): string => ser_rich_phrase.Phrase(
    sh.ph.rich_phrase(
        p_.from.list($).map(
            ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'group': return p_.option($, ($) => sh.ph.text($))
                        case 'optional': return p_.option($, ($) => sh.ph.text("O"))
                        case 'state': return p_.option($, ($) => sh.ph.text($))
                        default: return p_.exhaustive($[0])
                    }
                })),
        null,
        null,
        sh.ph.text(" > "),
        null,
    ),
)

export const Number = ($: number): string => `${$}`