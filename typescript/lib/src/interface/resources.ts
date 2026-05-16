import * as _pi from 'pareto-core/dist/interface'

import * as d_get_unmarshalled_file from "./to_be_generated/get_unmarshalled_file"
import * as d_deserialize from "./to_be_generated/deserialize"
import * as d_get_schema_path from "./to_be_generated/get_schema_path"
import * as d_get_schema from "./to_be_generated/get_schema"

export namespace queries {

    export type get_schema_path = _pi.Query<d_get_schema_path.Result, d_get_schema_path.Error, d_get_schema_path.Parameters>
    export type get_schema = _pi.Query<d_get_schema.Result, d_get_schema.Error, d_get_schema.Parameters>
    export type deserialize = _pi.Query<d_deserialize.Result, d_deserialize.Error, d_deserialize.Parameters>
    export type load_unmarshalled_file = _pi.Query<d_get_unmarshalled_file.Result, d_get_unmarshalled_file.Error, d_get_unmarshalled_file.Parameters>

}