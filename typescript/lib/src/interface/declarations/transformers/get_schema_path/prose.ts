
import type * as p_i from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../data/get_schema_path.js"
import type * as d_out from "pareto-fountain-pen/interface/generated/liana/schemas/prose/data"

//dependencies
import * as t_stat_to_prose from "pareto-filesystem-unrestricted-api/implementation/manual/transformers/stat_possible_node/prose"


    export type Error = p_i.Transformer<
        d_in.Error,
        d_out.Phrase
    >

