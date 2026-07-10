
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../interface/data/unmarshall_result.js"
import type * as d_out from "../../../interface/data/document_links.js"
import type * as d_schema from "pareto-liana/modules/schema/interface/data/resolved"


export type Document = p_.Transformer<
    d_in.Document,
    d_out.Links
>

export type Value = p_.Transformer<
    d_in.Value,
    d_out.Links
>

