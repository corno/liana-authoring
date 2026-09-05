import * as p_ from 'pareto-core/query'
import * as p_r from 'pareto-core/refiner'
import * as p_t from 'pareto-core/transformer'
import p_list_from_text from 'pareto-core/refiner/specials/list_from_text'
import * as p_temp_dictionary from 'pareto-core/temp/Generic_Dictionary'
import * as p_select_lookup from 'pareto-core/transformer/specials/lookup'

import type * as query_interfaces from "../interfaces.js"

//schemas
import * as d from "../../schemas/deserialization/schema.js"

//depencencies
import * as r_unmarshall_result_from_loc from "../../schemas/unmarshall_result/refiners/list_of_characters.js"
import * as r_resolve_result_from_unmarshall_result from "../../schemas/unmarshall_result/transformers/resolve_result.js"

export const $$: p_.Query_Implementation<
    query_interfaces.deserialize,
    null,
    {
        'get schema': query_interfaces.get_schema
        'get schema path': query_interfaces.get_schema_path
    }
> = p_.query(
    (e, $s, $q, $d) => e.query(
        ($d) => $q['get schema path'](
            {
                'context path': $d['file path'].context,
            },
            ($): d.Error => ['schema path', $]
        )
    ).query(
        ($v) => $q['get schema'](
            {
                'schema path': $v,
                'tab size': $d.deprecated['tab size'],
            },
            ($): d.Error => ['schema', {
                'error': $,
                'schema path': $v,
            }]
        )
    ).refine(
        ($v, abort) => p_r.from.state($v).decide(
            ($) => {
                switch ($[0]) {
                    case 'constrained': return p_r.option($, ($): d.Result => ['constrained', r_resolve_result_from_unmarshall_result.Document(
                        r_unmarshall_result_from_loc.Document(
                            p_list_from_text(
                                $d.deprecated.content,
                                ($) => $
                            ),
                            ($) => abort(['deserialize parse tree', $]),
                            {
                                'module': $['module resolver'].entry.signature.module,
                                'tab size': $d.deprecated['tab size'],
                            }
                        ),
                        {
                            'parameters': {
                                'acyclic': p_temp_dictionary.map_value_dictionary_to_generic_dictionary(
                                    p_t.from.dictionary($['module resolver'].entry.signature['resolved parameters'].lookups
                                    ).filter(
                                        ($) => p_t.from.state($.type).decide(
                                            ($) => $[0] === 'acyclic')
                                    ),
                                    ($) => ['not found because of root', null]
                                ),
                                'cyclic': p_temp_dictionary.map_value_dictionary_to_generic_dictionary(
                                    p_t.from.dictionary($['module resolver'].entry.signature['resolved parameters'].lookups
                                    ).filter(
                                        ($) => p_t.from.state($.type).decide(
                                            ($) => $[0] === 'cyclic')
                                    ),
                                    ($) => ['not found because of root', null]
                                ),
                                'stack': p_temp_dictionary.map_value_dictionary_to_generic_dictionary(
                                    p_t.from.dictionary($['module resolver'].entry.signature['resolved parameters'].lookups
                                    ).filter(
                                        ($) => p_t.from.state($.type).decide(
                                            ($) => $[0] === 'stack')
                                    ),
                                    ($) => ['not found because of root', null]
                                )

                            },
                            'siblings': {
                                'acyclic': p_select_lookup.acyclic.not_set(),
                                'cyclic': p_select_lookup.cyclic.not_set()
                            },
                        },
                        {
                            'definition': $['module resolver'].entry,
                            'resolvers': $.resolver,
                            'module parameters': p_t.from.dictionary($['module resolver'].entry.signature['resolved parameters'].modules).map(
                                ($) => ['not found because of root', null],
                            )
                        }
                    )])
                    case 'unconstrained': return p_r.option($, ($) => ['unconstrained', r_unmarshall_result_from_loc.Document(
                        p_list_from_text(
                            $d.deprecated.content,
                            ($) => $
                        ),
                        ($) => abort(['deserialize parse tree', $]),
                        {
                            'module': $.module.entry,
                            'tab size': $d.deprecated['tab size'],
                        }
                    )])
                    default: return p_r.exhaustive($[0])
                }
            })
    )
)
