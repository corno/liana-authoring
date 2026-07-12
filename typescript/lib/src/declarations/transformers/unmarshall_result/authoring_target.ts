
import type * as p_ from 'pareto-core/interface/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/unmarshall_result.js"
import type * as s_in_parse_tree from "astn-core/interface/data/parse_tree"
import type * as s_out from "astn/interface/data/authoring_target"
import type * as s_function from "../../../interface/schemas/unmarshall_result_to_authoring_target.js"

export type Document = p_.Transformer_With_Parameter<
    s_in.Document,
    s_out.Document,
    s_function.Parameters
>

export type Any_Value = p_.Transformer_With_Parameter<
    s_in.Value,
    s_out.Value,
    s_function.Parameters
>

export type Non_Entity = p_.Transformer_With_Parameter<
    s_in.Value,
    s_out.Value,
    s_function.Parameters
>

export type Entity = p_.Transformer_With_Parameter<
    s_in.Value,
    s_out.Value,
    s_function.Parameters
>

export type Structural_Token = p_.Transformer<
    s_in_parse_tree.Structural_Token,
    s_out.Token_Trivia
>

