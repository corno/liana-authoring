
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../data/get_schema.js"
import type * as d_out from "pareto-fountain-pen/interface/generated/liana/schemas/prose/data"

//dependencies
import * as t_deserialize_resolved_to_prose from "liana-core/implementation/manual/transformers/deserialize_resolved/prose"
import * as t_read_file_to_prose from "pareto-filesystem-unrestricted-api/implementation/manual/transformers/read_file/prose"


export type Error = p_.Transformer<
    d_in.Error,
    d_out.Phrase
>

