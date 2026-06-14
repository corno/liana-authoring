import * as pt from 'pareto-core/dist/command'

import * as signatures from "../../../interface/signatures"

//data types
import * as d_main from "pareto-resources/dist/interface/to_be_generated/temp_main"
import * as d_file_to_file from "../../../modules/common_tool_signatures/interface/to_be_generated/file_to_file"

//dependencies
import { $$ as q_load_file } from "../queries/load_unmarshalled_file"
import * as r_file_in_file_out_from_main from "../../../modules/common_tool_signatures/implementation/manual/refiners/file_in_file_out/main"
import * as t_transform_file_to_fp from "../../../modules/common_tool_signatures/implementation/manual/transformers/transform_file/fountain_pen"
import * as t_load_file_to_fp from "../transformers/load_file/fountain_pen"
import * as r_astn_sealed_target_from_unmarshall_result from "../refiners/astn_sealed_target/unmarshall_result"
import * as t_astn_sealed_target_to_fp from "astn-core/dist/implementation/manual/transformers/sealed_target/fountain_pen"
import * as t_fp_to_text from "pareto-fountain-pen/dist/implementation/manual/transformers/prose/text"
import * as t_auth_targ_from_unmarshall_result_to_fountain_pen from "../transformers/sealed_target_from_unmarshall_result/fountain_pen"
import * as c_file_to_file from "../../../modules/common_tool_signatures/implementation/manual/commands/file_to_file"
import * as q_seal from "../queries/seal"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"


export const $$: signatures.commands.seal = pt.command_procedure(
    ($d, $s, $q, $c) => [
        c_file_to_file.$$(
            {
                'indentation': "    ",
                'newline': "\n"
            },
            {
                'read file': $q['read file'],
                'process data': q_seal.$$(
                    $s,
                    {
                        'read file': $q['read file'],
                        'stat': $q['stat'],
                    },
                )
            },
            {
                'log error': $c['log error'],
                'write file': $c['write file'],
            },
        ).execute(
            {
                'arguments': $d.arguments
            },
            ($): d_main.Error => $
        ),
    ])
