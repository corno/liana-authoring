import * as p_ from 'pareto-core/implementation/transformer'
import type * as p_di from 'pareto-core/interface/data'
import type * as p_i from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../../interface/data/unmarshall_result.js"
import type * as d_out from "../../../../interface/generated/liana/schemas/completion_suggestions/data.js"

import type * as d_schema from "pareto-liana/interface/generated/liana/schemas/schema/data/resolved"
import type * as d_ast_target from "astn/interface/generated/liana/schemas/authoring_target/data"
import type * as d_location from "../../../../interface/generated/liana/schemas/location/data.js"
import type * as d_outx from "../../../../interface/data/found.js"

//dependencies
import * as t_to_unmarshall_result_value_at_position from "./found.js"
import * as t_liana_schema_to_authoring_target from "../liana_schema/authoring_target.js"
import * as t_authoring_target_to_text from "astn/implementation/manual/transformers/authoring_target/text"

export type Parameters = {
    'position': d_location.Position
    'indent': string
    'style':
    | ['verbose', null]
    | ['concise', null]
}

export namespace interface_ {

    export type Document = p_i.Transformer_With_Parameter<
        d_in.Document,
        d_out.Completion_Suggestions,
        Parameters

    >

    export type Found = p_i.Transformer_With_Parameter<
        d_outx.Found,
        d_out.Completion_Suggestions,
        Parameters
    >

}
