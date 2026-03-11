import * as _pi from 'pareto-core/dist/interface'

import * as d_get_unmarshalled_document from "../../../../liana-authoring/pub/src/interface/to_be_generated/get_unmarshalled_document"
import * as d_get_unmarshalled_file from "../../../../liana-authoring/pub/src/interface/to_be_generated/get_unmarshalled_file"

export namespace queries {

    export type get_unmarshalled_document = _pi.Query<d_get_unmarshalled_document.Result, d_get_unmarshalled_document.Error, d_get_unmarshalled_document.Parameters>
    export type get_unmarshalled_file = _pi.Query<d_get_unmarshalled_file.Result, d_get_unmarshalled_file.Error, d_get_unmarshalled_file.Parameters>

}