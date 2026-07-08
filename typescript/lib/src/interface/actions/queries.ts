import * as p_ from 'pareto-core/interface/query_action'

//data types
import * as d_get_unmarshalled_file from "../data/get_unmarshalled_file.js"
import * as d_deserialize from "../data/deserialize.js"
import * as d_get_schema_path from "../data/get_schema_path.js"
import * as d_get_schema from "../data/get_schema.js"

export type get_schema_path = p_.Query_Action<d_get_schema_path.Result, d_get_schema_path.Error, d_get_schema_path.Parameters>
export type get_schema = p_.Query_Action<d_get_schema.Result, d_get_schema.Error, d_get_schema.Parameters>
export type deserialize = p_.Query_Action<d_deserialize.Result, d_deserialize.Error, d_deserialize.Parameters>
export type load_unmarshalled_file = p_.Query_Action<d_get_unmarshalled_file.Result, d_get_unmarshalled_file.Error, d_get_unmarshalled_file.Parameters>
