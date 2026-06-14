import * as pci from 'pareto-core/dist/command_interface'
import * as pqi from 'pareto-core/dist/query_interface'

import * as d_get_unmarshalled_file from "./to_be_generated/get_unmarshalled_file"
import * as d_deserialize from "./to_be_generated/deserialize"
import * as d_get_schema_path from "./to_be_generated/get_schema_path"
import * as d_get_schema from "./to_be_generated/get_schema"

export namespace queries {

    export type get_schema_path = pqi.Query<d_get_schema_path.Result, d_get_schema_path.Error, d_get_schema_path.Parameters>
    export type get_schema = pqi.Query<d_get_schema.Result, d_get_schema.Error, d_get_schema.Parameters>
    export type deserialize = pqi.Query<d_deserialize.Result, d_deserialize.Error, d_deserialize.Parameters>
    export type load_unmarshalled_file = pqi.Query<d_get_unmarshalled_file.Result, d_get_unmarshalled_file.Error, d_get_unmarshalled_file.Parameters>

}