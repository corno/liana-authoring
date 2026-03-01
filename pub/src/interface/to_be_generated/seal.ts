

import * as d_function_seal from "pareto-liana/dist/interface/to_be_generated/sealed_target_from_parse_tree"
import * as d_function_unmarshall from "pareto-liana/dist/interface/to_be_generated/get_unmarshalled_document"

export type Error =
    | ['seal', d_function_seal.Error]
    | ['unmarshall', d_function_unmarshall.Error]



