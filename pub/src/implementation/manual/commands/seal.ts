import * as _p from 'pareto-core/dist/command'
import * as _pi from 'pareto-core/dist/interface'
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'

import * as signatures from "../../../modules/common_tool_signatures/interface/signatures"

//data types
import * as d_main from "pareto-resources/dist/interface/to_be_generated/temp_main"
import * as d_transform_file from "../../../modules/common_tool_signatures/interface/to_be_generated/transform_file"

//dependencies
import { $$x as q_load_file } from "../queries/get_unmarshalled_file"
import * as r_file_in_file_out_from_main from "../../../modules/common_tool_signatures/implementation/manual/schemas/file_in_file_out/refiners/main"
import * as t_transform_file_to_fp from "../../../modules/common_tool_signatures/implementation/manual/schemas/transform_file/transformers/fountain_pen"
import * as t_load_file_to_fp from "../transformers/load_file/fountain_pen"
import * as r_astn_sealed_target_from_unmarshall_result from "../refiners/astn_sealed_target/unmarshall_result"
import * as t_astn_sealed_target_to_fp from "astn-core/dist/implementation/manual/transformers/sealed_target/fountain_pen"
import * as t_fp_to_text from "pareto-fountain-pen/dist/implementation/manual/transformers/prose/text"
import * as t_auth_targ_from_unmarshall_result_to_fountain_pen from "../transformers/sealed_target_from_unmarshall_result/fountain_pen"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"


export const $$: signatures.commands.transform_file = _p.command_procedure(($p, $cr, $qr) => [

    _p.handle_error<d_main.Error, d_transform_file.Error>(
        [

            _p.refine_without_error_transformation(
                (abort) => r_file_in_file_out_from_main.Parameters($p, ($) => abort(['file in file out', ['command line arguments', $]])),
                ($r) => [
                    _p.query(
                        q_load_file({
                            'read file': $qr['read file']
                        })(
                            {
                                'file path': $r.in,
                                'tab size': 4,
                            },
                            ($): d_transform_file.Error => ['processing', sh.ph.composed([
                                sh.ph.literal("FIX location"),
                                t_load_file_to_fp.Error(
                                    $,
                                )
                            ])]
                        ),
                        ($, abort) => r_astn_sealed_target_from_unmarshall_result.Document($, ($) => abort(['processing', sh.ph.composed([
                            sh.ph.literal("FIX location"),
                            t_auth_targ_from_unmarshall_result_to_fountain_pen.Error(
                                $,
                                // {
                                //     'character location reporting': ['one based', null]
                                // }
                            )
                        ])
                        ])),
                        ($) => [

                            $cr['write file'].execute(
                                {
                                    'data': _p_list_from_text(
                                        t_fp_to_text.Paragraph(
                                            t_astn_sealed_target_to_fp.Document(
                                                $
                                            ),
                                            {
                                                'indentation': "    ",
                                                'newline': "\n"
                                            }
                                        ),
                                        ($) => $,
                                    ),
                                    'path': $r.out,
                                },
                                ($) => ['file in file out', ['writing file', $]]
                            )

                        ]
                    ),
                ]
            ),
        ],
        ($) => [
            $cr['log error'].execute(
                {
                    'message': sh.pg.sentences([
                        sh.sentence([

                            t_transform_file_to_fp.My_Error($)
                        ])
                    ]),
                },
                ($) => ({
                    'exit code': 2
                })
            )
        ],
        () => ({
            'exit code': 1
        }),
    ),
])
