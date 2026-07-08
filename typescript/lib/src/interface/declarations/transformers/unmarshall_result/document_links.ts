import * as p_ from 'pareto-core/implementation/transformer'
import type * as p_i from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../../interface/data/unmarshall_result.js"
import type * as d_out from "../../../../interface/data/document_links.js"
import type * as d_schema from "pareto-liana/interface/generated/liana/schemas/schema/data/resolved"

export namespace interface_ {
    export type Document = p_i.Transformer<
        d_in.Document,
        d_out.Links
    >

    export type Value = p_i.Transformer<
        d_in.Value,
        d_out.Links
    >
}
