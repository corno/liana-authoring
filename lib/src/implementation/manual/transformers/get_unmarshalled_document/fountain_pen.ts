import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'

import * as d_in from "../../../../interface/to_be_generated/get_unmarshalled_document"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"
import * as d_function_loc from "astn-core/dist/interface/to_be_generated/location_to_fountain_pen"

export namespace signatures {
    export type Error = _pi.Transformer<d_in.Error, d_out.Phrase>
}

import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

//dependencies
import * as t_ur_from_loc_to_fp from "../unmarshall_result_from_loc/fountain_pen"

export const Error: signatures.Error = ($) => _p.decide.state($, ($) => {
    switch ($[0]) {
        case 'no schema file': return _p.ss($, ($) => sh.ph.composed([
            sh.ph.literal("no schema file @ "),
            sh.ph.literal($['file location'])
        ]))
        case 'deserialize': return _p.ss($, ($) => t_ur_from_loc_to_fp.Error($))
        default: return _p.au($[0])
    }
})