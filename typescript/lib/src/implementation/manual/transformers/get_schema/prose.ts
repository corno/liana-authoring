import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/get_schema"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//dependencies
import * as t_deserialize_resolved_to_prose from "liana-core/dist/implementation/manual/transformers/deserialize_resolved/prose"
import * as t_read_file_to_prose from "pareto-resources/dist/implementation/manual/transformers/read_file/prose"

export namespace signatures {
    export type Error = p_i.Transformer<
        d_in.Error,
        d_out.Phrase
    >
}

export const Error: signatures.Error = ($) => p_.from.state($.type).decide(
    ($) => {
        switch ($[0]) {
            case 'deserialize': return p_.option($, ($) => t_deserialize_resolved_to_prose.Error($))
            case 'read file': return p_.option($, ($) => t_read_file_to_prose.Error($))
            default: return p_.au($[0])
        }
    })