import * as p_ from 'pareto-core/implementation/transformer'
import type * as p_i from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../../interface/data/deserialize.js"
import type * as d_out from "../../../../interface/generated/liana/schemas/diagnostics/data.js"

export namespace interface_ {
	export type Error = p_i.Transformer<
		d_in.Error,
		d_out.Diagnostics.L
	>
}
