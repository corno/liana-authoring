
import type * as p_i from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../data/unmarshall_result.js"
import type * as d_out from "../../../data/document_symbols.js"

//dependencies
import * as t_parse_tree_to_location from "astn-core/implementation/manual/transformers/parse_tree/full_value_range"


    export type Document = p_i.Transformer<
        d_in.Document,
        d_out.Value
    >

    export type Value = p_i.Transformer<
        d_in.Value,
        d_out.Value
    >

