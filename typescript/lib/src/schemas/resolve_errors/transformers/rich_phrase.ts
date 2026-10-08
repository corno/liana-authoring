import * as p_ from 'pareto-core/transformer'


//schemas
import type * as s_in from "../../../schemas/resolve_errors/schema.js"
import type * as s_out from "pareto-fountain-pen/modules/rich_phrase/schemas/rich_phrase/schema"

namespace declarations {
    export type Error = p_.Transformer<
        s_in.Error,
        s_out.Phrase
    >
}
//shorthands
import * as sh from "pareto-fountain-pen/modules/rich_phrase/schemas/rich_phrase/shorthands/deprecated"

export const Error: declarations.Error = ($) => p_.from.state($.type).decide(
    ($) => {
        switch ($[0]) {
            case 'selection unavailable': return sh.ph.text('The selected value is unavailable.')
            case 'optional value not set': return sh.ph.text('The selected optional value is not set.')
            case 'premature cyclic access': return sh.ph.text('A cyclic reference was accessed before its target was resolved.')
            case 'no such entry': return p_.option($, ($) => sh.ph.text('No such dictionary entry: "' + $ + '".'))
            case 'no context lookup': return sh.ph.text('No lookup context is available for this reference.')
            case 'entry unavailable': return p_.option($, ($) => sh.ph.text('The referenced entry "' + $ + '" has no usable value.'))
            case 'cycle detected': return p_.option($, ($) => sh.ph.text(
                'Acyclic reference cycle: ' + p_.from.list($).reduce_to_any_value<string>(
                    '', (id, path) => path === '' ? id : path + ' -> ' + id,
                ),
            ))
            case 'to be implemented': return p_.option($, ($) => sh.ph.composed([
                sh.ph.text("this error type is not yet implemented, please report it to the developers")
            ]))
            default: return p_.exhaustive($[0])
        }
    })