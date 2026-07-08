import * as p_ from 'pareto-core/implementation/transformer'
import type * as p_i from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../data/unmarshall_result.js"
import type * as d_in_parse_tree from "astn-core/interface/generated/liana/schemas/parse_tree/data"
import type * as d_out from "astn/interface/generated/liana/schemas/authoring_target/data"
import type * as d_function from "../../../data/unmarshall_result_to_authoring_target.js"

//dependencies
import * as t_parse_tree_to_authoring_target from "astn/implementation/manual/transformers/parse_tree/authoring_target"

//FIXME: we are losing comments in the transformation from the parse tree to the unmarshalled result, we need to add them to the unmarshalled result and then to the authoring target

export namespace interface_ {
    export type Document = p_i.Transformer_With_Parameter<
        d_in.Document,
        d_out.Document,
        d_function.Parameters
    >

    export type Any_Value = p_i.Transformer_With_Parameter<
        d_in.Value,
        d_out.Value,
        d_function.Parameters
    >

    export type Non_Entity = p_i.Transformer_With_Parameter<
        d_in.Value,
        d_out.Value,
        d_function.Parameters
    >

    export type Entity = p_i.Transformer_With_Parameter<
        d_in.Value,
        d_out.Value,
        d_function.Parameters
    >

    export type Structural_Token = p_i.Transformer<
        d_in_parse_tree.Structural_Token,
        d_out.Token_Trivia
    >
}
