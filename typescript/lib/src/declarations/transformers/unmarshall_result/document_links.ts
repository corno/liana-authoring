
import type * as p_ from 'pareto-core/interface/transformer'

//schemas
import type * as s_in from "../../../schemas/unmarshall_result/schema.js"
import type * as s_out from "../../../schemas/document_links/schema.js"
import type * as s_schema from "pareto-liana/modules/schema.generated/schemas/resolved/schema"


export type Document = p_.Transformer<
    s_in.Document,
    s_out.Links
>

export type Value = p_.Transformer<
    s_in.Value,
    s_out.Links
>

