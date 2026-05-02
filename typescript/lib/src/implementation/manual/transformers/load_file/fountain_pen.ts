import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'

//data types
import * as d_in from "../../../../interface/to_be_generated/get_unmarshalled_file"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"
import * as d_function_loc from "astn-core/dist/interface/to_be_generated/location_to_fountain_pen"

export namespace signatures {
    export type Error = _pi.Transformer<d_in.Error, d_out.Phrase>
}

//dependencies
import * as t_read_file_to_fountain_pen from "pareto-resources/dist/implementation/manual/transformers/read_file/fountain_pen"
import * as t_load_pareto_document from "../get_unmarshalled_document/fountain_pen"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"


export const Error: signatures.Error = ($) => _p.decide.state($, ($) => {
    switch ($[0]) {
        case 'document': return _p.ss($, ($) => t_load_pareto_document.Error($))
        case 'read file': return _p.ss($, ($) => t_read_file_to_fountain_pen.Error($))
        default: return _p.au($[0])
    }
})