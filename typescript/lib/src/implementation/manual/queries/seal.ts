import * as p_ from 'pareto-core/dist/query/implementation'
import * as p_t from 'pareto-core/dist/assign'
import p_list_from_text from 'pareto-core/dist/specials/list_from_text'

import * as signatures from "../../../interface/queries"

//data  types
import * as d_get_unmarshalled_file from "../../../interface/to_be_generated/get_unmarshalled_file"
import * as d_process_file_data from "pareto-common/dist/interface/to_be_generated/process_file_data"
import * as d_sealed from "astn-core/dist/interface/generated/liana/schemas/sealed_target/data"

//dependencies
import { $$ as q_get_unmarshalled_file } from "../queries/load_unmarshalled_file"
import * as t_load_file_to_fp from "../transformers/load_file/fountain_pen"
import * as t_unrestricted_path_to_text from "pareto-resources/dist/implementation/manual/transformers/unrestricted_path/text"
import * as r_astn_sealed_target_from_unmarshall_result from "../refiners/astn_sealed_target/unmarshall_result"
import * as t_auth_targ_from_unmarshall_result_to_fountain_pen from "../transformers/sealed_target_from_unmarshall_result/fountain_pen"
import * as t_fp_to_text from "pareto-fountain-pen/dist/implementation/manual/transformers/prose/text"
import * as t_astn_sealed_target_to_fp from "astn-core/dist/implementation/manual/transformers/sealed_target/fountain_pen"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

export const $$: signatures.query_functions.seal = p_.query_function(
    ($d, $s, $q): p_.Query_Result<d_process_file_data.Result, d_process_file_data.Error> => {


        const foo: p_.Query_Result<d_get_unmarshalled_file.Result, d_process_file_data.Error> = q_get_unmarshalled_file(
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
            ($): d_process_file_data.Error => sh.ph.composed([
                sh.ph.literal(t_unrestricted_path_to_text.Node_Path($d.path)),
                sh.ph.literal("FIX location: "),
                t_load_file_to_fp.Error(
                    $,
                )
            ])
        )


        const foo2: p_.Query_Result<d_sealed.Value_, d_process_file_data.Error> = foo.refine(
            ($, abort) => r_astn_sealed_target_from_unmarshall_result.Value(
                p_t.decide.state($, ($) => {
                    switch ($[0]) {
                        case 'unconstrained': return p_t.ss($, ($) => $.content)
                        case 'constrained': return p_t.ss($, ($) => $.content.unmarshalled)
                        default: return p_t.au($[0])
                    }
                }),
                ($) => abort(sh.ph.composed([
                    sh.ph.literal("FIX location: "),
                    t_auth_targ_from_unmarshall_result_to_fountain_pen.Error(
                        $,
                    )
                ]))
            ),
        )

        const foo3: p_.Query_Result<d_process_file_data.Result, d_process_file_data.Error> = foo2.transform(
            ($) => ({
                'data': p_list_from_text(
                    t_fp_to_text.Paragraph(
                        t_astn_sealed_target_to_fp.Document(
                            $
                        ),
                        $s['serialization parameters']
                    ),
                    ($) => $,
                )
            })
        )

        return foo3


    }
)
