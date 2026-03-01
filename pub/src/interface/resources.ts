import * as _pi from 'pareto-core/dist/interface'

import * as d_get_completion_suggestions from "./generated/liana/schemas/get_completion_suggestions/data"
import * as d_get_on_hover_info from "./generated/liana/schemas/get_on_hover_info/data"
import * as d_get_unmarshalled_document from "pareto-liana/dist/interface/to_be_generated/get_unmarshalled_document"
import * as d_seal from "./generated/liana/schemas/seal/data"
import * as d_seal_tbg from "./to_be_generated/seal"
import * as d_validate_document from "./generated/liana/schemas/validate_document/data"

export namespace queries {

    export type get_completion_suggestions = _pi.Query<d_get_completion_suggestions.Result, d_get_unmarshalled_document.Error, d_get_completion_suggestions.Parameters>
    export type get_on_hover_info = _pi.Query<d_get_on_hover_info.Result, d_get_unmarshalled_document.Error, d_get_on_hover_info.Parameters>
    export type seal = _pi.Query<d_seal.Result, d_seal_tbg.Error, d_seal.Parameters>
    export type validate_document = _pi.Query<d_validate_document.Result, d_get_unmarshalled_document.Error, d_validate_document.Parameters>

}