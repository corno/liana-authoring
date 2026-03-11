import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'

//data types
import * as d_out from "../../../../interface/to_be_generated/unmashall_result"
import * as d_function from "../../../../interface/to_be_generated/unmarshall_result_from_loc"
import * as d_in from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"

export type Value = _pi.Refiner_With_Parameter<d_out.Value, d_function.Error, d_in.List_of_Characters, d_function.Parameters>
export type Document = _pi.Refiner_With_Parameter<d_out.Document, d_function.Error, d_in.List_of_Characters, d_function.Parameters>

//depencencies
import * as tu_dynamic_unmarshall from "./astn_parse_tree"
import * as r_parse_tree_from_text from "astn-core/dist/implementation/manual/refiners/parse_tree/list_of_characters"
import * as r_temp_module_specifier_from_loc from "pareto-liana/dist/implementation/manual/refiners/temp_module_specifier/list_of_characters"

export const Document: Document = ($, abort, $p) => {
    return {
        'content': Value($, abort, $p)
    }
}

export const Value: Value = ($, abort, $p) => {
    const x = r_temp_module_specifier_from_loc.Module_Specifier(
        $p['schema']['content'],
        ($) => abort(['schema', {
            'error': $,
            'file location': $p['schema']['path'],
        }]),
        {
            'document resource identifier': $p['schema']['path'],
        }
    )

    const x3 = tu_dynamic_unmarshall.Value(
        r_parse_tree_from_text.Document(
            $,
            ($) => abort(['deserialize', $]),
            {
                'tab size': $p['tab size'],
                'document resource identifier': $p['instance path']
            },
        ).content,
        {
            'definition': x.root.entry['root value'],
            'definition path': x.root.id
        }
    )
    return x3
}