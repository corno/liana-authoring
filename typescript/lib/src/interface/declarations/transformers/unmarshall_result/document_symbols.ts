
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../data/unmarshall_result.js"
import type * as d_out from "../../../data/document_symbols.js"

//dependencies
import * as t_parse_tree_to_location from "astn-core/implementation/manual/transformers/parse_tree/full_value_range"


export type Document = p_.Transformer<
    d_in.Document,
    d_out.Value
>

export type Value = p_.Transformer<
    d_in.Value,
    d_out.Value
>

