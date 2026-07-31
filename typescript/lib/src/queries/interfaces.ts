import * as p_ from 'pareto-core/interface/query_interface'

//schemas
import type * as s_deserialize from "../schemas/deserialization/schema.js"
import type * as s_get_schema_path from "../schemas/retrieval_of_schema_path/schema.js"
import type * as s_get_schema from "../schemas/retrieval_of_schema/schema.js"

export type get_schema_path = p_.Query_Interface<
    s_get_schema_path.Result,
    s_get_schema_path.Error,
    s_get_schema_path.Parameters
>
export type get_schema = p_.Query_Interface<
    s_get_schema.Result,
    s_get_schema.Error,
    s_get_schema.Parameters
>
export type deserialize = p_.Query_Interface<
    s_deserialize.Result,
    s_deserialize.Error,
    s_deserialize.Parameters
>
