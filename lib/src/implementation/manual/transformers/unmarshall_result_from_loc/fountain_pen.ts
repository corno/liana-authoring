import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'

import * as d_in from "../../../../interface/to_be_generated/unmarshall_result_from_loc"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

export namespace signatures {
    export type Error = _pi.Transformer<d_in.Error, d_out.Phrase>
}

import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

//dependencies
import * as t_deserialize_parse_tree_to_fountain_pen from "astn-core/dist/implementation/manual/transformers/deserialize_parse_tree/fountain_pen"
import * as t_deserialize_resolved_to_fountain_pen from "liana-core/dist/implementation/manual/transformers/deserialize_resolved/fountain_pen"

export const Error: signatures.Error = ($) => _p.decide.state($, ($) => {
    switch ($[0]) {
        case 'schema': return _p.ss($, ($) => {
            return sh.ph.composed([
                sh.ph.literal("error in schema"),
                sh.ph.literal(": "),
                t_deserialize_resolved_to_fountain_pen.Error($.error)
            ])
        })
        case 'deserialize': return _p.ss($, ($) => t_deserialize_parse_tree_to_fountain_pen.Error($))
        default: return _p.au($[0])
    }
})