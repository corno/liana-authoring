import * as p_ from 'pareto-core/implementation/transformer'

import type * as interface_ from "../../../declarations/transformers/deserialize/prose.js"

//dependencies
import * as t_deserialize_to_prose from "astn-core/implementation/manual/transformers/deserialize_parse_tree/prose"
import * as t_get_schema_to_prose from "../get_schema/prose.js"
import * as t_get_schema_path_to_prose from "../get_schema_path/prose.js"

export const Error: interface_.Error = ($) => p_.from.state($).decide(
    ($) => {   
        switch ($[0]) {
            case 'deserialize parse tree': return p_.option($, ($) => t_deserialize_to_prose.Error($))
            case 'schema': return p_.option($, ($) => t_get_schema_to_prose.Error($.error))
            case 'schema path': return p_.option($, ($) => t_get_schema_path_to_prose.Error($))
            default: return p_.exhaustive($[0])
        }
    }
)