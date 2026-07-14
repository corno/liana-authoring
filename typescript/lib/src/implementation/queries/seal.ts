import * as p_ from 'pareto-core/implementation/query'
import * as p_temp from 'pareto-core/implementation/transformer'
import p_list_from_text from 'pareto-core/implementation/refiner/specials/list_from_text'
import p_super_query_result from 'pareto-core/implementation/query/super_query_result'

import type * as query_interfaces_pareto_common from "pareto-common/interface/queries"
import type * as query_interfaces_pareto_filesystem_unrestricted_api from "pareto-filesystem-unrestricted-api/interface/queries"
import type * as s_serialize_prose from "../../../interface/schemas/prose_serialize.js"

//data  types
import type * as s_process_file_data from "./process_file_data.js"

//dependencies
import { $$ as q_get_unmarshalled_file } from "../queries/load_unmarshalled_file.js"
import * as t_load_file_to_prose from "../transformers/load_file/prose.js"
import * as t_unrestricted_path_to_text from "pareto-resources/implementation/transformers/unrestricted_path/text"
import * as r_astn_sealed_target_from_unmarshall_result from "../refiners/astn_sealed_target/unmarshall_result.js"
import * as t_auth_targ_from_unmarshall_result_to_prose from "../transformers/sealed_target_from_unmarshall_result/prose.js"
import * as t_fp_to_text from "pareto-fountain-pen/implementation/transformers/prose/text"
import * as t_astn_sealed_target_to_prose from "astn-core/implementation/transformers/sealed_target/prose"

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"

export const $$: p_.Query_Implementation<
    query_interfaces_pareto_common.process_file_data,
    {
        'tab size': number,
        'serialization parameters': s_serialize_prose.Parameters,
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
            ($): s_process_file_data.Error => sh.ph.composed([
                sh.ph.literal(t_unrestricted_path_to_text.Node_Path($d.path)),
                sh.ph.literal("FIX location: "),
                t_load_file_to_prose.Error(
                    $,
                )
            ])
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
                sh.ph.composed([
                    sh.ph.literal("FIX location: "),
                    t_auth_targ_from_unmarshall_result_to_prose.Error(
                        $,
                    )
                ]))
        ),
    ).transform(
        ($): s_process_file_data.Result => ({
            'data': p_list_from_text(
                t_fp_to_text.Paragraph(
                    t_astn_sealed_target_to_prose.Document(
                        $
                    ),
                    $s['serialization parameters']
                ),
                ($) => $,
            )
        })
    )
)
