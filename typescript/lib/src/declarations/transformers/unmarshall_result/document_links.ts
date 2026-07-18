
import type * as p_ from 'pareto-core/interface/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/unmarshall_result.js"
import type * as s_out from "../../../interface/schemas/document_links.js"
import type * as s_schema from "pareto-liana/modules/schema/interface/data/resolved"


export type Document = p_.Transformer<
    s_in.Document,
    s_out.Links
>

export type Value = p_.Transformer<
    s_in.Value,
    s_out.Links
>

