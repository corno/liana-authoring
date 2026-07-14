import * as p_ from 'pareto-core/implementation/transformer'

import type * as s_in from "../../../interface/schemas/get_unmarshalled_file.js"
namespace declarations {
    export type Error = p_.Transformer<
        s_in.Error,
        s_out.Phrase
    >
}

//dependencies
import * as t_read_file_to_prose from "pareto-filesystem-unrestricted-api/implementation/transformers/read_file/prose"
import * as t_deserialize_to_prose from "../deserialize/prose.js"

export const Error: declarations.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'deserialize': return p_.option($, ($) => t_deserialize_to_prose.Error($))
            case 'read file': return p_.option($, ($) => t_read_file_to_prose.Error($))
            default: return p_.exhaustive($[0])
        }
    })