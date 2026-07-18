import * as p_ from 'pareto-core/implementation/transformer'

import type * as interface_ from "../../../declarations/transformers/load_file/prose.js"

//dependencies
import * as t_read_file_to_prose from "pareto-filesystem-unrestricted-api/implementation/transformers/read_file/prose"
import * as t_deserialize_to_prose from "../deserialize/prose.js"

export const Error: interface_.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'deserialize': return p_.option($, ($) => t_deserialize_to_prose.Error($))
            case 'read file': return p_.option($, ($) => t_read_file_to_prose.Error($))
            default: return p_.exhaustive($[0])
        }
    })