import * as _p from 'pareto-core/dist/query'
import _p_text_from_list from 'pareto-core/dist/_p_text_from_list'
import _p_variables from 'pareto-core/dist/_p_variables'

import * as signatures from "../../../interface/signatures"

//data types
import * as d from "../../../interface/to_be_generated/get_unmarshalled_file"

//depencencies
import * as r_unmarshall_result_from_list_of_characters from "../refiners/unmarshall_result/list_of_characters"
import * as t_path_to_text from "pareto-resources/dist/implementation/manual/transformers/path/text"
import * as t_path_to_path from "pareto-resources/dist/implementation/manual/transformers/path/path"
import * as r_temp_module_specifier_from_loc from "pareto-liana/dist/implementation/manual/refiners/temp_module_specifier/list_of_characters"

export const $$: signatures.queries.get_unmarshalled_file = _p.query_function(
    ($p, $qr) => $qr['read file'](
        $p['file path'],
        ($): d.Error => ['read file', $]
    ).query_without_error_transformation(
        ($) => _p_variables(() => {
            const instance = $
            const schema_path = t_path_to_path.create_node_path(
                t_path_to_path.extend_context_path_with_single_step($p['file path'].context, { 'addition': ".liana" }),
                { 'node': "schema.slna" }
            )
            return $qr['read file'](
                schema_path,
                (): d.Error => ['document', ['no schema file', {
                    'file location': t_path_to_text.Node_Path(schema_path),
                }]]
            ).refine_without_error_transformation(
                ($, abort) => _p_variables(() => {
                    const schema = r_temp_module_specifier_from_loc.Module_Specifier(
                        $,
                        ($) => abort(['document', ['schema', {
                            'error': $,
                        }]]),
                    )
                    return r_unmarshall_result_from_list_of_characters.Document(
                        instance,
                        ($) => abort(['document', ['deserialize', $]]),
                        {
                            'schema': schema,
                            'tab size': $p['tab size'],
                        },
                    )
                }),
            )
        })
    )
)