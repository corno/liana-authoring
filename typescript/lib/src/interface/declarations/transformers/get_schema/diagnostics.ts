import type * as p_i from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../data/get_schema.js"
import type * as d_out from "../../../generated/liana/schemas/diagnostics/data.js"
import type * as d_path from "pareto-resources/interface/generated/liana/schemas/fs_unrestricted_path/data"

export namespace d_function {
	export type Parameters = {
		'schema path': d_path.Node_Path
	}
}


export type Error = p_i.Transformer_With_Parameter<
	d_in.Error,
	d_out.Diagnostics.L,
	d_function.Parameters
>

