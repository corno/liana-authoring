import * as p_ from 'pareto-core/implementation/query'
import * as p_temp from 'pareto-core/implementation/transformer'
import p_list_from_text from 'pareto-core/implementation/refiner/specials/list_from_text'
import p_super_query_result from 'pareto-core/implementation/query/super_query_result'

import type * as query_interfaces_file_in_file_out from "pareto-common/modules/file_in_file_out/interface/queries"
import type * as query_interfaces_pareto_filesystem_unrestricted_api from "pareto-filesystem-unrestricted-api/modules/unrestricted/interface/queries"
import type * as s_paragraph_serialization from "pareto-fountain-pen/interface/schemas/paragraph_serialization"

//data  types
import type * as s_file_in_file_out_query from "pareto-common/modules/file_in_file_out/schemas/query"

//dependencies
import { $$ as q_get_unmarshalled_file } from "../queries/load_unmarshalled_file.js"
import * as t_load_file_to_prose from "../transformers/load_file/rich_phrase.js"
import * as ser_path from "pareto-filesystem-unrestricted-api/modules/unrestricted/implementation/serializers/path"
import * as r_astn_sealed_target_from_unmarshall_result from "../refiners/astn_sealed_target/unmarshall_result.js"
import * as t_auth_targ_from_unmarshall_result_to_prose from "../transformers/sealed_target_from_unmarshall_result/rich_phrase.js"
import * as t_astn_sealed_target_to_paragraph from "astn-core/modules/serialization/implementation/transformers/sealed_target/paragraph"

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/paragraph/deprecated"

export const $$: p_.Query_Implementation<
    query_interfaces_file_in_file_out.operation,
    {
        'tab size': number,
        'serialization parameters': s_paragraph_serialization.Parameters,
    },
    {
        'read file': query_interfaces_pareto_filesystem_unrestricted_api.read_file
        'stat': query_interfaces_pareto_filesystem_unrestricted_api.stat_possible_node
    }
> = p_.query(
    ($d, $s, $q) => p_super_query_result(
        q_get_unmarshalled_file(
            null,
            {
                'read file': $q['read file'],
                'stat': $q['stat'],
            },
        )(
            {
                'file path': $d.path, //to determine the schema path
                'tab size': $s['tab size'],
            },
            ($): s_file_in_file_out_query.Error => ({
                'message': sh.ph.composed([
                    sh.ph.text(ser_path.Node_Path($d.path)),
                    sh.ph.text("FIX location: "),
                    t_load_file_to_prose.Error(
                        $,
                    )
                ])
            })
        )
    ).refine(
        ($, abort) => r_astn_sealed_target_from_unmarshall_result.Value(
            p_temp.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'unconstrained': return p_temp.ss($, ($) => $.content)
                        case 'constrained': return p_temp.ss($, ($) => $.content.unmarshalled)
                        default: return p_temp.exhaustive($[0])
                    }
                }),
            ($) => abort(
                {
                    'message': sh.ph.composed([
                        sh.ph.text("FIX location: "),
                        t_auth_targ_from_unmarshall_result_to_prose.Error(
                            $,
                        )
                    ])
                }
            )
        ),
    ).transform(
        ($): s_file_in_file_out_query.Result => ({
            'paragraph': t_astn_sealed_target_to_paragraph.Document(
                $,
            ),
        })
    )
)
