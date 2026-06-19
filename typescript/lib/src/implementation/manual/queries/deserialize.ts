import * as p_ from 'pareto-core/dist/implementation/query'
import * as p_r from 'pareto-core/dist/implementation/refiner'
import * as p_t from 'pareto-core/dist/implementation/transformer'
import * as p_di from 'pareto-core/dist/interface/data'
import p_list_from_text from 'pareto-core/dist/implementation/refiner/specials/list_from_text'
import p_super_query_result from 'pareto-core/dist/implementation/query/super_query_result'
import p_implement_me from 'pareto-core-dev/dist/implement_me'
import p_temp_dictionary from 'pareto-core/dist/temp/Generic_Dictionary'
import p_select_lookup from 'pareto-core/dist/implementation/transformer/select_lookup'

import * as interface_ from "../../../interface/queries"

//data types
import * as d from "../../../interface/data/deserialize"

//depencencies
import * as r_unmarshall_result_from_loc from "../refiners/unmarshall_result/list_of_characters"
import * as r_resolve_result_from_unmarshall_result from "../transformers/unmarshall_result/resolve_result"

export const $$: interface_.query_functions.deserialize = p_.query_function(
    ($d, $s, $q) => p_super_query_result($q['get schema path'](
        {
            'context path': $d['file path'].context,
        },
        ($): d.Error => ['schema path', $]
    )).query(
        ($v) => $q['get schema'](
            {
                'schema path': $v,
                'tab size': $d['tab size'],
            },
            ($): d.Error => ['schema', {
                'error': $,
                'schema path': $v,
            }]
        )
    ).refine(
        ($v, abort) => p_r.from.state($v).decide(($) => {
            switch ($[0]) {
                case 'constrained': return p_r.ss($, ($): d.Result => ['constrained', r_resolve_result_from_unmarshall_result.Document(
                    r_unmarshall_result_from_loc.Document(
                        p_list_from_text(
                            $d.content,
                            ($) => $
                        ),
                        ($) => abort(['deserialize parse tree', $]),
                        {
                            'module': $['module resolver'].entry.signature.module,
                            'tab size': $d['tab size'],
                        }
                    ),
                    {
                        'parameters': {
                            'acyclic': p_temp_dictionary.map_value_dictionary_to_generic_dictionary(
                                p_t.from.dictionary(
                                    $['module resolver'].entry.signature['resolved parameters'].lookups
                                ).filter(
                                    ($) => p_t.from.state($.type).decide(($) => $[0] === 'acyclic')
                                ),
                                ($) => ['not found because of root', null]
                            ),
                            'cyclic': p_temp_dictionary.map_value_dictionary_to_generic_dictionary(
                                p_t.from.dictionary(
                                    $['module resolver'].entry.signature['resolved parameters'].lookups
                                ).filter(
                                    ($) => p_t.from.state($.type).decide(($) => $[0] === 'cyclic')
                                ),
                                ($) => ['not found because of root', null]
                            ),
                            'stack': p_temp_dictionary.map_value_dictionary_to_generic_dictionary(
                                p_t.from.dictionary(
                                    $['module resolver'].entry.signature['resolved parameters'].lookups
                                ).filter(
                                    ($) => p_t.from.state($.type).decide(($) => $[0] === 'stack')
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
                        'module parameters': $['module resolver'].entry.signature['resolved parameters'].modules.__d_map_deprecated(
                            ($) => ['not found because of root', null],
                        )
                    }
                )])
                case 'unconstrained': return p_r.ss($, ($) => ['unconstrained', r_unmarshall_result_from_loc.Document(
                    p_list_from_text(
                        $d.content,
                        ($) => $
                    ),
                    ($) => abort(['deserialize parse tree', $]),
                    {
                        'module': $.module.entry,
                        'tab size': $d['tab size'],
                    }
                )])
                default: return p_r.au($[0])
            }
        })
    )
)
