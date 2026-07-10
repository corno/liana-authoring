
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../interface/data/unmarshall_result.js"
import type * as d_in_parse_tree from "astn-core/interface/data/parse_tree"
import type * as d_out from "astn/interface/data/authoring_target"
import type * as d_function from "../../../interface/data/unmarshall_result_to_authoring_target.js"

export type Document = p_.Transformer_With_Parameter<
    d_in.Document,
    d_out.Document,
    d_function.Parameters
>

export type Any_Value = p_.Transformer_With_Parameter<
    d_in.Value,
    d_out.Value,
    d_function.Parameters
>

export type Non_Entity = p_.Transformer_With_Parameter<
    d_in.Value,
    d_out.Value,
    d_function.Parameters
>

export type Entity = p_.Transformer_With_Parameter<
    d_in.Value,
    d_out.Value,
    d_function.Parameters
>

export type Structural_Token = p_.Transformer<
    d_in_parse_tree.Structural_Token,
    d_out.Token_Trivia
>

