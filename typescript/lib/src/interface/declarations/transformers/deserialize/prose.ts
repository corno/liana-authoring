
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../data/deserialize.js"
import type * as d_out from "pareto-fountain-pen/interface/generated/liana/schemas/prose/data"

//dependencies
import * as t_deserialize_to_prose from "astn-core/implementation/manual/transformers/deserialize_parse_tree/prose"
import * as t_get_schema_to_prose from "../get_schema/prose.js"
import * as t_get_schema_path_to_prose from "../get_schema_path/prose.js"


export type Error = p_.Transformer<
    d_in.Error,
    d_out.Phrase
>

